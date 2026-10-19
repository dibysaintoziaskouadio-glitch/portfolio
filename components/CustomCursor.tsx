"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Point + anneau qui suit la souris avec inertie, et grossit sur les éléments cliquables.
// Désactivé sur écran tactile et si l'utilisateur a demandé moins d'animations.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover'], input, textarea, select, label"));
    };
    const leave = () => setHidden(true);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]" style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference" style={{ x, y }} />
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{ width: hover ? 56 : 32, height: hover ? 56 : 32, backgroundColor: hover ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}
