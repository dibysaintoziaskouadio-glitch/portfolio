# Portfolio · Ozias Diby

Portfolio de développeur full-stack basé à Abidjan. Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.

---

## 1. Vision créative

**Le terminal la nuit sur la lagune Ébrié.** Le site présente un développeur qui construit pour le terrain ivoirien : Mobile Money, WhatsApp, réseau instable. L'identité reprend ce monde : fond noir profond, réseau de particules qui évoque les connexions, accents néon et une ligne de commande qui tape les spécialités.

Trois principes :

1. **Les preuves avant les adjectifs.** Chaque projet affiche des chiffres réels tirés des dépôts (163 formules, 548 tests, 101 chapitres) plutôt que des promesses.
2. **Une seule audace par section.** Le dégradé néon est réservé au mot clé de chaque titre. Le reste reste sobre.
3. **Rapide malgré les effets.** Particules en canvas 2D plutôt que Three.js, polices auto-hébergées, images optimisées, loader de 0,9 s affiché une seule fois par session.

## 2. Moodboard

| Rôle | Valeur | Usage |
|---|---|---|
| Fond | `#0A0A0F`, `#0F0F1A`, `#161624` | page, cartes, maquettes |
| Cyan néon | `#00F5FF` | action principale, curseur, focus |
| Violet | `#A855F7` | services, niveau « Avancé » |
| Orange | `#FF6B35` | e-commerce, erreurs de formulaire |
| Texte | `#F5F5F7` / `#A1A1AA` | titres / corps |

- **Typographie** : Space Grotesk (titres, 500/700), Manrope (corps), JetBrains Mono (étiquettes, terminal).
- **Matières** : verre dépoli (`.glass`), grille estompée, bruit léger, halos flous en arrière-plan.
- **Mouvement** : apparition au scroll, inclinaison 3D des cartes, halo qui suit la souris, curseur à inertie.
- **Références** : la page d'accueil de Linear (grille et halos), Stripe (dégradés animés), Apple (rythme vertical généreux).

## 3. Arborescence

```
portfolio/
├── app/
│   ├── layout.tsx              polices, metadata SEO, loader, curseur, analytics
│   ├── page.tsx                accueil : toutes les sections + JSON-LD
│   ├── actions.ts              action serveur du formulaire (Resend)
│   ├── globals.css             utilitaires (.glass, .grid-bg, .text-gradient…)
│   ├── projets/[slug]/page.tsx étude de cas (MDX si présent, sinon données)
│   ├── mentions-legales/       mentions + politique de confidentialité
│   ├── sitemap.ts, robots.ts, not-found.tsx
├── components/
│   ├── Navbar.tsx              barre fixe, section active, menu mobile
│   ├── Hero.tsx, HeroCanvas.tsx
│   ├── About.tsx               portrait, bio, compteurs, parcours
│   ├── Projects.tsx            filtres + grille
│   ├── ProjectCard.tsx         inclinaison 3D + halo
│   ├── ProjectModal.tsx        détail : contexte, problème, solution, galerie
│   ├── ProjectVisual.tsx       capture ou maquette CSS
│   ├── Skills.tsx, Services.tsx, Contact.tsx, Footer.tsx
│   ├── SocialLinks.tsx, CustomCursor.tsx, Loader.tsx, Reveal.tsx
├── content/projects/*.mdx      études de cas longues
├── lib/
│   ├── site.ts                 identité, e-mail, réseaux sociaux
│   ├── projects.ts             données des projets
│   ├── content.ts              bio, compteurs, compétences, services
│   ├── contact.ts              schéma Zod du formulaire
│   └── utils.ts
├── public/images/              portrait, captures
└── tailwind.config.ts
```

## 4. Modifier le contenu

