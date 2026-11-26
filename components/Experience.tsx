"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { LogoStacked } from "./Logo";

/** Buttery smooth scrolling (native scroll position, so scroll animations keep working). */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}

/** Cinematic intro: logo, a counter to 100, then the curtain lifts. Shown once per visit. */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ez-intro") === "1"; sessionStorage.setItem("ez-intro", "1"); } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShow(false); return; }
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => { setShow(false); document.documentElement.style.overflow = ""; }, 250);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); document.documentElement.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ scale: 0.6, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <LogoStacked className="h-36 w-auto drop-shadow-[0_0_30px_rgba(255,89,13,0.45)]" />
          </motion.div>
          <div className="mt-10 h-px w-56 overflow-hidden bg-white/10">
            <div className="h-full bg-brand-500 shadow-[0_0_12px_rgba(255,89,13,1)]" style={{ width: `${n}%` }} />
          </div>
          <p className="mt-5 font-display text-sm tabular-nums tracking-[0.4em] text-white/50">{String(n).padStart(3, "0")}</p>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Glowing custom cursor: a dot plus a lagging ring that grows over links (mouse devices only). */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100 }, r = { x: -100, y: -100 };
    let hover = false, down = false, raf = 0;
    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      const t = e.target as HTMLElement;
      hover = !!t.closest("a, button, summary, select, input, textarea, [data-cursor]");
    };
    const dn = () => { down = true; }, up = () => { down = false; };
    const loop = () => {
      r.x += (pos.x - r.x) * 0.16; r.y += (pos.y - r.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
      if (ring.current) {
        const s = (hover ? 1.9 : 1) * (down ? 0.8 : 1);
        ring.current.style.transform = `translate3d(${r.x}px,${r.y}px,0) translate(-50%,-50%) scale(${s})`;
        ring.current.style.backgroundColor = hover ? "rgba(255,89,13,0.12)" : "transparent";
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border border-brand-500/70 transition-[background-color] duration-200" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_2px_rgba(255,89,13,0.9)]" />
    </>
  );
}

/** Film grain + scanline overlay for a cinematic, tactile finish. */
export function Grain() {
  return <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[80]" />;
}

/** Wraps a button/link so it gently pulls toward the cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return;
    const b = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * strength}px, ${(e.clientY - b.top - b.height / 2) * strength}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="inline-block transition-transform duration-300 ease-out will-change-transform">
      {children}
    </span>
  );
}

/** Headline whose letters rise out of a mask one after another. */
export function SplitReveal({ text, className = "", delay = 0, accentFrom }: { text: string; className?: string; delay?: number; accentFrom?: number }) {
  const words = text.split(" ");
  const letter = {
    hidden: { y: "110%", rotate: 8, opacity: 0 },
    show: (i: number) => ({ y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.8, delay: delay + i * 0.022, ease: [0.22, 1, 0.36, 1] } }),
  };
  let idx = 0;
  return (
    <motion.span className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {words.map((w, wi) => {
        const accent = accentFrom !== undefined && wi >= accentFrom;
        return (
          <span key={wi} aria-hidden="true" className="inline-block overflow-hidden whitespace-nowrap pb-[0.1em] align-bottom">
            {w.split("").map((ch) => {
              const i = idx++;
              return (
                <motion.span key={i} custom={i} variants={letter} className={`inline-block ${accent ? "text-brand-500" : ""}`}>
                  {ch}
                </motion.span>
              );
            })}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
}

/** Giant outlined words that slide sideways with scroll, between sections. */
export function KineticBand({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);
  const line = [...words, ...words, ...words];
  return (
    <div ref={ref} className="relative mt-32 select-none overflow-hidden py-6" aria-hidden="true">
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap font-display text-[12vw] font-semibold leading-none text-outline">
        {line.map((w, i) => <span key={i} className="mr-[4vw]">{w}<span className="ml-[4vw] inline-block h-[0.18em] w-[0.18em] rotate-45 bg-brand-500 align-middle" /></span>)}
      </motion.div>
      <motion.div style={{ x: x2 }} className="mt-2 flex whitespace-nowrap font-display text-[12vw] font-semibold leading-none text-white/[0.06]">
        {line.map((w, i) => <span key={i} className="mr-[4vw]">{w}<span className="ml-[4vw] inline-block h-[0.18em] w-[0.18em] rotate-45 bg-brand-500/30 align-middle" /></span>)}
      </motion.div>
    </div>
  );
}

/** Section that scales and rounds in from the edges as it enters (used for the CTA). */
export function ScaleIn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [80, 24]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  return (
    <motion.div ref={ref} style={{ scale, borderRadius: radius, opacity }} className="overflow-hidden">
      {children}
    </motion.div>
  );
}
