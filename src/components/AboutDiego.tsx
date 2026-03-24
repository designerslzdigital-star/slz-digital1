import { Button } from "@/components/ui/button";
import { Check, MessageCircle } from "lucide-react";
import diegoImg from "@/assets/diego.png";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5598982990007&text=Olá%2C%20vim%20do%20site%20SLZ%20Digital.";

const badges = [
  { value: "8 Anos", label: "de mercado" },
  { value: "10+", label: "clientes ativos" },
  { value: "Exp.", label: "Internacional" },
];

const includes = [
  "Gestão completa de redes sociais",
  "Tráfego Pago (Meta Ads)",
  "Produção de vídeo profissional",
  "Design e identidade visual",
  "Estratégia com Inteligência Artificial",
  "Relatórios mensais de performance",
];

const AboutDiego = () => (
  <section id="sobre" className="py-20">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Photo */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden">
            <img src={diegoImg} alt="Diego - Fundador SLZ Digital" className="w-full h-full object-cover object-top" />
          </div>
          {/* Floating badges */}
          {badges.map((badge, i) => (
            <div
              key={i}
              className="absolute bg-card border border-primary/30 rounded-lg px-4 py-2 text-center"
              style={{
                top: `${15 + i * 30}%`,
                left: i % 2 === 0 ? "0" : "auto",
                right: i % 2 === 1 ? "0" : "auto",
              }}
            >
              <p className="font-heading font-bold text-foreground">{badge.value}</p>
              <p className="text-xs text-silver">{badge.label}</p>
            </div>
          ))}
        </div>

        {/* Right - Info */}
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">
            Sobre o Fundador
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Marketing conduzido com{" "}
            <span className="text-primary">expertise e resultado</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Diego é administrador de formação e especialista em marketing digital. Com 8 anos à frente
            da SLZ Digital, experiência internacional e uma rede de contatos sólida em São Luís, ele
            lidera uma equipe especializada em resultados reais para empresas locais e regionais.
          </p>

          <div className="bg-surface rounded-xl p-6 space-y-3">
            <p className="font-heading font-semibold text-sm text-silver mb-4">O que está incluído</p>
            {includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <Button variant="cyan" size="lg" className="w-full" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Falar com Diego agora
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default AboutDiego;
