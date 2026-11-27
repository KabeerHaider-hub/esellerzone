import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { posts, getPost, relatedPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { getService } from "@/lib/services";
import { pageMeta, JsonLd, ldPost, ldBreadcrumbs, ldFaq } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}/`, type: "article", publishedTime: p.date, modifiedTime: p.updated });
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const related = (p.services ?? []).map(getService).filter((x) => x !== undefined);
  const more = relatedPosts(p);
  return (
    <>
      <article className="container-x max-w-3xl pt-40">
        <Link href="/blog/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> All articles
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-400">{p.category}</p>
        <h1 className="h-display mt-4 text-4xl leading-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-5 text-sm text-white/60">
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
        {p.faq && p.faq.length > 0 && (
          <section className="prose-ez mt-12">
            <h2>Frequently asked questions</h2>
            {p.faq.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>
        )}
        {related.length > 0 && (
          <aside className="glass mt-14 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-400">Need a hand with this?</p>
            <ul className="mt-4 space-y-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="group flex items-start gap-3 text-white/85 hover:text-white">
                    <Icon name="arrow" className="mt-1 h-4 w-4 shrink-0 text-brand-500 transition group-hover:translate-x-1" />
                    <span><span className="font-medium">{s.title}</span><span className="block text-sm text-white/50">{s.short}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
        {more.length > 0 && (
          <nav aria-label="Related articles" className="mt-14">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-400">Keep reading</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {more.map((o) => (
                <li key={o.slug}>
                  <Link href={`/blog/${o.slug}/`} className="glass block h-full p-5 text-sm text-white/85 transition hover:text-white">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-white/50">{o.category}</span>
                    <span className="mt-2 block font-medium leading-snug">{o.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
      <JsonLd data={[ldPost(p), ldBreadcrumbs([["Blog", "/blog/"], [p.title, `/blog/${p.slug}/`]]), ...(p.faq?.length ? [ldFaq(p.faq)] : [])]} />
      <CtaBand />
    </>
  );
}
