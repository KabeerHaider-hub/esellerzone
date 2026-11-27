import { HomePage } from "@/components/HomePage";
import { pageMeta, JsonLd, ldFaq } from "@/lib/seo";
import { faqs } from "@/lib/content";

export const metadata = pageMeta({
  title: "E-Commerce & Amazon Agency | eSeller Zone",
  absoluteTitle: true,
  description:
    "E-commerce agency for US, UK and global brands: Amazon and Walmart management, Shopify stores, websites, SEO, ads and social media.",
  path: "/",
});

// Main home page: the 3D planet stays behind the whole page (Option 2).
// Set NEXT_PUBLIC_HOME_VARIANT=classic to switch back to Option 1. Option 1 also lives at /v1/.
const variant = process.env.NEXT_PUBLIC_HOME_VARIANT === "classic" ? "classic" : "cosmic";

export default function Home() {
  return (
    <>
      <HomePage variant={variant} />
      <JsonLd data={ldFaq(faqs)} />
    </>
  );
}
