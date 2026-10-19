"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

// Écran d'ouverture court (0,9 s), affiché une seule fois par session.
// Il se superpose au contenu déjà rendu et ne bloque donc pas le premier affichage.
export default function Loader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("loader-vu") === "1";
      sessionStorage.setItem("loader-vu", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] grid place-items-center bg-night"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              className="font-display text-5xl font-extrabold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {site.initials}
            </motion.span>
            <div className="h-px w-40 overflow-hidden bg-line">
              <motion.div className="h-full bg-accent" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8, ease: "easeInOut" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
