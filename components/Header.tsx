import { GithubIcon, TerminalIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

const GITHUB = "https://github.com/ankitdey01/free-resume-export";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          className="group flex cursor-pointer items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors duration-150 group-hover:bg-accent/20">
            <TerminalIcon className="h-4 w-4" />
          </span>
          <span className="font-mono text-[15px] font-medium tracking-tight">free-resume-export</span>
        </a>
        <div className="flex items-center gap-1.5">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md px-3 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">github</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
