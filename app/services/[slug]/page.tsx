import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SectionHeading, ProcessSteps, CtaBand, ServiceCard } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Spotlight } from "@/components/Spotlight";
import { services, getService } from "@/lib/services";
import { posts } from "@/lib/content";
import { pageMeta, JsonLd, ldBreadcrumbs, ldService } from "@/lib/seo";

// Lower-case a title for use mid-sentence, keeping acronyms like SEO, PPC and AI.
const lc = (t: string) => t.split(" ").map((w) => (/^[A-Z]{2,}/.test(w) ? w : w.toLowerCase())).join(" ");

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.seoTitle ?? s.title, description: s.seoDescription ?? s.intro, path: `/services/${s.slug}/` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);
  const reading = posts.filter((p) => p.services?.includes(s.slug)).slice(0, 4);
  const more = [...others.filter((x) => x.category === s.category), ...others.filter((x) => x.category !== s.category)].slice(0, 3);

  return (
    <>
      <PageHero eyebrow={s.title} eyebrowIsH1 title={s.headline} text={s.intro}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact/" className="btn-primary">Get a free quote <Icon name="arrow" className="h-4 w-4" /></Link>
          {s.packages && <a href="#packages" className="btn-ghost">View packages</a>}
        </div>
      </PageHero>

      <section className="container-x">
        <SectionHeading eyebrow="What's included" title={<>Complete {lc(s.title)}, <span className="text-gradient">done for you.</span></>} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.06}>
              <Spotlight className="glass h-full p-6">
                <div className="relative">
                  <span className="text-xs font-semibold text-brand-500">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{f.text}</p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-28">
        <SectionHeading eyebrow="Process" title={<>How we deliver <span className="text-gradient">{lc(s.title)}.</span></>} />
        <ProcessSteps steps={s.process} />
      </section>

      <section className="container-x mt-28 grid gap-12 lg:grid-cols-2">
        <SectionHeading eyebrow="Why choose us" title={<>Why brands pick <span className="text-gradient">eSeller Zone.</span></>} />
        <ul className="space-y-3">
          {s.why.map((w, i) => (
            <li key={w}>
              <Reveal delay={i * 0.06} className="glass flex items-center gap-4 p-5 text-white/80">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-brand-400"><Icon name="check" className="h-5 w-5" /></span>
                {w}
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {s.packages && (
        <section id="packages" className="container-x mt-28 scroll-mt-28">
          <SectionHeading center eyebrow="Packages" title={<>Transparent <span className="text-gradient">starting packages.</span></>} text="Every business is different. These are starting points; we'll tailor the final scope and quote to you." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {s.packages.map((p, i) => {
              const featured = i === 1;
              return (
                <Reveal key={p.name} delay={i * 0.08}>
                  <div className={`relative h-full rounded-3xl border p-8 ${featured ? "border-brand-500/60 bg-gradient-to-b from-brand-500/15 to-ink-900 shadow-[0_0_60px_-20px_rgba(255,89,13,0.7)]" : "border-white/10 bg-white/[0.03]"}`}>
                    {featured && <span className="absolute -top-3 left-8 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-ink-950">Most popular</span>}
                    <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                    <p className="mt-1 text-sm text-white/50">{p.note}</p>
                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">Starting at</p>
                    <p className="h-display mt-1 text-4xl">{p.price}</p>
                    <ul className="mt-8 space-y-3 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3 text-white/70"><Icon name="check" className="h-5 w-5 shrink-0 text-brand-500" />{f}</li>
                      ))}
                    </ul>
                    <Link href="/contact/" className={`${featured ? "btn-primary" : "btn-ghost"} mt-8 w-full`}>Get started</Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      <section className="container-x mt-28">
        <SectionHeading eyebrow="Explore more" title="Related services" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {more.map((r, i) => <ServiceCard key={r.slug} s={r} i={i} />)}
        </div>
      </section>

      {reading.length > 0 && (
        <section className="container-x mt-20">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">Further reading</p>
          <ul className="mt-4 space-y-3">
            {reading.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}/`} className="group inline-flex items-start gap-3 text-white/80 hover:text-white">
                  <Icon name="arrow" className="mt-1 h-4 w-4 shrink-0 text-brand-500 transition group-hover:translate-x-1" />
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand title={`Let's talk about your ${lc(s.title)}.`} />
      <JsonLd data={[ldService(s), ldBreadcrumbs([["Services", "/services/"], [s.title, `/services/${s.slug}/`]])]} />
    </>
  );
}
