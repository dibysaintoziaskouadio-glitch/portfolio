// Informations personnelles : c'est le seul fichier à modifier pour mettre à jour l'identité du site.
// Un lien social laissé vide n'est pas affiché.

export const site = {
  name: "Ozias Diby",
  initials: "OD",
  role: "Développeur full-stack",
  location: "Abidjan, Côte d'Ivoire",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ozias-diby.vercel.app",
  email: "oziassaint3@gmail.com",
  // Numéro affiché dans la section Contact ; le lien WhatsApp est dans socials.whatsapp
  phone: "+225 01 50 87 94 76",
  available: true,
  description:
    "Développeur full-stack à Abidjan. Applications web et SaaS pour le marché ivoirien : paiement Mobile Money, connexion par WhatsApp, applications qui fonctionnent hors ligne.",
  // Mots-clés affichés sous le titre du hero
  taglines: ["Web", "SaaS", "Mobile Money", "Hors ligne"],
  socials: {
    github: "https://github.com/dibysaintoziaskouadio-glitch",
    linkedin: "",
    whatsapp: "https://wa.me/2250150879476",
    instagram: "",
    x: "",
  },
  calendly: "", // ex. "https://calendly.com/ozias-diby/30min"
} as const;

export const navLinks = [
  { href: "#a-propos", label: "À propos" },
  { href: "#methode", label: "Méthode" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;
