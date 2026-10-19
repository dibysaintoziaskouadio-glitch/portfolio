import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper de fusion de classes (même convention que shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Le thème est monochrome : les trois accents des projets partagent le même rendu.
const mono = { text: "text-ink", bg: "bg-accent", border: "border-white/40", glow: "from-white/15" };
export const accentClasses = { cyan: mono, violet: mono, orange: mono } as const;
