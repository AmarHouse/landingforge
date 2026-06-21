/**
 * Next.js API Route — CORS Proxy
 * Mirrors the Cloudflare Pages Function in functions/api/proxy.ts
 * Forwards requests from the browser to any OpenAI-compatible API endpoint.
 */

import { NextResponse } from "next/server";

interface ProxyRequest {
  endpoint: string;
  apiKey: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export async function POST(request: Request) {
  try {
    const body: ProxyRequest = await request.json();
    const { endpoint, apiKey, model, messages, max_tokens, temperature, stream } = body;

    if (!endpoint || !apiKey || !model || !messages) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedEndpoint = endpoint.replace(/\/+$/, "");
    const response = await fetch(`${normalizedEndpoint}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: max_tokens ?? 16384,
        temperature: temperature ?? 0.7,
        stream: stream ?? false,
      }),
    });

    // Return the response directly — streams through without buffering
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