| Pour changer… | Fichier |
|---|---|
| Nom, e-mail, réseaux sociaux, Calendly, disponibilité | `lib/site.ts` |
| Projets, chiffres, liens « Voir le site » / « Code source » | `lib/projects.ts` |
| Bio, compteurs, parcours, compétences, services | `lib/content.ts` |
| Étude de cas détaillée | `content/projects/<slug>.mdx` |
| Captures d'écran | `public/images/projets/`, puis `gallery` dans `lib/projects.ts` |

Un réseau social laissé vide n'est pas affiché. Un projet sans capture affiche une maquette dessinée en CSS.

## 5. Installation et déploiement

```bash
npm install
cp .env.example .env.local     # renseigner RESEND_API_KEY
npm run dev                    # http://localhost:3000
npm run build && npm start     # vérifier la version de production
```

**Sur Vercel :**

1. Pousser le dossier sur GitHub (`git init`, `git add .`, `git commit`, `git push`).
2. Sur vercel.com : *Add New → Project*, importer le dépôt. Next.js est détecté automatiquement.
3. Dans *Settings → Environment Variables* : `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`, `NEXT_PUBLIC_SITE_URL`.
4. Dans *Analytics*, activer Web Analytics.
5. Optionnel : *Settings → Domains* pour un domaine personnalisé, puis mettre à jour `NEXT_PUBLIC_SITE_URL`.

**Resend :** sans domaine vérifié, l'expéditeur `onboarding@resend.dev` n'envoie qu'à l'adresse du compte Resend. Vérifiez votre domaine dans Resend pour un envoi normal. Sans clé, le formulaire affiche un message invitant à écrire directement par e-mail.

## 6. Checklist de lancement

**Contenu**
- [ ] Nom confirmé dans `lib/site.ts`
- [ ] Liens GitHub, LinkedIn, WhatsApp renseignés
- [ ] Captures d'écran ajoutées pour Babi Mobilier, ExamPrepa CI, Stock Block, Akwaba Hôtels
- [ ] Niveaux de compétences et parcours relus
- [ ] Liens « Voir le site » / « Code source » ajoutés quand ils sont publics

**SEO**
- [ ] `NEXT_PUBLIC_SITE_URL` correspond à l'URL finale
- [ ] Image Open Graph testée sur opengraph.xyz
- [ ] Sitemap soumis dans Google Search Console (`/sitemap.xml`)

**Performance**
- [ ] Lighthouse mobile ≥ 95 sur la version déployée
- [ ] Captures compressées (moins de 500 Ko chacune)

**Accessibilité**
- [ ] Navigation complète au clavier (Tab, Échap ferme la fenêtre projet et le menu)
- [ ] Test avec « Réduire les animations » activé dans le système
- [ ] Formulaire testé avec un lecteur d'écran

**Formulaire**
- [ ] Un vrai message reçu depuis la version en ligne

## 7. Choix techniques par rapport au brief

- **GSAP et Three.js non utilisés.** Framer Motion couvre les apparitions au scroll, l'inclinaison et les transitions ; un canvas 2D suffit pour les particules. Cela économise environ 150 Ko de JavaScript, ce qui aide à viser Lighthouse > 95.
- **shadcn/ui** : le helper `cn()` et les conventions sont en place ; ajoutez des composants avec `npx shadcn@latest add <composant>` au besoin.
- **Témoignages et blog** non inclus : il faut de vrais témoignages clients. Voir les suggestions ci-dessous.

## 8. Améliorations futures

1. **Version anglaise** avec `next-intl` : routes `/fr` et `/en`, textes extraits de `lib/content.ts`.
2. **Témoignages** : ajouter un carrousel dès que deux ou trois clients ont accepté d'être cités.
3. **Blog MDX** : `content/blog/*.mdx`, avec des articles sur l'intégration CinetPay ou les PWA hors ligne, utiles pour le référencement.
4. **CMS** : Sanity ou Keystatic pour modifier projets et articles sans toucher au code.
5. **Bouton WhatsApp flottant** avec message prérempli, plus naturel que l'e-mail pour beaucoup de clients ivoiriens.
6. **Image Open Graph générée** par projet avec `next/og`.
