import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Icon, type AnyIcon } from "@/components/Icon";
import { site } from "@/lib/site";
import { PartnerCard } from "@/components/PartnerCard";
import { pageMeta, JsonLd, ldBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us: Karachi & US Offices",
  description:
    "Contact eSeller Zone in Karachi, Pakistan or our US office with Zenvyra Digital in Missouri City, TX. Get a free quote for e-commerce, web or marketing work.",
  path: "/contact/",
});

export default function Contact() {
  const items: { icon: AnyIcon; label: string; value: string; href?: string }[] = [
    { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...site.offices.filter((o) => o.phone).map((o) => ({ icon: "phone" as AnyIcon, label: `Phone · ${o.city}`, value: o.phone, href: `tel:${o.phone.replace(/[^+\d]/g, "")}` })),
    ...(site.whatsapp ? [{ icon: "chat" as AnyIcon, label: "WhatsApp", value: `+${site.whatsapp}`, href: `https://wa.me/${site.whatsapp}` }] : []),
    ...site.offices.map((o) => ({ icon: "pin" as AnyIcon, label: o.label, value: o.address })),
    { icon: "clock", label: "Hours", value: site.hours },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let&apos;s build your <span className="text-gradient">next growth chapter.</span></>} text="Tell us where you are and where you want to be. We'll reply within one business day with next steps." />
      <section className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.06}>
              <div className="glass flex gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-400"><Icon name={it.icon} className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">{it.label}</p>
                  {it.href ? <a href={it.href} className="mt-1 block text-white hover:text-brand-300">{it.value}</a> : <p className="mt-1 text-white">{it.value}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}><ContactForm /></Reveal>
      </section>
      <section className="container-x mt-10">
        <PartnerCard />
      </section>
      <JsonLd data={[ldBreadcrumbs([["Contact", "/contact/"]]), { "@context": "https://schema.org", "@type": "ContactPage", url: `${site.domain}/contact/`, about: { "@id": `${site.domain}/#organization` } }]} />
    </>
  );
}
