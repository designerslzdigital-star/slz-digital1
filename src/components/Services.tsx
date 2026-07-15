import { Instagram, Target, Video, PenTool, Globe, Brain, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Instagram,
    title: "Social Media",
    description: "Conteúdo estratégico que gera conexão, autoridade e vendas todos os dias.",
  },
  {
    icon: Target,
    title: "Tráfego Pago",
    description: "Anúncios que colocam sua empresa na frente de quem quer e pode comprar.",
  },
  {
    icon: Video,
    title: "Produção de Vídeo Profissional",
    description: "Vídeos profissionais que geram autoridade, alcance e vendas.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Identidade visual que comunica antes mesmo do vendedor falar.",
  },
  {
    icon: Globe,
    title: "Criação de Sites",
    description: "Sites rápidos, responsivos e otimizados para converter visitantes em clientes.",
  },
  {
    icon: Brain,
    title: "IA e Automação para Empresas",
    description: "Automatize processos, atendimento, vendas e gestão com IA, CRM, SDR inteligente, geração de leads e sistemas personalizados.",
  },
  {
    icon: Lightbulb,
    title: "Consultoria Estratégica",
    description: "Diagnóstico completo e plano de ação para acelerar seus resultados digitais.",
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-14">
          Nossos <span className="text-primary">Serviços</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLastOdd = services.length % 3 === 1 && index === services.length - 1;

            return (
              <div
                key={service.title}
                className={`group p-7 rounded-xl transition-all duration-300
                  ${isLastOdd ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
                `}
                style={{
                  background: "#111111",
                  border: "1px solid rgba(0,204,240,0.12)",
                }}
                onMouseEnter={(e) => {
                  { /* handled by Tailwind group-hover if needed, but inline styles for border/bg are cleaner with state or we can use CSS */ }
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-[10px] mb-5"
                  style={{
                    background: "rgba(0,204,240,0.12)",
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: "#00ccf0" }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        #servicos .group:hover {
          background: rgba(0,204,240,0.05) !important;
          border-color: rgba(0,204,240,0.4) !important;
        }
      `}</style>
    </section>
  );
};

export default Services;
