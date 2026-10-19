import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const meta = {
  github: { label: "GitHub", Icon: FaGithub },
  linkedin: { label: "LinkedIn", Icon: FaLinkedinIn },
  whatsapp: { label: "WhatsApp", Icon: FaWhatsapp },
  instagram: { label: "Instagram", Icon: FaInstagram },
  x: { label: "X (Twitter)", Icon: FaXTwitter },
} as const;

// N'affiche que les réseaux renseignés dans lib/site.ts
export default function SocialLinks({ className }: { className?: string }) {
  const entries = (Object.keys(meta) as (keyof typeof meta)[]).filter((k) => site.socials[k]);
  if (!entries.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {entries.map((k) => {
        const { label, Icon } = meta[k];
        return (
          <li key={k}>
            <a
              href={site.socials[k]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full glass transition hover:border-accent/60 hover:text-accent hover:shadow-ring"
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
