import { MapPin, Phone, Instagram } from "lucide-react";
import slzLogo from "@/assets/slz-logo.webp.asset.json";
import { lazy, Suspense } from "react";

const FooterMap = lazy(() => import("./FooterMap"));

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Logo */}
        <div>
          <a href="#inicio" className="flex items-center mb-4">
            <img src={slzLogo.url} alt="SLZ Digital" width={600} height={179} loading="lazy" decoding="async" className="h-8 w-auto" />
          </a>
          <div className="space-y-2 text-sm text-silver">
            <a
              href="https://maps.google.com/?q=Edifício+Marcus+Barbosa+Av+dos+Holandeses+6916+Calhau+São+Luís+MA+65071-380"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-foreground transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Edifício Marcus Barbosa, Intelligent Office, Sala 115 – Av. dos Holandeses, 6916 – Calhau, São Luís - MA, 65071-380</span>
            </a>
          </div>
        </div>

        {/* Nav Links */}
        <div>
          <p className="font-heading font-semibold text-sm mb-4">Navegação</p>
          <div className="space-y-2 text-sm text-silver">
            {[
              { label: "Serviços", href: "#servicos" },
              { label: "Cases", href: "#nichos" },
              { label: "Processo", href: "#processo" },
              { label: "Contato", href: "#contato" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="block hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="font-heading font-semibold text-sm mb-4">Contato</p>
          <div className="space-y-2 text-sm text-silver">
            <a href="tel:+5598982990007" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-4 h-4 text-primary" />
              (98) 98299-0007
            </a>
            <a
              href="https://www.instagram.com/slzdigital1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Instagram className="w-4 h-4 text-primary" />
              @slzdigital1
            </a>
            <a
              href="https://www.slzdigital.com.br/"
              className="block hover:text-foreground transition-colors"
            >
              www.slzdigital.com.br
            </a>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="mt-8 rounded-lg overflow-hidden border border-border">
        <Suspense fallback={<div className="h-[250px]" />}>
          <FooterMap />
        </Suspense>
      </div>

      <div className="border-t border-border mt-8 pt-8 text-center text-xs text-silver">
        © 2026 SLZ Digital. Todos os direitos reservados
SLZ Digital | Agência de Marketing em São Luís – MA.
 Especialista em Marketing Médico, Marketing Clínico e Marketing Digital.
 CNPJ: 29.746.940/0001-06
 In Jesus We Trust
      </div>
    </div>
  </footer>
);

export default Footer;
