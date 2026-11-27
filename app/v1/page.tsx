import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

// Design option kept for reference. Kept out of Google so it never competes with the real home page.
export const metadata: Metadata = { title: "Home (Option 1)", robots: { index: false, follow: true } };

// Option 1: the planet sits in the hero and bursts apart as you scroll.
export default function HomeV1() {
  return <HomePage variant="classic" />;
}
