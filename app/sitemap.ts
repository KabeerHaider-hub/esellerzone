import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { posts } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = ["", "/services/", "/about/", "/portfolio/", "/blog/", "/contact/", "/terms/"].map((p) => ({ url: `${site.domain}${p || "/"}` }));
  return [
    ...base,
    ...services.map((s) => ({ url: `${site.domain}/services/${s.slug}/` })),
    ...posts.map((p) => ({ url: `${site.domain}/blog/${p.slug}/`, lastModified: p.date })),
  ];
}
