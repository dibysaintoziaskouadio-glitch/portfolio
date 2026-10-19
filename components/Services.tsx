import { Check, CreditCard, LayoutDashboard, MonitorSmartphone, WifiOff } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import { services } from "@/lib/content";

const icons = [MonitorSmartphone, LayoutDashboard, CreditCard, WifiOff];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title={<>Ce que je peux <span className="text-dim">construire pour vous</span>.</>}
          intro="Missions freelance au forfait ou en régie, à Abidjan ou à distance."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <article className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 glass transition duration-500 hover:border-accent/40">
                  <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition duration-700 group-hover:bg-accent/25" />
                  <div className="flex items-center justify-between">
                    <Icon size={26} className="text-accent" aria-hidden="true" />
                    <span className="font-mono text-xs text-ink-muted">{s.price}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{s.text}</p>
                  </div>
                  <ul className="mt-auto space-y-2 border-t border-line pt-5 text-sm">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5">
                        <Check size={15} className="text-accent" aria-hidden="true" /> {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
