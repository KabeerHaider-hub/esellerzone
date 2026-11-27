import Link from "next/link";
import { Logo } from "./Logo";
import { site, nav } from "@/lib/site";
import { services } from "@/lib/services";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-900/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
          <div className="mt-6 flex gap-3">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-brand-500/60 hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.slice(1).map((n) => (
              <li key={n.href}><Link href={n.href} className="text-white/60 hover:text-brand-300">{n.label}</Link></li>
            ))}
            <li><Link href="/terms/" className="text-white/60 hover:text-brand-300">Terms & Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}/`} className="text-white/60 hover:text-brand-300">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            {site.offices.map((o) => (
              <li key={o.label} className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span><span className="block text-white/80">{o.label}</span>{o.address}{o.phone && <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="mt-1 block hover:text-white">{o.phone}</a>}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Partner company: <a href={site.partner.url} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-400">{site.partner.name}</a></p>
          <p>Built for growth. Engineered for the future.</p>
        </div>
      </div>
    </footer>
  );
}
