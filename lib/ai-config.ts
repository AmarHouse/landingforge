/**
 * AI Configuration Manager
 * Stores and retrieves the user's AI provider settings via localStorage.
 */

export interface AIConfig {
  endpoint: string;  // e.g. "https://api.openai.com/v1" or "http://localhost:11434/v1"
  model: string;     // e.g. "gpt-4o", "deepseek-chat", "llama3"
  apiKey: string;    // API key for authentication
}

const STORAGE_KEY = "landingforge_ai_config";

/**
 * Get the stored AI configuration. Returns null if not configured.
 */
export function getAIConfig(): AIConfig | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const config = JSON.parse(raw) as AIConfig;
    if (config.endpoint && config.model && config.apiKey) {
      return config;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Save the AI configuration to localStorage.
 */
export function setAIConfig(config: AIConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/**
 * Check if the AI is configured (all fields present and non-empty).
 */
export function hasAIConfig(): boolean {
  return getAIConfig() !== null;
}

/**
 * Clear the AI configuration.
 */
export function clearAIConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Normalize an endpoint URL by stripping trailing slashes.
 */
export function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/\/+$/, "");
}
