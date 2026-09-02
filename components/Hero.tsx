import { ArrowRightIcon, GithubIcon } from "./Icons";
import { CopyButton } from "./CopyButton";
import { Terminal } from "@/components/ui/terminal";

const GITHUB = "https://github.com/ankitdey01/free-resume-export";
const INSTALL = "npx skills@latest add ankitdey01/free-resume-export";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-16 pt-6 text-center sm:px-6 sm:pt-12 sm:pb-20">
        <p
          className="reveal-line font-mono text-xs text-muted-foreground"
          style={{ animationDelay: "0ms" }}
        >
          an agent skill · claude code / kiro / codex
        </p>
        <h1
          className="reveal-line mt-5 max-w-3xl font-extralight leading-[1.05] tracking-tight text-[clamp(2.75rem,7vw,4.5rem)]"
          style={{ animationDelay: "60ms" }}
        >
          your resume,
          <br />
          exported free.
        </h1>
        <p
          className="reveal-line mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          style={{ animationDelay: "120ms" }}
        >
          resume builders hide PDF export behind a paywall. this skill takes the html you already have in your
          browser inspector and turns it into a clean, single-page pdf — no fees, no accounts, no pip installs.
        </p>

        <div className="reveal-line mt-8 w-full max-w-[560px] sm:mt-10" style={{ animationDelay: "180ms" }}>
          <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-card/70 px-4 py-3 sm:gap-5 sm:px-5">
            <code className="min-w-0 flex-1 truncate text-left font-mono text-sm text-foreground">{INSTALL}</code>
            <CopyButton text={INSTALL} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-accent/10 px-5 text-sm font-medium ring-2 ring-accent/40 transition-[background-color,box-shadow] duration-150 hover:bg-accent/20 hover:ring-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95"
            >
              <GithubIcon className="h-4 w-4 text-accent" />
              view on github
            </a>
            <a
              href={`${GITHUB}/blob/master/SKILL.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              get started with a prompt
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <Terminal
          commands={[
            "convert #my-resume.html to pdf",
          ]}
          outputs={{
            0: [
              "",
              "plan",
              "1/5 format raw html ✓",
              "2/5 extract content model ✓",
              "3/5 build clean semantic html ✓",
              "4/5 render via headless chrome ✓",
              "5/5 verify single page ✓",
              "",
              "→ resume.pdf · 1 page · 104.9 kb",
            ],
          }}
          typingSpeed={45}
          delayBetweenCommands={1000}
          className="reveal-line mt-8 w-full max-w-[720px] sm:mt-10"
        />
      </div>
    </section>
  );
}
