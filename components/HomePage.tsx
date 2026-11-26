import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { HeroCopy, FadeIn } from "@/components/HeroCopy";
import { SplitReveal, Magnetic, KineticBand, ScaleIn } from "@/components/Experience";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SectionHeading, ServiceCard, CtaBand, ProcessSteps } from "@/components/Sections";
import { Spotlight } from "@/components/Spotlight";
import { services } from "@/lib/services";
import { ScrollText, HorizontalServices, CountUp, Parallax } from "@/components/ScrollFx";
import { faqs, posts } from "@/lib/content";
import { chapters } from "@/lib/portfolio";

const marketplaces = ["Amazon", "Walmart", "eBay", "TikTok Shop", "Shopify", "Etsy", "Google Ads", "Meta Ads", "WooCommerce", "Next.js"];

const stats = [
  { k: "11", v: "Services under one roof" },
  { k: "6+", v: "Marketplaces & platforms managed" },
  { k: "3", v: "Selling models: private label, wholesale, dropship" },
  { k: "US/UK", v: "Hours. We work while you do" },
];

const pillars = [
  { icon: "store" as const, title: "Sell", text: "We launch and run your stores on Amazon, Walmart, eBay, TikTok Shop and Shopify, from sourcing to account health." },
  { icon: "code" as const, title: "Build", text: "Websites, apps, custom software and AI automations engineered to scale with you." },
  { icon: "target" as const, title: "Grow", text: "SEO, paid ads, social and branding that turn attention into revenue, measured every month." },
];

const why = [
  { t: "Growth-aligned", d: "We grow when your business grows. Our plans are built around your revenue, not our billable hours." },
  { t: "One accountable team", d: "Marketplace, web, ads and creative specialists working from one plan, with one point of contact." },
  { t: "Data, not guesswork", d: "Every decision is tied to sales, ad and traffic data, reported in plain language." },
  { t: "Built to last", d: "Clean code, documented processes and training so you're never locked in." },
];

