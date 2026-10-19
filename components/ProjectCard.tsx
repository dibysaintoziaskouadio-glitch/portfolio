"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import type { Project } from "@/lib/projects";
import { accentClasses, cn } from "@/lib/utils";

// Carte projet : inclinaison 3D qui suit la souris, zoom du visuel et halo au survol.
export default function ProjectCard({ project, onOpen, featured }: { project: Project; onOpen: () => void; featured?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(500px circle at ${x} ${y}, rgba(255,255,255,0.07), transparent 40%)`);
  const a = accentClasses[project.accent];

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl text-left glass transition-colors duration-500 hover:border-white/20"
      aria-label={`${project.title} : voir le détail du projet`}
    >
      {/* Halo qui suit la souris */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className={cn("relative overflow-hidden border-b border-line", featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]")}>
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <ProjectVisual project={project} sizes={featured ? "(min-width: 768px) 1200px, 100vw" : "(min-width: 768px) 600px, 100vw"} priority={featured} />
        </div>
        <span className="absolute left-4 top-4 z-10 rounded-full bg-night/80 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-bold">{project.title}</h3>
            <p className={cn("mt-1 text-sm", a.text)}>{project.tagline}</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-night">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Technologies">
          {project.stack.slice(0, featured ? 7 : 4).map((s) => (
            <li key={s} className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-ink-muted">{s}</li>
          ))}
        </ul>
      </div>
    </motion.button>
  );
}
