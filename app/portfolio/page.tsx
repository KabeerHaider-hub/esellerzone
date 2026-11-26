import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioJourney } from "@/components/PortfolioJourney";
import { CtaBand, SectionHeading } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/Spotlight";
import { Icon } from "@/components/Icon";
import { chapters } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Website design & development, marketplace management, e-commerce, social media, SEO, ads and branding work by eSeller Zone.",
};

export default function Portfolio() {
  return (
    <>
      <PortfolioJourney chapters={chapters} />

      {/* Plain index of every chapter (also the fallback for search engines and screen readers) */}
      <section className="container-x mt-24">
        <SectionHeading eyebrow="All chapters" title={<>Pick a <span className="text-gradient">category.</span></>} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <Spotlight className="glass h-full p-7">
                <Link href={`/portfolio/${c.slug}/`} className="relative flex h-full flex-col">
                  <span className="font-mono text-xs tracking-[0.3em] text-brand-400">{String(i + 1).padStart(2, "0")} · {c.code}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-white/55">{c.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-400">See details <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Your brand could be the next station." />
    </>
  );
}
