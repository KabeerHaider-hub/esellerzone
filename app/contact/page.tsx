import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Icon, type AnyIcon } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Talk to eSeller Zone about marketplaces, e-commerce, websites, apps, AI, SEO and marketing." };

export default function Contact() {
  const items: { icon: AnyIcon; label: string; value: string; href?: string }[] = [
    { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...(site.phone ? [{ icon: "phone" as AnyIcon, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` }] : []),
    ...(site.whatsapp ? [{ icon: "chat" as AnyIcon, label: "WhatsApp", value: `+${site.whatsapp}`, href: `https://wa.me/${site.whatsapp}` }] : []),
    { icon: "pin", label: "Office", value: site.address },
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
    </>
  );
}
