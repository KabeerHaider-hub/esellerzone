import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { Spotlight } from "./Spotlight";
import type { Service } from "@/lib/services";
import { ScrollLine } from "./ScrollFx";
import { ScaleIn, Magnetic } from "./Experience";

export function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow: string; title: ReactNode; text?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-display mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{text}</p>}
    </Reveal>
  );
}

/**
 * Page hero. By default the big title is the page's <h1>. Set `eyebrowIsH1` when the eyebrow holds the
 * keyword (e.g. "SEO Services") and the big title is a slogan: the eyebrow becomes the <h1>, looks unchanged.
 */
export function PageHero({ eyebrow, title, text, children, eyebrowIsH1 = false }: { eyebrow: string; title: ReactNode; text?: string; children?: ReactNode; eyebrowIsH1?: boolean }) {
  const Eyebrow = eyebrowIsH1 ? "h1" : "span";
  const Title = eyebrowIsH1 ? "p" : "h1";
  return (
    <section className="relative overflow-hidden pb-16 pt-40 sm:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="container-x relative">
        <Reveal>
          <Eyebrow className="eyebrow">{eyebrow}</Eyebrow>
          <Title className="h-display mt-6 max-w-4xl text-4xl leading-[1.05] sm:text-6xl">{title}</Title>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{text}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <Spotlight className="glass h-full p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-500/40">
        <Link href={`/services/${s.slug}/`} className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
              <Icon name={s.icon} className="h-6 w-6" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">{s.category}</span>
          </div>
          <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{s.short}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-400">
            Explore <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      </Spotlight>
    </Reveal>
  );
}

export function CtaBand({ title = "Ready to grow without growing your expenses?", text = "Book a free 20-minute strategy call. We'll audit your store or site and show you the three fastest wins, no strings attached." }: { title?: string; text?: string }) {
  return (
    <section className="container-x mt-28">
      <ScaleIn>
        <div className="relative overflow-hidden border border-brand-500/30 bg-gradient-to-br from-brand-500/20 via-ink-800 to-ink-900 px-6 py-20 text-center sm:px-16 sm:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/40 blur-[100px]" />
          <div className="relative">
            <h2 className="h-display mx-auto max-w-3xl text-3xl sm:text-5xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/65">{text}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic><Link href="/contact/" className="btn-primary">Book a free strategy call <Icon name="arrow" className="h-4 w-4" /></Link></Magnetic>
              <Magnetic><Link href="/services/" className="btn-ghost">Explore services</Link></Magnetic>
            </div>
          </div>
        </div>
      </ScaleIn>
    </section>
  );
}

export function ProcessSteps({ steps }: { steps: string[] }) {
  return (
    <div className="mt-14"><ScrollLine>
    <ol className="relative grid gap-5 md:grid-cols-5">
      {steps.map((step, i) => (
        <li key={step} className="relative">
          <Reveal delay={i * 0.08}>
            <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-brand-500/40 bg-ink-900 font-display text-lg font-semibold text-brand-400 shadow-[0_0_30px_-8px_rgba(255,89,13,0.7)]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <p className="mt-5 font-medium text-white">{step}</p>
          </Reveal>
        </li>
      ))}
    </ol>
    </ScrollLine></div>
  );
}
