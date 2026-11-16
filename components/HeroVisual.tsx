"use client";
import { motion } from "framer-motion";
import { LogoMark } from "./Logo";
import { Icon, type AnyIcon } from "./Icon";

const chips: { label: string; icon: AnyIcon; pos: string; delay: number }[] = [
  { label: "Marketplaces", icon: "store", pos: "left-0 top-[14%]", delay: 0.2 },
  { label: "AI Automation", icon: "bot", pos: "right-0 top-[26%]", delay: 0.35 },
  { label: "SEO & Ads", icon: "target", pos: "left-[2%] bottom-[14%]", delay: 0.5 },
  { label: "Web & Apps", icon: "code", pos: "right-[0%] bottom-[8%]", delay: 0.65 },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* orbits */}
      <div className="absolute inset-[6%] rounded-full border border-white/10" />
      <div className="absolute inset-[6%] animate-spin-slow rounded-full">
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] bg-brand-500 shadow-[0_0_20px_4px_rgba(245,130,32,0.7)]" />
      </div>
      <div className="absolute inset-[20%] rounded-full border border-dashed border-brand-500/30" />
      <div className="absolute inset-[20%] animate-spin-slow rounded-full [animation-direction:reverse] [animation-duration:28s]">
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,0.6)]" />
      </div>
      <div className="absolute inset-[33%] rounded-full bg-brand-500/25 blur-3xl animate-pulseglow" />
      {/* core */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[32%] grid place-items-center rounded-[28%] border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl shadow-[0_0_80px_-10px_rgba(245,130,32,0.6)]"
      >
        <LogoMark className="h-[58%] w-[58%] animate-float" />
      </motion.div>
      {/* chips */}
      {chips.map((c) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: c.delay + 0.4, duration: 0.6 }}
          className={`absolute ${c.pos} glass flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-white shadow-xl sm:text-sm`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-500/15 text-brand-400"><Icon name={c.icon} className="h-4 w-4" /></span>
          {c.label}
        </motion.div>
      ))}
    </div>
  );
}
