"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Fond en verre dès que la page défile
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section active, pour souligner le lien correspondant
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile : Échap ferme, la page ne défile plus derrière
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-line bg-night/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Navigation principale">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold" aria-label={`${site.name}, retour en haut`}>
          <span className="font-extrabold tracking-tight">{site.initials}.</span>
          <span className="hidden text-sm font-medium text-ink-muted sm:inline">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm text-ink-muted transition hover:text-ink",
                  active === l.href && "text-ink",
                )}
                aria-current={active === l.href ? "true" : undefined}
              >
                {active === l.href && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]" />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-primary hidden !px-5 !py-2 md:inline-flex">
          Me contacter
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] border-t border-line bg-night/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container flex flex-col gap-2 py-8">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-3xl font-bold">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
