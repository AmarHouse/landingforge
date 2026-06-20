/**
 * Client-side HTML processing — moved from API routes.
 * Pure string manipulation, no server needed.
 */

import { chatCompletion, type ChatMessage } from "./openai-client";
import { fixTruncatedHtml } from "./fix-html";
import { injectModernCSSFallback } from "./style-modern-css";
import { REVIEW_SYSTEM_PROMPT, FOLLOW_UP_SYSTEM_PROMPT, BRIEFING_SYSTEM_PROMPT, SEARCH_START, DIVIDER, REPLACE_END } from "./prompts";

/**
 * Apply SEARCH/REPLACE patches from AI response to HTML.
 * Moved from app/api/ask-ai/route.ts PUT handler.
 */
export function applySearchReplace(
  chunk: string,
  html: string
): { html: string; updatedLines: number[][] } {
  const updatedLines: number[][] = [];
  let newHtml = html;
  let position = 0;
  let moreBlocks = true;

  while (moreBlocks) {
    const searchStartIndex = chunk.indexOf(SEARCH_START, position);
    if (searchStartIndex === -1) { moreBlocks = false; continue; }

    const dividerIndex = chunk.indexOf(DIVIDER, searchStartIndex);
    if (dividerIndex === -1) { moreBlocks = false; continue; }

    const replaceEndIndex = chunk.indexOf(REPLACE_END, dividerIndex);
    if (replaceEndIndex === -1) { moreBlocks = false; continue; }

    const searchBlock = chunk.substring(searchStartIndex + SEARCH_START.length, dividerIndex);
    const replaceBlock = chunk.substring(dividerIndex + DIVIDER.length, replaceEndIndex);

    if (searchBlock.trim() === "") {
      newHtml = `${replaceBlock}\n${newHtml}`;
      updatedLines.push([1, replaceBlock.split("\n").length]);
    } else {
      const blockPosition = newHtml.indexOf(searchBlock);
      if (blockPosition !== -1) {
        const beforeText = newHtml.substring(0, blockPosition);
        const startLineNumber = beforeText.split("\n").length;
        const replaceLines = replaceBlock.split("\n").length;
        updatedLines.push([startLineNumber, startLineNumber + replaceLines - 1]);
        newHtml = newHtml.replace(searchBlock, replaceBlock);
      }
    }

    position = replaceEndIndex + REPLACE_END.length;
  }

  return { html: newHtml, updatedLines };
}

/**
 * Follow-up edit via SEARCH/REPLACE diff patches.
 * Moved from app/api/ask-ai/route.ts PUT handler.
 */
export async function followUpEdit(
  prompt: string,
  html: string,
  previousPrompt: string,
  selectedElementHtml: string
): Promise<{ html: string; updatedLines: number[][] }> {
  const messages: ChatMessage[] = [
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
  ];

  const chunk = await chatCompletion({ messages, maxTokens: 32768 });

  if (!chunk) {
    throw new Error("No content returned from the model");
  }

  return applySearchReplace(chunk, html);
}

/**
 * Review and fix generated HTML — client-side.
 * Moved from app/api/review-html/route.ts POST handler.
 */
export interface BriefingResult {
  title: string;
  description: string;
  keywords: string;
  industry: string;
  colorScheme: { primary: string; secondary: string; accent: string; background: string; text: string };
  typography: { headingFont: string; bodyFont: string; googleFontsUrl: string };
  sections: Array<{ id: string; title: string; content: string; pexelsIds: number[] }>;
  tone: string;
  ctaText: string;
  ctaColor: string;
}

/**
 * Generate a structured briefing before HTML generation.
 * This is the first pass of multi-pass generation.
 */
export async function generateBriefing(userPrompt: string): Promise<BriefingResult> {
  const chunk = await chatCompletion({
    messages: [
      { role: "system", content: BRIEFING_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    maxTokens: 4096,
  });

  if (!chunk) {
    throw new Error("No briefing returned from the model");
  }

  // Parse JSON response, strip markdown fences if present
  const cleaned = chunk.replace(/^\s*```(?:json)?\s*\n?/i, "").replace(/\s*```\s*$/, "").trim();
  return JSON.parse(cleaned) as BriefingResult;
}

export async function reviewHtml(html: string): Promise<string> {
  // Fix truncated HTML first
  const fixedHtml = fixTruncatedHtml(html);

  // Quick validation: check if HTML has critical issues that need AI review
  const needsAiReview =
    !fixedHtml.includes("<!DOCTYPE html>") ||
    !fixedHtml.includes("</html>") ||
    !fixedHtml.includes('<meta name="description"') ||
    !fixedHtml.includes('<meta property="og:title"') ||
    (fixedHtml.includes("opacity: 0") && !fixedHtml.includes("animation-timeline")) ||
    (fixedHtml.includes("fade-in") && !fixedHtml.includes("animation-timeline") && !fixedHtml.includes("IntersectionObserver"));

  // Always inject CSS fallback (cheap, no API cost)
  const processedHtml = injectModernCSSFallback(fixedHtml);

  if (!needsAiReview) {
    return processedHtml;
  }

  try {
    const chunk = await chatCompletion({
      messages: [
        { role: "system", content: REVIEW_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Review and fix this HTML landing page. Return the COMPLETE corrected HTML file.\n\n\`\`\`html\n${fixedHtml}\n\`\`\``,
        },
      ],
      maxTokens: 32768,
    });

    if (!chunk) return processedHtml;

    // Clean up the reviewed HTML
    let reviewedHtml = chunk
      .replace(/^\s*```(?:html)?\s*\n?/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    if (!reviewedHtml.toUpperCase().startsWith("<!DOCTYPE")) {
      reviewedHtml = `<!DOCTYPE html>\n${reviewedHtml}`;
    }
    if (!reviewedHtml.includes("</html>")) {
      reviewedHtml = `${reviewedHtml}\n</body>\n</html>`;
    }

    return injectModernCSSFallback(reviewedHtml);
  } catch {
    // If review fails, still return the CSS-injected version
    return processedHtml;
  }
}
