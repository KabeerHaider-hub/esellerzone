import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms & Privacy Policy",
  description: `Terms of use and privacy policy for ${site.name}: how we quote and deliver work, who owns what, and how we handle the details you send us.`,
  path: "/terms/",
});

// TODO(owner): have these reviewed by your legal advisor before launch.
const sections = [
  { h: "Use of this website", p: "By using this website you agree to these terms. Content is provided for general information and may change without notice." },
  { h: "Services and quotes", p: "Package prices are starting points. Final scope, timelines and fees are agreed in writing before any work begins." },
  { h: "Intellectual property", p: "Unless agreed otherwise in a project contract, all site content, logos and designs belong to eSeller Zone. Client deliverables transfer to the client on full payment." },
  { h: "Privacy", p: "We collect only the details you send through our forms or email (such as name, email, phone and project information) to respond to your enquiry and deliver services. We do not sell your data." },
  { h: "Cookies & analytics", p: "We may use privacy-friendly analytics to understand how the site is used. You can block cookies in your browser settings." },
  { h: "Contact", p: `Questions about these terms or your data? Email ${site.email}.` },
];

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & privacy" text="The short, plain-language version of how we work and how we handle your information." />
      <section className="container-x max-w-3xl prose-ez">
        {sections.map((s) => (<div key={s.h}><h2>{s.h}</h2><p>{s.p}</p></div>))}
      </section>
    </>
  );
}
