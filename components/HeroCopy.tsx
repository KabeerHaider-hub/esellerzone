"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Hero text block that drifts up and fades away as you scroll past. */
export function HeroCopy({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} className="container-x relative pt-36 sm:pt-44">
      {children}
    </motion.div>
  );
}

/** Simple timed entrance for hero elements. */
export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}
