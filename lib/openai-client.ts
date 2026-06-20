/**
 * OpenAI-compatible chat completion client — CLIENT-SIDE ONLY.
 * All requests go through /api/proxy (Cloudflare Pages Function) to bypass CORS.
 */

import { getAIConfig, normalizeEndpoint, type AIConfig } from "./ai-config";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionOptions {
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
  config?: AIConfig;
  signal?: AbortSignal;
}

function resolveConfig(explicit?: AIConfig): AIConfig {
  const config = explicit ?? getAIConfig();
  if (!config) {
    throw new Error("AI not configured. Please set your endpoint, model, and API key in Settings.");
  }
  return config;
}

/**
 * Stream a chat completion via /api/proxy.
 * Returns an async generator that yields content chunks.
 */
export async function* streamChatCompletion(
  options: ChatCompletionOptions
): AsyncGenerator<string, void, unknown> {
  const config = resolveConfig(options.config);

  // Buffer to strip leading markdown code fences from AI output
  let headBuffer = "";
  let headFlushed = false;

  const response = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      endpoint: normalizeEndpoint(config.endpoint),
      apiKey: config.apiKey,
      model: config.model,
      messages: options.messages,
      max_tokens: options.maxTokens ?? 16384,
      temperature: options.temperature ?? 0.7,
      stream: true,
    }),
    signal: options.signal,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    let errorMessage = `AI request failed (${response.status})`;
    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error?.message || parsed.message || errorMessage;
    } catch {
      if (errorBody.length < 500) errorMessage += `: ${errorBody}`;
    }
    throw new Error(errorMessage);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("Failed to read streaming response");

  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // Flush remaining buffer if stream ends before head was flushed
      if (!headFlushed && headBuffer.length > 0) {
        yield headBuffer.replace(/^\s*```(?:html)?\s*\n?/, '');
      }
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data: ")) continue;

      const data = trimmed.slice(6);
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          // Strip leading markdown code fences (```html, ```, etc.)
          if (!headFlushed) {
            headBuffer += content;
            const stripped = headBuffer.replace(/^\s*```(?:html)?\s*\n?/, '');
            if (stripped.startsWith('<') || headBuffer.length > 50) {
              yield stripped;
              headFlushed = true;
            }
          } else {
            yield content;
          }
        }
      } catch {
        // Skip malformed JSON lines
      }
    }
  }
}

/**
 * Non-streaming chat completion via /api/proxy.
 */
export async function chatCompletion(
  options: ChatCompletionOptions
): Promise<string> {
  const config = resolveConfig(options.config);

  const response = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      endpoint: normalizeEndpoint(config.endpoint),
      apiKey: config.apiKey,
      model: config.model,
      messages: options.messages,
      max_tokens: options.maxTokens ?? 16384,
      temperature: options.temperature ?? 0.7,
      stream: false,
    }),
    signal: options.signal,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    let errorMessage = `AI request failed (${response.status})`;
    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error?.message || parsed.message || errorMessage;
    } catch {
      if (errorBody.length < 500) errorMessage += `: ${errorBody}`;
    }
    throw new Error(errorMessage);
  }

  const result = await response.json();
  return result.choices?.[0]?.message?.content ?? "";
}
