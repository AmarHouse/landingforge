"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import classNames from "classnames";
import { toast } from "sonner";
import { useLocalStorage, useUpdateEffect } from "react-use";
import { ArrowUp, ChevronDown, Crosshair, Settings } from "lucide-react";
import { FaStopCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { HtmlHistory } from "@/types";
import { ReImagine } from "@/components/editor/ask-ai/re-imagine";
import Loading from "@/components/loading";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { SelectedHtmlElement } from "./selected-html-element";
import { FollowUpTooltip } from "./follow-up-tooltip";
import { isTheSameHtml } from "@/lib/compare-html-diff";

import { getStyleById } from "@/lib/design-styles";
import { StyleSelector } from "./style-selector";
import { PromptHistory } from "./prompt-history";
import { SiteHistory } from "./site-history";
import { savePromptToHistory, saveSiteToHistory } from "@/lib/prompt-history";
import { Settings as AiSettings } from "./settings";
import { hasAIConfig } from "@/lib/ai-config";
import { streamChatCompletion } from "@/lib/openai-client";
import { followUpEdit, reviewHtml } from "@/lib/client-processing";
import { getSystemPrompt } from "@/lib/prompts";

export function AskAI({
  html,
  setHtml,
  onScrollToBottom,
  isAiWorking,
  setisAiWorking,
  isEditableModeEnabled = false,
  selectedElement,
  setSelectedElement,
  setIsEditableModeEnabled,
  onNewPrompt,
  onSuccess,
}: {
  html: string;
  setHtml: (html: string) => void;
  onScrollToBottom: () => void;
  isAiWorking: boolean;
  onNewPrompt: (prompt: string) => void;
  htmlHistory?: HtmlHistory[];
  setisAiWorking: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: (h: string, p: string, n?: number[][]) => void;
  isEditableModeEnabled: boolean;
  setIsEditableModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  selectedElement?: HTMLElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) {
  const refThink = useRef<HTMLDivElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  const [prompt, setPrompt] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [promptMode] = useLocalStorage<'classic' | 'enhanced'>("promptMode_v2", "enhanced");
  const [sectionMode] = useLocalStorage("sectionMode", true);
  const [openSettings, setOpenSettings] = useState(false);
  const [think, setThink] = useState<string | undefined>(undefined);
  const [openThink, setOpenThink] = useState(false);
  const [isThinking, setIsThinking] = useState(true);
  const controllerRef = useRef<AbortController | null>(null);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [selectedStyle, setSelectedStyle] = useLocalStorage("designStyle", "default");
  const [showHistory, setShowHistory] = useState(false);
  const [isManuallyResized, setIsManuallyResized] = useState(false);

  const lastRenderTimeRef = useRef(0);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "h" && !isAiWorking) {
        e.preventDefault();
        setShowHistory(!showHistory);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAiWorking, showHistory]);

  const callAi = async (redesignMarkdown?: string) => {
    if (isAiWorking) return;
    if (!redesignMarkdown && !prompt.trim()) return;

    // Check if AI is configured
    if (!hasAIConfig()) {
      toast.error("Please configure your AI provider in Settings first.");
      setOpenSettings(true);
      return;
    }

    setisAiWorking(true);
    setThink("");
    setOpenThink(false);
    setIsThinking(true);

    // Enhance prompt with style
    const selectedStyleConfig = getStyleById(selectedStyle as string);
    const enhancedPrompt =
      selectedStyleConfig && selectedStyleConfig.id !== "default"
        ? `${prompt}\n\nSTYLE REQUIREMENT: ${selectedStyleConfig.prompt}`
        : prompt;

    let contentResponse = "";
    let thinkResponse = "";

    try {
      onNewPrompt(prompt);
      if (isFollowUp && !redesignMarkdown && !isSameHtml) {
        const selectedElementHtml = selectedElement
          ? selectedElement.outerHTML
          : "";
        const result = await followUpEdit(
          enhancedPrompt,
          html,
          previousPrompt,
          selectedElementHtml
        );
        setHtml(result.html);
        toast.success("AI responded successfully");

        savePromptToHistory({
          prompt: enhancedPrompt,
          style: selectedStyle as string,
          mode: "classic",
          provider: "api",
          model: "local",
          isFollowUp: true,
          originalPrompt: previousPrompt,
        });

        saveSiteToHistory({
          prompt,
          html: result.html,
          style: selectedStyle as string,
          mode: "classic",
          provider: "api",
          model: "local",
          isFollowUp: true,
        });

        setPreviousPrompt(prompt);
        setPrompt("");
        setisAiWorking(false);
        onSuccess(result.html, prompt, result.updatedLines);
        if (audio.current) audio.current.play();
      } else {
        const userContent = redesignMarkdown
          ? `Here is my current design as a markdown:\n\n${redesignMarkdown}\n\nNow, please create a new design based on this markdown.`
          : (isSameHtml ? "" : html)
            ? `Here is my current HTML code:\n\n\`\`\`html\n${isSameHtml ? "" : html}\n\`\`\`\n\nNow, please create a new design based on this HTML.`
            : enhancedPrompt;

        const abortController = new AbortController();
        controllerRef.current = abortController;
        const stream = streamChatCompletion({
          messages: [
            { role: "system", content: getSystemPrompt(promptMode as "classic" | "enhanced", sectionMode as boolean, enhancedPrompt) },
            { role: "user", content: userContent },
          ],
          maxTokens: 32768,
          signal: abortController.signal,
        });

        let contentThink = "";

        for await (const chunk of stream) {
          thinkResponse += chunk;

          const thinkMatch = thinkResponse.match(/<think>[\s\S]*/)?.[0];
          if (thinkMatch && !thinkResponse?.includes("</think>")) {
            if (contentThink.length < 3) {
              setOpenThink(true);
            }
            setThink(thinkMatch.replace("<think>", "").trim());
            contentThink += chunk;
            continue;
          }

          contentResponse += chunk;

          const newHtml = contentResponse.match(
            /<!DOCTYPE html>[\s\S]*/
          )?.[0];
          if (newHtml) {
            setIsThinking(false);
            let partialDoc = newHtml;
            if (partialDoc.includes("<head>") && !partialDoc.includes("</head>")) {
              partialDoc += "\n</head>";
            }
            if (partialDoc.includes("<body") && !partialDoc.includes("</body>")) {
              partialDoc += "\n</body>";
            }
            if (!partialDoc.includes("</html>")) {
              partialDoc += "\n</html>";
            }

            const now = performance.now();
            if (now - lastRenderTimeRef.current > 300) {
              setHtml(partialDoc);
              lastRenderTimeRef.current = now;
            }

            if (partialDoc.length > 200) {
              onScrollToBottom();
            }
          }
        }

        // Stream finished
        const isJson =
          contentResponse.trim().startsWith("{") &&
          contentResponse.trim().endsWith("}");
        const jsonResponse = isJson ? JSON.parse(contentResponse) : null;
        if (jsonResponse && !jsonResponse.ok) {
          toast.error(jsonResponse.message || "Request failed");
          setisAiWorking(false);
          return;
        }

        toast.success("AI responded successfully");

        savePromptToHistory({
          prompt: redesignMarkdown
            ? `Redesign: ${redesignMarkdown}`
            : enhancedPrompt,
          style: selectedStyle as string,
          mode: promptMode as "classic" | "enhanced",
          provider: "api",
          model: "local",
          isFollowUp: false,
        });

        const finalDoc = contentResponse.match(
          /<!DOCTYPE html>[\s\S]*<\/html>/
        )?.[0];

        saveSiteToHistory({
          prompt: redesignMarkdown
            ? `Redesign: ${redesignMarkdown}`
            : prompt,
          html: finalDoc ?? contentResponse,
          style: selectedStyle as string,
          mode: promptMode as "classic" | "enhanced",
          provider: "api",
          model: "local",
          isFollowUp: false,
        });

        setPreviousPrompt(prompt);
        setPrompt("");
        setHasAsked(true);
        if (audio.current) audio.current.play();

        // Client-side review: fix HTML issues + inject modern CSS
        const rawHtml = finalDoc ?? contentResponse;
        try {
          toast.info("Reviewing and fixing generated HTML...");
          const reviewedHtml = await reviewHtml(rawHtml);
          setHtml(reviewedHtml);
          toast.success("HTML reviewed and corrected!");
          onSuccess(reviewedHtml, prompt);
        } catch {
          setHtml(rawHtml);
          onSuccess(rawHtml, prompt);
        } finally {
          setisAiWorking(false);
        }
      }
      controllerRef.current = null;
    } catch (error: unknown) {
      controllerRef.current = null;
      setisAiWorking(false);
      setIsThinking(false);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const stopController = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
      setisAiWorking(false);
      setThink("");
      setOpenThink(false);
      setIsThinking(false);
    }
  };

  useUpdateEffect(() => {
    if (refThink.current) {
      refThink.current.scrollTop = refThink.current.scrollHeight;
    }
  }, [think]);

  useUpdateEffect(() => {
    if (!isThinking) {
      setOpenThink(false);
    }
  }, [isThinking]);

  const isSameHtml = useMemo(() => {
    return isTheSameHtml(html);
  }, [html]);

  const handleSelectSite = (siteHtml: string, sitePrompt: string) => {
    setHtml(siteHtml);
    setPrompt(sitePrompt);
    setPreviousPrompt(sitePrompt);
    toast.success("Site loaded from history");
  };

  const handleSelectPromptOnly = (sitePrompt: string) => {
    setPrompt(sitePrompt);
  };

  return (
    <div className="px-3">
      <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-full group">
        {think && (
          <div className="w-full border-b border-neutral-700 relative overflow-hidden">
            <header
              className="flex items-center justify-between px-5 py-2.5 group hover:bg-neutral-600/20 transition-colors duration-200 cursor-pointer"
              onClick={() => setOpenThink(!openThink)}
            >
              <p className="text-sm font-medium text-neutral-300 group-hover:text-neutral-200 transition-colors duration-200">
                {isThinking ? "AI is thinking..." : "AI's plan"}
              </p>
              <ChevronDown
                className={classNames(
                  "size-4 text-neutral-400 group-hover:text-neutral-300 transition-all duration-200",
                  { "rotate-180": openThink }
                )}
              />
            </header>
            <main
              ref={refThink}
              className={classNames(
                "overflow-y-auto transition-all duration-200 ease-in-out",
                {
                  "max-h-[0px]": !openThink,
                  "min-h-[250px] max-h-[250px] border-t border-neutral-700":
                    openThink,
                }
              )}
            >
              <p className="text-[13px] text-neutral-400 whitespace-pre-line px-5 pb-4 pt-3">
                {think}
              </p>
            </main>
          </div>
        )}
        {selectedElement && (
          <div className="px-4 pt-3">
            <SelectedHtmlElement
              element={selectedElement}
              isAiWorking={isAiWorking}
              onDelete={() => setSelectedElement(null)}
            />
          </div>
        )}
        <div className="w-full relative">
          <div
            className={`w-full h-1 transition-all duration-200 relative group cursor-row-resize ${
              isManuallyResized
                ? "bg-gradient-to-r from-orange-500/40 to-red-500/40 hover:from-orange-500/60 hover:to-red-500/60"
                : "bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/50 hover:to-purple-500/50"
            }`}
            title="Drag to resize. Double-click to reset."
            onDoubleClick={() => {
              setIsManuallyResized(false);
              const textarea = document.querySelector("textarea");
              if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height =
                  Math.min(textarea.scrollHeight, window.innerHeight / 2) + "px";
              }
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const startY = e.clientY;
              const textarea =
                e.currentTarget.parentElement?.querySelector("textarea");
              const startHeight = textarea
                ? parseInt(getComputedStyle(textarea).height)
                : 52;

              const handleMouseMove = (e: MouseEvent) => {
                if (textarea) {
                  const deltaY = startY - e.clientY;
                  const newHeight = Math.max(
                    52,
                    Math.min(window.innerHeight / 2, startHeight + deltaY)
                  );
                  textarea.style.height = `${newHeight}px`;
                  setIsManuallyResized(true);
                }
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                document.body.style.cursor = "";
                document.body.style.userSelect = "";
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
              document.body.style.cursor = "row-resize";
              document.body.style.userSelect = "none";
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white/50 rounded-full" />
                <div className="w-1 h-1 bg-white/50 rounded-full" />
                <div className="w-1 h-1 bg-white/50 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {isAiWorking && (
              <div className="absolute bg-neutral-800 rounded-lg bottom-0 left-4 w-[calc(100%-30px)] h-full z-1 flex items-center justify-between max-lg:text-sm">
                <div className="flex items-center justify-start gap-2">
                  <Loading overlay={false} className="!size-4" />
                  <p className="text-neutral-400 text-sm">
                    AI is {isThinking ? "thinking" : "coding"}...{" "}
                  </p>
                </div>
                <div
                  className="text-xs text-neutral-400 px-1 py-0.5 rounded-md border border-neutral-600 flex items-center justify-center gap-1.5 bg-neutral-800 hover:brightness-110 transition-all duration-200 cursor-pointer"
                  onClick={stopController}
                >
                  <FaStopCircle />
                  Stop generation
                </div>
              </div>
            )}
            <textarea
              disabled={isAiWorking}
              className={classNames(
                "w-full bg-transparent text-sm outline-none text-white placeholder:text-neutral-400 p-4 resize-none min-h-[52px] overflow-y-auto",
                { "!pt-2.5": selectedElement && !isAiWorking }
              )}
              placeholder={
                selectedElement
                  ? `Ask AI about ${selectedElement.tagName.toLowerCase()}... (Shift+Enter for new line)`
                  : hasAsked
                    ? "Ask AI for edits (Shift+Enter for new line)"
                    : "Describe your website idea... (Shift+Enter for new line)"
              }
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (!isManuallyResized) {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, window.innerHeight / 2) +
                    "px";
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  callAi();
                }
              }}
              rows={1}
              style={{ height: "52px" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 px-4 pb-3">
          <div className="flex-1 flex items-center justify-start gap-1.5">
            <ReImagine onRedesign={(md) => callAi(md)} />
            <PromptHistory
              onSelectPrompt={setPrompt}
              disabled={isAiWorking}
              currentStyle={selectedStyle as string}
            />
            <SiteHistory
              onSelectSite={handleSelectSite}
              onSelectPrompt={handleSelectPromptOnly}
              disabled={isAiWorking}
              currentStyle={selectedStyle as string}
            />
            {!isSameHtml && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="xs"
                    variant={isEditableModeEnabled ? "default" : "outline"}
                    onClick={() =>
                      setIsEditableModeEnabled?.(!isEditableModeEnabled)
                    }
                    className={classNames("h-[28px]", {
                      "!text-neutral-400 hover:!text-neutral-200 !border-neutral-600 !hover:!border-neutral-500":
                        !isEditableModeEnabled,
                    })}
                  >
                    <Crosshair className="size-4" />
                    Edit
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  align="start"
                  className="bg-neutral-950 text-xs text-neutral-200 py-1 px-2 rounded-md -translate-y-0.5"
                >
                  Select an element on the page to edit it directly.
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <StyleSelector
              selectedStyle={selectedStyle as string}
              onStyleChange={setSelectedStyle}
              disabled={isAiWorking}
            />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => setOpenSettings(true)}
                  className={classNames("h-[28px] text-xs", {
                    "!border-sky-500 !text-sky-400":
                      promptMode === "enhanced",
                    "!border-neutral-600 !text-neutral-400":
                      promptMode === "classic",
                  })}
                >
                  <Settings className="size-3.5" />
                  <span className="hidden md:inline">
                    {promptMode === "enhanced" ? "Enhanced" : "Classic"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                align="start"
                className="bg-neutral-950 text-xs text-neutral-200 py-1 px-2 rounded-md -translate-y-0.5"
              >
                {promptMode === "enhanced"
                  ? "Enhanced mode: AI plans before implementing"
                  : "Classic mode: Direct generation"}
              </TooltipContent>
            </Tooltip>

            <AiSettings
              open={openSettings}
              onClose={setOpenSettings}
            />
            <Button
              size="iconXs"
              disabled={isAiWorking || !prompt.trim()}
              onClick={() => callAi()}
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>

        {!isSameHtml && (
          <div className="absolute top-0 right-0 -translate-y-[calc(100%+8px)] select-none text-xs text-neutral-400 flex items-center justify-center gap-2 bg-neutral-800 border border-neutral-700 rounded-md p-1 pr-2.5">
            <label
              htmlFor="diff-patch-checkbox"
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <Checkbox
                id="diff-patch-checkbox"
                checked={isFollowUp}
                onCheckedChange={(e) => setIsFollowUp(e === true)}
              />
              Diff-Patch Update
            </label>
            <FollowUpTooltip />
          </div>
        )}
      </div>
      <audio ref={audio} id="audio" className="hidden">
        <source src="/success.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
