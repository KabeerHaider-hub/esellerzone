import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = { title: "Home (Option 2)", robots: { index: false } };

// Kept so old /v2/ links still work; the main home page now shows this same design.
export default function HomeV2() {
  return <HomePage variant="cosmic" />;
}
