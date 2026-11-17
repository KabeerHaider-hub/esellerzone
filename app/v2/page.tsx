import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Home (Option 2)",
  robots: { index: false }, // demo variant: keep it out of search results
};

// Option 2: the particle planet stays fixed behind the whole home page and travels as you scroll.
export default function HomeV2() {
  return <HomePage variant="cosmic" />;
}
