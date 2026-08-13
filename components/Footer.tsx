import { GithubIcon, TerminalIcon } from "./Icons";

const GITHUB = "https://github.com/ankitdey01/free-resume-export";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <TerminalIcon className="h-4 w-4 text-accent" />
          <span className="font-mono text-sm">free-resume-export</span>
        </div>
        <p className="text-sm text-muted-foreground">your resume. your content. your choice.</p>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-150 hover:text-foreground"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            github
          </a>
          <a
            href="https://ankitdey.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors duration-150 hover:text-foreground"
          >
            ankitdey.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
