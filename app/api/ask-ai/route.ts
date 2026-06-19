/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DIVIDER,
  FOLLOW_UP_SYSTEM_PROMPT,
  getSystemPrompt,
  REPLACE_END,
  SEARCH_START,
} from "@/lib/prompts";
import { streamChatCompletion, chatCompletion } from "@/lib/openai-client";

/**
 * POST /api/ask-ai — Generate a new website from a prompt.
 * Streams the HTML response back to the client.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { prompt, redesignMarkdown, html, promptMode = "classic", sectionMode = true, aiConfig } = body;

  if (!prompt && !redesignMarkdown) {
    return NextResponse.json(
      { ok: false, error: "Missing prompt" },
      { status: 400 }
    );
  }

  if (!aiConfig?.endpoint || !aiConfig?.model || !aiConfig?.apiKey) {
    return NextResponse.json(
      { ok: false, error: "AI not configured. Please set your endpoint, model, and API key in Settings." },
      { status: 400 }
    );
  }

  const userContent = redesignMarkdown
    ? `Here is my current design as a markdown:\n\n${redesignMarkdown}\n\nNow, please create a new design based on this markdown.`
    : html
      ? `Here is my current HTML code:\n\n\`\`\`html\n${html}\n\`\`\`\n\nNow, please create a new design based on this HTML.`
      : prompt;

  try {
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const response = new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    (async () => {
      let completeResponse = "";
      // Buffer: only flush to client after confirming no leading markdown fence
      let headBuffer = "";
      let headFlushed = false;
      try {
        for await (const chunk of streamChatCompletion({
          messages: [
            {
              role: "system",
              content: getSystemPrompt(
                promptMode as "classic" | "enhanced",
                sectionMode as boolean,
                prompt || redesignMarkdown || ''
              ),
            },
            { role: "user", content: userContent },
          ],
          maxTokens: 32768,
          config: aiConfig,
        })) {
          completeResponse += chunk;

          if (!headFlushed) {
            // Accumulate in buffer until we can determine if there's a markdown fence
            headBuffer += chunk;
            // Strip leading markdown code fences: ```html\n, ```\n, ```html, etc.
            const stripped = headBuffer.replace(/^\s*```(?:html)?\s*\n?/, '');
            // Flush once we see the start of actual HTML (either < or we've seen enough)
            if (stripped.startsWith('<') || headBuffer.length > 50) {
              await writer.write(encoder.encode(stripped));
              headFlushed = true;
            }
          } else {
            // Sanitize trailing markdown fences from subsequent chunks
            const sanitized = chunk.replace(/\s*```\s*$/, '');
            if (sanitized.length > 0) {
              await writer.write(encoder.encode(sanitized));
            }
          }

          // Stop once we have a complete HTML document
          // Only break AFTER seeing </html> AND confirming no more meaningful content
          // (some models output </html> then continue with trailing whitespace/newlines)
          if (completeResponse.includes("</html>")) {
            // Continue reading a few more chunks to let the model finish naturally
            // Then break — but only if we have a complete document
            const afterClose = completeResponse.indexOf("</html>") + 7;
            const remaining = completeResponse.substring(afterClose).trim();
            // If what comes after </html> is just whitespace/newlines, stop
            if (remaining.length === 0 || /^\s*$/.test(remaining)) {
              break;
            }
          }
        }
      } catch (error: any) {
        await writer.write(
          encoder.encode(
            JSON.stringify({
              ok: false,
              message: error.message || "An error occurred while processing your request.",
            })
          )
        );
      } finally {
        await writer?.close();
      }
    })();

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        message: error?.message || "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/ask-ai — Follow-up edit using SEARCH/REPLACE diff patches.
 */
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { prompt, html, previousPrompt, selectedElementHtml, aiConfig } = body;

  if (!prompt || !html) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!aiConfig?.endpoint || !aiConfig?.model || !aiConfig?.apiKey) {
    return NextResponse.json(
      { ok: false, error: "AI not configured. Please set your endpoint, model, and API key in Settings." },
      { status: 400 }
    );
  }

  try {
    const chunk = await chatCompletion({
      messages: [
        { role: "system", content: FOLLOW_UP_SYSTEM_PROMPT },
        {
          role: "user",
          content: previousPrompt
            ? previousPrompt
            : "You are modifying the HTML file based on the user's request.",
        },
        {
          role: "assistant",
          content: `The current code is: \n\`\`\`html\n${html}\n\`\`\` ${
            selectedElementHtml
              ? `\n\nYou have to update ONLY the following element, NOTHING ELSE: \n\n\`\`\`html\n${selectedElementHtml}\n\`\`\``
              : ""
          }`,
        },
        { role: "user", content: prompt },
      ],
      maxTokens: 32768,
      config: aiConfig,
    });

    if (!chunk) {
      return NextResponse.json(
        { ok: false, message: "No content returned from the model" },
        { status: 400 }
      );
    }

    // Parse SEARCH/REPLACE blocks
    const updatedLines: number[][] = [];
    let newHtml = html;
    let position = 0;
    let moreBlocks = true;

    while (moreBlocks) {
      const searchStartIndex = chunk.indexOf(SEARCH_START, position);
      if (searchStartIndex === -1) {
        moreBlocks = false;
        continue;
      }

      const dividerIndex = chunk.indexOf(DIVIDER, searchStartIndex);
      if (dividerIndex === -1) {
        moreBlocks = false;
        continue;
      }

      const replaceEndIndex = chunk.indexOf(REPLACE_END, dividerIndex);
      if (replaceEndIndex === -1) {
        moreBlocks = false;
        continue;
      }

      const searchBlock = chunk.substring(
        searchStartIndex + SEARCH_START.length,
        dividerIndex
      );
      const replaceBlock = chunk.substring(
        dividerIndex + DIVIDER.length,
        replaceEndIndex
      );

      if (searchBlock.trim() === "") {
        newHtml = `${replaceBlock}\n${newHtml}`;
        updatedLines.push([1, replaceBlock.split("\n").length]);
      } else {
        const blockPosition = newHtml.indexOf(searchBlock);
        if (blockPosition !== -1) {
          const beforeText = newHtml.substring(0, blockPosition);
          const startLineNumber = beforeText.split("\n").length;
          const replaceLines = replaceBlock.split("\n").length;
          const endLineNumber = startLineNumber + replaceLines - 1;

          updatedLines.push([startLineNumber, endLineNumber]);
          newHtml = newHtml.replace(searchBlock, replaceBlock);
        }
      }

      position = replaceEndIndex + REPLACE_END.length;
    }

    return NextResponse.json({
      ok: true,
      html: newHtml,
      updatedLines,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        message: error.message || "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
