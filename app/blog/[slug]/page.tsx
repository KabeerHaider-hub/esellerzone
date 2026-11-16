import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { posts, getPost } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date } };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
  return (
    <>
      <article className="container-x max-w-3xl pt-40">
        <Link href="/blog/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> All articles
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-400">{p.category}</p>
        <h1 className="h-display mt-4 text-4xl leading-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-5 text-sm text-white/45">
          {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {p.readMins} min read · {site.name} team
        </p>
        <div className="my-10 h-px bg-gradient-to-r from-brand-500/70 via-white/10 to-transparent" />
        <div className="prose-ez">
          {p.body.map((b, i) => (
            <div key={i}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.list && <ul>{b.list.map((l) => <li key={l}>{l}</li>)}</ul>}
            </div>
          ))}
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <CtaBand />
    </>
  );
}
