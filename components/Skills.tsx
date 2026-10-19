"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Server, Wrench, Container } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import { skills, type Level } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = { Frontend: Code2, Backend: Server, Design: Palette, DevOps: Container, Outils: Wrench } as const;
const levelWidth: Record<Level, string> = { Expert: "92%", Avancé: "75%", Intermédiaire: "55%" };
const levelColor: Record<Level, string> = {
  Expert: "bg-accent",
  Avancé: "bg-white/60",
  Intermédiaire: "bg-white/30",
};

export default function Skills() {
  return (
    <section id="competences" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Compétences"
          title={<>Une stack <span className="text-dim">de bout en bout</span>.</>}
          intro="De la base de données au déploiement, les outils que j'utilise sur chaque projet."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => {
            const Icon = icons[group.category as keyof typeof icons] ?? Code2;
            return (
              <Reveal key={group.category} delay={gi * 0.06} className={cn(gi === 0 && "lg:row-span-1")}>
                <div className="group h-full rounded-3xl p-6 glass transition duration-500 hover:-translate-y-1 hover:border-accent/30">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.04] text-accent transition group-hover:shadow-ring">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl font-bold">{group.category}</h3>
                  </div>
                  <ul className="space-y-4">
                    {group.items.map((s) => (
                      <li key={s.name}>
                        <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                          <span>{s.name}</span>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">{s.level}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]" role="presentation">
                          <motion.div
                            className={cn("h-full rounded-full", levelColor[s.level])}
                            initial={{ width: 0 }}
                            whileInView={{ width: levelWidth[s.level] }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}

          {/* Légende des niveaux, pour remplir la grille de 6 */}
          <Reveal delay={0.3}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-dashed border-line p-6">
              <p className="text-ink-muted">Niveaux estimés d&apos;après les projets livrés.</p>
              <ul className="space-y-3 text-sm">
                {(Object.keys(levelWidth) as Level[]).map((l) => (
                  <li key={l} className="flex items-center gap-3">
                    <span className={cn("h-2 w-8 rounded-full", levelColor[l])} />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
