import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import diegoImg from "@/assets/diego.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Cyan grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(197 100% 47%) 1px, transparent 1px), linear-gradient(90deg, hsl(197 100% 47%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Photo */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={diegoImg} alt="Diego - Fundador SLZ Digital" className="w-full h-full object-cover object-top" />
            </div>
          </div>

          {/* Right - Text */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">
              Agência de Marketing Digital — São Luís, Maranhão
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-silver/30 bg-card">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-silver">São Luís, Maranhão — Brasil</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Sua empresa merece ser{" "}
              <span className="text-primary">vista e lembrada.</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Somos especialistas em transformar negócios locais em referências digitais.
              Social media, tráfego pago, vídeo e estratégia — tudo integrado, tudo com resultado.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="cyan" size="lg" asChild>
                <a href="https://api.whatsapp.com/send?phone=5598982990007&text=Olá%2C%20vim%20do%20site%20SLZ%20Digital." target="_blank" rel="noopener noreferrer">
                  Quero crescer agora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="cyan-outline" size="lg" asChild>
                <a href="#servicos">Ver nossos serviços</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
