// SEO helpers: one place for page metadata (title, description, canonical, Open Graph, Twitter)
// and schema.org structured data (JSON-LD). Pages call pageMeta() and the ld* builders.
import type { Metadata } from "next";
import { site } from "./site";
import { services, type Service } from "./services";
import type { Post } from "./content";

const D = site.domain;
export const abs = (path = "/") => `${D}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Preview builds should not be indexed: GitHub Pages (has a base path), Vercel previews,
 * or anything built with NEXT_PUBLIC_NOINDEX=1. Production on esellerzone.com is indexed.
 */
export const isPreviewBuild =
  !!process.env.NEXT_PUBLIC_BASE_PATH ||
  process.env.NEXT_PUBLIC_NOINDEX === "1" ||
  (!!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");

export const defaultOgImage = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: `${site.name}: e-commerce, web development and social media agency`,
};

type MetaInput = {
  title: string;
  description: string;
  path: string; // e.g. "/services/seo-services/"
  absoluteTitle?: boolean; // true = don't append " | eSeller Zone"
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

/** Full metadata for a page. Child metadata replaces (not merges) openGraph, so every page sets it all. */
export function pageMeta({ title, description, path, absoluteTitle, type = "website", publishedTime, modifiedTime, noindex }: MetaInput): Metadata {
  // Google shows about 60 characters. Long titles (e.g. blog posts) drop the brand suffix instead of being cut off.
  const plain = absoluteTitle || `${title} | ${site.name}`.length > 65;
  const fullTitle = plain ? title : `${title} | ${site.name}`;
  return {
    title: plain ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [defaultOgImage],
      ...(type === "article" ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors: [site.name] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [defaultOgImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ----------------------------- Structured data ----------------------------- */

const ids = {
  org: `${D}/#organization`,
  website: `${D}/#website`,
  logo: `${D}/#logo`,
  office: (id: string) => `${D}/#office-${id}`,
};

const postalAddress = (o: (typeof site.offices)[number]) => ({
  "@type": "PostalAddress",
  streetAddress: o.street,
  addressLocality: o.locality,
  addressRegion: o.region,
  postalCode: o.postalCode,
  addressCountry: o.country,
});

const hours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: site.openingHours.days,
  opens: site.openingHours.opens,
  closes: site.openingHours.closes,
};

const areaServed = site.areaServed.map((c) => ({ "@type": "Country", name: c }));

/** Site-wide graph: the company, the website, and each office as a local business. */
export function ldSiteGraph() {
  const logo = { "@type": "ImageObject", "@id": ids.logo, url: abs("/brand/logo-stacked.png"), contentUrl: abs("/brand/logo-stacked.png"), caption: site.name };
  const sameAs = site.socials.map((s) => s.href);
  const offices = site.offices.map((o) => ({
    "@type": "ProfessionalService",
    "@id": ids.office(o.id),
    name: o.id === "karachi" ? site.name : `${site.name} (${o.label})`,
    description: site.description,
    url: abs("/"),
    image: abs(defaultOgImage.url),
    logo: { "@id": ids.logo },
    email: site.email,
    ...(o.phone ? { telephone: o.phone } : {}),
    address: postalAddress(o),
    openingHoursSpecification: hours,
    priceRange: "$$",
    areaServed,
    parentOrganization: { "@id": ids.org },
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ids.org,
        name: site.name,
        alternateName: ["eSellerZone", "E Seller Zone"],
        url: abs("/"),
        logo: { "@id": ids.logo },
        image: { "@id": ids.logo },
        description: site.description,
        slogan: site.tagline,
        email: site.email,
        address: postalAddress(site.offices[0]),
        department: offices.map((o) => ({ "@id": o["@id"] })),
        contactPoint: [
          ...site.offices.filter((o) => o.phone).map((o) => ({
            "@type": "ContactPoint",
            telephone: o.phone,
            contactType: "sales",
            areaServed: o.country,
            availableLanguage: ["English", "Urdu"],
          })),
          { "@type": "ContactPoint", email: site.email, contactType: "customer support", availableLanguage: ["English", "Urdu"] },
        ],
        areaServed,
        knowsAbout: services.map((s) => s.title),
        sameAs,
      },
      logo,
      ...offices,
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: abs("/"),
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": ids.org },
      },
    ],
  };
}

/** Breadcrumb trail. Pass [["Services", "/services/"], ["SEO Services", "/services/seo-services/"]]. */
export function ldBreadcrumbs(items: [string, string][]) {
  const all: [string, string][] = [["Home", "/"], ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

const priceNumber = (p: string) => p.replace(/[^\d.]/g, "");

export function ldService(s: Service) {
  const url = abs(`/services/${s.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.seoTitle ?? s.title,
    serviceType: s.title,
    description: s.intro,
    url,
    provider: { "@id": ids.org },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} services`,
      itemListElement: s.features.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: f.title, description: f.text } })),
    },
    ...(s.packages
      ? {
          offers: s.packages.map((p) => ({
            "@type": "Offer",
            name: `${s.title}: ${p.name}`,
            description: p.note,
            url: `${url}#packages`,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: priceNumber(p.price),
              priceCurrency: "USD",
              ...(p.price.includes("/mo") ? { unitText: "MONTH" } : {}),
              valueAddedTaxIncluded: false,
            },
          })),
        }
      : {}),
  };
}

export function ldServiceList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} services`,
    itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: abs(`/services/${s.slug}/`) })),
  };
}

export function ldPost(p: Post) {
  const url = abs(`/blog/${p.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: p.title,
    description: p.excerpt,
    url,
    mainEntityOfPage: url,
    image: abs(defaultOgImage.url),
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    articleSection: p.category,
    inLanguage: "en",
    author: { "@type": "Organization", "@id": ids.org, name: site.name, url: abs("/") },
    publisher: { "@id": ids.org },
    isPartOf: { "@id": ids.website },
  };
}

export function ldFaq(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Render one or more JSON-LD objects. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
