import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import predioImg from "@/assets/predio-marcus-barbosa.png.asset.json";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen">
      {/* Cyan grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(197 100% 47%) 1px, transparent 1px), linear-gradient(90deg, hsl(197 100% 47%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full min-h-screen grid lg:grid-cols-2">
        {/* Left - Photo */}
        <div className="hidden lg:flex items-center justify-center relative min-h-screen p-8">
          <div className="max-h-[500px] rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src={predioImg.url}
              alt="Marcus Barbosa | Intelligent Office"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center top" }}
            />
          </div>
        </div>

          {/* Right - Text */}
          <div className="flex items-center px-4 lg:px-12 py-20 lg:py-0">
            <div className="space-y-6 max-w-xl">
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

              <p className="text-muted-foreground text-lg leading-relaxed">
                Somos especialistas em transformar negócios locais em referências digitais.
                Social media, tráfego pago, vídeo, estratégia e automações com IA — tudo integrado, tudo com resultado.
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
