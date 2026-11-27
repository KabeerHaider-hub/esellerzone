"use client";
import { useEffect, useRef } from "react";

// Futuristic 3D hero (see heroSceneEngine.ts). three.js is about 150 KB of JavaScript, so it is
// loaded only after the page has painted and the browser is idle. The text and CSS glow show
// straight away, which keeps the page fast for visitors and for Google's Core Web Vitals.
export function HeroScene({ mode = "hero" }: { mode?: "hero" | "fixed" }) {
  const fixed = mode === "fixed";
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const load = () => {
      import("./heroSceneEngine").then(({ startHeroScene }) => {
        if (!cancelled) cleanup = startHeroScene(el, fixed);
      });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let idle = 0;
    const timer = window.setTimeout(() => {
      if (w.requestIdleCallback) idle = w.requestIdleCallback(load, { timeout: 2500 });
      else load();
    }, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
      cleanup?.();
    };
  }, [fixed]);

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}
