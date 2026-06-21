"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-neutral-900 flex items-center justify-center">
      <div className="text-neutral-500 text-sm">Loading editor...</div>
    </div>
  ),
});

interface EditElementDialogProps {
  open: boolean;
  onClose: () => void;
  elementHtml: string;
  onSave: (newHtml: string) => void;
  isAiWorking: boolean;
}

export function EditElementDialog({
  open,
  onClose,
  elementHtml,
  onSave,
  isAiWorking,
}: EditElementDialogProps) {
  const [editedHtml, setEditedHtml] = useState(elementHtml);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setEditedHtml(elementHtml);
    }
  }, [open, elementHtml]);

  const handleSave = () => {
    if (editedHtml.trim() === elementHtml.trim()) {
      onClose();
      return;
    }
    onSave(editedHtml);
    onClose();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedHtml);
      setCopied(true);
      toast.success("HTML copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="!rounded-2xl !w-[48rem] max-h-[85vh] overflow-hidden !bg-neutral-900 border-neutral-700 !p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-neutral-800">
          <DialogTitle className="flex items-center gap-2 text-neutral-200">
            <span className="size-7 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-400">
              🔧
            </span>
            Edit Element HTML
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm">
            Directly edit the HTML of this element. Changes are applied when you save.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="border border-neutral-700 rounded-xl overflow-hidden">
            <Editor
              defaultLanguage="html"
              theme="vs-dark"
              value={editedHtml}
              onChange={(value) => setEditedHtml(value ?? "")}
              options={{
                minimap: { enabled: false },
                wordWrap: "on",
                fontSize: 13,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
              }}
              height="350px"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 pb-6">
          <Button
            variant="outline"
            size="sm"
            className="!border-neutral-600 !text-neutral-300"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-3.5 mr-1.5" />
            ) : (
              <Copy className="size-3.5 mr-1.5" />
            )}
            {copied ? "Copied!" : "Copy HTML"}
          </Button>

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
              onClick={handleSave}
              disabled={isAiWorking || editedHtml.trim() === elementHtml.trim()}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
