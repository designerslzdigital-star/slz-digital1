import { Globe, MapPin, Phone, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Logo */}
        <div>
          <a href="#inicio" className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-heading text-lg">
              <span className="font-bold text-primary">SLZ</span>
              <span className="text-primary font-normal ml-1">DIGITAL</span>
            </span>
          </a>
          <div className="space-y-2 text-sm text-silver">
            <a
              href="https://maps.google.com/?q=Avenida+dos+Holandeses+Calhau+São+Luís+MA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-foreground transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Marcus Barbosa Intelligent Office, Sala 115, Calhau, São Luís — MA, CEP 65071-380</span>
            </a>
          </div>
        </div>

        {/* Nav Links */}
        <div>
          <p className="font-heading font-semibold text-sm mb-4">Navegação</p>
          <div className="space-y-2 text-sm text-silver">
            {["Serviços", "Pacotes", "Portfólio", "Contato"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block hover:text-foreground transition-colors">
                {link}
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

      <div className="border-t border-border mt-8 pt-8 text-center text-xs text-silver">
        © 2025 SLZ Digital. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
