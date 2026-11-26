"use client";
import Link from "next/link";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, animate, type MotionValue } from "framer-motion";
import { Icon } from "./Icon";
import type { Service } from "@/lib/services";

/** Thin orange bar at the very top that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-300 via-brand-500 to-brand-600 shadow-[0_0_12px_rgba(255,89,13,0.8)]"
    />
  );
}

/** Hero wrapper: content drifts up and fades, the visual scales and tilts, as you scroll past. */
export function HeroParallax({ copy, visual }: { copy: ReactNode; visual: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yVis = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -12]);
  return (
    <div ref={ref} className="container-x relative grid items-center gap-14 pb-20 lg:grid-cols-[1.1fr_1fr]">
      <motion.div style={{ y: yCopy, opacity: fade }}>{copy}</motion.div>
      <motion.div style={{ y: yVis, scale, rotate, opacity: fade }}>{visual}</motion.div>
    </div>
  );
}

/** Big statement whose words light up one by one as it scrolls through the viewport. */
export function ScrollText({ text, accent = [] }: { text: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="h-display flex flex-wrap text-3xl leading-[1.15] sm:text-5xl lg:text-6xl">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent.includes(w.replace(/[.,]/g, ""))}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] mt-1 ${accent ? "text-brand-500" : "text-white"}`}>
      {children}
    </motion.span>
  );
}

/** Pinned section: services slide horizontally while the page scrolls vertically (desktop). */
export function HorizontalServices({ services }: { services: Service[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) setDist(Math.max(0, el.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* desktop: pinned horizontal scroll */}
      <section ref={ref} className="relative hidden lg:block" style={{ height: `${services.length * 38}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x flex items-end justify-between">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="h-display mt-5 text-5xl">Eleven services. <span className="text-white/40">One team.</span></h2>
            </div>
            <Link href="/services/" className="btn-ghost">All services <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <motion.div ref={track} style={{ x }} className="mt-12 flex w-max gap-6 pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                className="group relative flex h-[420px] w-[380px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-8 backdrop-blur-md transition hover:border-brand-500/50"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/0 blur-3xl transition duration-500 group-hover:bg-brand-500/30" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-white/35">{String(i + 1).padStart(2, "0")} / {services.length}</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">{s.category}</span>
                </div>
                <div className="mt-10 grid h-14 w-14 place-items-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400 transition group-hover:bg-brand-500 group-hover:text-ink-950">
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 flex-1 text-white/55">{s.short}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-400">
                  Learn more <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </motion.div>
          <div className="container-x mt-12">
            <div className="h-px w-full bg-white/10">
              <motion.div style={{ width: bar }} className="h-px bg-brand-500 shadow-[0_0_10px_rgba(255,89,13,0.9)]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Number that counts up when it scrolls into view. Non-numeric values render as-is. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^(\d+)(.*)$/);
  const [n, setN] = useState(match ? 0 : null);
  useEffect(() => {
    if (!inView || !match) return;
    const c = animate(0, Number(match[1]), { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return <span ref={ref}>{match ? `${n}${match[2]}` : value}</span>;
}

/** Process timeline whose connecting line draws itself as you scroll. */
export function ScrollLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-white/10 md:block" />
      <motion.div style={{ scaleX }} className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-brand-300 to-brand-600 shadow-[0_0_10px_rgba(255,89,13,0.8)] md:block" />
      {children}
    </div>
  );
}

/** Image/visual that moves at a different speed from the page. */
export function Parallax({ children, speed = 80, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
