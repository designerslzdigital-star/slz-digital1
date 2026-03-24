import { useState } from "react";
import { Instagram, Target, Camera, PenTool, Brain, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Instagram,
    title: "Social Media",
    description: "Conteúdo estratégico que gera conexão, autoridade e vendas todos os dias.",
    bullets: ["Cards, carrosséis e vídeos curtos", "Calendário editorial estratégico", "Identidade visual consistente"],
  },
  {
    icon: Target,
    title: "Tráfego Pago",
    description: "Anúncios que colocam sua empresa na frente de quem quer e pode comprar.",
    bullets: ["Campanhas no Meta Ads e Google", "Otimização semanal", "Relatório de performance"],
  },
  {
    icon: Camera,
    title: "Videomaker & Edição",
    description: "Vídeos profissionais que geram autoridade, alcance e conversão.",
    bullets: ["Produção profissional completa", "Edição para Reels e YouTube", "Roteiro e direção criativa"],
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Identidade visual que comunica antes mesmo do vendedor falar.",
    bullets: ["Criação de identidade visual", "Materiais para campanhas", "Peças para redes sociais"],
  },
  {
    icon: Brain,
    title: "Estratégia com IA",
    description: "Inteligência artificial aplicada ao marketing do seu negócio.",
    bullets: ["Automação de conteúdo", "Análise inteligente de dados", "Relatórios automatizados"],
  },
];

const Services = () => {
  const [current, setCurrent] = useState(0);
  const service = services[current];
  const Icon = service.icon;

  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading mb-4 text-center">
          Nossos Serviços
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-3xl mx-auto mb-12">
          A SLZ Digital estrutura o marketing da sua empresa com{" "}
          <span className="text-primary">soluções feitas sob medida</span>
        </h2>

        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left - Info */}
            <div className="p-8 md:p-10 space-y-6">
              <Icon className="w-10 h-10 text-primary" />
              <h3 className="text-2xl font-heading font-bold">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
              <ul className="space-y-3">
                {service.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Mockup placeholder */}
            <div className="bg-surface flex items-center justify-center min-h-[300px] p-8">
              <div className="w-48 h-80 rounded-3xl border-2 border-border bg-background flex items-center justify-center">
                <Icon className="w-12 h-12 text-primary/30" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-8 py-4 border-t border-border">
            <button
              onClick={() => setCurrent((c) => (c > 0 ? c - 1 : services.length - 1))}
              className="p-2 rounded-full hover:bg-surface transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c < services.length - 1 ? c + 1 : 0))}
              className="p-2 rounded-full hover:bg-surface transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
