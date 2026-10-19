"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import Reveal, { SectionHeading } from "./Reveal";
import { badges, bio, counters, timeline } from "@/lib/content";
import { cn } from "@/lib/utils";

// Compteur qui monte de 0 à sa valeur quand il devient visible
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  // Démarre à 0 comme le rendu serveur, sinon l'hydratation échoue
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce) { setN(value); return; }
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="a-propos" className="section">
      <div className="container">
        <SectionHeading eyebrow="À propos" title={<>Du code pensé pour <span className="text-dim">Abidjan</span>.</>} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Chiffres clés, en grand */}
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {counters.map((c, i) => (
                <div key={c.label} className={cn("flex min-h-[11rem] flex-col-reverse justify-between gap-6 p-6", i === 0 ? "bg-paper text-night" : "bg-night-2")}>
                  <dt className={cn("text-sm leading-snug", i === 0 ? "text-paper-muted" : "text-ink-muted")}>{c.label}</dt>
                  <dd className="font-display text-5xl font-extrabold tracking-tight">
                    <Counter value={c.value} suffix={c.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-10">
            <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink-muted">
              {bio.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies principales">
                {badges.map((b) => (
                  <li key={b} className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink transition hover:border-white hover:bg-white hover:text-night">
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Parcours */}
            <Reveal delay={0.2}>
              <h3 className="eyebrow mb-6">Parcours récent</h3>
              <ol className="divide-y divide-line border-y border-line">
                {timeline.map((t) => (
                  <li key={t.title} className="grid gap-1 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint sm:pt-1">{t.date}</p>
                    <div>
                      <p className="font-display text-lg font-bold">{t.title}</p>
                      <p className="text-ink-muted">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
