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
  /** Last meaningful update (YYYY-MM-DD). Shown to Google as dateModified. */
  updated?: string;
  /** Related service slugs, linked at the end of the article. */
  services?: string[];
  readMins: number;
  category: string;
  body: { h?: string; p?: string; list?: string[] }[];
};

// Starter articles for SEO. Add new posts to this array; pages and the sitemap update automatically.
export const posts: Post[] = [
  {
    slug: "amazon-account-management-services",
    services: ["marketplace-management", "ppc-paid-advertising"],
    title: "Amazon Account Management Services: What's Included and What It Costs",
    excerpt: "What a good Amazon account management agency actually does each week, how pricing works, and the questions to ask before you hire one.",
    date: "2026-11-27",
    readMins: 6,
    category: "Marketplaces",
    body: [
      { p: "Amazon rewards sellers who show up every day: fresh listings, healthy inventory, tuned ads and fast answers to customers. Account management services exist because most founders can't do all of that and still run the business. Here is what you should expect, and what it typically costs." },
      { h: "What's included in Amazon account management", list: ["Listing creation and optimisation: titles, bullets, A+ content, backend search terms and image direction", "Sponsored Products, Brands and Display campaigns managed against ACoS and TACoS targets", "Inventory planning so you never stock out before a peak or pay long-term storage fees", "Account health: policy warnings, suppressed listings, cases and reinstatement support", "Customer messages, returns and review monitoring", "Weekly or monthly reporting on sales, profit and ad spend"] },
      { h: "Walmart, eBay and TikTok Shop too", p: "Most brands that grow on Amazon expand to Walmart Marketplace, eBay or TikTok Shop next. Managing them with the same team keeps pricing, inventory and branding consistent, and one report shows every channel side by side." },
      { h: "How pricing usually works", p: "Agencies charge a fixed monthly fee, a percentage of sales, or a mix. Fixed fees are easier to budget. At eSeller Zone, management starts at $499 a month for one marketplace, $999 for up to two with PPC management, and $1,499 for up to four with a dedicated account manager." },
      { h: "Questions to ask before you hire", list: ["Who exactly will work on my account, and how many accounts do they handle?", "Which metrics will you report, and how often?", "Do I keep full ownership of my Seller Central account and brand registry?", "What happens to my listings and data if we stop working together?", "Can you show results for brands in my category?"] },
      { h: "Red flags", list: ["Guaranteed rankings or sales figures", "Asking for your account login instead of user permissions", "Review schemes or anything against Amazon's terms of service", "Long lock-in contracts before any results"] },
      { p: "Want a second opinion on your account? Book a free strategy call and we'll audit your listings, ads and account health." },
    ],
  },
  {
    slug: "shopify-store-development-cost",
    services: ["ecommerce-development", "website-development"],
    title: "How Much Does It Cost to Build a Shopify Store in 2026?",
    excerpt: "A clear breakdown of Shopify store development costs: platform fees, themes, apps, custom design and ongoing support.",
    date: "2026-11-26",
    readMins: 5,
    category: "E-Commerce",
    body: [
      { p: "The honest answer is anywhere from a few hundred dollars to tens of thousands. What moves the price is how much is custom, how many products you have, and what has to connect to the store. Here is how the budget breaks down." },
      { h: "1. Platform and app fees (monthly)", p: "Shopify charges a monthly plan fee plus payment processing, and most stores add a handful of paid apps for reviews, upsells, email and subscriptions. Check Shopify's current pricing page, and budget for apps separately: they add up quickly." },
      { h: "2. Theme or custom design (one-off)", list: ["Premium theme, customised to your brand: the fastest and cheapest route", "Custom design on top of a theme: unique look, faster launch than a full build", "Fully custom or headless storefront (for example Next.js on Shopify): best performance and flexibility, highest cost"] },
      { h: "3. Setup and build work", list: ["Product upload, collections and filters", "Payment gateways, shipping rates and taxes", "Integrations with inventory, ERP, POS or marketplaces", "Speed optimisation, basic SEO and analytics", "Testing on phones, tablets and desktops"] },
      { h: "Typical packages", p: "As a guide, eSeller Zone builds start at $999 for a customised store with up to 100 products, $1,699 for a custom design with unlimited products and integrations, and $2,999 for a growth-ready store with automation flows and 90 days of support." },
      { h: "Costs people forget", list: ["Product photography and copywriting", "Ongoing updates, backups and app maintenance", "Marketing to bring the first visitors in: SEO, ads and social media"] },
      { p: "Send us your product count and must-have features and we'll give you a fixed quote, usually within one business day." },
    ],
  },
  {
    slug: "social-media-marketing-for-ecommerce",
    services: ["social-media-marketing", "branding-creative"],
    title: "Social Media Marketing for E-Commerce Brands: A 90-Day Plan",
    excerpt: "A practical 90-day social media plan for online stores: which platforms to pick, what to post, and how to turn followers into sales.",
    date: "2026-11-25",
    readMins: 6,
    category: "Social Media",
    body: [
      { p: "Posting every day without a plan burns time and rarely sells. Online brands that grow on social media pick the right platforms, post content that answers buying questions, and connect every post to a measurable next step." },
      { h: "Days 1 to 30: foundations", list: ["Choose two platforms where your buyers already are: Instagram and TikTok for consumer products, LinkedIn for B2B", "Make bios, links and highlights point to your best-selling products", "Set up tracking so you can see which posts drive store visits and sales", "Build a library of product photos, short videos and customer content"] },
      { h: "Days 31 to 60: a content rhythm", list: ["Three content pillars: product in use, behind the scenes, and customer stories", "Short videos first; they reach new people on every major platform", "Reply to every comment and message within a day", "Test one small paid campaign to boost your best organic post"] },
      { h: "Days 61 to 90: scale what works", list: ["Turn top posts into ads aimed at lookalike audiences", "Retarget store visitors who didn't buy", "Partner with two or three creators in your niche", "Review the numbers and cut what isn't driving sales"] },
      { h: "What to measure", list: ["Reach and follower growth (awareness)", "Saves, shares and comments (interest)", "Clicks to the store and add-to-carts (intent)", "Sales and return on ad spend (results)"] },
      { p: "Want this run for you? Our social media team plans, creates and manages content and campaigns for e-commerce brands." },
    ],
  },
  {
    slug: "amazon-listing-optimization-guide",
    services: ["marketplace-management", "ppc-paid-advertising"],
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
    services: ["ecommerce-development", "website-development"],
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
    services: ["ai-automation", "software-solutions"],
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
    services: ["seo-services", "website-development"],
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
