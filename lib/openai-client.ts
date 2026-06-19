/**
 * OpenAI-compatible streaming chat completion client.
 * Works with any endpoint that follows the OpenAI /v1/chat/completions format:
 *   - OpenAI, Azure, together.ai, Groq, Ollama, LM Studio, vLLM, etc.
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
  config?: AIConfig; // server-side: pass config explicitly
}

/**
 * Resolve AI config: use explicit config if provided (server-side),
 * otherwise read from localStorage (client-side).
 */
function resolveConfig(explicit?: AIConfig): AIConfig {
  const config = explicit ?? getAIConfig();
  if (!config) {
    throw new Error("AI not configured. Please set your endpoint, model, and API key in Settings.");
  }
  return config;
}

/**
 * Stream a chat completion from the user-configured endpoint.
 * Returns an async generator that yields content chunks.
 */
export async function* streamChatCompletion(
  options: ChatCompletionOptions
): AsyncGenerator<string, void, unknown> {
  const config = resolveConfig(options.config);

  const endpoint = normalizeEndpoint(config.endpoint);
  const url = `${endpoint}/chat/completions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: options.messages,
      max_tokens: options.maxTokens ?? 16384,
      temperature: options.temperature ?? 0.7,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    let errorMessage = `AI request failed (${response.status})`;

    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error?.message || parsed.message || errorMessage;
    } catch {
      if (errorBody.length < 500) {
        errorMessage += `: ${errorBody}`;
      }
    }

    throw new Error(errorMessage);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Failed to read streaming response");
  }

  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

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
          yield content;
        }
      } catch {
        // Skip malformed JSON lines
      }
    }
  }
}

/**
 * Non-streaming chat completion. Returns the full content string.
 */
export async function chatCompletion(
  options: ChatCompletionOptions
): Promise<string> {
  const config = resolveConfig(options.config);

  const endpoint = normalizeEndpoint(config.endpoint);
  const url = `${endpoint}/chat/completions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: options.messages,
      max_tokens: options.maxTokens ?? 16384,
      temperature: options.temperature ?? 0.7,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    let errorMessage = `AI request failed (${response.status})`;

    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error?.message || parsed.message || errorMessage;
    } catch {
      if (errorBody.length < 500) {
        errorMessage += `: ${errorBody}`;
      }
    }

    throw new Error(errorMessage);
  }

  const result = await response.json();
  return result.choices?.[0]?.message?.content ?? "";
}
