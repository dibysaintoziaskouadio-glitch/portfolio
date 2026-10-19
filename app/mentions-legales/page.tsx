import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", robots: { index: false } };

export default function LegalPage() {
  return (
    <main id="contenu" className="container max-w-3xl pb-32 pt-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft size={16} /> Accueil
      </Link>
      <article className="prose prose-invert mt-10 max-w-none prose-headings:font-display">
        <h1>Mentions légales</h1>
        <h2>Éditeur</h2>
        <p>
          {site.name}, {site.role.toLowerCase()}, {site.location}.<br />
          Contact : {site.email}
        </p>
        <h2>Hébergement</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
        <h2>Propriété intellectuelle</h2>
        <p>Les textes, visuels et captures d&apos;écran de ce site appartiennent à {site.name} ou à ses clients. Toute reproduction demande une autorisation écrite.</p>

        <h2 id="confidentialite">Politique de confidentialité</h2>
        <p>
          Le formulaire de contact recueille votre nom, votre adresse e-mail et votre message. Ces données servent
          uniquement à vous répondre. Elles sont transmises par e-mail via le service Resend et ne sont ni stockées
          dans une base de données, ni revendues.
        </p>
        <p>
          La mesure d&apos;audience utilise Vercel Analytics, qui ne dépose pas de cookie et ne collecte aucune donnée
          permettant de vous identifier.
        </p>
        <p>
          Conformément à la loi ivoirienne n° 2013-450 relative à la protection des données à caractère personnel,
          vous pouvez demander l&apos;accès ou la suppression de vos données en écrivant à {site.email}.
        </p>
      </article>
    </main>
  );
}
