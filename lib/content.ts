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
  /** Optional questions and answers, shown at the end and marked up as FAQPage. */
  faq?: { q: string; a: string }[];
  readMins: number;
  category: string;
  body: { h?: string; p?: string; list?: string[] }[];
};

// Starter articles for SEO. Add new posts to this array; pages and the sitemap update automatically.
export const posts: Post[] = [
  {
    slug: "ecommerce-agency-pakistan",
    services: ["marketplace-management", "ecommerce-development", "seo-services"],
    title: "Hiring an E-Commerce Agency in Pakistan: A Guide for US and UK Brands",
    excerpt: "Why US and UK sellers outsource Amazon, Shopify and marketing work to Pakistan, what it costs, and how to pick an agency you can trust.",
    date: "2026-11-27",
    readMins: 7,
    category: "Outsourcing",
    body: [
      { p: "Pakistan has become one of the busiest places in the world for e-commerce talent. Thousands of specialists manage Amazon, Walmart and Shopify stores for brands in the US, UK and Europe. If you are thinking about outsourcing to a Pakistani agency, here is what to expect and how to choose well." },
      { h: "Why brands outsource e-commerce work to Pakistan", list: ["Deep marketplace experience: many teams have spent years running Amazon FBA, wholesale and private label accounts", "Lower cost than a US or UK in-house hire for the same skill set", "Strong English and teams that work US or UK business hours", "One agency can cover listings, PPC, web development, design and social media"] },
      { h: "What you can hand over", list: ["Amazon, Walmart, eBay, Etsy and TikTok Shop account management", "Product research, listing creation and A+ content", "PPC campaign management on Amazon, Google and Meta", "Shopify and WooCommerce store builds and maintenance", "SEO, content writing and social media management", "Customer service, order handling and reporting"] },
      { h: "What it costs", p: "Pricing depends on scope, but most agencies charge a monthly retainer for ongoing management and a fixed price for builds. At eSeller Zone, marketplace management starts at $499 a month, Shopify stores start at $999, and SEO starts at $849 a month. Ask every agency for a written scope so you can compare like with like." },
      { h: "How to vet an agency", list: ["Ask for user permissions, never your main account password", "Ask who will actually work on your account and how many other accounts they manage", "Request examples or references in your product category", "Agree on reporting: which numbers, how often, and in which format", "Start with a trial month or a fixed project before a long contract", "Confirm you keep ownership of every account, listing, design file and line of code"] },
      { h: "Time zones and communication", p: "Pakistan is 10 hours ahead of US Eastern time in winter and 5 hours ahead of the UK. Good agencies run evening and night shifts so they overlap with your working day. Our team works 5 PM to 1 AM Pakistan time, which covers US mornings and UK afternoons." },
      { h: "Red flags", list: ["Guaranteed rankings, sales or 'page one in a week'", "Review manipulation or anything against marketplace terms", "No written contract or unclear payment terms", "Reluctance to put you on a call with the people doing the work"] },
      { p: "eSeller Zone is based in Karachi and works with brands in the US, UK and Pakistan, with a partner company in Texas. Book a free strategy call and we'll show you exactly what we would do in your first 90 days." },
    ],
    faq: [
      { q: "Is it safe to give a Pakistani agency access to my Amazon account?", a: "Yes, if you add them as a user in Seller Central with only the permissions they need. Never share your main login, and remove access when the work ends." },
      { q: "Can a Pakistan-based agency work US hours?", a: "Yes. Most e-commerce agencies in Pakistan, including eSeller Zone, run evening shifts that overlap with the US and UK working day." },
      { q: "How do I pay an agency in Pakistan?", a: "Most agencies invoice in US dollars and accept bank transfer, Payoneer, Wise or card payments. Agree the currency and payment terms in writing before you start." },
    ],
  },
  {
    slug: "amazon-ppc-management",
    services: ["ppc-paid-advertising", "marketplace-management"],
    title: "Amazon PPC Management: How to Lower ACoS Without Losing Sales",
    excerpt: "A step-by-step Amazon PPC framework: campaign structure, keyword harvesting, bids and the numbers to watch, from an agency that runs it daily.",
    date: "2026-11-27",
    readMins: 7,
    category: "Advertising",
    body: [
      { p: "Amazon advertising is where most sellers win or lose their margin. A well-run account spends money on searches that convert and cuts the rest quickly. Here is the framework we use to bring ACoS down while keeping sales growing." },
      { h: "Know your numbers first", list: ["ACoS (advertising cost of sale): ad spend divided by ad sales", "TACoS (total ACoS): ad spend divided by all sales, ads and organic", "Break-even ACoS: your profit margin before ad spend. Above it, every ad sale loses money", "Conversion rate and click-through rate per keyword"] },
      { h: "A simple campaign structure", list: ["Auto campaigns to discover new search terms", "Manual broad and phrase campaigns to test and scale proven terms", "Exact match campaigns for your best keywords, with their own budgets", "Product targeting campaigns on competitor and complementary products", "Sponsored Brands and Sponsored Display once Sponsored Products are profitable"] },
      { h: "Harvest and negate every week", p: "Download the search term report weekly. Move search terms with sales into exact match campaigns, and add terms that spend without converting as negative keywords in the campaigns that found them. This one habit does more for ACoS than any bidding trick." },
      { h: "Bid by results, not by guesswork", list: ["Raise bids on keywords below your target ACoS that still have impression share to win", "Lower bids on keywords above target before you pause them", "Use placement adjustments when top-of-search converts much better", "Give new keywords enough clicks to judge them, usually 15 to 30, before you cut them"] },
      { h: "Fix the listing, not just the ads", p: "Ads send traffic; the listing converts it. Poor images, thin bullets, few reviews or an uncompetitive price push ACoS up whatever you do with bids. Check conversion rate by ASIN before you blame the campaigns." },
      { h: "What good looks like", p: "There is no universal target ACoS. Launches run high on purpose to build ranking. Mature products should sit below break-even, and TACoS should fall over time as organic sales grow." },
      { p: "Want an expert look at your campaigns? Our PPC team will audit your account for free and show you where spend is leaking." },
    ],
    faq: [
      { q: "What is a good ACoS on Amazon?", a: "It depends on your margin. A good ACoS is below your break-even ACoS, which equals your profit margin before advertising. During a launch it is normal to run above it for a few weeks." },
      { q: "How often should Amazon PPC be optimised?", a: "Bids and negative keywords should be reviewed at least weekly, and search terms harvested every one to two weeks." },
      { q: "How much does Amazon PPC management cost?", a: "Agencies charge a monthly fee, a percentage of ad spend, or both. eSeller Zone includes PPC management in marketplace plans from $999 a month." },
    ],
  },
  {
    slug: "amazon-fba-vs-fbm",
    services: ["marketplace-management"],
    title: "Amazon FBA vs FBM: Which Fulfilment Method Is Right for You?",
    excerpt: "Fulfilled by Amazon or fulfilled by merchant? Compare costs, Prime eligibility, control and risk, and see when a hybrid setup makes sense.",
    date: "2026-11-27",
    readMins: 6,
    category: "Marketplaces",
    body: [
      { p: "Every Amazon seller has to decide who stores, packs and ships the orders. With FBA, Amazon does it. With FBM, you or your warehouse do. The right choice depends on your product, margin and how much control you want." },
      { h: "How FBA works", p: "You send inventory to Amazon's fulfilment centres. Amazon stores it, ships each order, handles returns and answers delivery questions. Your listings become Prime eligible, which usually lifts conversion." },
      { h: "How FBM works", p: "You keep inventory in your own space or a third-party warehouse and ship orders yourself. You control packaging and stock, and you avoid Amazon's storage fees, but you must hit Amazon's shipping and tracking standards." },
      { h: "FBA: pros and cons", list: ["Pro: Prime badge and fast delivery, which customers trust", "Pro: Amazon handles shipping, returns and delivery customer service", "Con: fulfilment, storage and long-term storage fees", "Con: inventory limits and strict prep and labelling rules"] },
      { h: "FBM: pros and cons", list: ["Pro: lower fees on large, heavy or slow-moving items", "Pro: full control of stock, packaging and inserts", "Con: no Prime badge unless you qualify for Seller Fulfilled Prime", "Con: you carry the workload and the delivery performance risk"] },
      { h: "When a hybrid makes sense", p: "Many brands use FBA for fast sellers and FBM for oversized, seasonal or slow items. Running FBM as a backup also keeps listings live if FBA stock runs out or inbound shipments are delayed." },
      { h: "How to decide", list: ["Work out total fulfilment cost per unit for both options", "Check how fast the product sells and how much storage it needs", "Compare conversion rate with and without Prime in your category", "Consider your team's capacity to pick, pack and ship every day"] },
      { p: "Not sure which fits your catalogue? We'll model the costs for your top products on a free strategy call." },
    ],
    faq: [
      { q: "Is FBA or FBM more profitable?", a: "FBA usually converts better because of Prime, while FBM often has lower fees for large or slow-selling items. Compare total cost per unit and conversion rate for your own products." },
      { q: "Can I use FBA and FBM at the same time?", a: "Yes. You can fulfil some products through FBA and others yourself, or offer the same product both ways as a backup." },
    ],
  },
  {
    slug: "walmart-marketplace-seller-guide",
    services: ["marketplace-management"],
    title: "How to Sell on Walmart Marketplace: Approval, Setup and Growth",
    excerpt: "What Walmart looks for when it approves sellers, how to set up your account and listings, and how to grow sales once you're live.",
    date: "2026-11-27",
    readMins: 6,
    category: "Marketplaces",
    body: [
      { p: "Walmart Marketplace is one of the largest online marketplaces in the US, and it has far fewer sellers than Amazon. Approval takes more preparation, but brands that get in often face less competition for the same searches." },
      { h: "What Walmart looks for", list: ["A registered business with a US business tax ID and documentation", "Marketplace or e-commerce sales history that shows you can fulfil reliably", "Products that fit Walmart's catalogue and pricing", "Fast, tracked shipping and a clear returns policy"] },
      { h: "Setting up your account", list: ["Apply through Walmart Marketplace with your business details", "Complete tax, payment and shipping settings in Seller Center", "Map your products to existing Walmart items or create new ones with GTINs", "Set shipping templates and fulfilment, including Walmart Fulfillment Services if it suits you"] },
      { h: "Listings that convert on Walmart", list: ["Clear titles that start with the brand and product type", "Key features written as short, scannable bullets", "High-quality images that meet Walmart's image requirements", "Complete attributes, because Walmart's search relies on them heavily", "Competitive pricing, since Walmart compares prices across the web"] },
      { h: "Growing sales after launch", list: ["Walmart Sponsored Search ads on your best products", "Pro Seller badge by meeting performance standards", "Reviews through Walmart's own review programmes", "Keeping stock and price in line with your other channels"] },
      { p: "We set up and manage Walmart stores alongside Amazon and eBay, so one team keeps every channel in sync. Book a call to check whether your brand is ready to apply." },
    ],
    faq: [
      { q: "How long does Walmart Marketplace approval take?", a: "It varies, from a few days to a few weeks, depending on how complete your application is and Walmart's current review volume." },
      { q: "Can sellers outside the US sell on Walmart.com?", a: "Walmart's US marketplace requires a US business presence and tax ID for most sellers. Check Walmart's current requirements before you apply." },
    ],
  },
  {
    slug: "tiktok-shop-setup-guide",
    services: ["marketplace-management", "social-media-marketing"],
    title: "TikTok Shop for Brands: Setup, First Sales and Creator Partnerships",
    excerpt: "How to open a TikTok Shop, list products, work with affiliate creators and run ads so short videos turn into real orders.",
    date: "2026-11-27",
    readMins: 6,
    category: "Social Commerce",
    body: [
      { p: "TikTok Shop lets people buy without leaving the app, straight from a video or a live stream. For the right products it can drive sales faster than any other channel, but only with a plan for content and creators." },
      { h: "Is your product a fit?", list: ["Easy to show in a short video: before and after, unboxing, demonstrations", "Priced for impulse buying", "Margins that leave room for creator commission and ads", "Stock and shipping ready for sudden spikes"] },
      { h: "Setting up your shop", list: ["Register in TikTok Shop Seller Center with your business documents", "Connect your TikTok account and add bank and tax details", "Upload products with clear images, prices and shipping times", "Link your Shopify store if you use one, so stock stays in sync"] },
      { h: "Creators do the heavy lifting", p: "Most TikTok Shop sales come from creator videos, not the brand's own account. Set up an open affiliate plan with a fair commission, send samples to creators in your niche, and give them talking points rather than scripts." },
      { h: "Your own content", list: ["Post short product videos several times a week", "Go live regularly, even for small audiences at first", "Reply to comments with video answers", "Repost and pin your best-performing creator videos"] },
      { h: "Scaling with ads", p: "Once a video sells organically, put ad spend behind it. TikTok's shopping ads work best with content that already proves it can convert." },
      { p: "We run TikTok Shop alongside Amazon and Shopify for e-commerce brands. Book a call and we'll tell you honestly whether your product suits it." },
    ],
    faq: [
      { q: "How much does TikTok Shop charge sellers?", a: "TikTok Shop charges a referral fee on each sale, plus any commission you agree with affiliate creators. Fees change by region and category, so check Seller Center for current rates." },
      { q: "Do I need followers to sell on TikTok Shop?", a: "No. Affiliate creators and ads can drive sales even if your own account is new." },
    ],
  },
  {
    slug: "ecommerce-seo-guide",
    services: ["seo-services", "ecommerce-development"],
    title: "E-Commerce SEO: How to Rank Your Online Store on Google",
    excerpt: "Keyword research, category and product pages, technical fixes and content that bring free, buying traffic to Shopify and WooCommerce stores.",
    date: "2026-11-27",
    readMins: 8,
    category: "SEO",
    body: [
      { p: "Paid ads stop the moment you stop paying. SEO keeps bringing in buyers month after month. For online stores, it comes down to four things: the right keywords, strong category and product pages, a fast and crawlable site, and helpful content." },
      { h: "1. Keyword research for stores", list: ["Start with what customers type: product type, material, size, use case", "Target category pages at broad terms like 'women's running shoes'", "Target product pages at specific terms with model, colour or feature", "Use blog posts for questions such as 'how to choose' and 'best for'", "Check search volume and how strong the current top results are"] },
      { h: "2. Category pages", p: "Category pages usually rank for the biggest keywords. Give each one a unique title and heading, a short intro that helps shoppers choose, useful filters, and links to subcategories and top products." },
      { h: "3. Product pages", list: ["Write unique descriptions; never copy the manufacturer's text", "Use descriptive titles and image alt text", "Add product structured data so Google can show price, stock and reviews", "Show reviews, shipping and returns information near the buy button", "Keep out-of-stock pages live when the product is coming back"] },
      { h: "4. Technical SEO", list: ["Fast pages: compress images, limit apps and scripts", "One canonical URL per product, even when it sits in several collections", "Clean XML sitemap submitted to Google Search Console and Bing", "No thin or duplicate pages from filters and tags being indexed", "Mobile-friendly layout and readable text"] },
      { h: "5. Content and links", p: "Buying guides, comparisons and how-to articles earn links and bring in shoppers earlier in their search. Link each article to the categories and products it mentions, so the authority flows to the pages that sell." },
      { h: "How long SEO takes", p: "New stores usually see early movement in three to six months, and meaningful traffic in six to twelve, depending on competition and how much content you publish." },
      { p: "Our SEO team audits online stores for free. We'll show you the quickest wins for your site and a realistic plan for the next six months." },
    ],
    faq: [
      { q: "Is Shopify good for SEO?", a: "Yes. Shopify handles most technical basics. You still need unique content, good collection pages, fast themes and careful control of duplicate URLs." },
      { q: "How much does e-commerce SEO cost?", a: "Most agencies charge a monthly retainer. eSeller Zone's SEO plans start at $849 a month for 10 target keywords." },
      { q: "Should I write a blog for my online store?", a: "Yes, if the articles answer real buying questions and link to your products. A blog is one of the best ways to win links and long-tail searches." },
    ],
  },
  {
    slug: "amazon-brand-registry-guide",
    services: ["marketplace-management", "branding-creative"],
    title: "Amazon Brand Registry: Requirements and How to Enrol",
    excerpt: "What you need for Amazon Brand Registry, how to apply step by step, and the tools it unlocks: A+ content, Sponsored Brands, Brand Analytics and more.",
    date: "2026-11-27",
    readMins: 5,
    category: "Marketplaces",
    body: [
      { p: "Brand Registry is Amazon's programme for brand owners. It protects your listings from hijackers and unlocks marketing tools that most successful private label sellers rely on." },
      { h: "What you need", list: ["A registered or pending trademark in a country Amazon supports", "The brand name shown on your products or packaging", "An Amazon account in your name as the trademark owner or an authorised agent", "Product and packaging images that show the brand"] },
      { h: "How to enrol", list: ["Sign in at Amazon Brand Registry with your Seller Central account", "Enter your trademark details and registration number", "Add product categories and images showing your branding", "Confirm the verification code Amazon sends to your trademark contact", "Wait for approval, usually a few days once verified"] },
      { h: "What it unlocks", list: ["Control over product detail pages under your brand", "A+ content with richer images and comparison charts", "Sponsored Brands and Sponsored Brands video ads", "Amazon Stores: your own multi-page brand storefront", "Brand Analytics with search term and customer data", "Tools to report counterfeits and infringements"] },
      { h: "Getting the trademark", p: "If you don't have a trademark yet, Amazon's IP Accelerator connects you with vetted law firms, and an application in progress can be enough to start. Plan for this early in your launch." },
      { p: "We help brands enrol, then build the A+ content, storefront and Sponsored Brands campaigns that make Brand Registry pay off." },
    ],
    faq: [
      { q: "Can I join Amazon Brand Registry without a registered trademark?", a: "Yes, in many marketplaces a pending trademark application is accepted, especially through Amazon's IP Accelerator programme." },
      { q: "Is Amazon Brand Registry free?", a: "Enrolment is free. You only pay for the trademark itself and any legal help you use." },
    ],
  },
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

/** Up to `n` other posts, ranked by how many related services they share with `p`. */
export function relatedPosts(p: Post, n = 3): Post[] {
  const mine = new Set(p.services ?? []);
  return posts
    .filter((o) => o.slug !== p.slug)
    .map((o, i) => ({ o, i, score: (o.services ?? []).filter((x) => mine.has(x)).length + (o.category === p.category ? 0.5 : 0) }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, n)
    .map((x) => x.o);
}
