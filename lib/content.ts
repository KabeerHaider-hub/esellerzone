export const projects = [
  {
    client: "EasyBoxCutter",
    title: "Complete store growth & paid marketing",
    tag: "E-Commerce Growth",
    services: ["Marketplace Management", "PPC", "Listing Optimisation"],
  },
  {
    client: "The Club Price",
    title: "Online store development & management",
    tag: "E-Commerce Solutions",
    services: ["Store Development", "Catalogue", "Operations"],
  },
  {
    client: "AgriShield US",
    title: "Website development & digital support",
    tag: "Digital Web Solutions",
    services: ["Website", "Social Media", "Lead Generation"],
  },
  {
    client: "The Embroider",
    title: "Website development & ongoing support",
    tag: "Custom Web Solutions",
    services: ["Website", "Maintenance", "SEO"],
  },
  {
    client: "Waleed Peerzada",
    title: "POS software & website development",
    tag: "POS & Web Technology",
    services: ["Software", "Website", "Integrations"],
  },
  {
    client: "Haysar",
    title: "Amazon & eBay store management",
    tag: "Marketplace Growth",
    services: ["Amazon", "eBay", "Account Health"],
  },
];

export const faqs = [
  {
    q: "Which marketplaces do you manage?",
    a: "Amazon, Walmart, eBay, TikTok Shop, Etsy and Shopify stores. We handle private label, wholesale and dropshipping models.",
  },
  {
    q: "Can you build a custom solution for my business?",
    a: "Yes. We start with a short discovery call to understand your goals, budget and timeline, then propose a plan built around them.",
  },
  {
    q: "How do you price projects?",
    a: "By service, scope, integrations and support level. Many services have starting packages; anything custom gets a fixed quote before work begins.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Always. Every build includes a support window, and we offer monthly care, management and growth plans after that.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Most of our clients are in the US, UK and Europe. Our team works your business hours, so communication stays fast.",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  category: string;
  body: { h?: string; p?: string; list?: string[] }[];
};

// Starter articles for SEO. Add new posts to this array; pages and the sitemap update automatically.
export const posts: Post[] = [
  {
    slug: "amazon-listing-optimization-guide",
    title: "Amazon Listing Optimization: A Practical Guide for 2026",
    excerpt: "Titles, bullets, images and backend keywords: the listing fundamentals that still move rankings and conversion on Amazon.",
    date: "2026-11-10",
    readMins: 6,
    category: "Marketplaces",
    body: [
      { p: "A great product with a weak listing rarely wins on Amazon. The listing is your shelf, your salesperson and your SEO all at once, so small improvements compound into more traffic and a higher conversion rate." },
      { h: "1. Write titles for humans and the algorithm", p: "Lead with the brand and the main keyword, then the key differentiator, size or quantity. Keep it readable on mobile, where most shoppers only see the first 80 characters." },
      { h: "2. Bullets that answer objections", p: "Each bullet should handle one buying question: what it is, who it's for, why it's better, what's included, and the guarantee. Put benefits first and specs second." },
      { h: "3. Images do most of the selling", list: ["A clean main image on pure white that fills 85% of the frame", "Lifestyle images that show scale and use", "Infographics that compare you to alternatives", "A short video when the category allows it"] },
      { h: "4. Use backend search terms properly", p: "Add synonyms, alternate spellings and Spanish terms you couldn't fit on the page. Don't repeat words already in the title, and don't use competitor brand names." },
      { h: "5. Measure, then iterate", p: "Track sessions, unit session percentage and search query performance in Brand Analytics. Change one element at a time so you know what worked." },
      { p: "Need a hand? Our marketplace team audits listings for free on a discovery call." },
    ],
  },
  {
    slug: "shopify-vs-custom-store",
    title: "Shopify vs a Custom E-Commerce Store: Which Is Right for You?",
    excerpt: "Speed to launch, cost, flexibility and scale. How to pick the platform that matches your stage of growth.",
    date: "2026-10-28",
    readMins: 5,
    category: "E-Commerce",
    body: [
      { p: "Choosing a platform is one of the biggest early decisions for an online brand. The right answer depends on your catalogue, your budget and how unusual your operations are." },
      { h: "When Shopify wins", list: ["You want to launch in weeks, not months", "Your catalogue and checkout are fairly standard", "You'd rather pay a monthly fee than maintain servers", "You rely on the app ecosystem for reviews, upsells and subscriptions"] },
      { h: "When a custom build wins", list: ["You have complex pricing, B2B rules or configurators", "You need deep integration with ERP or POS software", "Transaction and app fees are eating your margin at scale", "Performance and full design control are critical"] },
      { h: "The middle path: headless", p: "Many growing brands keep Shopify for products and checkout but build the storefront in Next.js. You get Shopify's reliability with a fast, fully custom front end." },
      { p: "Not sure which fits? We'll map your requirements and recommend the leanest option, even if it's the simplest one." },
    ],
  },
  {
    slug: "ai-automation-for-online-sellers",
    title: "5 AI Automations Every Online Seller Should Set Up",
    excerpt: "From customer replies to inventory alerts, these automations save hours each week without adding headcount.",
    date: "2026-10-14",
    readMins: 4,
    category: "AI & Automation",
    body: [
      { p: "AI is no longer a buzzword for e-commerce teams. It's the fastest way to scale operations without scaling payroll. Here are five automations with the quickest payback." },
      { h: "1. Instant customer replies", p: "An AI assistant trained on your policies and order data answers 'where is my order?' and return questions in seconds, and hands complex cases to a human." },
      { h: "2. Low-stock and reorder alerts", p: "Connect sales velocity to supplier lead times and get a message before you stock out, not after." },
      { h: "3. Review monitoring", p: "Flag negative reviews and summarise recurring complaints so product and listing fixes happen quickly." },
      { h: "4. Listing drafts at scale", p: "Generate first-draft titles, bullets and descriptions from product specs, then have a human polish them." },
      { h: "5. Weekly performance digests", p: "Pull sales, ad spend and profit into one automated report delivered to your inbox every Monday." },
    ],
  },
  {
    slug: "local-seo-checklist",
    title: "The Small Business SEO Checklist That Actually Moves Rankings",
    excerpt: "Skip the noise. These are the technical, on-page and local SEO tasks with the biggest impact for small businesses.",
    date: "2026-09-30",
    readMins: 5,
    category: "SEO",
    body: [
      { p: "SEO can feel endless, but most small business sites are held back by the same handful of issues. Fix these first." },
      { h: "Technical foundations", list: ["Site loads in under 2.5 seconds on mobile", "Every page is indexable and in your XML sitemap", "HTTPS everywhere, no broken links or redirect chains"] },
      { h: "On-page essentials", list: ["One clear primary keyword per page", "Unique title tags and meta descriptions", "Descriptive headings and internal links between related pages"] },
      { h: "Local signals", list: ["A complete, verified Google Business Profile", "Consistent name, address and phone across directories", "A steady flow of genuine customer reviews"] },
      { h: "Content that earns links", p: "Publish genuinely useful guides like this one. They attract links and answer the questions your buyers are already searching." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
