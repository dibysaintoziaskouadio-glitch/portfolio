"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative border-t border-line">
      <div className="container py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <p className="font-display text-3xl font-bold">
              {site.name}<span className="text-accent">.</span>
            </p>
            <p className="text-ink-muted">{site.role} · {site.location}</p>
            <SocialLinks />
          </div>
          <nav aria-label="Liens du pied de page" className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
            {navLinks.map((l) => (
              <Link key={l.href} href={`/${l.href}`} className="text-ink-muted transition hover:text-ink">{l.label}</Link>
            ))}
            <Link href="/mentions-legales" className="text-ink-muted transition hover:text-ink">Mentions légales</Link>
            <Link href="/mentions-legales#confidentialite" className="text-ink-muted transition hover:text-ink">Confidentialité</Link>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-sm text-ink-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Tous droits réservés.</p>
          <p>Fait avec <span aria-label="amour">❤️</span> à Abidjan</p>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ y: -4 }}
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-night shadow-ring"
            aria-label="Retour en haut"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
