"use client";
import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { Chapter } from "@/lib/portfolio";
import { Icon } from "./Icon";

// Each portfolio chapter gets its own caption treatment: a small motif that hints at the
// service, a title entrance that matches it, and its own chip style. Everything here is plain
// DOM + transforms (no layout thrash), and falls back to a simple fade for reduced motion.

type Kind = Chapter["model"];
const EASE = [0.22, 1, 0.36, 1] as const;
const TITLE = "h-display text-3xl font-medium tracking-tight sm:text-5xl lg:text-6xl";

/* ------------------------------------------------------------------ */
/* Scroll prompts                                                      */
/* ------------------------------------------------------------------ */

/** Big, unmissable "Scroll down to explore" cue: animated mouse + cascading chevrons. */
export function ScrollPrompt({ onClick, label = "Scroll down to explore", className = "" }: { onClick?: () => void; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group pointer-events-auto inline-flex flex-col items-center gap-2 focus:outline-none ${className}`}
    >
      <span className="relative inline-flex items-center gap-3 rounded-full border border-brand-500/60 bg-ink-950/70 py-2.5 pl-3 pr-5 shadow-[0_0_40px_-8px_rgba(255,89,13,0.7)] backdrop-blur transition group-hover:border-brand-500 group-hover:bg-brand-500/15 group-focus-visible:ring-2 group-focus-visible:ring-brand-500">
        <span className="ez-ping absolute inset-0 rounded-full border border-brand-500/60" aria-hidden="true" />
        <span className="ez-mouse relative block h-7 w-[18px] rounded-full border-2 border-white/85" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white sm:text-sm">{label}</span>
      </span>
      <Chevrons />
    </button>
  );
}

function Chevrons() {
  return (
    <span className="flex flex-col items-center -space-y-2 text-brand-500" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <svg key={i} viewBox="0 0 24 12" className="ez-chevron h-3 w-6" style={{ animationDelay: `${i * 0.18}s` }} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2l9 8 9-8" />
        </svg>
      ))}
    </span>
  );
}

/** Small hint at the bottom of each station telling people what comes next. */
export function NextHint({ next, onClick }: { next: Chapter | null; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group pointer-events-auto inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55 transition hover:text-white sm:text-[11px]">
      <svg viewBox="0 0 24 24" className="ez-bob h-4 w-4 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v16M5 13l7 7 7-7" />
      </svg>
      {next ? (
        <span>Scroll for next <span className="hidden text-white/80 sm:inline">· {next.title}</span></span>
      ) : (
        <span>Scroll down to see all categories</span>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter caption                                                     */
/* ------------------------------------------------------------------ */

export function ChapterCaption({ ch, index }: { ch: Chapter; index: number }) {
  const reduce = useReducedMotion() ?? false;
  const kind = ch.model;
  return (
    <>
      <Motif kind={kind} reduce={reduce} />
      <div className="mt-4 flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.35em] text-white/50">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand-500" />
        <span><span className="text-brand-500">{String(index).padStart(2, "0")}</span> / {ch.code}</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-brand-500" />
      </div>
      <Title text={ch.title} kind={kind} reduce={reduce} />
      <motion.p
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.55, ease: EASE }}
        className="mx-auto mt-3 max-w-xl text-sm text-white/55 sm:text-base"
      >
        {ch.tagline}
      </motion.p>
      <Chips items={ch.services.slice(0, 4)} kind={kind} reduce={reduce} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: reduce ? 0 : 0.8 }}>
        <Link href={`/portfolio/${ch.slug}/`} className="group pointer-events-auto relative mt-7 inline-flex items-center gap-3 border border-brand-500/70 bg-brand-500/10 px-7 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white backdrop-blur transition hover:bg-brand-500 hover:text-ink-950">
          <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-white" />
          <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-white" />
          See details <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </>
  );
}

/* ---- Titles: one entrance per service ---- */

function Title({ text, kind, reduce }: { text: string; kind: Kind; reduce: boolean }) {
  const words = text.split(" ");
  if (reduce) return <h2 className={`${TITLE} mt-4`}>{text}</h2>;

  switch (kind) {
    // Web: the title "loads" left to right like a page render, with a typing caret.
    case "browser":
      return (
        <h2 className={`${TITLE} mt-4`}>
          <motion.span
            className="inline-block"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
          >
            {text}
            <span className="ez-caret ml-2 inline-block h-[0.8em] w-[3px] translate-y-[0.08em] bg-brand-500" aria-hidden="true" />
          </motion.span>
        </h2>
      );

    // Marketplaces: words drop in and land like parcels stacking up.
    case "boxes":
      return (
        <h2 className={`${TITLE} mt-4`} aria-label={text}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="mr-[0.25em] inline-block"
              initial={{ y: -70, opacity: 0, rotate: i % 2 ? 6 : -6 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.2 + i * 0.1 }}
            >
              {w}
            </motion.span>
          ))}
        </h2>
      );

    // E-commerce: layered "stack" copies collapse into one solid title.
    case "stack":
      return (
        <h2 className={`${TITLE} relative mt-4`}>
          {[2, 1].map((n) => (
            <motion.span
              key={n}
              aria-hidden="true"
              className="text-outline pointer-events-none absolute inset-0"
              initial={{ y: -n * 14, opacity: 0.9 }}
              animate={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.25 + n * 0.08, ease: EASE }}
            >
              {text}
            </motion.span>
          ))}
          <motion.span className="relative inline-block" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}>
            {text}
          </motion.span>
        </h2>
      );

    // Social: each word pops in like a notification, with a springy overshoot.
    case "phone":
      return (
        <h2 className={`${TITLE} mt-4`} aria-label={text}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="mr-[0.25em] inline-block"
              initial={{ scale: 0.3, opacity: 0, rotate: i % 2 ? 10 : -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 13, delay: 0.25 + i * 0.12 }}
            >
              {w}
            </motion.span>
          ))}
        </h2>
      );

    // SEO & Ads: words rise out of a baseline mask, like bars on a growth chart.
    case "chart":
      return (
        <h2 className={`${TITLE} mt-4`} aria-label={text}>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.75, delay: 0.2 + i * 0.09, ease: EASE }}>
                {w}
              </motion.span>
            </span>
          ))}
        </h2>
      );

    // Branding: wide-tracked, blurred letters tighten into a crisp gradient wordmark.
    case "prism":
    default:
      return (
        <motion.h2
          className={`${TITLE} text-gradient mt-4`}
          initial={{ letterSpacing: "0.25em", opacity: 0, filter: "blur(12px)" }}
          animate={{ letterSpacing: "-0.025em", opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
        >
          {text}
        </motion.h2>
      );
  }
}

/* ---- Motifs: a small visual signature above each title ---- */

function Motif({ kind, reduce }: { kind: Kind; reduce: boolean }) {
  const t = (delay: number, duration = 0.6): Transition => ({ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE });

  switch (kind) {
    case "browser":
      return (
        <div className="relative mx-auto flex w-60 items-center gap-2 overflow-hidden rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] text-white/50 backdrop-blur sm:w-72" aria-hidden="true">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          </span>
          <span className="ml-1 truncate">https://your-brand.com</span>
          <motion.span className="absolute bottom-0 left-0 h-[2px] bg-brand-500 shadow-[0_0_8px_rgba(255,89,13,0.9)]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={t(0.1, 1.1)} />
        </div>
      );

    case "boxes":
      return (
        <div className="relative mx-auto w-64 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)] sm:w-80" aria-hidden="true">
          <div className="ez-ticker flex w-max whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
            {[0, 1].map((k) => (
              <span key={k} className="flex gap-6 pr-6">
                {["Amazon", "Walmart", "eBay", "TikTok Shop"].map((m) => (
                  <span key={m} className="flex items-center gap-6">{m}<span className="h-1.5 w-1.5 rotate-45 bg-brand-500" /></span>
                ))}
              </span>
            ))}
          </div>
        </div>
      );

    case "stack":
      return (
        <div className="mx-auto flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em]" aria-hidden="true">
          {["Cart", "Checkout", "Paid"].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && (
                <span className="relative h-px w-6 bg-white/15 sm:w-10">
                  <motion.span className="absolute inset-y-0 left-0 bg-brand-500" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={t(0.15 + i * 0.3, 0.3)} />
                </span>
              )}
              <motion.span
                className="flex items-center gap-1.5 rounded border px-2 py-1"
                initial={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}
                animate={{ borderColor: "rgba(255,89,13,0.7)", color: "rgba(255,255,255,0.9)" }}
                transition={t(0.15 + i * 0.3, 0.3)}
              >
                {i === 2 && <span className="text-brand-500">✓</span>}
                {s}
              </motion.span>
            </span>
          ))}
        </div>
      );

    case "phone":
      return (
        <div className="mx-auto flex items-center justify-center gap-2" aria-hidden="true">
          {[["♥", "Like"], ["↗", "Share"], ["+", "Follow"]].map(([g, l], i) => (
            <motion.span
              key={l}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] text-white/70 backdrop-blur"
              initial={{ opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 18, delay: 0.1 + i * 0.12 }}
            >
              <span className="text-brand-500">{g}</span>{l}
            </motion.span>
          ))}
        </div>
      );

    case "chart": {
      const bars = [0.3, 0.45, 0.38, 0.6, 0.55, 0.78, 1];
      return (
        <div className="mx-auto flex items-end justify-center gap-3" aria-hidden="true">
          <svg viewBox="0 0 120 40" className="h-9 w-28 overflow-visible">
            {bars.map((h, i) => (
              <motion.rect
                key={i}
                x={i * 17 + 2}
                width="10"
                y={40 - h * 36}
                height={h * 36}
                rx="1"
                fill={i === bars.length - 1 ? "#FF590D" : "rgba(255,255,255,0.22)"}
                style={{ transformOrigin: "50% 100%", transformBox: "fill-box" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={t(0.1 + i * 0.06, 0.5)}
              />
            ))}
            <motion.polyline
              points={bars.map((h, i) => `${i * 17 + 7},${40 - h * 36 - 3}`).join(" ")}
              fill="none"
              stroke="#FF590D"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={t(0.5, 0.8)}
            />
          </svg>
          <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Traffic <span className="text-brand-500">▲</span></span>
        </div>
      );
    }

    case "prism":
    default:
      return (
        <div className="mx-auto flex items-center justify-center gap-3" aria-hidden="true">
          <span className="font-display text-xl font-semibold text-white/80">Aa</span>
          <span className="flex h-5 overflow-hidden rounded-sm border border-white/10">
            {["#FF590D", "#FFB08A", "#FFFFFF", "#8A93A6", "#11131A"].map((c, i) => (
              <motion.span key={c} className="block h-full" style={{ background: c }} initial={{ width: 0 }} animate={{ width: 22 }} transition={t(0.1 + i * 0.08, 0.45)} />
            ))}
          </span>
        </div>
      );
  }
}

/* ---- Chips: one style per service ---- */

function Chips({ items, kind, reduce }: { items: string[]; kind: Kind; reduce: boolean }) {
  const styles: Record<Kind, { cls: string; prefix?: string; suffix?: string; from: Record<string, number> }> = {
    browser: { cls: "border border-white/10 bg-white/[0.03] normal-case tracking-normal", prefix: "<", suffix: " />", from: { x: -14 } },
    boxes: { cls: "border border-white/10 bg-white/[0.03]", prefix: "▪ ", from: { x: 40 } },
    stack: { cls: "rounded-md border border-white/10 bg-white/[0.03]", prefix: "+ ", from: { scale: 0.7 } },
    phone: { cls: "rounded-full border border-white/15 bg-white/[0.05]", from: { y: 18, scale: 0.85 } },
    chart: { cls: "border-b border-brand-500/40 bg-transparent", prefix: "▲ ", from: { y: 12 } },
    prism: { cls: "border border-brand-500/25 bg-brand-500/[0.05]", from: { y: 0 } },
  };
  const s = styles[kind];
  return (
    <div className="mx-auto mt-5 hidden max-w-2xl flex-wrap justify-center gap-2 sm:flex">
      {items.map((x, i) => (
        <motion.span
          key={x}
          initial={reduce ? { opacity: 0 } : { opacity: 0, ...s.from, ...(kind === "prism" ? { filter: "blur(6px)" } : {}) }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={
            reduce
              ? { duration: 0.2 }
              : kind === "phone"
                ? { type: "spring", stiffness: 420, damping: 16, delay: 0.6 + i * 0.08 }
                : { duration: 0.5, delay: 0.6 + i * 0.07, ease: EASE }
          }
          className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur ${s.cls}`}
        >
          {s.prefix && <span className="text-brand-500">{s.prefix}</span>}
          {x}
          {s.suffix && <span className="text-brand-500">{s.suffix}</span>}
        </motion.span>
      ))}
    </div>
  );
}
