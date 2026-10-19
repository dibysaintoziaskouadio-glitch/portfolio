"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ExternalLink, Github, X } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import type { Project } from "@/lib/projects";
import { accentClasses, cn } from "@/lib/utils";

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const a = accentClasses[project.accent];

  // Focus sur le bouton fermer, Échap pour fermer, focus gardé dans la fenêtre, page figée derrière
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-night/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line bg-night-2 sm:rounded-3xl"
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="sticky left-full top-4 z-20 mr-4 mt-4 grid h-10 w-10 place-items-center rounded-full border border-line bg-night/80 backdrop-blur"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="relative -mt-14 aspect-[16/8] border-b border-line">
          <ProjectVisual project={project} sizes="(min-width: 896px) 896px, 100vw" />
        </div>

        <div className="space-y-10 p-6 sm:p-10">
          <header>
            <p className="eyebrow">{project.category} · {project.year}</p>
            <h2 id="modal-title" className="mt-3 font-display text-4xl font-bold">{project.title}</h2>
            <p className={cn("mt-2 text-lg", a.text)}>{project.tagline}</p>
          </header>

          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {project.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse gap-1 bg-night-2 p-4">
                <dt className="text-xs text-ink-muted">{r.label}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums sm:text-3xl">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-3">Contexte</h3>
              <p className="leading-relaxed text-ink-muted">{project.context}</p>
            </div>
            <div>
              <h3 className="eyebrow mb-3">Problème</h3>
              <p className="leading-relaxed text-ink-muted">{project.problem}</p>
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Solution</h3>
            <ul className="space-y-3">
              {project.solution.map((s) => (
                <li key={s} className="flex gap-3 leading-relaxed">
                  <Check size={18} className={cn("mt-1 shrink-0", a.text)} aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.gallery.length > 1 && (
            <div>
              <h3 className="eyebrow mb-4">Galerie</h3>
              <div className="flex snap-x gap-4 overflow-x-auto pb-2">
                {project.gallery.map((g) => (
                  <div key={g.src} className="relative aspect-[16/10] w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-line sm:w-96">
                    <Image src={g.src} alt={g.alt} fill sizes="384px" className="object-cover object-left-top" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="eyebrow mb-4">Stack technique</h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs">{s}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-line pt-8">
            <Link href={`/projets/${project.slug}`} className="btn-primary">
              Étude de cas complète <ArrowRight size={16} />
            </Link>
            {project.links.site && (
              <a href={project.links.site} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <ExternalLink size={16} /> Voir le site
              </a>
            )}
            {project.links.code && (
              <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github size={16} /> Code source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
