import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

// Design option kept for reference. Kept out of Google so it never competes with the real home page.
export const metadata: Metadata = { title: "Home (Option 2)", robots: { index: false, follow: true } };

// Kept so old /v2/ links still work; the main home page now shows this same design.
export default function HomeV2() {
  return <HomePage variant="cosmic" />;
}
