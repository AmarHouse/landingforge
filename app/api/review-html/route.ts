/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { REVIEW_SYSTEM_PROMPT } from "@/lib/prompts";
import { chatCompletion } from "@/lib/openai-client";
import { injectModernCSSFallback } from "@/lib/style-modern-css";
import { fixTruncatedHtml } from "@/lib/fix-html";

/**
 * POST /api/review-html — Review and fix generated HTML.
 * Takes the raw HTML from the first generation pass and returns a corrected version.
 * This is a non-streaming call (second pass after initial generation).
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { html, aiConfig } = body;

  if (!html) {
    return NextResponse.json(
      { ok: false, error: "Missing html content" },
      { status: 400 }
    );
  }

  if (!aiConfig?.endpoint || !aiConfig?.model || !aiConfig?.apiKey) {
    return NextResponse.json(
      { ok: false, error: "AI not configured. Please set your endpoint, model, and API key in Settings." },
      { status: 400 }
    );
  }

  // Fix truncated HTML first (close unclosed tags from token limit)
  const fixedHtml = fixTruncatedHtml(html);

  // Quick validation: check if HTML has critical issues that need AI review
  // Use fixedHtml so truncation fixes (like closed </html>) don't trigger unnecessary AI review
  const needsAiReview =
    !fixedHtml.includes("<!DOCTYPE html>") ||
    !fixedHtml.includes("</html>") ||
    !fixedHtml.includes("<meta name=\"description\"") ||
    !fixedHtml.includes("<meta property=\"og:title\"") ||
    (fixedHtml.includes("opacity: 0") && !fixedHtml.includes("animation-timeline")) ||
    (fixedHtml.includes('fade-in') && !fixedHtml.includes('animation-timeline') && !fixedHtml.includes('IntersectionObserver'));

  // Always inject CSS fallback for modern techniques (cheap, no API cost)
  const processedHtml = injectModernCSSFallback(fixedHtml);

  if (!needsAiReview) {
    return NextResponse.json({
      ok: true,
      html: processedHtml,
      reviewed: true,
      message: "CSS fallback injected. No AI review needed.",
    });
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
      config: aiConfig,
    });

    if (!chunk) {
      return NextResponse.json(
        { ok: false, message: "No content returned from the review" },
        { status: 400 }
      );
    }

    // Clean up the reviewed HTML: strip markdown fences if present
    let reviewedHtml = chunk
      .replace(/^\s*```(?:html)?\s*\n?/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    // Ensure it starts with DOCTYPE
    if (!reviewedHtml.toUpperCase().startsWith("<!DOCTYPE")) {
      reviewedHtml = `<!DOCTYPE html>\n${reviewedHtml}`;
    }

    // Ensure it ends with </html>
    if (!reviewedHtml.includes("</html>")) {
      reviewedHtml = `${reviewedHtml}\n</body>\n</html>`;
    }

    // Apply CSS fallback on the AI-reviewed HTML too
    reviewedHtml = injectModernCSSFallback(reviewedHtml);

    return NextResponse.json({
      ok: true,
      html: reviewedHtml,
      reviewed: true,
      message: "HTML reviewed by AI and modern CSS injected.",
    });
  } catch (error: any) {
    // If review fails, still inject CSS fallback on the original
    console.error("Review failed:", error.message);
    return NextResponse.json({
      ok: true,
      html: processedHtml,
      reviewed: false,
      message: `AI review failed (${error.message}), but CSS fallback was injected.`,
    });
  }
}