export function HomePage({ variant = "classic" }: { variant?: "classic" | "cosmic" }) {
  const cosmic = variant === "cosmic";
  return (
    <>
      {cosmic && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute right-[-10%] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-brand-500/[0.10] blur-[160px]" />
          <HeroScene mode="fixed" />
        </div>
      )}
      <div className="relative z-10">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative flex min-h-[100svh] flex-col">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_50%,black_10%,transparent_70%)]" />
          {!cosmic && <div className="pointer-events-none absolute right-[-10%] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-brand-500/[0.12] blur-[160px]" />}
          {!cosmic && <HeroScene />}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-transparent lg:via-ink-950/30" />
          {!cosmic && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />}

          <HeroCopy>
            <FadeIn delay={0.2}><span className="eyebrow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" /> E-commerce & digital growth agency
            </span></FadeIn>
            <h1 className="h-display mt-8 text-[2.9rem] leading-[0.98] sm:text-7xl lg:text-[6.2rem]">
              <SplitReveal text="We grow your business," delay={0.15} />
              <br />
              <SplitReveal text="not your expenses." delay={0.55} accentFrom={0} />
            </h1>
            <FadeIn delay={1.1} className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Marketplaces, stores, websites, AI and marketing, run by one team that only wins when you do.
            </FadeIn>
            <FadeIn delay={1.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic><Link href="/contact/" className="btn-primary">Book a free strategy call <Icon name="arrow" className="h-4 w-4" /></Link></Magnetic>
              <Magnetic><Link href="/services/" className="btn-ghost">Explore services</Link></Magnetic>
            </FadeIn>
          </HeroCopy>

          <div className="container-x relative mt-auto flex items-end justify-between pb-10">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-white/40">
              <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-white/15" /> Scroll
            </div>
            <div className="hidden gap-10 text-right text-xs text-white/40 sm:flex">
              <p><span className="block font-display text-2xl text-white">11</span>services</p>
              <p><span className="block font-display text-2xl text-white">6+</span>platforms</p>
              <p><span className="block font-display text-2xl text-white">24h</span>reply time</p>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="relative border-y border-white/10 bg-ink-900/60 py-5 backdrop-blur">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
            {[...marketplaces, ...marketplaces].map((m, i) => (
              <span key={i} className="flex items-center gap-12 font-display text-lg font-medium text-white/40">
                {m} <span className="h-1.5 w-1.5 rotate-45 bg-brand-500/70" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x mt-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.v} delay={i * 0.06} className={`p-6 sm:p-8 ${cosmic ? "bg-ink-950/70 backdrop-blur-md" : "bg-ink-950"}`}>
            <p className="h-display text-3xl text-gradient sm:text-5xl"><CountUp value={s.k} /></p>
            <p className="mt-3 text-sm text-white/55">{s.v}</p>
          </Reveal>
        ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="container-x mt-32 max-w-6xl">
        <span className="eyebrow">Who we are</span>
        <div className="mt-8">
          <ScrollText
            text="We're the team behind brands that sell everywhere. Marketplaces, stores, software and marketing, built and run as one growth engine, so you can focus on what you do best."
            accent={["sell", "everywhere", "growth", "engine"]}
          />
        </div>
      </section>

      {/* PILLARS */}
      <section className="container-x mt-32">
        <SectionHeading
          eyebrow="How we think"
          title={<>One partner. <span className="text-gradient">A complete growth engine.</span></>}
          text="Most brands juggle a marketplace freelancer, a web developer, an ads agency and a designer. We replace the patchwork with one team running one plan, so every part pushes the same direction."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <Spotlight className="glass h-full p-8">
                <div className="relative">
                  <span className="font-display text-6xl font-semibold text-white/[0.06]">0{i + 1}</span>
                  <div className="-mt-6 grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-ink-950"><Icon name={p.icon} className="h-6 w-6" /></div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-3 text-white/60">{p.text}</p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <KineticBand words={["Sell", "Build", "Grow", "Automate"]} />

      {/* SERVICES: pinned horizontal scroll on desktop */}
      <div className="mt-24"><HorizontalServices services={services} /></div>
      <section className="container-x mt-32 lg:hidden">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="What we do" title={<>Services built for <span className="text-gradient">modern sellers.</span></>} />
          <Reveal><Link href="/services/" className="btn-ghost shrink-0">All services <Icon name="arrow" className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-x mt-32">
        <SectionHeading eyebrow="Our process" title={<>From first call to <span className="text-gradient">compounding growth.</span></>} text="A clear, repeatable process so you always know what's happening, what's next and what it's delivering." />
        <ProcessSteps steps={["Discovery & audit", "Strategy & roadmap", "Design, build & integrate", "Launch & manage", "Optimise & scale"]} />
      </section>

      {/* WHY */}
      <section className="relative mt-32 overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.06] to-transparent" />
        <div className="container-x relative grid gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="Why eSeller Zone" title={<>Our success is <span className="text-gradient">tied to yours.</span></>} text="We're a growth partner, not a vendor. That means honest advice, transparent reporting and plans that scale with your revenue." />
          <div className="grid gap-4 sm:grid-cols-2">
            {why.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.08}>
                <div className="glass h-full p-6">
                  <Icon name="check" className="h-6 w-6 text-brand-500" />
                  <h3 className="mt-4 font-semibold text-white">{w.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="container-x mt-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Portfolio" title={<>Explore our work, <span className="text-gradient">chapter by chapter.</span></>} />
          <Reveal><Link href="/portfolio/" className="btn-ghost shrink-0">Enter the portfolio <Icon name="arrow" className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {chapters.slice(0, 3).map((c, i) => (
            <Parallax key={c.slug} speed={[30, 70, 45][i]}>
              <Spotlight className="glass h-full p-7">
                <Link href={`/portfolio/${c.slug}/`} className="relative block">
                  <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/20 via-ink-800 to-ink-900">
                    <div className="grid-bg absolute inset-0 opacity-50" />
                    <span className="relative font-mono text-4xl font-semibold tracking-[0.2em] text-white/80">{c.code}</span>
                  </div>
                  <p className="mt-6 font-mono text-xs tracking-[0.25em] text-brand-400">{String(i + 1).padStart(2, "0")} · CHAPTER</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{c.tagline}</p>
                </Link>
              </Spotlight>
            </Parallax>
          ))}
        </div>
      </section>

      {/* FAQ + BLOG */}
      <section className="container-x mt-32 grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title={<>Questions, <span className="text-gradient">answered.</span></>} />
          <Reveal className="mt-8">
            <p className="text-white/55">Latest from the blog</p>
            <ul className="mt-4 space-y-3">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}/`} className="group flex items-start gap-3 text-white/80 hover:text-white">
                    <Icon name="arrow" className="mt-1 h-4 w-4 shrink-0 text-brand-500 transition group-hover:translate-x-1" />
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="glass group p-6 open:border-brand-500/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-brand-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
      </div>
    </>
  );
}

