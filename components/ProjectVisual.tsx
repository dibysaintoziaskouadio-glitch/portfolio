import Image from "next/image";
import type { Project } from "@/lib/projects";
import { accentClasses, cn } from "@/lib/utils";

// Visuel d'un projet : sa première capture si elle existe,
// sinon une maquette d'interface dessinée en CSS à partir de project.mock.
export default function ProjectVisual({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  const a = accentClasses[project.accent];
  const cover = project.gallery[0];

  if (cover) {
    return <Image src={cover.src} alt={cover.alt} fill sizes={sizes} priority={priority} className="object-cover object-left-top" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-night-3" aria-hidden="true">
      <div className={cn("absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-3xl", a.glow)} />
      <div className="spotlight absolute inset-0" />
      <div className="absolute inset-5 flex flex-col justify-end gap-3 rounded-xl border border-line bg-night/70 p-5 font-mono text-xs backdrop-blur-md">
        <div className="mb-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate text-ink-faint">{project.mock.kicker}</span>
        </div>
        <p className={cn("font-display text-4xl font-bold tracking-tight", a.text)}>{project.mock.headline}</p>
        {project.mock.rows.map(([l, r]) => (
          <div key={l} className="flex justify-between gap-3 border-t border-line pt-2 text-ink-muted">
            <span className="truncate">{l}</span>
            <span className="shrink-0 text-ink">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
