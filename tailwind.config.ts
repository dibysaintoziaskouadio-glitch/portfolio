import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        // Fonds, du plus profond au plus clair
        night: { DEFAULT: "#0B0B0C", 2: "#121214", 3: "#1A1A1D" },
        // Accent unique : blanc. Les cartes claires utilisent "paper".
        accent: "#FFFFFF",
        paper: { DEFAULT: "#F2F2F0", muted: "#5C5C60" },
        danger: "#F87171",
        // Texte
        ink: { DEFAULT: "#F5F5F5", muted: "#9A9A9F", faint: "#6B6B70" },
        line: "rgba(255,255,255,0.09)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7.5vw, 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        ring: "0 0 0 1px rgba(255,255,255,.35), 0 12px 40px -12px rgba(255,255,255,.25)",
        frame: "0 40px 80px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.08)",
      },
      keyframes: {
        "scroll-dot": { "0%": { transform: "translateY(0)", opacity: "1" }, "80%": { transform: "translateY(14px)", opacity: "0" }, "100%": { opacity: "0" } },
      },
      animation: {
        "scroll-dot": "scroll-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
