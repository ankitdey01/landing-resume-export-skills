import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Install } from "@/components/Install";
import { Footer } from "@/components/Footer";

const builders = ["polishme.ai", "resume.io", "zety", "novoresume"];

export default function Home() {
  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <section className="border-b border-border/30 py-9">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <p className="text-center text-sm text-muted-foreground">
              built for the builders that gate exports
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-sm text-muted-foreground/70">
              {builders.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </section>
        <HowItWorks />
        <Install />
      </main>
      <Footer />
    </div>
  );
}
