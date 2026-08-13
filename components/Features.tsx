const features = [
  {
    title: "strips the cruft",
    body: "editor scaffolding, svg icons, action buttons, and contenteditable wrappers get discarded. you get the content, not the chrome.",
    hint: "data-editable-text → text",
  },
  {
    title: "keeps the content",
    body: "text pulled from editable spans, sections sorted by their real order: n. links, dates, and bullets all stay intact.",
    hint: "style=\"order: 2\" respected",
  },
  {
    title: "one page, always",
    body: "letter-size and single column, with spacing that tightens automatically until it fits. ats-friendly and ready to send.",
    hint: "@page { size: letter }",
  },
  {
    title: "zero dependencies",
    body: "python's standard library plus the chrome or edge you already have. nothing to install, nothing to version.",
    hint: "import html.parser",
  },
];

export function Features() {
  return (
    <section className="border-y border-border/30">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <div className="max-w-xl">
          <h2 className="font-extralight leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,3rem)]">
            it strips the paywall, not your resume.
          </h2>
          <span aria-hidden="true" className="mt-5 block h-5 w-3 bg-accent" />
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border/70 sm:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="group flex min-h-[220px] flex-col bg-background p-6 transition-colors duration-200 hover:bg-card/70 sm:p-8"
            >
              <h3 className="text-lg font-medium tracking-tight">{f.title}</h3>
              <div className="mt-4 h-px w-6 bg-border transition-colors duration-200 group-hover:bg-accent" />
              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{f.body}</p>
              <code className="mt-auto pt-6 font-mono text-xs text-muted-foreground/60">{f.hint}</code>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
