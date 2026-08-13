"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/cn";

const commands = [
  { label: "claude", code: "claude plugins install free-resume-export" },
  { label: "npx", code: "npx skills@latest add ankitdey01/free-resume-export" },
  { label: "git", code: "git clone https://github.com/ankitdey01/free-resume-export" },
];

const SKILL = "https://github.com/ankitdey01/free-resume-export/blob/master/SKILL.md";

export function Install() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border/30">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <p className="font-mono text-xs text-muted-foreground">install</p>
        <h2 className="mt-4 font-extralight leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,3rem)]">
          install in one line.
        </h2>
        <div className="mt-10">
          <div className="inline-flex h-10 items-center gap-1 rounded-md border border-border bg-card/50 p-1">
            {commands.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "cursor-pointer rounded px-3 py-1.5 text-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  i === active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-background p-5">
            <code className="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
              {commands[active].code}
            </code>
            <CopyButton text={commands[active].code} />
          </div>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          requires python 3 and chrome or edge.{" "}
          <a
            href={SKILL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer underline underline-offset-2 transition-colors duration-150 hover:text-foreground"
          >
            manual install + usage guide
          </a>
        </p>
      </div>
    </section>
  );
}
