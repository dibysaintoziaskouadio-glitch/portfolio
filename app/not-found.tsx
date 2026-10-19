import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenu" className="container grid min-h-[80svh] place-items-center text-center">
      <div>
        <p className="font-mono text-accent">404</p>
        <h1 className="mt-4 text-display-lg font-bold">Cette page n&apos;existe pas.</h1>
        <Link href="/" className="btn-primary mt-10">Retour à l&apos;accueil</Link>
      </div>
    </main>
  );
}
