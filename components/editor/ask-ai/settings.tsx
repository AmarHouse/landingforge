"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PiGearSixFill } from "react-icons/pi";
import { Eye, EyeOff, Globe, Cpu, KeyRound, TestTube } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAIConfig,
  setAIConfig,
  type AIConfig,
} from "@/lib/ai-config";

interface SettingsProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onConfigChange?: () => void;
}

export function Settings({ open, onClose, onConfigChange }: SettingsProps) {
  const [endpoint, setEndpoint] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);

  // Sync state from localStorage every time the popover opens
  useEffect(() => {
    if (!open) return;
    const existing = getAIConfig();
    if (existing) {
      setEndpoint(existing.endpoint);
      setModel(existing.model);
      setApiKey(existing.apiKey);
    } else {
      setEndpoint("");
      setModel("");
      setApiKey("");
    }
  }, [open]);

  const canSave = endpoint.trim() && model.trim() && apiKey.trim();

  const handleSave = () => {
    if (!canSave) return;

    const config: AIConfig = {
      endpoint: endpoint.trim().replace(/\/+$/, ""),
      model: model.trim(),
      apiKey: apiKey.trim(),
    };

    setAIConfig(config);
    toast.success("AI configuration saved!");
    onConfigChange?.();
    onClose(false);
  };

  const handleTest = async () => {
    if (!canSave) return;
    setTesting(true);

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: endpoint.trim(),
          apiKey: apiKey.trim(),
          model: model.trim(),
          messages: [{ role: "user", content: "Say 'ok'" }],
          max_tokens: 5,
          stream: false,
        }),
      });

      if (res.ok) {
        toast.success("Connection successful!");
      } else {
        let msg = `HTTP ${res.status}`;
        try {
          const parsed = await res.json();
          msg = parsed.error?.message || msg;
        } catch { /* use status */ }
        toast.error(`Connection failed: ${msg}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Connection failed: ${message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div>
      <Popover open={open} onOpenChange={onClose}>
        <PopoverTrigger asChild>
          <Button variant="black" size="sm">
            <PiGearSixFill className="size-4" />
            Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="!rounded-2xl p-0 !w-96 overflow-hidden !bg-neutral-900 !border-neutral-700"
          align="center"
        >
          <header className="flex items-center justify-center text-sm px-4 py-3 border-b gap-2 bg-neutral-950 border-neutral-800 font-semibold text-neutral-200">
            <PiGearSixFill className="size-4" />
            AI Provider Settings
          </header>
          <main className="px-4 pt-5 pb-6 space-y-4">
            {/* Endpoint */}
            <div className="space-y-1.5">
              <label className="text-neutral-300 text-sm flex items-center gap-1.5">
                <Globe className="size-3.5" />
                Endpoint URL
              </label>
              <Input
                placeholder="https://api.openai.com/v1"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="!bg-neutral-800 !border-neutral-600 !text-white !placeholder:text-neutral-500"
              />
              <p className="text-[11px] text-neutral-500">
                Examples:{" "}
                <button
                  type="button"
                  className="text-sky-400 hover:underline"
                  onClick={() => {
                    setEndpoint("https://api.openai.com/v1");
                    setModel("gpt-4o");
                  }}
                >
                  OpenAI
                </button>
                {" · "}
                <button
                  type="button"
                  className="text-sky-400 hover:underline"
                  onClick={() => {
                    setEndpoint("http://localhost:11434/v1");
                    setModel("llama3");
                  }}
                >
                  Ollama
                </button>
                {" · "}
                <button
                  type="button"
                  className="text-sky-400 hover:underline"
                  onClick={() => {
                    setEndpoint("http://localhost:1234/v1");
                    setModel("lm-studio");
                  }}
                >
                  LM Studio
                </button>
              </p>
            </div>

            {/* Model */}
            <div className="space-y-1.5">
              <label className="text-neutral-300 text-sm flex items-center gap-1.5">
                <Cpu className="size-3.5" />
                Model
              </label>
              <Input
                placeholder="gpt-4o"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="!bg-neutral-800 !border-neutral-600 !text-white !placeholder:text-neutral-500"
              />
            </div>

            {/* API Key */}
            <div className="space-y-1.5">
              <label className="text-neutral-300 text-sm flex items-center gap-1.5">
                <KeyRound className="size-3.5" />
                API Key
              </label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="!bg-neutral-800 !border-neutral-600 !text-white !placeholder:text-neutral-500 !pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-neutral-500">
                Stored locally in your browser only
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-700/50">
              <Button
                variant="outline"
                size="sm"
                disabled={!canSave || testing}
                onClick={handleTest}
                className="!border-neutral-600 !text-neutral-300"
              >
                <TestTube className="size-3.5 mr-1" />
                {testing ? "Testing..." : "Test"}
              </Button>
              <Button
                size="sm"
                disabled={!canSave}
                onClick={handleSave}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Save
              </Button>
            </div>
          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
