import { Search, Target, Zap, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, title: "Diagnóstico", sub: "Entendimento" },
  { icon: Target, title: "Estratégia", sub: "Planejamento" },
  { icon: Zap, title: "Execução", sub: "Ação" },
  { icon: TrendingUp, title: "Resultados", sub: "Crescimento" },
];

const HowItWorks = () => (
  <section
    id="processo"
    className="relative overflow-hidden py-24 md:py-32"
    style={{ background: "#080808" }}
  >
    {/* Cúpula circular ao fundo */}
    <div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-55%] w-[140vw] h-[140vw] max-w-[1600px] max-h-[1600px] rounded-full"
      style={{
        background:
          "radial-gradient(circle at center, rgba(0,204,240,0.07) 0%, rgba(0,204,240,0) 60%)",
        border: "1px solid rgba(0,204,240,0.07)",
      }}
    />
    {/* Brilho ciano no rodapé */}
    <div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[300px]"
      style={{
        background:
          "radial-gradient(ellipse at bottom, rgba(0,204,240,0.18) 0%, rgba(0,204,240,0) 70%)",
      }}
    />

    <div className="container mx-auto px-4 relative z-10 text-center">
      <p
        className="text-xs uppercase font-heading mb-4"
        style={{ color: "#00ccf0", letterSpacing: "0.3em" }}
      >
        Como Funciona
      </p>
      <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
        Na SLZ Digital, o caminho é{" "}
        <span style={{ color: "#00ccf0" }}>simples!</span>
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto mb-10">
        São poucos passos e os seus resultados já começam a aparecer.
      </p>

      {/* Pill */}
      <div
        className="inline-flex items-center gap-3 md:gap-5 px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm text-silver mb-16"
        style={{ border: "1px solid rgba(0,204,240,0.15)" }}
      >
        {steps.map((s, i) => (
          <span key={i} className="flex items-center gap-3 md:gap-5">
            <span className="font-heading">{s.title}</span>
            {i < steps.length - 1 && (
              <span style={{ color: "#00ccf0", opacity: 0.6 }}>•</span>
            )}
          </span>
        ))}
      </div>

      {/* Ícones com conectores */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 max-w-5xl mx-auto">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center gap-2 md:gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-[90px] h-[90px] rounded-full flex items-center justify-center mb-4 relative"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0,204,240,0.12) 0%, rgba(0,204,240,0.02) 70%)",
                    border: "1px solid rgba(0,204,240,0.25)",
                    boxShadow: "0 0 40px -5px rgba(0,204,240,0.35)",
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: "#00ccf0" }} />
                </div>
                <h3 className="font-heading font-bold text-white">{s.title}</h3>
                <p
                  className="text-xs uppercase mt-1 font-heading"
                  style={{ color: "#00ccf0", letterSpacing: "0.15em" }}
                >
                  {s.sub}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center gap-1.5 mx-3 mb-12">
                  {[0, 1, 2, 3, 4].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#00ccf0",
                        opacity: 0.3 + d * 0.12,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
