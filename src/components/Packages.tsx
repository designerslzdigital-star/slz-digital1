import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5598982990007&text=Olá%2C%20vim%20do%20site%20SLZ%20Digital.";

const packages = [
  {
    name: "Essencial",
    price: "R$ 1.000",
    period: "/mês",
    featured: false,
    features: [
      "12 posts por mês",
      "Cards, carrosséis e vídeos curtos",
      "Gestão do Instagram",
      "Relatório mensal",
    ],
    cta: "Começar agora",
  },
  {
    name: "Acelerador",
    price: "R$ 1.400",
    period: "/mês",
    featured: true,
    badge: "MAIS ESCOLHIDO",
    features: [
      "Tudo do Essencial",
      "Tráfego Pago incluso",
      "Campanhas Meta Ads",
      "Otimização semanal",
      "Relatório de anúncios",
    ],
    cta: "Quero o Acelerador",
  },
  {
    name: "Estratégico",
    price: "Sob consulta",
    period: "",
    featured: false,
    features: [
      "Estratégia personalizada",
      "Todos os serviços integrados",
      "IA aplicada ao negócio",
      "Atendimento prioritário",
    ],
    cta: "Solicitar proposta",
  },
];

const Packages = () => (
  <section id="pacotes" className="py-20">
    <div className="container mx-auto px-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading mb-4 text-center">
        Investimento
      </p>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
        Planos para cada momento do seu negócio
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-8 flex flex-col ${
              pkg.featured
                ? "bg-card border-2 border-primary shadow-[0_0_40px_-10px_hsl(197,100%,47%,0.3)] scale-105"
                : "bg-card border border-border"
            }`}
          >
            {pkg.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-heading font-bold px-4 py-1 rounded-full">
                {pkg.badge}
              </span>
            )}
            <h3 className="font-heading font-bold text-xl mb-2">{pkg.name}</h3>
            <p className="text-3xl font-heading font-bold text-primary">
              {pkg.price}
              <span className="text-sm text-silver font-normal">{pkg.period}</span>
            </p>

            <ul className="mt-6 space-y-3 flex-1">
              {pkg.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={pkg.featured ? "cyan" : "cyan-outline"}
              className="mt-8 w-full"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {pkg.cta}
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Packages;
