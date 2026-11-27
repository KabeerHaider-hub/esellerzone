import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand, SectionHeading } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/Spotlight";
import { Icon } from "@/components/Icon";
import { chapters, getChapter } from "@/lib/portfolio";
import { pageMeta, JsonLd, ldBreadcrumbs } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getChapter((await params).slug);
  return c ? pageMeta({ title: `${c.title} Portfolio`, description: c.intro, path: `/portfolio/${c.slug}/` }) : {};
}

export default async function ChapterPage({ params }: Props) {
  const c = getChapter((await params).slug);
  if (!c) notFound();
  const i = chapters.indexOf(c);
  const prev = chapters[(i - 1 + chapters.length) % chapters.length];
  const next = chapters[(i + 1) % chapters.length];

  return (
    <>
      <PageHero eyebrow={`Portfolio · ${String(i + 1).padStart(2, "0")} · ${c.code}`} title={c.title} text={c.intro}>
        <div className="mt-8 flex flex-wrap gap-2">
          {c.services.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">{s}</span>
          ))}
        </div>
        <Link href="/portfolio/" className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to the portfolio journey
        </Link>
      </PageHero>

      <section className="container-x">
        <SectionHeading eyebrow="Projects" title={<>Selected <span className="text-gradient">{c.title.toLowerCase()}</span> work.</>} />
        {c.projects.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {c.projects.map((p, k) => (
              <Reveal key={p.name} delay={(k % 2) * 0.08}>
                <Spotlight className="glass h-full overflow-hidden">
                  <div className="relative">
                    <div className="grid aspect-[16/9] place-items-center border-b border-white/10 bg-gradient-to-br from-brand-500/25 via-ink-800 to-ink-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {p.image ? <img src={p.image} alt={p.name} className="h-full w-full object-cover" /> : <span className="font-display text-2xl text-white/80">{p.name}</span>}
                    </div>
                    <div className="p-7">
                      <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                      {p.client && <p className="mt-1 text-sm text-white/45">{p.client}</p>}
                      <p className="mt-3 text-white/60">{p.summary}</p>
                      {p.results && <ul className="mt-4 space-y-1.5 text-sm text-white/70">{p.results.map((r) => <li key={r} className="flex gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-brand-500" />{r}</li>)}</ul>}
                      <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">{t}</span>)}</div>
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">Visit live site <Icon name="arrow" className="h-4 w-4" /></a>}
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/15 p-10 text-center sm:p-16">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
              <div className="relative">
                <p className="font-mono text-xs tracking-[0.35em] text-brand-400">STATUS · LOADING CASE FILES</p>
                <h3 className="h-display mt-4 text-2xl sm:text-3xl">Case studies are on their way.</h3>
                <p className="mx-auto mt-3 max-w-lg text-white/55">We&apos;re preparing detailed {c.title.toLowerCase()} case studies. Want to see relevant examples now? Ask us on a free call.</p>
                <Link href="/contact/" className="btn-primary mt-8">Request examples <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      <section className="container-x mt-20 grid gap-4 sm:grid-cols-2">
        {[{ c: prev, label: "Previous chapter", dir: "rotate-180" }, { c: next, label: "Next chapter", dir: "" }].map(({ c: x, label, dir }) => (
          <Link key={label} href={`/portfolio/${x.slug}/`} className={`glass group flex items-center gap-4 p-6 transition hover:border-brand-500/40 ${dir ? "" : "sm:flex-row-reverse sm:text-right"}`}>
            <Icon name="arrow" className={`h-5 w-5 shrink-0 text-brand-500 ${dir}`} />
            <div><p className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</p><p className="mt-1 font-display text-lg text-white">{x.title}</p></div>
          </Link>
        ))}
      </section>

      <CtaBand title={`Let's build your ${c.title.toLowerCase()} success story.`} />
      <JsonLd data={ldBreadcrumbs([["Portfolio", "/portfolio/"], [c.title, `/portfolio/${c.slug}/`]])} />
    </>
  );
}
