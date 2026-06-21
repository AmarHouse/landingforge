"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import { Pencil, Code, RefreshCw, X } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export type InlineAction = "edit-prompt" | "edit-html" | "regenerate";

interface InlineToolbarProps {
  /** Bounding rect of the selected element relative to the viewport */
  targetRect: DOMRect;
  /** Whether AI is currently working */
  isAiWorking: boolean;
  /** Callback when an action is selected */
  onAction: (action: InlineAction) => void;
  /** Callback to dismiss the toolbar */
  onDismiss: () => void;
}

export function InlineToolbar({
  targetRect,
  isAiWorking,
  onAction,
  onDismiss,
}: InlineToolbarProps) {
  const [hoveredAction, setHoveredAction] = useState<InlineAction | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Position the toolbar above the target element, centered horizontally
  const toolbarStyle = {
    position: "fixed" as const,
    top: targetRect.top - 48,
    left: targetRect.left + targetRect.width / 2,
    transform: "translateX(-50%)",
    zIndex: 50,
  };

  // Clamp so toolbar doesn't go off-screen
  if (toolbarStyle.top < 8) {
    toolbarStyle.top = targetRect.bottom + 8;
  }

  const actions: {
    action: InlineAction;
    icon: React.ReactNode;
    label: string;
    description: string;
  }[] = [
    {
      action: "edit-prompt",
      icon: <Pencil className="size-3.5" />,
      label: "Edit with AI",
      description: "Tell AI how to modify this element",
    },
    {
      action: "edit-html",
      icon: <Code className="size-3.5" />,
      label: "Edit HTML",
      description: "Directly edit the element's HTML code",
    },
    {
      action: "regenerate",
      icon: <RefreshCw className="size-3.5" />,
      label: "Regenerate",
      description: "Generate a new variation of this element",
    },
  ];

  return (
    <div style={toolbarStyle} className={classNames("pointer-events-auto transition-opacity duration-150", { "opacity-100": mounted, "opacity-0": !mounted })}>
      <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-1 backdrop-blur-sm">
        {actions.map(({ action, icon, label, description }) => (
          <Tooltip key={action}>
            <TooltipTrigger asChild>
              <button
                disabled={isAiWorking}
                className={classNames(
                  "flex items-center justify-center size-8 rounded-lg transition-all duration-150",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  hoveredAction === action
                    ? "bg-sky-500/20 text-sky-400"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                )}
                onMouseEnter={() => setHoveredAction(action)}
                onMouseLeave={() => setHoveredAction(null)}
                onClick={() => onAction(action)}
              >
                {icon}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-neutral-950 text-xs text-neutral-200 py-1.5 px-2.5 rounded-lg border border-neutral-700"
            >
              <p className="font-medium">{label}</p>
              <p className="text-neutral-400 text-[11px] mt-0.5">{description}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Separator */}
        <div className="w-px h-5 bg-neutral-700 mx-0.5" />

        {/* Dismiss button */}
        <button
          className="flex items-center justify-center size-8 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-all duration-150"
          onClick={onDismiss}
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
