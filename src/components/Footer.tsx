import { MapPin, Phone, Instagram } from "lucide-react";
import slzLogo from "@/assets/slz-logo.png.asset.json";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Logo */}
        <div>
          <a href="#inicio" className="flex items-center mb-4">
            <img src={slzLogo.url} alt="SLZ Digital" className="h-8 w-auto" />
          </a>
          <div className="space-y-2 text-sm text-silver">
            <a
              href="https://maps.google.com/?q=Marcus+Barbosa+Intelligent+Office+Av+dos+Holandeses+6916+Calhau+São+Luís+MA+65071-380"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-foreground transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Marcus Barbosa | Intelligent Office, Sala 115, Av. dos Holandeses, 6916 - Calhau, São Luís — MA, 65071-380</span>
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
            <p>www.slzdigital.com.br</p>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="mt-8 rounded-lg overflow-hidden border border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.0!2d-44.2194!3d-2.4894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f68e4bb2a5f8a1%3A0x0!2sAv.%20dos%20Holandeses%2C%206916%20-%20Calhau%2C%20S%C3%A3o%20Lu%C3%ADs%20-%20MA%2C%2065071-380!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
          width="100%"
          height="250"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização SLZ Digital"
        />
      </div>

      <div className="border-t border-border mt-8 pt-8 text-center text-xs text-silver">
        © 2025 SLZ Digital. Todos os direitos reservados. In Jesus We Trust, A melhor agencia de marketing de São Luís - MA. Agencia de Marketing Médico, Marketing Clinico Agencia de Marketing Digital. CNPJ:29746940000106
      </div>
    </div>
  </footer>
);

export default Footer;
