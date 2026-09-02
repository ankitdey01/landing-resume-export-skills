"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function useInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [inView, setInView] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && triggered.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          setInView(true);
          if (once) {
            triggered.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

type TokenType =
  | "command"
  | "flag"
  | "string"
  | "number"
  | "operator"
  | "path"
  | "variable"
  | "comment"
  | "default";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = [];
  const words = text.split(/(\s+)/);

  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: "default", value: word });
      continue;
    }

    if (word.startsWith("#")) {
      tokens.push({ type: "comment", value: word });
      continue;
    }

    if (word.startsWith("$")) {
      tokens.push({ type: "variable", value: word });
      isFirstWord = false;
      continue;
    }

    if (word.startsWith("--") || word.startsWith("-")) {
      tokens.push({ type: "flag", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: "string", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^\d+$/.test(word)) {
      tokens.push({ type: "number", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: "operator", value: word });
      isFirstWord = true;
      continue;
    }

    if (word.includes("/") || word.startsWith(".") || word.startsWith("~")) {
      tokens.push({ type: "path", value: word });
      isFirstWord = false;
      continue;
    }

    if (isFirstWord) {
      tokens.push({ type: "command", value: word });
      isFirstWord = false;
      continue;
    }

    tokens.push({ type: "default", value: word });
  }

  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  command: "text-foreground",
  flag: "text-muted-foreground",
  string: "text-foreground",
  number: "text-foreground",
  operator: "text-muted-foreground",
  path: "text-foreground",
  variable: "text-accent",
  comment: "text-muted-foreground/60",
  default: "text-foreground",
};

function SyntaxHighlightedText({ text }: { text: string }) {
  const tokens = tokenizeBash(text);

  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={tokenColors[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
}

interface TerminalLine {
  type: "command" | "output";
  content: string;
}

export interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  username?: string;
  title?: string;
  className?: string;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  initialDelay?: number;
}

export function Terminal({
  commands = ["npx shadcn@latest init"],
  outputs = {},
  username,
  title = "terminal",
  className,
  typingSpeed = 50,
  delayBetweenCommands = 800,
  initialDelay = 500,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outputIdx, setOutputIdx] = useState(-1);
  const [phase, setPhase] = useState<
    "idle" | "typing" | "executing" | "outputting" | "pausing" | "done"
  >("idle");
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentCommand = commands[commandIdx] || "";
  const currentOutputs = useMemo(
    () => outputs[commandIdx] || [],
    [outputs, commandIdx],
  );
  const isLastCommand = commandIdx === commands.length - 1;

  useEffect(() => {
    if (!inView || phase !== "idle") return;
    const t = setTimeout(() => setPhase("typing"), initialDelay);
    return () => clearTimeout(t);
  }, [inView, phase, initialDelay]);

  useEffect(() => {
    if (phase !== "typing") return;

    if (charIdx < currentCommand.length) {
      const t = setTimeout(
        () => {
          setCurrentText(currentCommand.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        },
        typingSpeed + Math.random() * 30,
      );
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setPhase("executing");
      }, 80);
      return () => clearTimeout(t);
    }
  }, [phase, charIdx, currentCommand, typingSpeed]);

  useEffect(() => {
    if (phase !== "executing") return;

    setLines((prev) => [...prev, { type: "command", content: currentCommand }]);
    setCurrentText("");

    if (currentOutputs.length > 0) {
      setOutputIdx(0);
      setPhase("outputting");
    } else if (isLastCommand) {
      setPhase("done");
    } else {
      setPhase("pausing");
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand]);

  useEffect(() => {
    if (phase !== "outputting") return;

    if (outputIdx >= 0 && outputIdx < currentOutputs.length) {
      const t = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "output", content: currentOutputs[outputIdx] },
        ]);
        setOutputIdx((i) => i + 1);
      }, 150);
      return () => clearTimeout(t);
    } else if (outputIdx >= currentOutputs.length) {
      const t = setTimeout(() => {
        if (isLastCommand) {
          setPhase("done");
        } else {
          setPhase("pausing");
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [phase, outputIdx, currentOutputs, isLastCommand]);

  useEffect(() => {
    if (phase !== "pausing") return;
    const t = setTimeout(() => {
      setCharIdx(0);
      setOutputIdx(-1);
      setCommandIdx((c) => c + 1);
      setPhase("typing");
    }, delayBetweenCommands);
    return () => clearTimeout(t);
  }, [phase, delayBetweenCommands]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, phase]);

  const prompt = (
    <span className="mr-2 select-none text-muted-foreground">$</span>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto w-full text-left font-mono text-[13px] sm:text-sm",
        className,
      )}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card/80 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        {/* Title Bar */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-card/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/60" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <span className="h-3 w-3 rounded-full bg-green-500/60" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {title || username || "terminal"}
          </span>
        </div>

        {/* Terminal Content */}
        <div
          ref={contentRef}
          className="no-visible-scrollbar h-80 overflow-y-auto p-5 font-mono leading-7"
        >
          {lines.map((line, i) => (
            <div key={i} className="reveal-line leading-relaxed whitespace-pre-wrap">
              {line.type === "command" ? (
                <span>
                  {prompt}
                  <span className="text-foreground">{line.content}</span>
                </span>
              ) : line.content === "" ? (
                <span>&nbsp;</span>
              ) : line.content.includes("✓") ? (
                <div className="flex items-center justify-between gap-6">
                  <span className="text-muted-foreground">{line.content.replace("✓", "").trim()}</span>
                  <span className="shrink-0 text-accent">✓</span>
                </div>
              ) : line.content.startsWith("✔") ? (
                <span className="text-muted-foreground">
                  <span className="font-medium text-accent">✔</span>
                  {line.content.slice(1)}
                </span>
              ) : line.content.startsWith("→") ? (
                <span className="text-muted-foreground">{line.content}</span>
              ) : line.content === "plan" ? (
                <span className="text-muted-foreground/60">{line.content}</span>
              ) : (
                <span className="text-muted-foreground">{line.content}</span>
              )}
            </div>
          ))}

          {phase === "typing" && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <span className="text-foreground">{currentText}</span>
              <span className="ml-0.5 inline-block h-4 w-2 bg-muted-foreground align-middle" />
            </div>
          )}

          {(phase === "done" ||
            phase === "pausing" ||
            phase === "outputting") && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <span
                className={cn(
                  "ml-0.5 inline-block h-4 w-2 bg-muted-foreground align-middle transition-opacity duration-100",
                  !cursorVisible && "opacity-0",
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
