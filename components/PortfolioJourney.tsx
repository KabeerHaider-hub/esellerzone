"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Chapter } from "@/lib/portfolio";
import { Icon } from "./Icon";
import { LogoStacked } from "./Logo";

/**
 * Single-page scrolling portfolio: an "enter" gate, then a 3D flight past one station per
 * chapter. Each station shows its title and a "See details" button to that chapter's page.
 */
export function PortfolioJourney({ chapters }: { chapters: Chapter[] }) {
  const section = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const api = useRef<{ setProgress: (p: number) => void } | null>(null);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const stops = chapters.length; // 0 = gate, 1..n = chapters

  useEffect(() => {
    try { if (sessionStorage.getItem("ez-portfolio-entered") === "1") setEntered(true); } catch {}
  }, []);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const onScroll = () => {
      const el = section.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const max = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, max)));
      api.current?.setProgress(p);
      setActive(Math.round(p * stops));
      if (p > 0.02) enter();
    };
    (async () => {
      try {
        const { createPortfolioScene } = await import("./PortfolioScene");
        if (cancelled || !stage.current) return;
        const s = createPortfolioScene(stage.current, chapters);
        api.current = s;
        dispose = s.dispose;
        onScroll();
      } catch {
        setWebgl(false);
      }
    })();
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { cancelled = true; window.removeEventListener("scroll", onScroll); dispose?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enter = () => {
    setEntered(true);
    try { sessionStorage.setItem("ez-portfolio-entered", "1"); } catch {}
  };

  const goTo = (i: number) => {
    const el = section.current;
    if (!el) return;
    const max = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (i / stops) * max, behavior: "smooth" });
    enter();
  };

  const ch = active > 0 ? chapters[active - 1] : null;

  return (
    <div ref={section} className="relative" style={{ height: `${(stops + 1) * 110}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={stage} className="absolute inset-0" aria-hidden="true" />
        {!webgl && <div className="grid-bg absolute inset-0 opacity-40" />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,6,10,0.85))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

        {/* HUD frame */}
        <div className="pointer-events-none absolute inset-0 z-[5]">
          <div className="scanlines absolute inset-0 opacity-[0.07]" />
          {[["left-3 top-20 sm:left-6 sm:top-24", "border-l border-t"], ["right-3 top-20 sm:right-6 sm:top-24", "border-r border-t"], ["left-3 bottom-3 sm:left-6 sm:bottom-6", "border-l border-b"], ["right-3 bottom-3 sm:right-6 sm:bottom-6", "border-r border-b"]].map(([pos, b]) => (
            <span key={pos} className={`absolute h-6 w-6 border-white/40 ${pos} ${b}`} />
          ))}
          <div className="absolute left-6 top-28 hidden font-mono text-[10px] leading-[1.7] tracking-[0.15em] text-white/40 sm:block lg:left-10 lg:top-32">
            <p className="text-white/70">ESZ://PORTFOLIO.SYS</p>
            <p>NODE&nbsp;&nbsp;&nbsp;{String(active).padStart(2, "0")}/{String(stops).padStart(2, "0")}</p>
            <p>SECTOR&nbsp;{ch ? ch.code : "GATE"}</p>
            <p>LINK&nbsp;&nbsp;&nbsp;<span className="text-brand-500">● ONLINE</span></p>
            <div className="mt-3 h-px w-40 bg-white/15"><div className="h-px bg-brand-500 transition-all duration-700" style={{ width: `${(active / stops) * 100}%` }} /></div>
          </div>
          <div className="absolute bottom-8 left-6 hidden font-mono text-[10px] tracking-[0.15em] text-white/30 lg:block lg:left-10">
            <p>LAT 24.8607 · LON 67.0011 // KHI</p>
            <p>LAT 29.5636 · LON -95.5372 // MO-CITY TX</p>
          </div>
        </div>

        {/* Chapter nav (right) */}
        <nav aria-label="Portfolio chapters" className="absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-8">
          <ul className="space-y-3 text-right">
            {["Gate", ...chapters.map((c) => c.title)].map((label, i) => (
              <li key={label}>
                <button onClick={() => goTo(i)} className={`group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] transition ${i === active ? "text-white" : "text-white/40 hover:text-white/80"}`}>
                  <span className="hidden max-w-[16rem] truncate md:inline">{label}</span>
                  <span className={`h-2 w-2 rotate-45 border transition ${i === active ? "border-brand-500 bg-brand-500 shadow-[0_0_10px_rgba(255,89,13,0.9)]" : "border-white/40"}`} />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-10 z-10 px-4 text-center sm:bottom-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-3xl"
            >
              {ch ? (
                <>
                  <div className="flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.35em] text-white/50">
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand-500" />
                    <span><span className="text-brand-500">{String(active).padStart(2, "0")}</span> / {ch.code}</span>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-brand-500" />
                  </div>
                  <h2 className="h-display mt-4 text-3xl font-medium tracking-tight sm:text-5xl lg:text-6xl">{ch.title}</h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm text-white/55 sm:text-base">{ch.tagline}</p>
                  <div className="mx-auto mt-5 hidden max-w-2xl flex-wrap justify-center gap-2 sm:flex">
                    {ch.services.slice(0, 4).map((x) => (
                      <span key={x} className="border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 backdrop-blur">{x}</span>
                    ))}
                  </div>
                  <Link href={`/portfolio/${ch.slug}/`} className="group pointer-events-auto relative mt-7 inline-flex items-center gap-3 border border-brand-500/70 bg-brand-500/10 px-7 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white backdrop-blur transition hover:bg-brand-500 hover:text-ink-950">
                    <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-white" />
                    <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-white" />
                    See details <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-mono text-[11px] tracking-[0.35em] text-white/50"><span className="text-brand-500">00</span> / GATEWAY</p>
                  <h1 className="h-display mt-4 text-4xl font-medium tracking-tight sm:text-6xl">Our work, as a journey.</h1>
                  <p className="mx-auto mt-3 max-w-xl text-white/60">Scroll to travel through everything we build, sell and grow.</p>
                  <p className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/40">
                    <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/15" /> Scroll to explore
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enter gate */}
        <AnimatePresence>
          {!entered && (
            <motion.div
              className="absolute inset-0 z-20 grid place-items-center bg-ink-950/85 backdrop-blur-md"
              exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="px-6 text-center">
                <LogoStacked className="mx-auto h-28 w-auto drop-shadow-[0_0_30px_rgba(255,89,13,0.45)]" />
                <BootLog />
                <h1 className="h-display mt-6 text-3xl font-medium tracking-tight sm:text-5xl">Step into our work.</h1>
                <p className="mx-auto mt-3 max-w-md text-white/55">Websites, marketplaces, social media and more, one station at a time.</p>
                <button onClick={enter} className="group relative mt-8 inline-flex items-center gap-3 border border-brand-500/70 bg-brand-500/10 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.35em] text-white transition hover:bg-brand-500 hover:text-ink-950">
                  <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-white" />
                  <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-white" />
                  Enter <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const LOG = ["> boot esz-portfolio v2.6", "> mount sectors: WEB MKT COM SOC ADS BRD", "> render engine: webgl · bloom · reflections", "> status: ready"];

function BootLog() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= LOG.length) return;
    const t = setTimeout(() => setN((x) => x + 1), 380);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className="mx-auto mt-8 w-full max-w-sm text-left font-mono text-[11px] leading-6 text-white/45">
      {LOG.slice(0, n).map((l, i) => (
        <p key={l} className={i === LOG.length - 1 ? "text-brand-500" : ""}>{l}</p>
      ))}
      {n < LOG.length && <p className="animate-pulse">_</p>}
    </div>
  );
}
