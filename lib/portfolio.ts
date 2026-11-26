// Portfolio chapters. Each one is a "station" in the 3D journey on /portfolio/
// and has its own detail page at /portfolio/<slug>/.
// TODO(owner): add real projects to each chapter's `projects` list when the team sends them.

export type Project = {
  name: string;
  client?: string;
  summary: string;
  tags: string[];
  link?: string;
  results?: string[];
  image?: string; // path under /public, e.g. "/portfolio/acme-home.jpg"
};

export type Chapter = {
  slug: string;
  code: string; // short label shown on the HUD
  title: string;
  tagline: string;
  intro: string;
  model: "browser" | "boxes" | "phone" | "prism" | "chart" | "stack";
  services: string[];
  projects: Project[];
};

export const chapters: Chapter[] = [
  {
    slug: "web-design-development",
    code: "WEB",
    title: "Website Design & Development",
    tagline: "Fast, beautiful sites engineered to convert.",
    intro:
      "Custom websites, landing pages and web apps built on modern stacks like Next.js, React and WordPress, designed around how your customers buy.",
    model: "browser",
    services: ["UI/UX design", "Next.js & React builds", "WordPress & CMS", "Landing pages", "Speed & Core Web Vitals", "Care plans"],
    projects: [],
  },
  {
    slug: "marketplace-management",
    code: "MKT",
    title: "Marketplace Management",
    tagline: "Amazon, Walmart, eBay and TikTok Shop, run end to end.",
    intro:
      "Account setup, listings, sourcing, advertising and daily operations across the marketplaces your customers already shop on.",
    model: "boxes",
    services: ["Account setup", "Listing optimisation & A+", "Product research & sourcing", "Marketplace PPC", "Inventory & account health", "Private label, wholesale, dropship"],
    projects: [],
  },
  {
    slug: "e-commerce-stores",
    code: "COM",
    title: "E-Commerce Stores",
    tagline: "Shopify and custom stores built to sell.",
    intro: "Storefronts, checkout, payments, inventory and automation wired together so your store runs smoothly at any scale.",
    model: "stack",
    services: ["Shopify builds", "Custom stores", "Payments & checkout", "Inventory & orders", "Automation & reporting"],
    projects: [],
  },
  {
    slug: "social-media",
    code: "SOC",
    title: "Social Media Marketing",
    tagline: "Content and community that turns followers into customers.",
    intro: "Strategy, content, publishing and community management across Instagram, Facebook, TikTok and LinkedIn.",
    model: "phone",
    services: ["Platform strategy", "Content creation", "Reels & short video", "Community management", "Reporting"],
    projects: [],
  },
  {
    slug: "seo-paid-ads",
    code: "ADS",
    title: "SEO & Paid Ads",
    tagline: "Traffic, leads and sales you can measure.",
    intro: "Technical and content SEO plus Google, Meta and marketplace ad campaigns, tuned every week for return on spend.",
    model: "chart",
    services: ["SEO audits & strategy", "Content & link building", "Google Ads", "Meta Ads", "Tracking & reporting"],
    projects: [],
  },
  {
    slug: "branding-creative",
    code: "BRD",
    title: "Branding & Creative",
    tagline: "Identities people remember.",
    intro: "Logos, brand systems, packaging, social creatives and motion that make your brand recognisable everywhere.",
    model: "prism",
    services: ["Logo & identity", "Brand guidelines", "Packaging", "Social creatives", "Motion & video"],
    projects: [],
  },
];

export const getChapter = (slug: string) => chapters.find((c) => c.slug === slug);
