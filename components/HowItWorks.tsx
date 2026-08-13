const steps = [
  {
    title: "copy the raw html",
    body: "open your resume in the builder, inspect the preview, and copy the root element's outer html.",
  },
  {
    title: "save a file",
    body: "paste it into resume.html. formatting it first keeps extraction clean, but the skill handles raw dumps too.",
  },
  {
    title: "run the skill",
    body: "convert #resume.html to pdf. the agent validates the file, rebuilds clean markup, renders one page, and verifies it.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs text-muted-foreground">how it works</p>
          <h2 className="mt-4 font-extralight leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,3rem)]">
            three steps.
            <br />
            one page.
          </h2>
          <ol className="mt-10 space-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="mt-0.5 select-none font-mono text-xs text-accent">0{i + 1}</span>
                <div>
                  <h3 className="text-base font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-6 font-mono text-sm leading-8 sm:p-8">
          <p className="text-muted-foreground">kept</p>
          <ul className="mt-1 text-foreground/85">
            <li>name · contact · links</li>
            <li>education · experience · skills</li>
            <li>bullets · dates · section order</li>
          </ul>
          <p className="mt-8 text-muted-foreground">removed</p>
          <ul className="mt-1 text-muted-foreground/70">
            <li>+ new · delete · reorder buttons</li>
            <li>svg icons · editor controls</li>
            <li>empty placeholders · tailwind cruft</li>
          </ul>
          <p className="mt-8 flex items-center gap-2 text-accent">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            single page, guaranteed
          </p>
        </div>
      </div>
    </section>
  );
}
