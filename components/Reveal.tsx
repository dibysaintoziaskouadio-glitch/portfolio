"use client";

import { motion, useReducedMotion } from "framer-motion";

// Apparition en fondu + glissement quand l'élément entre dans l'écran
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="text-display-lg font-bold">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>}
    </Reveal>
  );
}
