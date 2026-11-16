/** @type {import('next').NextConfig} */
// NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow (e.g. "/esellerzone-website").
// Leave it empty on Vercel or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Static export: the site can be hosted anywhere (GitHub Pages, Vercel, Netlify, cPanel).
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
