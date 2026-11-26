"use client";
import Link from "next/link";
import Image from "next/image";
import { useHomeHref } from "./useHomeHref";
import icon from "@/public/brand/logo-icon.png";
import lockup from "@/public/brand/logo-lockup.png";
import stacked from "@/public/brand/logo-stacked.png";

/** Official eSeller Zone "e" mark (no wordmark). */
export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return <Image src={icon} alt="" aria-hidden="true" className={className} priority />;
}

/** Official stacked logo: mark above the SELLER ZONE wordmark. */
export function LogoStacked({ className = "h-28 w-auto" }: { className?: string }) {
  return <Image src={stacked} alt="eSeller Zone" className={className} />;
}

/** Header/footer logo: the official mark and wordmark side by side. */
export function Logo({ className = "" }: { className?: string }) {
  const home = useHomeHref();
  return (
    <Link href={home} className={`group inline-flex items-center ${className}`} aria-label="eSeller Zone home">
      <Image src={lockup} alt="eSeller Zone" priority className="h-9 w-auto transition duration-500 group-hover:drop-shadow-[0_0_14px_rgba(255,89,13,0.6)] sm:h-10" />
    </Link>
  );
}
