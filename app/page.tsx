import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

// Données structurées schema.org pour les moteurs de recherche
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  image: `${site.url}/images/portrait.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
  sameAs: Object.values(site.socials).filter(Boolean),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="contenu">
        <Hero />
        <About />
        <Process />
        <Projects />
        <Skills />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
