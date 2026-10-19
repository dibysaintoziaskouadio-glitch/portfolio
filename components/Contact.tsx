"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Check, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import SocialLinks from "./SocialLinks";
import { sendContact, type ContactResult } from "@/app/actions";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-ink placeholder:text-ink-faint transition focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent/20";

export default function Contact() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ContactResult | null>(null);
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactInput) =>
    startTransition(async () => {
      const r = await sendContact(data);
      setResult(r);
      if (r.ok) reset();
    });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="section overflow-hidden">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-white/[0.04] blur-[140px]" />
      <div className="container relative">
        <SectionHeading eyebrow="Contact" title={<>Un projet en tête&nbsp;? <span className="text-dim">Parlons-en.</span></>} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal className="flex flex-col gap-8">
            {site.available && (
              <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Disponible pour missions freelance
              </p>
            )}
            <p className="text-lg leading-relaxed text-ink-muted">
              Décrivez votre besoin en quelques lignes : je réponds sous 48 heures avec une première estimation.
            </p>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-3 font-display text-lg font-bold sm:text-xl">
                  <Mail size={20} className="text-accent" aria-hidden="true" />
                  <span className="break-all group-hover:text-accent">{site.email}</span>
                </a>
                <button type="button" onClick={copyEmail} className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-accent/60" aria-label="Copier l'adresse e-mail">
                  {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
                </button>
                <span role="status" className="sr-only">{copied ? "Adresse copiée" : ""}</span>
              </div>
              <p className="flex items-center gap-3 text-ink-muted">
                <MapPin size={18} aria-hidden="true" /> {site.location}
              </p>
            </div>

            {site.calendly && (
              <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn-ghost w-fit">
                <CalendarDays size={18} /> Réserver un appel de 30 min
              </a>
            )}

            <SocialLinks />
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-3xl p-6 glass sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm">Nom</label>
                  <input id="name" autoComplete="name" className={field} placeholder="Aya Kouassi" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} {...register("name")} />
                  {errors.name && <p id="name-err" className="mt-1.5 text-sm text-danger">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm">E-mail</label>
                  <input id="email" type="email" autoComplete="email" className={field} placeholder="aya@entreprise.ci" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} {...register("email")} />
                  {errors.email && <p id="email-err" className="mt-1.5 text-sm text-danger">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm">Message</label>
                <textarea id="message" rows={6} className={cn(field, "resize-y")} placeholder="Je souhaite une boutique en ligne avec paiement Wave et Orange Money…" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} {...register("message")} />
                {errors.message && <p id="message-err" className="mt-1.5 text-sm text-danger">{errors.message.message}</p>}
              </div>
              {/* Champ piège pour les robots, invisible pour les humains */}
              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label htmlFor="company">Entreprise</label>
                <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
                  {pending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {pending ? "Envoi…" : "Envoyer le message"}
                </button>
                <p role="status" className={cn("text-sm", result?.ok ? "text-emerald-300" : "text-danger")}>
                  {result?.message}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
