"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";
import { cn } from "@/lib/cn";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`copy ${text}`}
      aria-live="polite"
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md text-xs font-medium transition-all duration-150 ease-out",
        "text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "active:scale-95",
        className
      )}
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5 text-accent" />
          <span className="text-accent">copied</span>
        </>
      ) : (
        <>
          <CopyIcon className="h-3.5 w-3.5" />
          <span>copy</span>
        </>
      )}
    </button>
  );
}
