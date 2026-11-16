import type { Metadata } from "next";
import { PageHero, SectionHeading, CtaBand, ProcessSteps } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About",
  description: "eSeller Zone is an all-in-one digital and e-commerce growth partner for brands selling online.",
};

const values = [
  { t: "Mission", d: "Make world-class e-commerce, technology and marketing accessible to growing brands, without the bloated agency price tag." },
  { t: "Vision", d: "Be the growth partner online sellers trust to run everything from their first listing to their hundredth market." },
  { t: "Promise", d: "Honest advice, transparent reporting and a team that only wins when you do." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Empowering businesses with <span className="text-gradient">the future of digital.</span></>}
        text="eSeller Zone is an all-in-one growth partner. We bring marketplace experts, engineers, marketers and designers together under one roof, so your strategy, technology and growth move as one."
      />

      <section className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="grid-bg absolute inset-0 rounded-3xl border border-white/10 [mask-image:radial-gradient(circle,black,transparent_75%)]" />
            <div className="absolute inset-[18%] rounded-full bg-brand-500/25 blur-3xl" />
            <LogoMark className="absolute inset-[25%] h-1/2 w-1/2 animate-float" />
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow="Our story" title={<>Built by sellers, <span className="text-gradient">for sellers.</span></>} />
          <Reveal className="mt-6 space-y-4 text-white/65">
            <p>We started by helping sellers launch and scale on Amazon, Walmart and eBay. As our clients grew, they needed more: stores, websites, ads, branding and software that all worked together.</p>
            <p>So we built the team to deliver all of it. Today eSeller Zone covers the full journey, from sourcing a first product to automating a multi-marketplace operation, with one plan and one point of contact.</p>
            <p>Our model is simple: we grow your business, not your expenses. When you win, we win.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-28 grid gap-5 md:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <div className="glass h-full p-8">
              <Icon name="spark" className="h-6 w-6 text-brand-500" />
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">{v.t}</h3>
              <p className="mt-3 text-white/60">{v.d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-x mt-28">
        <SectionHeading eyebrow="How we work" title={<>Three phases. <span className="text-gradient">Zero guesswork.</span></>} />
        <ProcessSteps steps={["Discovery & strategy", "Design & development", "Integration & QA", "Launch & support", "Optimisation"]} />
      </section>

      {/* TODO(owner): add real team members and photos here when ready. */}
      <CtaBand title="Let's build what's next, together." />
    </>
  );
}
