# eSeller Zone website

Custom Next.js 15 + Tailwind CSS + Framer Motion site. Dark, futuristic theme in the eSeller Zone orange (#F58220).

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out (upload anywhere, or deploy to Vercel)
```

## Where to edit content
| What | File |
|---|---|
| Email, phone, WhatsApp, address, socials | `lib/site.ts` |
| Services, features, process, packages | `lib/services.ts` |
| Portfolio, FAQs, blog posts | `lib/content.ts` |
| Logo | `components/Logo.tsx`, `public/logo-mark.svg` |
| Colours | `tailwind.config.ts` (`brand` and `ink`) |

## Contact form
With no setup the form opens the visitor's email app addressed to `site.email`.
To receive submissions directly, create a form endpoint (e.g. Formspree) and set
`NEXT_PUBLIC_FORM_ENDPOINT` in Vercel's environment variables.

## Deploy
Push to GitHub and import the repo in Vercel; no extra settings are needed.
`next.config.mjs` uses `output: "export"`, so `out/` can also go on any static host or cPanel.

## Live preview (GitHub Pages)
Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site with
`NEXT_PUBLIC_BASE_PATH=/<repo-name>` and publishes it to
https://kabeerhaider-hub.github.io/esellerzone/
(Settings → Pages → Source must be set to **GitHub Actions**.)

## Deploy on Vercel
1. In Vercel: **Add New → Project → Import** `KabeerHaider-hub/esellerzone`. Keep the defaults (Framework: Next.js) and click **Deploy**.
2. The home page is Option 2 (3D planet behind the whole page). Option 1 is kept at `/v1/`.
3. To make Option 1 the home page instead, add the environment variable `NEXT_PUBLIC_HOME_VARIANT` = `classic`.

## SEO
Titles, descriptions, canonical URLs, social share cards and Google structured data are set in `lib/seo.tsx`.
- Per-service search titles and descriptions: `seoTitle` / `seoDescription` in `lib/services.ts`.
- Company, offices, opening hours, countries served and social profiles (Google's `sameAs`): `lib/site.ts`.
  Keep the name, address and phone here identical to Google Business Profile and every directory listing.
- New blog posts: add to `lib/content.ts`, set `services` to link the article to related service pages.
- Share image: `public/og/default.png` (1200×630).
- GitHub Pages and Vercel preview builds are automatically `noindex`; only the production build is indexed.

Optional environment variables (set them in Vercel → Settings → Environment Variables, then redeploy):
| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification code |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification code |
| `NEXT_PUBLIC_GA_ID` | Overrides the Google Analytics 4 ID (default `G-5KDPQ4PN2R` in lib/site.ts) |
| `NEXT_PUBLIC_NOINDEX` | Set to `1` to keep a build out of search engines |
