import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * POST /api/test-connection — Test the AI provider connection server-side.
 * This bypasses CORS restrictions that block direct browser requests.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { endpoint, model, apiKey } = body;

  if (!endpoint || !model || !apiKey) {
    return NextResponse.json(
      { ok: false, error: "Missing endpoint, model, or apiKey" },
      { status: 400 }
    );
  }

  const normalizedEndpoint = endpoint.trim().replace(/\/+$/, "");

  try {
    const res = await fetch(`${normalizedEndpoint}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: model.trim(),
        messages: [{ role: "user", content: "Say 'ok'" }],
        max_tokens: 5,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    } else {
      const text = await res.text().catch(() => "");
      let msg = `HTTP ${res.status}`;
      try {
        const parsed = JSON.parse(text);
        msg = parsed.error?.message || msg;
      } catch {
        /* use status */
      }
      return NextResponse.json({ ok: false, error: msg });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message });
  }
}
