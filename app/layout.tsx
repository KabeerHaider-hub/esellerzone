import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollFx";
import { SmoothScroll, Cursor, Grain } from "@/components/Experience";
import { site } from "@/lib/site";
import { JsonLd, ldSiteGraph, defaultOgImage, isPreviewBuild } from "@/lib/seo";
import { Analytics } from "@/components/Analytics";

// Fonts are self-hosted (app/fonts, SIL Open Font License) so builds never depend on reaching Google Fonts.
const display = localFont({ src: "./fonts/sora-latin-wght-normal.woff2", variable: "--font-display", weight: "100 800", display: "swap" });
const body = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-body", weight: "100 900", display: "swap" });

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: `${site.name} | E-Commerce, Amazon & Web Development Agency`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.domain }],
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  icons: { icon: `${base}/brand/favicon.png`, apple: `${base}/brand/logo-icon.png` },
  openGraph: { type: "website", siteName: site.name, locale: "en_US", title: site.name, description: site.description, images: [defaultOgImage] },
  twitter: { card: "summary_large_image" },
  // Preview builds (GitHub Pages, Vercel previews) stay out of Google so they never compete with esellerzone.com.
  robots: isPreviewBuild
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  // Paste verification codes into these env vars once Search Console / Bing Webmaster Tools give them to you.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || site.googleSiteVerification,
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = { themeColor: "#05060A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-ink-950">Skip to content</a>
        <SmoothScroll />
        <Cursor />
        <Grain />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={ldSiteGraph()} />
        <Analytics />
      </body>
    </html>
  );
}
