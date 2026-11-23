import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = { title: "Home (Option 1)", robots: { index: false } };

// Option 1: the planet sits in the hero and bursts apart as you scroll.
export default function HomeV1() {
  return <HomePage variant="classic" />;
}
