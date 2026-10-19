// Contenus des sections À propos, Compétences et Services.

export const bio = [
  "Je suis développeur full-stack à Abidjan. Je construis des applications web et des SaaS pensés pour le terrain ivoirien : Mobile Money avant la carte bancaire, WhatsApp avant l'e-mail, et des interfaces qui continuent de marcher quand le réseau tombe.",
  "J'aime les problèmes où l'exactitude compte : calculs comptables au centime, paiements rapprochés automatiquement, données isolées par marchand. Chaque projet est livré testé et se déploie avec une seule commande Docker.",
];

export const counters = [
  { value: 5, suffix: "", label: "produits livrés en 2026" },
  { value: 163, suffix: "", label: "formules comptables codées" },
  { value: 548, suffix: "+", label: "tests automatisés" },
  { value: 4, suffix: "", label: "opérateurs Mobile Money intégrés" },
];

export const badges = ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Docker", "Tailwind", "Flutter"];

// Parcours : à compléter avec tes études et expériences.
export const timeline = [
  { date: "Oct. 2026", title: "Comptapilot", text: "Moteur de calcul comptable, fiscal et social pour Vision Technologie." },
  { date: "Oct. 2026", title: "Babi Mobilier", text: "Marketplace multi-marchands avec paiement CinetPay et OTP WhatsApp." },
  { date: "Oct. 2026", title: "ExamPrepa CI", text: "PWA hors ligne de préparation au BEPC, 101 chapitres rédigés." },
  { date: "Oct. 2026", title: "Stock Block", text: "Gestion de stock avec audit et alertes de seuil." },
];

// Méthode de travail, en quatre étapes
export const process = [
  { step: "01", label: "Découvrir", title: "Stratégie produit", text: "Ateliers, parcours utilisateurs et contraintes du terrain : réseau, paiement, appareils." },
  { step: "02", label: "Concevoir", title: "Design d'interface", text: "Maquettes haute fidélité, mobile d'abord, et un système de composants réutilisable." },
  { step: "03", label: "Construire", title: "Développement full-stack", text: "Front-end réactif, API, base de données et paiements, couverts par des tests." },
  { step: "04", label: "Lancer", title: "Mise en ligne et suivi", text: "Déploiement Docker, sauvegardes, mesures de performance et améliorations continues." },
];

export type Level = "Expert" | "Avancé" | "Intermédiaire";

// Niveaux estimés d'après les projets : à ajuster.
export const skills: { category: string; items: { name: string; level: Level }[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: "Expert" },
      { name: "Next.js (App Router)", level: "Avancé" },
      { name: "TypeScript", level: "Expert" },
      { name: "PWA / hors ligne", level: "Avancé" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", level: "Expert" },
      { name: "NestJS", level: "Avancé" },
      { name: "PostgreSQL / Prisma", level: "Expert" },
      { name: "Paiement CinetPay", level: "Avancé" },
    ],
  },
  {
    category: "Design",
    items: [
      { name: "Tailwind CSS", level: "Expert" },
      { name: "shadcn/ui, Radix", level: "Avancé" },
      { name: "UI mobile d'abord", level: "Avancé" },
      { name: "Accessibilité", level: "Intermédiaire" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker / Compose", level: "Avancé" },
      { name: "nginx", level: "Avancé" },
      { name: "Vercel", level: "Avancé" },
      { name: "Sauvegardes PostgreSQL", level: "Intermédiaire" },
    ],
  },
  {
    category: "Outils",
    items: [
      { name: "Git", level: "Avancé" },
      { name: "Playwright", level: "Intermédiaire" },
      { name: "Tests de propriétés", level: "Avancé" },
      { name: "Flutter / Android", level: "Intermédiaire" },
    ],
  },
];

export const services = [
  {
    title: "Application web sur mesure",
    text: "Du besoin au déploiement : une application React / Next.js rapide, testée et hébergée.",
    deliverables: ["Maquettes et parcours", "Application en production", "Code source et documentation"],
    price: "Sur devis",
  },
  {
    title: "SaaS et outils métier",
    text: "Gestion de stock, comptabilité, facturation : des outils qui remplacent le cahier et le tableur.",
    deliverables: ["Rôles et journal d'audit", "Tableau de bord", "Sauvegardes automatiques"],
    price: "Sur devis",
  },
  {
    title: "Paiement Mobile Money",
    text: "Intégration CinetPay : Orange Money, MTN, Moov et Wave, avec webhook et rapprochement.",
    deliverables: ["Guichet de paiement", "Webhook signé", "Rapprochement automatique"],
    price: "Sur devis",
  },
  {
    title: "Application hors ligne (PWA)",
    text: "Une application installable qui fonctionne sans réseau et se synchronise au retour de la connexion.",
    deliverables: ["Stockage local", "Synchronisation", "Installation sur l'écran d'accueil"],
    price: "Sur devis",
  },
];
