// Données des projets. Les chiffres viennent des README de chaque dépôt.
// Une étude de cas longue peut être rédigée dans content/projects/<slug>.mdx :
// la page /projets/<slug> l'utilise si le fichier existe.

export type Category = "SaaS" | "E-commerce" | "Éducation" | "Web";
export type Accent = "cyan" | "violet" | "orange";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  year: string;
  accent: Accent;
  summary: string;
  context: string;
  problem: string;
  solution: string[];
  results: { value: string; label: string }[];
  stack: string[];
  gallery: { src: string; alt: string }[];
  // Maquette dessinée en CSS quand le projet n'a pas encore de capture d'écran
  mock: { kicker: string; headline: string; rows: [string, string][] };
  links: { site?: string; code?: string };
};

export const categories: ("Tous" | Category)[] = ["Tous", "SaaS", "E-commerce", "Éducation", "Web"];

export const projects: Project[] = [
  {
    slug: "comptapilot",
    title: "Comptapilot",
    tagline: "Le comptable ne calcule plus : il vérifie et il valide.",
    category: "SaaS",
    year: "2026",
    accent: "cyan",
    summary:
      "Application de calcul comptable, fiscal et social. Chaque saisie déclenche un moteur déterministe qui montre sa formule, ses étapes et ses références légales.",
    context:
      "Projet édité par Vision Technologie pour les cabinets comptables et les services financiers d'entreprise.",
    problem:
      "Un comptable recalcule à la main TVA, paie, amortissements ou emprunts, avec des barèmes qui changent selon la date de l'opération. Une erreur d'arrondi ou un barème périmé coûte cher, et rien ne prouve après coup comment le chiffre a été obtenu.",
    solution: [
      "13 moteurs de calcul en TypeScript pur, avec decimal.js à 28 chiffres significatifs : aucun nombre flottant.",
      "16 barèmes versionnés, appliqués selon la date de l'opération, avec alerte si une version est à confirmer.",
      "Chaque résultat affiche formule, étapes chiffrées, contrôles de cohérence et écritures comptables.",
      "Un calcul validé est archivé avec son empreinte SHA-256 et ne peut plus être supprimé.",
      "Déploiement en trois conteneurs Docker : PostgreSQL, API et frontend nginx.",
    ],
    results: [
      { value: "163", label: "formules" },
      { value: "548", label: "tests automatisés" },
      { value: "0,23 ms", label: "médiane par calcul" },
    ],
    stack: ["TypeScript", "Node.js", "React", "PostgreSQL 16", "decimal.js", "fast-check", "Playwright", "Docker", "nginx"],
    gallery: [
      { src: "/images/projets/comptapilot-02-tableau-de-bord.png", alt: "Tableau de bord de Comptapilot" },
      { src: "/images/projets/comptapilot-03-bulletin.png", alt: "Calcul d'un bulletin de paie" },
      { src: "/images/projets/comptapilot-07-moteur-tva.png", alt: "Moteur de TVA" },
      { src: "/images/projets/comptapilot-11-sombre-montecarlo.png", alt: "Simulation Monte-Carlo en thème sombre" },
      { src: "/images/projets/comptapilot-13-mobile.png", alt: "Comptapilot sur mobile" },
    ],
    mock: { kicker: "Bulletin de paie", headline: "Validé", rows: [["Empreinte", "SHA-256"], ["Barème", "2026-01"]] },
    links: {},
  },
  {
    slug: "babi-mobilier",
    title: "Babi Mobilier",
    tagline: "Boutique de meubles multi-marchands, payée en Mobile Money.",
    category: "E-commerce",
    year: "2026",
    accent: "orange",
    summary:
      "Marketplace de meubles pour la Côte d'Ivoire : un sous-domaine par marchand, connexion par OTP WhatsApp, paiement Orange Money, MTN, Moov, Wave ou en espèces à la livraison.",
    context:
      "À Abidjan, la majorité des achats en ligne se paient en Mobile Money ou à la livraison, et les clients se connectent depuis leur téléphone sur un réseau parfois instable.",
    problem:
      "Les plateformes e-commerce classiques supposent une carte bancaire, une adresse e-mail et une connexion fiable. Un meuble coûte cher : le marchand veut un acompte avant de livrer.",
    solution: [
      "Multi-tenant par sous-domaine (atelier-kone.babimobilier.ci), isolé par Row Level Security PostgreSQL.",
      "Connexion sans mot de passe par code WhatsApp : code haché, usage unique, 5 essais, 3 envois par 10 minutes.",
      "Paiement CinetPay avec webhook signé et rapprochement automatique toutes les 2 minutes.",
      "Acompte de 10 % en Mobile Money au-delà de 300 000 F CFA, solde à la livraison.",
      "Panier conservé dans le navigateur, qui survit aux coupures réseau.",
    ],
    results: [
      { value: "4", label: "opérateurs Mobile Money" },
      { value: "10 %", label: "d'acompte au-delà de 300 000 F" },
      { value: "2 min", label: "cycle de rapprochement" },
    ],
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Row Level Security", "CinetPay", "WhatsApp Cloud API", "Express", "Vercel"],
    gallery: [],
    mock: {
      kicker: "atelier-kone.babimobilier.ci",
      headline: "385 000 F",
      rows: [
        ["Canapé 3 places", "382 500 F"],
        ["Livraison Cocody", "2 500 F"],
        ["Acompte Wave 10 %", "38 500 F"],
      ],
    },
    links: {},
  },
  {
    slug: "examprepa-ci",
    title: "ExamPrepa CI",
    tagline: "Réviser le BEPC et le BAC, même sans connexion.",
    category: "Éducation",
    year: "2026",
    accent: "violet",
    summary:
      "Plateforme de préparation au BEPC et au BAC ivoiriens : cours, fiches de révision, questions corrigées immédiatement et devoirs notés sur 20 au format examen.",
    context:
      "Les élèves de 3ᵉ et de Terminale révisent surtout sur téléphone, avec des forfaits data limités. Le contenu doit suivre les programmes officiels DPFC.",
    problem:
      "Les ressources en ligne sont dispersées, rarement alignées sur le programme ivoirien, et inutilisables hors connexion. L'enseignant n'a pas de vue sur la progression de ses élèves.",
    solution: [
      "PWA mobile d'abord : cours et devoirs stockés en local avec IndexedDB, synchronisés au retour du réseau.",
      "101 chapitres du BEPC conformes aux progressions DPFC 2026-2027, dans 9 matières.",
      "Correction automatique des QCM et devoirs notés sur 20 avec barème détaillé.",
      "Espace enseignant : correction, relecture des chapitres, verrouillage du chapitre suivant selon la note.",
      "Contrôle qualité automatique : chaque devoir totalise 20 points, chaque formule s'affiche.",
    ],
    results: [
      { value: "101", label: "chapitres du BEPC" },
      { value: "1 515", label: "questions de cours" },
      { value: "748", label: "questions de devoirs" },
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL 16", "React", "Vite", "Tailwind CSS", "Dexie / IndexedDB", "PWA", "Docker"],
    gallery: [],
    mock: {
      kicker: "Devoir · Mathématiques · 3ᵉ",
      headline: "16,5 / 20",
      rows: [
        ["Théorème de Thalès", "5 / 5"],
        ["Équations", "6 / 7"],
        ["Chapitre suivant", "Débloqué"],
      ],
    },
    links: {},
  },
  {
    slug: "stock-block",
    title: "Stock Block",
    tagline: "Chaque sac de ciment tracé, chaque rupture anticipée.",
    category: "SaaS",
    year: "2026",
    accent: "cyan",
    summary:
      "Gestion de stock : catalogue produits, mouvements d'entrée, de sortie et d'ajustement traçables, alertes de seuil, tableau de bord, rôles et journal d'audit.",
    context:
      "Quincailleries, dépôts et commerces de gros gèrent encore souvent leur stock sur cahier ou sur tableur partagé.",
    problem:
      "Sans historique fiable, impossible de savoir qui a sorti quoi, ni de commander avant la rupture. Un tableur ne gère ni les droits d'accès ni l'audit.",
    solution: [
      "Mouvements typés (entrée, sortie, ajustement) avec motif et auteur, jamais supprimés.",
      "Alertes automatiques quand un produit passe sous son seuil.",
      "Rôles et journal d'audit sur chaque action, authentification JWT avec jeton de rafraîchissement.",
      "Déploiement Docker derrière nginx, base non exposée, scripts de sauvegarde et de restauration.",
    ],
    results: [
      { value: "3", label: "types de mouvements tracés" },
      { value: "100 %", label: "des actions journalisées" },
      { value: "1", label: "commande pour déployer" },
    ],
    stack: ["React 18", "TypeScript", "shadcn/ui", "TanStack Query", "Zustand", "Recharts", "Express 5", "Prisma", "PostgreSQL 16", "Docker"],
    gallery: [],
    mock: {
      kicker: "Mouvements · aujourd'hui",
      headline: "Seuil atteint",
      rows: [
        ["+120 Ciment 50 kg", "Entrée"],
        ["−45 Fer à béton 10", "Sortie"],
        ["Tôle bac alu · 8", "Alerte"],
      ],
    },
    links: {},
  },
  {
    slug: "akwaba-hotels",
    title: "Akwaba Hôtels",
    tagline: "Les hôtels d'Abidjan, avec leurs tarifs officiels.",
    category: "Web",
    year: "2026",
    accent: "violet",
    summary:
      "Annuaire en ligne de 43 hôtels d'Abidjan, du Plateau à Bingerville : adresses, contacts et tarifs officiels de Côte d'Ivoire Tourisme, recherche par commune, dates et budget.",
    context: "Les voyageurs d'affaires et les touristes comparent les hôtels d'Abidjan sur des sites qui mélangent annonces et publicité.",
    problem: "Les tarifs officiels existent dans un PDF de Côte d'Ivoire Tourisme, peu lisible sur mobile et sans recherche. Beaucoup de numéros d'annuaire sont périmés.",
    solution: [
      "Données extraites de la liste officielle, chaque fiche citant sa source exacte.",
      "Téléphones et e-mails comparés un par un aux sites officiels des hôtels : 18 contacts vérifiés sur 43.",
      "Recherche façon comparateur : commune, dates, nombre de chambres, budget, total du séjour calculé.",
      "Référencement Google : données structurées schema.org pour les 43 hôtels, sitemap, aperçu de partage.",
      "Données des inscrits protégées par des règles d'accès côté serveur, contenus visiteurs échappés à l'affichage.",
    ],
    results: [
      { value: "43", label: "hôtels référencés" },
      { value: "16", label: "tarifs officiels" },
      { value: "18", label: "contacts vérifiés sur le site de l'hôtel" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "schema.org", "GitHub Pages"],
    gallery: [],
    mock: {
      kicker: "Filtrer par commune",
      headline: "Akwaba",
      rows: [
        ["Plateau", "Cocody"],
        ["Marcory", "Port-Bouët"],
      ],
    },
    links: {
      site: "https://dibysaintoziaskouadio-glitch.github.io/hotels-abidjan/",
      code: "https://github.com/dibysaintoziaskouadio-glitch/hotels-abidjan",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
