"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Chapter } from "@/lib/portfolio";
import { Icon } from "./Icon";
import { LogoStacked } from "./Logo";
import { getLenis } from "./Experience";
import { ChapterCaption, NextHint, ScrollPrompt } from "./PortfolioCaptions";

const SNAP_EASE = (t: number) => 1 - Math.pow(1 - t, 4);

/** Smoothly scroll the window to y, through Lenis when it is running. */
function smoothScrollTo(y: number, reduce: boolean) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(y, { duration: 1.1, easing: SNAP_EASE });
  else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
}
const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  // Station snapping: when scrolling pauses between two stations, glide to the next one in the
  // direction of travel so the camera never stops mid-flight. Off for reduced motion.
  useEffect(() => {
    if (prefersReduced()) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY, dir = 1, held = false;
    const snap = () => {
      const el = section.current;
      if (!el || held) return;
      const max = el.offsetHeight - window.innerHeight;
      const y = window.scrollY - el.offsetTop;
      if (y <= 2 || y >= max - 2) return; // outside the journey or already on an end station
      const seg = max / stops;
      const f = y / seg;
      // Leave the current station only after a deliberate nudge (15% of a leg).
      const idx = dir > 0 ? Math.ceil(f - 0.15) : Math.floor(f + 0.15);
      const dest = el.offsetTop + Math.min(stops, Math.max(0, idx)) * seg;
      if (Math.abs(dest - window.scrollY) > 2) smoothScrollTo(dest, false);
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 0.5) dir = y > lastY ? 1 : -1;
      lastY = y;
      clearTimeout(timer);
      timer = setTimeout(snap, 180);
    };
    const down = () => { held = true; };
    const up = () => { held = false; clearTimeout(timer); timer = setTimeout(snap, 180); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchend", up, { passive: true });
    window.addEventListener("touchcancel", up, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", down);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchcancel", up);
    };
  }, [stops]);

  const enter = () => {
    setEntered(true);
    try { sessionStorage.setItem("ez-portfolio-entered", "1"); } catch {}
  };

  const goTo = (i: number) => {
    const el = section.current;
    if (!el) return;
    const max = el.offsetHeight - window.innerHeight;
    const leavingEnd = i > stops;
    smoothScrollTo(leavingEnd ? el.offsetTop + el.offsetHeight : el.offsetTop + (i / stops) * max, prefersReduced());
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
        <div className="absolute inset-x-0 bottom-14 z-10 px-4 text-center sm:bottom-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-3xl"
            >
              {ch ? (
                <ChapterCaption ch={ch} index={active} />
              ) : (
                <>
                  <p className="font-mono text-[11px] tracking-[0.35em] text-white/50"><span className="text-brand-500">00</span> / GATEWAY</p>
                  <h1 className="h-display mt-4 text-4xl font-medium tracking-tight sm:text-6xl">Our work, as a journey.</h1>
                  <p className="mx-auto mt-3 max-w-xl text-white/60">Six services, one station each. Travel through everything we build, sell and grow.</p>
                  <ScrollPrompt className="mt-8" onClick={() => goTo(1)} />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* What comes next */}
        <AnimatePresence>
          {active > 0 && (
            <motion.div
              key="next"
              className="absolute inset-x-0 bottom-4 z-10 flex justify-center sm:bottom-7"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <NextHint next={chapters[active] ?? null} onClick={() => goTo(active + 1)} />
            </motion.div>
          )}
        </AnimatePresence>

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
                <p className="mt-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                  <svg viewBox="0 0 24 24" className="ez-bob h-4 w-4 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v16M5 13l7 7 7-7" /></svg>
                  or scroll down to explore
                </p>
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
