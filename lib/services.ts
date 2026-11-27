export type IconName =
  | "store"
  | "cart"
  | "code"
  | "phone"
  | "cpu"
  | "bot"
  | "pen"
  | "search"
  | "megaphone"
  | "target"
  | "book";

export type Package = { name: string; price: string; note: string; features: string[] };

export type Service = {
  slug: string;
  title: string;
  /** Search-friendly <title> (the " | eSeller Zone" suffix is added automatically). Aim for under 50 characters. */
  seoTitle?: string;
  /** Meta description for Google, 120 to 160 characters. Falls back to `intro`. */
  seoDescription?: string;
  short: string;
  icon: IconName;
  category: "Commerce" | "Build" | "Growth" | "Create";
  headline: string;
  intro: string;
  features: { title: string; text: string }[];
  process: string[];
  why: string[];
  packages?: Package[];
};

const steps = (a: string, b: string, c: string, d: string, e: string) => [a, b, c, d, e];

export const services: Service[] = [
  {
    slug: "marketplace-management",
    title: "Marketplace Management",
    seoTitle: "Amazon, Walmart & eBay Account Management",
    seoDescription:
      "Amazon, Walmart, eBay, TikTok Shop and Etsy account management: listings, PPC, sourcing, orders and account health, run end to end by eSeller Zone.",
    short: "Amazon, Walmart, eBay and TikTok Shop, run end to end: listings, sourcing, ads and account health.",
    icon: "store",
    category: "Commerce",
    headline: "Sell smarter on every marketplace.",
    intro:
      "We run your listings, orders, customer support, advertising and account performance on Amazon, Walmart, eBay, TikTok Shop and Etsy, so you can focus on the business while the stores grow.",
    features: [
      { title: "Private label", text: "Product launch, brand registry and listing strategy for your own brand." },
      { title: "Wholesale", text: "Brand approvals, supplier relationships and repeatable buy-box wins." },
      { title: "Dropshipping", text: "Supplier vetting, automated fulfilment and margin control." },
      { title: "Product research & sourcing", text: "Data-led product selection and reliable sourcing partners." },
      { title: "Account setup", text: "Seller Central, Walmart, eBay and TikTok Shop accounts set up correctly from day one." },
      { title: "Listings & catalogue", text: "SEO-rich titles, bullets, A+ content and image direction." },
      { title: "Marketplace advertising", text: "Sponsored ads managed against ACoS and TACoS targets." },
      { title: "Store operations", text: "Orders, inventory, returns, cases and account health handled daily." },
    ],
    process: steps("Consultation & planning", "Product & market research", "Supplier sourcing & setup", "Store launch & management", "Optimisation & growth"),
    why: [
      "Hands-on experience across Amazon, Walmart, eBay and TikTok Shop",
      "Private label, wholesale and dropshipping models under one team",
      "Decisions driven by sales, ad and inventory data",
      "Transparent weekly and monthly reporting",
    ],
    packages: [
      { name: "Starter", price: "$499/mo", note: "One marketplace", features: ["Up to 50 listings", "Listing optimisation", "Order & inventory handling", "Monthly report"] },
      { name: "Professional", price: "$999/mo", note: "Up to 2 marketplaces", features: ["Up to 150 listings", "PPC management", "Account health monitoring", "Bi-weekly reporting"] },
      { name: "Business", price: "$1,499/mo", note: "Up to 4 marketplaces", features: ["Unlimited growth plan", "Dedicated account manager", "Sourcing support", "Weekly reporting"] },
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-Commerce Store Development",
    seoTitle: "Shopify & Custom E-Commerce Store Development",
    seoDescription:
      "Shopify and custom e-commerce store development: conversion-focused design, payments, inventory sync and automation. Starting packages from $999.",
    short: "Shopify and custom stores built to convert, with payments, inventory and automation wired in.",
    icon: "cart",
    category: "Commerce",
    headline: "A store designed to convert.",
    intro:
      "Fast, secure and easy-to-use online stores that make shopping smooth for customers and operations simple for you, from a first Shopify store to a high-volume automated platform.",
    features: [
      { title: "Custom store design", text: "On-brand storefronts built for speed and conversion." },
      { title: "Products & categories", text: "Clean catalogue structure, filters and collections." },
      { title: "Cart & checkout", text: "Frictionless checkout with upsells and abandoned-cart recovery." },
      { title: "Payment gateways", text: "Stripe, PayPal and local gateways integrated and tested." },
      { title: "Inventory & orders", text: "Stock sync, order routing and fulfilment workflows." },
      { title: "Customer accounts", text: "Accounts, wishlists, order history and loyalty features." },
      { title: "Shipping & suppliers", text: "Carrier rates, labels and supplier integrations." },
      { title: "Automation & reporting", text: "Invoices, purchase orders, dashboards and forecasting." },
    ],
    process: steps("Consultation & planning", "Store structure & design", "Development & integration", "Testing & store setup", "Launch, training & support"),
    why: [
      "Conversion-first design and checkout",
      "From simple stores to high-volume platforms",
      "Scalable, secure builds",
      "Training and ongoing support after launch",
    ],
    packages: [
      { name: "Basic", price: "$999", note: "Up to 100 products", features: ["Theme customisation", "Payment setup", "Basic SEO", "Launch support"] },
      { name: "Professional", price: "$1,699", note: "Unlimited products", features: ["Custom design", "Apps & integrations", "Speed optimisation", "30 days support"] },
      { name: "Business", price: "$2,999", note: "Growth-ready store", features: ["Advanced features", "Automation flows", "Dedicated account manager", "90 days support"] },
    ],
  },
  {
    slug: "website-development",
    title: "Website Design & Development",
    seoTitle: "Website Design & Development Company",
    seoDescription:
      "Custom website design and development in Next.js, React and WordPress: fast, responsive, SEO-ready sites built to turn visitors into customers.",
    short: "Responsive, lightning-fast websites engineered to turn visitors into customers.",
    icon: "code",
    category: "Build",
    headline: "Websites that work as hard as you do.",
    intro:
      "We design and build modern, responsive websites with clean code, strong SEO foundations and clear calls to action, so your site becomes your best salesperson.",
    features: [
      { title: "UI/UX design", text: "Research-led layouts and interfaces that guide visitors to act." },
      { title: "Custom development", text: "Next.js, React and WordPress builds tailored to your needs." },
      { title: "Responsive by default", text: "Pixel-perfect on phones, tablets and desktops." },
      { title: "Performance", text: "Core Web Vitals tuned for speed and rankings." },
      { title: "CMS & content", text: "Easy editing so your team can update pages themselves." },
      { title: "Landing pages", text: "High-converting pages for campaigns and launches." },
      { title: "Integrations", text: "CRM, analytics, booking and payment tools connected." },
      { title: "Care plans", text: "Hosting, backups, security and updates handled." },
    ],
    process: steps("Discovery & goals", "Sitemap & wireframes", "Visual design", "Development & QA", "Launch & care"),
    why: ["Conversion-focused design", "Modern, fast tech stack", "SEO built in from day one", "Ongoing support and maintenance"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    seoTitle: "iOS & Android Mobile App Development",
    seoDescription:
      "iOS, Android and cross-platform mobile app development: UI/UX, APIs, testing, store submission and maintenance. Packages from $2,499.",
    short: "iOS, Android and cross-platform apps that are secure, scalable and a joy to use.",
    icon: "phone",
    category: "Build",
    headline: "Create. Connect. Grow with your users.",
    intro:
      "We design and build secure, scalable, user-friendly mobile apps around your customers, your team and your business goals.",
    features: [
      { title: "Custom app development", text: "Apps shaped around your product and users." },
      { title: "iOS", text: "Native-quality apps for iPhone and iPad." },
      { title: "Android", text: "Reliable apps across the Android ecosystem." },
      { title: "Cross-platform", text: "One codebase, both stores, faster to market." },
      { title: "UI/UX design", text: "Intuitive flows and polished interfaces." },
      { title: "API & integrations", text: "Payments, maps, CRMs and your own backend." },
      { title: "Testing & QA", text: "Device testing and performance checks before release." },
      { title: "Maintenance", text: "Updates, monitoring and new features after launch." },
    ],
    process: steps("Consultation & requirements", "Planning & app structure", "UI/UX & prototype", "Development & testing", "Launch & ongoing support"),
    why: ["Built for your users and business model", "End-to-end team from strategy to post-launch", "Scalable and secure architecture", "Regular updates, documentation and support"],
    packages: [
      { name: "Starter", price: "$2,499", note: "One platform", features: ["Up to 8 screens", "Core features", "Store submission", "30 days support"] },
      { name: "Professional", price: "$5,999", note: "iOS & Android", features: ["Up to 20 screens", "API integrations", "Admin panel", "60 days support"] },
      { name: "Business", price: "$9,999", note: "Full platform", features: ["Custom backend", "Multiple user roles", "Analytics", "90 days support"] },
    ],
  },
  {
    slug: "software-solutions",
    title: "Software Solutions",
    seoTitle: "Custom Software, CRM & POS Development",
    seoDescription:
      "Custom business software: CRM, POS, inventory and workflow systems and dashboards built around how your team actually works.",
    short: "Custom CRM, POS, inventory systems and dashboards that simplify, automate and scale.",
    icon: "cpu",
    category: "Build",
    headline: "Software built around how you actually work.",
    intro:
      "Custom software that simplifies operations, automates repetitive work and scales with you, designed around your real workflows, teams and goals.",
    features: [
      { title: "Custom business software", text: "Tools designed for your exact processes." },
      { title: "Business management systems", text: "One place to run sales, ops and finance." },
      { title: "Inventory & orders", text: "Real-time stock, purchasing and order tracking." },
      { title: "Customer management", text: "CRMs that keep every relationship organised." },
      { title: "Workflow management", text: "Tasks, approvals and team performance." },
      { title: "Portals & dashboards", text: "Live KPIs for owners, staff and clients." },
      { title: "Cloud software", text: "Secure access from anywhere." },
      { title: "API integrations", text: "Connect the tools you already use." },
    ],
    process: steps("Consultation & analysis", "Planning & architecture", "UI/UX & prototype", "Development & testing", "Deployment, training & support"),
    why: ["Built around your real processes", "Planning through support in one team", "Scalable, secure systems", "User training and post-launch help"],
    packages: [
      { name: "Starter", price: "$999", note: "Focused tool", features: ["Core module", "User roles", "Cloud hosting setup", "Training session"] },
      { name: "Professional", price: "$2,499", note: "Multi-module", features: ["Dashboards", "Integrations", "Reporting", "60 days support"] },
      { name: "Enterprise", price: "$4,999", note: "Full system", features: ["Custom architecture", "Advanced automation", "Priority support", "Team training"] },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    seoTitle: "AI Automation, Chatbots & AI Agents",
    seoDescription:
      "AI agents, chatbots and workflow automation for online sellers and service businesses: connect your tools, answer customers 24/7, save hours.",
    short: "AI agents, chatbots and workflow automation that give your team hours back every week.",
    icon: "bot",
    category: "Build",
    headline: "Put your busywork on autopilot.",
    intro:
      "We build AI agents, chatbots and automated workflows that connect your tools, answer customers instantly and remove repetitive tasks from your team's day.",
    features: [
      { title: "AI agents", text: "Assistants that research, draft, sort and act inside your tools." },
      { title: "Chatbots", text: "24/7 customer support and lead capture on web and WhatsApp." },
      { title: "Workflow automation", text: "Hand-offs between apps without copy and paste." },
      { title: "CRM automation", text: "Leads scored, routed and followed up automatically." },
      { title: "E-commerce automation", text: "Order, inventory and listing updates that run themselves." },
      { title: "Integrations", text: "APIs and no-code platforms stitched together reliably." },
      { title: "Reporting", text: "Automated dashboards and alerts." },
      { title: "Training & handover", text: "Your team learns to run and extend every automation." },
    ],
    process: steps("Process audit", "Opportunity mapping", "Build & integrate", "Test with real data", "Launch & improve"),
    why: ["Focused on measurable time and cost savings", "Works with the tools you already use", "Secure handling of your data", "Ongoing tuning as your business changes"],
  },
  {
    slug: "seo-services",
    title: "SEO Services",
    seoTitle: "SEO Services: Technical, Local & E-Commerce SEO",
    seoDescription:
      "Technical, on-page, off-page and local SEO for e-commerce stores and service businesses. Rank higher, win qualified traffic and grow month after month.",
    short: "Technical, on-page, off-page and local SEO that compounds into long-term organic growth.",
    icon: "search",
    category: "Growth",
    headline: "Get found by the customers already searching for you.",
    intro:
      "We improve your website, content and search presence to raise rankings, attract qualified traffic and build growth that compounds month after month.",
    features: [
      { title: "Audit & strategy", text: "A clear roadmap from a full technical and content audit." },
      { title: "Keyword research", text: "Terms mapped to pages and buyer intent." },
      { title: "On-page SEO", text: "Titles, headings, internal links and schema." },
      { title: "Technical SEO", text: "Speed, crawlability, indexing and Core Web Vitals." },
      { title: "Content optimisation", text: "Pages and blogs written to rank and convert." },
      { title: "Link building", text: "Quality backlinks that build authority." },
      { title: "Local SEO", text: "Google Business Profile and local citations." },
      { title: "Analytics & reporting", text: "Monthly rankings, traffic and lead reports." },
    ],
    process: steps("Consultation & audit", "Research & strategy", "On-page & technical fixes", "Content & authority building", "Monitoring & growth"),
    why: ["One organised strategy across every SEO type", "Research-driven decisions", "Built for long-term organic growth", "Clear monthly progress reports"],
    packages: [
      { name: "Basic", price: "$849/mo", note: "10 keywords", features: ["Technical audit", "On-page SEO", "Local SEO", "Monthly report"] },
      { name: "Professional", price: "$1,549/mo", note: "20 keywords", features: ["Content optimisation", "Link building", "Competitor tracking", "Monthly report"] },
      { name: "Elite", price: "$2,149/mo", note: "30 keywords", features: ["Content production", "Advanced link building", "CRO insights", "Strategy calls"] },
    ],
  },
  {
    slug: "ppc-paid-advertising",
    title: "PPC & Paid Advertising",
    seoTitle: "PPC Management: Google, Meta & Amazon Ads",
    seoDescription:
      "PPC management for Google Ads, Meta (Facebook and Instagram) and Amazon Ads, optimised for ROAS and cost per acquisition with transparent reporting.",
    short: "Google, Meta, Amazon and shopping campaigns tuned for return on ad spend.",
    icon: "target",
    category: "Growth",
    headline: "Every ad dollar, working harder.",
    intro:
      "Targeted paid campaigns across Google, Meta and marketplaces that bring qualified traffic, leads and sales while improving your return on ad spend.",
    features: [
      { title: "Account audit", text: "Find wasted spend and quick wins." },
      { title: "Strategy & setup", text: "Campaign structure built for scale." },
      { title: "Keyword & audience research", text: "Reach the buyers most likely to convert." },
      { title: "Search, shopping & display", text: "Full-funnel Google campaigns." },
      { title: "Ad copy & creative", text: "Thumb-stopping creative and sharp copy." },
      { title: "Retargeting", text: "Bring back visitors who didn't buy." },
      { title: "Tracking & landing pages", text: "Accurate conversion data and pages that convert." },
      { title: "Optimisation & reporting", text: "Weekly tuning and clear reports." },
    ],
    process: steps("Consultation & audit", "Research & strategy", "Setup & tracking", "Launch & active management", "Testing, reporting & scaling"),
    why: ["Results-focused strategy", "Multi-channel expertise", "Continuous A/B testing", "Transparent reporting with a dedicated manager"],
    packages: [
      { name: "Basic", price: "$1,399/mo", note: "One channel", features: ["Campaign setup", "Conversion tracking", "Monthly optimisation", "Monthly report"] },
      { name: "Professional", price: "$3,999/mo", note: "Multi-channel", features: ["Google + Meta", "Retargeting", "Creative testing", "Bi-weekly report"] },
      { name: "Elite", price: "$6,999/mo", note: "Full funnel", features: ["All channels", "Landing pages", "Dedicated manager", "Weekly report"] },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    seoTitle: "Social Media Marketing & Management Agency",
    seoDescription:
      "Social media marketing and management for Instagram, Facebook, TikTok and LinkedIn: content, community and paid campaigns that grow sales.",
    short: "Content, community and campaigns that grow awareness, engagement and sales.",
    icon: "megaphone",
    category: "Growth",
    headline: "Turn followers into customers.",
    intro:
      "Engaging content and targeted campaigns that grow your brand awareness, engagement, leads and sales across the platforms your customers use.",
    features: [
      { title: "Platform strategy", text: "The right channels and voice for your audience." },
      { title: "Account optimisation", text: "Profiles set up to convert visitors." },
      { title: "Content creation", text: "Posts, reels, carousels and stories." },
      { title: "Planning & scheduling", text: "A consistent calendar, always on time." },
      { title: "Community engagement", text: "Comments and DMs answered in your voice." },
      { title: "Organic growth", text: "Tactics that grow a real, relevant audience." },
      { title: "Monitoring", text: "Reputation and competitor tracking." },
      { title: "Reporting", text: "Monthly insights and optimisation." },
    ],
    process: steps("Consultation & audit", "Strategy & content plan", "Content creation", "Publishing & engagement", "Reporting & optimisation"),
    why: ["Brand-focused approach", "Strategy through reporting, fully managed", "Consistent, platform-native content", "Clear reporting and support"],
    packages: [
      { name: "Startup", price: "$449/mo", note: "3 posts / week", features: ["2 platforms", "Content design", "Scheduling", "Monthly report"] },
      { name: "Professional", price: "$999/mo", note: "5 posts / week", features: ["3 platforms", "Reels & stories", "Community management", "Monthly report"] },
      { name: "Plus", price: "$1,499/mo", note: "Up to 10 posts / week", features: ["All platforms", "Video content", "Influencer outreach", "Bi-weekly report"] },
    ],
  },
  {
    slug: "branding-creative",
    title: "Branding & Creative",
    seoTitle: "Branding, Logo Design & Creative Services",
    seoDescription:
      "Branding and creative services: logo design, brand identity, packaging, social creatives and motion graphics that make your brand memorable.",
    short: "Logos, identities, packaging and motion that make your brand impossible to forget.",
    icon: "pen",
    category: "Create",
    headline: "Build an identity people remember.",
    intro:
      "Distinctive branding, visuals and marketing materials that communicate your value clearly and build trust at every touchpoint.",
    features: [
      { title: "Logo design", text: "Marks that are simple, versatile and memorable." },
      { title: "Brand identity", text: "Colour, type and visual language as one system." },
      { title: "Brand guidelines", text: "Rules that keep every channel consistent." },
      { title: "Stationery", text: "Cards, letterheads and presentations." },
      { title: "Social creatives", text: "Templates and campaign visuals." },
      { title: "Marketing materials", text: "Brochures, flyers and catalogues." },
      { title: "Packaging & labels", text: "Shelf and unboxing-ready packaging design." },
      { title: "Motion & video", text: "Explainers, motion graphics and product videos." },
    ],
    process: steps("Discovery & consultation", "Research & direction", "Concept development", "Design & refinement", "Delivery & brand support"),
    why: ["Strategy-led concepts", "One partner for every creative need", "Consistent identity across platforms", "Revisions and full source files included"],
    packages: [
      { name: "Brand Starter", price: "$399", note: "Essentials", features: ["Logo concepts", "Colour palette", "Typography", "Source files"] },
      { name: "Professional", price: "$899", note: "Full identity", features: ["Logo suite", "Brand guidelines", "Stationery", "Social kit"] },
      { name: "Business Creative", price: "$1,499", note: "Brand + launch", features: ["Everything in Professional", "Packaging or brochure", "Motion logo", "Launch creatives"] },
    ],
  },
  {
    slug: "ebook-writing-publishing",
    title: "eBook Writing & Publishing",
    seoTitle: "eBook Ghostwriting, Editing & Publishing",
    seoDescription:
      "eBook ghostwriting, editing, cover design, formatting and publishing on Amazon KDP and other stores, plus book marketing and audiobooks.",
    short: "Ghostwriting, editing, covers, formatting and distribution, from idea to bestseller list.",
    icon: "book",
    category: "Create",
    headline: "From idea to published author.",
    intro:
      "Our writers, editors and designers take your book from outline to launch, covering ghostwriting, editing, cover design, formatting, publishing, marketing and audiobooks.",
    features: [
      { title: "Ghostwriting", text: "Your ideas and voice, professionally written." },
      { title: "Editing & proofreading", text: "Developmental, line and copy editing." },
      { title: "Cover design", text: "Covers that sell in thumbnail and in print." },
      { title: "Formatting", text: "Kindle, ePub and print-ready interiors." },
      { title: "Publishing", text: "Amazon KDP, IngramSpark and more." },
      { title: "Book marketing", text: "Launch plans, ads and author platforms." },
      { title: "Audiobooks", text: "Narration and production for Audible." },
      { title: "Author websites", text: "A home for your books and readers." },
    ],
    process: steps("Consultation & outline", "Writing & drafts", "Editing & design", "Formatting & publishing", "Launch & marketing"),
    why: ["Experienced writers across genres", "Everything from manuscript to marketing", "You keep 100% of rights and royalties", "Clear milestones and revisions"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
