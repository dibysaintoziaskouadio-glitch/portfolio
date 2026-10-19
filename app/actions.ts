"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";
import { site } from "@/lib/site";

export type ContactResult = { ok: boolean; message: string };

export async function sendContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Certains champs sont incomplets. Corrigez-les puis renvoyez le message." };
  }
  const { name, email, message, company } = parsed.data;

  // Robot détecté par le champ piège : on répond comme si tout allait bien
  if (company) return { ok: true, message: "Message envoyé." };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY manquant : message non envoyé.", { name, email });
    return { ok: false, message: `L'envoi n'est pas encore configuré. Écrivez-moi directement à ${site.email}.` };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO ?? site.email,
    replyTo: email,
    subject: `Portfolio : nouveau message de ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
  });

  if (error) {
    console.error("[contact] Resend :", error);
    return { ok: false, message: `L'envoi a échoué. Réessayez dans un instant ou écrivez à ${site.email}.` };
  }
  return { ok: true, message: "Message envoyé. Je vous réponds sous 48 heures." };
}
