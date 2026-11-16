import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog", description: "Guides on Amazon, e-commerce, SEO, paid ads and AI automation for online sellers." };

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function Blog() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero eyebrow="Insights" title={<>Playbooks for <span className="text-gradient">modern sellers.</span></>} text="Practical guides on marketplaces, e-commerce, SEO, ads and automation from the eSeller Zone team." />
      <section className="container-x">
        <Reveal>
          <Link href={`/blog/${lead.slug}/`} className="glass group grid overflow-hidden lg:grid-cols-2">
            <div className="relative min-h-[220px] bg-gradient-to-br from-brand-500/30 via-ink-800 to-ink-900">
              <div className="grid-bg absolute inset-0 opacity-60" />
              <span className="absolute left-6 top-6 eyebrow">Featured</span>
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-400">{lead.category}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">{lead.title}</h2>
              <p className="mt-4 text-white/60">{lead.excerpt}</p>
              <p className="mt-6 text-sm text-white/40">{fmt(lead.date)} · {lead.readMins} min read</p>
            </div>
          </Link>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/blog/${p.slug}/`} className="glass group flex h-full flex-col p-7 transition hover:border-brand-500/40">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-400">{p.category}</p>
                <h2 className="mt-3 flex-1 font-display text-lg font-semibold text-white">{p.title}</h2>
                <p className="mt-3 text-sm text-white/55">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-white/40">{fmt(p.date)} · {p.readMins} min <Icon name="arrow" className="ml-auto h-4 w-4 text-brand-500 transition group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
