import type { Metadata } from "next";
import { PageHero, ServiceCard, CtaBand, SectionHeading, ProcessSteps } from "@/components/Sections";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Marketplace management, e-commerce stores, websites, apps, software, AI automation, SEO, PPC, social media, branding and eBook publishing.",
};

const groups = ["Commerce", "Build", "Growth", "Create"] as const;
const groupText: Record<(typeof groups)[number], string> = {
  Commerce: "Sell everywhere your customers shop.",
  Build: "Technology that scales with you.",
  Growth: "Traffic, leads and sales on repeat.",
  Create: "A brand people remember.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Everything you need to <span className="text-gradient">sell, build and grow.</span></>}
        text="Eleven specialist services, one accountable team. Pick one, or let us run the whole growth engine."
      />
      {groups.map((g) => (
        <section key={g} className="container-x mt-16 first-of-type:mt-4">
          <div className="mb-8 flex items-baseline gap-4 border-b border-white/10 pb-4">
            <h2 className="font-display text-2xl font-semibold text-white">{g}</h2>
            <p className="text-sm text-white/45">{groupText[g]}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.category === g).map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </section>
      ))}
      <section className="container-x mt-32">
        <SectionHeading eyebrow="How we work" title={<>Simple process. <span className="text-gradient">Serious results.</span></>} />
        <ProcessSteps steps={["Discovery & strategy", "Planning & design", "Build & integrate", "Launch & support", "Optimise & scale"]} />
      </section>
      <CtaBand />
    </>
  );
}
