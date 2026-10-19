import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { process } from "@/lib/content";
import { cn } from "@/lib/utils";

// Méthode en quatre étapes : cartes claires et sombres en alternance
export default function Process() {
  return (
    <section id="methode" className="section">
      <div className="container">
        <Reveal className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <p className="eyebrow mb-4">Méthode</p>
            <h2 className="text-display-lg font-bold">
              Pensé avec soin.
              <span className="text-dim block">Construit avec précision.</span>
            </h2>
          </div>
          <p className="max-w-md text-ink-muted lg:justify-self-end">
            Un déroulé de bout en bout : stratégie, design d&apos;interface, développement et lancement.
          </p>
        </Reveal>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => {
            const light = i % 2 === 0;
            return (
              <li key={p.step}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div
                    className={cn(
                      "group flex h-full min-h-[18rem] flex-col rounded-2xl p-6 transition duration-500 hover:-translate-y-1",
                      light ? "card-light" : "glass",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", light ? "text-paper-muted" : "text-ink-muted")}>
                        {p.step} / {p.label}
                      </span>
                      <ArrowUpRight size={18} aria-hidden="true" className="transition duration-300 group-hover:rotate-45" />
                    </div>
                    <h3 className="mt-10 font-display text-2xl font-bold leading-tight">{p.title}</h3>
                    <p className={cn("mt-3 text-sm leading-relaxed", light ? "text-paper-muted" : "text-ink-muted")}>{p.text}</p>
                    <span aria-hidden="true" className={cn("mt-auto block h-0.5 w-8 transition-all duration-500 group-hover:w-16", light ? "bg-night" : "bg-ink")} />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
