"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Cpu, KeyRound, Globe, TestTube } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAIConfig, setAIConfig, type AIConfig } from "@/lib/ai-config";

interface AISetupModalProps {
  open: boolean;
  onClose: () => void;
}

export function AISetupModal({ open, onClose }: AISetupModalProps) {
  const existing = getAIConfig();

  const [endpoint, setEndpoint] = useState(existing?.endpoint ?? "");
  const [model, setModel] = useState(existing?.model ?? "");
  const [apiKey, setApiKey] = useState(existing?.apiKey ?? "");
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);

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
    onClose();
  };

  const handleTest = async () => {
    if (!canSave) return;
    setTesting(true);

    try {
      const res = await fetch("/api/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: endpoint.trim(),
          model: model.trim(),
          apiKey: apiKey.trim(),
        }),
      });

      const data = await res.json();
      if (data.ok) {
        toast.success("Connection successful!");
      } else {
        toast.error(`Connection failed: ${data.error || "Unknown error"}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Connection failed: ${message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="!rounded-2xl !bg-neutral-900 !border-neutral-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Cpu className="size-5 text-sky-400" />
            Configure AI Provider
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter your OpenAI-compatible API credentials. Works with OpenAI,
            Ollama, LM Studio, vLLM, together.ai, Groq, and more.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Endpoint */}
          <div className="space-y-1.5">
            <label className="text-sm text-neutral-300 flex items-center gap-1.5">
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
                Ollama (local)
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
            <label className="text-sm text-neutral-300 flex items-center gap-1.5">
              <Cpu className="size-3.5" />
              Model
            </label>
            <Input
              placeholder="gpt-4o"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="!bg-neutral-800 !border-neutral-600 !text-white !placeholder:text-neutral-500"
            />
            <p className="text-[11px] text-neutral-500">
              The model name to send in API requests
            </p>
          </div>

          {/* API Key */}
          <div className="space-y-1.5">
            <label className="text-sm text-neutral-300 flex items-center gap-1.5">
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
              Stored locally in your browser — never sent to any third party
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-700">
          <Button
            variant="outline"
            size="sm"
            disabled={!canSave || testing}
            onClick={handleTest}
            className="!border-neutral-600 !text-neutral-300"
          >
            <TestTube className="size-3.5 mr-1" />
            {testing ? "Testing..." : "Test Connection"}
          </Button>

          <div className="flex items-center gap-2">
            {existing && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button
              size="sm"
              disabled={!canSave}
              onClick={handleSave}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
