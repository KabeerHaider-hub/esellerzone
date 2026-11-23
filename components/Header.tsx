"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";
import { Icon } from "./Icon";
import { useHomeHref } from "./useHomeHref";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const home = useHomeHref();
  const links = nav.map((n) => (n.href === "/" ? { ...n, href: home } : n));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const isActive = (href: string) => (href === "/" || href === "/v1/" ? path === "/" || !!path?.startsWith("/v1") || !!path?.startsWith("/v2") : !!path?.startsWith(href.replace(/\/$/, "")));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`container-x flex h-16 items-center justify-between rounded-2xl border transition-all duration-500 ${
          scrolled || open ? "border-white/10 bg-ink-900/70 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`relative rounded-full px-4 py-2 text-sm transition ${isActive(n.href) ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              {isActive(n.href) && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]" />
              )}
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact/" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Get a free audit <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-white transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-x mt-2 rounded-2xl border border-white/10 bg-ink-900/95 p-3 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            {links.map((n) => (
              <Link key={n.href} href={n.href} className={`block rounded-xl px-4 py-3 text-base ${isActive(n.href) ? "bg-white/5 text-white" : "text-white/70"}`}>
                {n.label}
              </Link>
            ))}
            <Link href="/contact/" className="btn-primary mt-2 w-full">Get a free audit</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
