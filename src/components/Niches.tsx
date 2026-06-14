import { Heart, Scale, Plane, ShoppingBag, Briefcase, Compass, Sparkles } from "lucide-react";

const niches = [
  {
    icon: Heart,
    title: "Saúde",
    desc: "Médicos vasculares, dentistas, bucomaxilofaciais e psicólogos.",
  },
  {
    icon: Scale,
    title: "Jurídico",
    desc: "Advogados e escritórios que precisam de autoridade digital.",
  },
  {
    icon: Plane,
    title: "Turismo e Eventos",
    desc: "Agências, receptivos e produtoras de experiências.",
  },
  {
    icon: ShoppingBag,
    title: "Varejo",
    desc: "Lojas físicas e e-commerces que querem vender mais.",
  },
  {
    icon: Briefcase,
    title: "Consultoria",
    desc: "Especialistas e mentores que vivem de autoridade.",
  },
  {
    icon: Compass,
    title: "Arquitetura e Design",
    desc: "Estúdios criativos que precisam de portfólio que vende.",
  },
];

const Niches = () => (
  <section id="nichos" className="py-20 relative">
    <div className="container mx-auto px-4">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-heading mb-4 text-center">
        Nichos & Especialidades
      </p>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
        Segmentos que a SLZ Digital <span className="text-primary">atende</span>
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Estratégia, conteúdo e tráfego sob medida para cada mercado.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {niches.map((n, i) => {
          const Icon = n.icon;
          return (
            <div
              key={i}
              className="rounded-2xl p-6 bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold mb-1">{n.title}</h3>
              <p className="text-sm text-muted-foreground">{n.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Case destaque */}
      <div className="mt-12 max-w-5xl mx-auto rounded-2xl p-8 md:p-10 bg-card border border-primary/30 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-heading">
              Case de Sucesso · Varejo
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-2xl mb-2">Shopping da Limpeza</h3>
            <p className="text-muted-foreground">
              Posicionamento, conteúdo e tráfego pago integrados para escalar
              vendas e fortalecer a marca como referência no varejo de São Luís.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Niches;