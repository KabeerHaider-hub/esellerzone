"use client";
import Link from "next/link";
import { useHomeHref } from "./useHomeHref";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ez-grad" x1="10" y1="10" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB15C" />
          <stop offset="1" stopColor="#F26A1B" />
        </linearGradient>
      </defs>
      <path d="M11 33H53A21 21 0 1 0 40.5 52.2" stroke="#fff" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 26.5A11 11 0 0 1 43 26.5Z" fill="url(#ez-grad)" />
      <rect x="47" y="44" width="11" height="11" rx="2.2" transform="rotate(45 52.5 49.5)" fill="url(#ez-grad)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  const home = useHomeHref();
  return (
    <Link href={home} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="eSeller Zone home">
      <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[-8deg]" />
      <span className="font-display text-[1.05rem] font-semibold leading-none tracking-[0.14em] text-white">
        SELLER<span className="ml-1.5 text-brand-500">ZONE</span>
      </span>
    </Link>
  );
}
