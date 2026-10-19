"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { site } from "@/lib/site";

export default function Hero() {
  const reduce = useReducedMotion();
  const [first] = site.name.split(" ");
  const [roleTop, ...roleRest] = site.role.split(" ");

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.1, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } }),
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28">
      <div aria-hidden="true" className="spotlight absolute inset-0" />

      <motion.div
        initial={reduce ? false : "hidden"}
        animate="show"
        className="container relative grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
      >
        <div>
          <motion.p custom={0} variants={item} className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-ink-muted" aria-hidden="true" />
            Salut, je suis {first}
          </motion.p>

          {/* Le nom complet reste lisible par les moteurs et lecteurs d'écran */}
          <h1 className="text-display-xl font-extrabold uppercase">
            <span className="sr-only">{site.name}, </span>
            <motion.span custom={1} variants={item} className="block">{roleTop}</motion.span>
            <motion.span custom={2} variants={item} className="block">{roleRest.join(" ")}</motion.span>
          </h1>

          <motion.p custom={3} variants={item} className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-ink">
            {site.taglines.join("  ·  ")}
          </motion.p>

          <motion.p custom={4} variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Je conçois des applications web et des SaaS pour le marché ivoirien : paiement Mobile Money,
            connexion par WhatsApp, et des interfaces qui tiennent quand le réseau tombe.
          </motion.p>

          <motion.div custom={5} variants={item} className="mt-10 flex flex-wrap gap-4">
            <a href="#projets" className="btn-ghost group uppercase tracking-wider">
              Voir mes projets
              <ArrowDownRight size={18} className="transition group-hover:rotate-[-45deg]" />
            </a>
            <a href="#contact" className="btn-primary uppercase tracking-wider">
              <Mail size={18} />
              Me contacter
            </a>
          </motion.div>

          <motion.p custom={6} variants={item} className="mt-12 flex items-center gap-2.5 text-sm text-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.available ? "Disponible pour missions freelance" : "Actuellement en mission"} · {site.location}
          </motion.p>
        </div>

        {/* Portrait dans un cadre clair : la photo a un fond blanc */}
        <motion.figure custom={3} variants={item} className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="relative overflow-hidden rounded-[2rem] bg-paper shadow-frame">
            <Image
              src="/images/portrait.jpg"
              alt={`Portrait de ${site.name}`}
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 448px, 90vw"
              className="aspect-[4/5] object-cover object-[50%_35%] grayscale"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-night via-night/80 to-transparent p-6 pt-24">
              <span>
                <span className="block font-display text-xl font-bold">{site.name}</span>
                <span className="eyebrow mt-1 block">{site.location}</span>
              </span>
              <span className="font-display text-sm font-bold">{site.initials}.</span>
            </figcaption>
          </div>
        </motion.figure>
      </motion.div>

      {/* Indicateur de défilement */}
      <a href="#a-propos" aria-label="Défiler vers la section À propos" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
        <span className="flex h-10 w-6 justify-center rounded-full border border-ink-muted/40 pt-2">
          <span className="h-2 w-1 animate-scroll-dot rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
