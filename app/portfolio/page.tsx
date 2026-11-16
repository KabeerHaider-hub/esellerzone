import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/Spotlight";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Portfolio", description: "Selected e-commerce, marketplace, web and software projects by eSeller Zone." };

export default function Portfolio() {
  return (
    <>
      <PageHero eyebrow="Portfolio" title={<>Work built for <span className="text-gradient">real business goals.</span></>} text="Strategy, technology and marketing working together for growing brands." />
      <section className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.client} delay={(i % 3) * 0.08}>
            <Spotlight className="glass h-full p-7">
              <div className="relative">
                {/* TODO(owner): replace with a project screenshot */}
                <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/25 via-ink-800 to-ink-900">
                  <div className="grid-bg absolute inset-0 opacity-50" />
                  <span className="relative font-display text-2xl font-semibold text-white">{p.client}</span>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-brand-400">{p.tag}</p>
                <h2 className="mt-2 font-display text-lg font-semibold text-white">{p.title}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.services.map((s) => <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">{s}</span>)}
                </div>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </section>
      <CtaBand title="Your brand could be next." />
    </>
  );
}
