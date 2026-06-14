import { Sparkles } from "lucide-react";

const Niches = () => (
  <section id="nichos" className="py-20 relative">
    <div className="container mx-auto px-4">
      {/* Segmentos */}
      <div className="text-center mb-12">
        <p className="text-[#888888] text-lg mb-4">
          Atendemos negócios de todos os segmentos — do consultório ao e-commerce, do escritório à loja física.
        </p>
        <p className="text-white font-bold text-xl">
          Se você tem um negócio e quer crescer no digital, a SLZ Digital é para você.
        </p>
      </div>

      {/* Cases de Sucesso */}
      <div className="mt-16">
        <p className="text-xs uppercase tracking-[0.2em] font-heading mb-4 text-center" style={{ color: "#00ccf0" }}>
          CASES DE SUCESSO
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          Resultados reais para negócios reais
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Cases de quem confiou na SLZ Digital e cresceu.
        </p>

        <div className="max-w-5xl mx-auto">
          {/* Shopping da Limpeza */}
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{ backgroundColor: "#161616", border: "1px solid rgba(0,204,240,0.15)" }}
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "rgba(0,204,240,0.15)", color: "#00ccf0" }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Case Real
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">
                  Varejo
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl mb-3">Shopping da Limpeza</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gestão completa de redes sociais, conteúdo estratégico e presença digital estruturada para o maior empresa de produtos de limpeza de São Luís.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Niches;
