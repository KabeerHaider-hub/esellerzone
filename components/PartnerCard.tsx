import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { site } from "@/lib/site";

/** "Partner company" block: Zenvyra Digital (US) alongside the Karachi office. */
export function PartnerCard() {
  const [pk, us] = site.offices;
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/10 via-ink-900/80 to-ink-900/80 p-8 backdrop-blur sm:p-12">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            <span className="eyebrow">Partner company</span>
            <h2 className="h-display mt-5 text-3xl sm:text-4xl">
              eSeller Zone <span className="text-brand-500">×</span> {site.partner.name}
            </h2>
            <p className="mt-4 text-white/60">{site.partner.blurb}</p>
            <a href={site.partner.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">
              Visit {site.partner.name} <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
          {[pk, us].map((o) => (
            <div key={o.label} className="glass p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-400">{o.label}</p>
              <p className="mt-4 flex gap-3 text-white/80"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />{o.address}</p>
              {o.phone && (
                <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="mt-3 flex gap-3 text-white/80 hover:text-white">
                  <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />{o.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
