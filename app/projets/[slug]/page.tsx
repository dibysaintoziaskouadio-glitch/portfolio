import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Check } from "lucide-react";
import ProjectVisual from "@/components/ProjectVisual";
import { getProject, projects } from "@/lib/projects";
import { accentClasses, cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: p.gallery[0] ? [p.gallery[0].src] : ["/images/og.jpg"] },
    alternates: { canonical: `/projets/${p.slug}` },
  };
}

// Lit content/projects/<slug>.mdx s'il existe (sans le bloc frontmatter)
async function readMdx(slug: string) {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "content/projects", `${slug}.mdx`), "utf8");
    return raw.replace(/^---[\s\S]*?---\s*/, "");
  } catch {
    return null;
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const mdx = await readMdx(p.slug);
  const a = accentClasses[p.accent];

  return (
    <main id="contenu" className="pb-32 pt-10">
      <div className="container max-w-4xl">
        <Link href="/#projets" className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-ink">
          <ArrowLeft size={16} /> Tous les projets
        </Link>

        <header className="mt-10">
          <p className="eyebrow">{p.category} · {p.year}</p>
          <h1 className="mt-4 text-display-lg font-bold">{p.title}</h1>
          <p className={cn("mt-4 text-xl", a.text)}>{p.tagline}</p>
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
          <ProjectVisual project={p} sizes="(min-width: 896px) 896px, 100vw" priority />
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {p.results.map((r) => (
            <div key={r.label} className="flex flex-col-reverse gap-1 bg-night-2 p-5">
              <dt className="text-xs text-ink-muted sm:text-sm">{r.label}</dt>
              <dd className="font-display text-2xl font-bold tabular-nums sm:text-4xl">{r.value}</dd>
            </div>
          ))}
        </dl>

        {mdx ? (
          <article className="prose prose-invert prose-lg mt-16 max-w-none prose-headings:font-display prose-a:text-accent prose-strong:text-ink prose-code:text-accent prose-code:before:content-none prose-code:after:content-none">
            <MDXRemote source={mdx} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>
        ) : (
          <article className="mt-16 space-y-12">
            <section><h2 className="eyebrow mb-3">Contexte</h2><p className="text-lg leading-relaxed text-ink-muted">{p.context}</p></section>
            <section><h2 className="eyebrow mb-3">Problème</h2><p className="text-lg leading-relaxed text-ink-muted">{p.problem}</p></section>
            <section>
              <h2 className="eyebrow mb-4">Solution</h2>
              <ul className="space-y-3">
                {p.solution.map((s) => (
                  <li key={s} className="flex gap-3 text-lg leading-relaxed">
                    <Check size={20} className={cn("mt-1.5 shrink-0", a.text)} aria-hidden="true" /> {s}
                  </li>
                ))}
              </ul>
            </section>
          </article>
        )}

        {p.gallery.length > 1 && (
          <section className="mt-16 grid gap-4 sm:grid-cols-2">
            {p.gallery.slice(1).map((g) => (
              <figure key={g.src} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 448px, 100vw" className="object-cover object-left-top" />
              </figure>
            ))}
          </section>
        )}

        <section className="mt-16">
          <h2 className="eyebrow mb-4">Stack technique</h2>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-md border border-line px-3 py-1.5 font-mono text-sm">{s}</li>
            ))}
          </ul>
        </section>

        <div className="mt-20 flex flex-wrap gap-3 border-t border-line pt-10">
          <Link href="/#contact" className="btn-primary">Un projet similaire ? Parlons-en</Link>
          <Link href="/#projets" className="btn-ghost">Voir les autres projets</Link>
        </div>
      </div>
    </main>
  );
}
