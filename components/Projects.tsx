"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { SectionHeading } from "./Reveal";
import { categories, projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Tous");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const list = filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projets" className="section">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="container">
        <SectionHeading
          eyebrow="Projets"
          title={<>Des produits livrés, <span className="text-dim">testés</span>, en production.</>}
          intro="Comptabilité, e-commerce, éducation, gestion de stock : cinq produits construits en 2026 pour des usages ivoiriens."
        />

        {/* Filtres */}
        <LayoutGroup>
          <div role="tablist" aria-label="Filtrer les projets par catégorie" className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => {
              const count = c === "Tous" ? projects.length : projects.filter((p) => p.category === c).length;
              if (!count) return null;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={cn("relative rounded-full px-4 py-2 text-sm transition", filter === c ? "text-night" : "text-ink-muted hover:text-ink glass")}
                >
                  {filter === c && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  {c} <span className="font-mono text-xs opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          <motion.div layout className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className={cn(i === 0 && filter === "Tous" && "md:col-span-2")}
                >
                  <ProjectCard project={p} featured={i === 0 && filter === "Tous"} onOpen={() => setSelected(p)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
}
