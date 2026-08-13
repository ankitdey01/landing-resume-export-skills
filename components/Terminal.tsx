"use client";

import { cn } from "@/lib/cn";

export type TerminalLine =
  | { kind: "cmd"; text: string }
  | { kind: "step"; text: string }
  | { kind: "accent"; text: string }
  | { kind: "muted"; text: string }
  | { kind: "faint"; text: string }
  | { kind: "out"; text: string }
  | { kind: "blank" };

export function Terminal({
  lines,
  animate = true,
  title = "terminal",
  className,
}: {
  lines: TerminalLine[];
  animate?: boolean;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card/80 text-left shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-card/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/60" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <span className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-7 sm:text-sm">
        {lines.map((line, i) => {
          const delay = animate ? i * 60 : 0;
          return (
            <div
              key={i}
              className="reveal-line"
              style={animate ? { animationDelay: `${delay}ms` } : undefined}
            >
              {line.kind === "cmd" && (
                <>
                  <span className="mr-2 select-none text-muted-foreground">$</span>
                  <span className="text-foreground">{line.text}</span>
                </>
              )}
              {line.kind === "step" && (
                <span className="flex items-center justify-between gap-6">
                  <span className="text-muted-foreground">{line.text}</span>
                  <span className="shrink-0 text-accent">✓</span>
                </span>
              )}
              {line.kind === "accent" && <span className="text-accent">{line.text}</span>}
              {line.kind === "muted" && <span className="text-muted-foreground">{line.text}</span>}
              {line.kind === "faint" && <span className="text-muted-foreground/60">{line.text}</span>}
              {line.kind === "out" && <span className="text-muted-foreground">{line.text}</span>}
              {line.kind === "blank" && <span>&nbsp;</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
