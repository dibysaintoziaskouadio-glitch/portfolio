import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/site";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import "./globals.css";

// Polices auto-hébergées par next/font : aucune requête vers Google au chargement
const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "800"], display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["développeur full-stack", "Abidjan", "Côte d'Ivoire", "Next.js", "React", "Mobile Money", "CinetPay", "freelance"],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1254, height: 1254, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/images/og.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0B0B0C", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="noise">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-night">
          Aller au contenu
        </a>
        <Loader />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
