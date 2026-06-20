/**
 * Cloudflare Pages Function — CORS Proxy
 * Forwards requests from the browser to any OpenAI-compatible API endpoint.
 * This is the ONLY server-side code in the entire app (~30 lines).
 */
export interface Env {}

interface ProxyRequest {
  endpoint: string;
  apiKey: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as ProxyRequest;
    const { endpoint, apiKey, model, messages, max_tokens, temperature, stream } = body;

    if (!endpoint || !apiKey || !model || !messages) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
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
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
