"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

interface EditPromptDialogProps {
  open: boolean;
  onClose: () => void;
  elementTag: string;
  elementText: string;
  isAiWorking: boolean;
  onSend: (prompt: string) => void;
}

export function EditPromptDialog({
  open,
  onClose,
  elementTag,
  elementText,
  isAiWorking,
  onSend,
}: EditPromptDialogProps) {
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (!prompt.trim()) return;
    onSend(prompt);
    setPrompt("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="!rounded-2xl !w-[32rem] !bg-neutral-900 border-neutral-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-neutral-200">
            <span className="size-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
              ✏️
            </span>
            Edit with AI
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm">
            Describe how you want to modify this{" "}
            <code className="text-sky-400 bg-sky-500/10 px-1 rounded">
              &lt;{elementTag}&gt;
            </code>{" "}
            element.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Element preview */}
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-3 max-h-24 overflow-y-auto">
            <p className="text-xs text-neutral-500 mb-1">Current element:</p>
            <p className="text-xs text-neutral-300 line-clamp-3">
              {elementText || "(empty element)"}
            </p>
          </div>

          {/* Prompt input */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g. "Change the color to blue", "Add a subtitle", "Make it larger"...'
              className="w-full bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 p-3 rounded-xl resize-none min-h-[80px] outline-none focus:border-sky-500/50 transition-colors"
              rows={3}
              disabled={isAiWorking}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-neutral-500">
            Press Enter to send, Shift+Enter for new line
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="!border-neutral-600 !text-neutral-300"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSend}
              disabled={isAiWorking || !prompt.trim()}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              {isAiWorking ? (
                <>
                  <Loading overlay={false} className="!size-3.5 mr-1.5" />
                  Working...
                </>
              ) : (
                <>
                  <ArrowUp className="size-3.5 mr-1" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
