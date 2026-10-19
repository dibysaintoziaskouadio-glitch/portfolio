import { z } from "zod";

// Schéma partagé entre le formulaire (client) et l'action serveur
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(80),
  email: z.string().trim().email("Cette adresse e-mail n'est pas valide."),
  message: z.string().trim().min(10, "Votre message doit faire au moins 10 caractères.").max(4000),
  // Champ piège invisible : rempli seulement par les robots
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
