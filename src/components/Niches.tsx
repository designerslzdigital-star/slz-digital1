import { Sparkles } from "lucide-react";

const Niches = () => (
  <section id="nichos" className="py-20 relative">
    <div className="container mx-auto px-4">
      {/* Segmentos */}
      <div className="text-center mb-12 py-8">
        <p className="mb-10" style={{ color: "#888888", fontSize: "17px" }}>
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

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Shopping da Limpeza */}
          <div
            className="rounded-2xl p-8 relative overflow-hidden flex flex-col"
            style={{ backgroundColor: "#161616", border: "1px solid rgba(0,204,240,0.15)" }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
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
            <h3 className="font-heading font-bold text-2xl mb-2">Shopping da Limpeza</h3>
            <div className="mb-4">
              <span style={{ color: "#00ccf0", fontSize: "40px", fontWeight: 800, lineHeight: 1 }}>1 ano+</span>
              <span className="block text-sm text-muted-foreground mt-1">de parceria ativa</span>
            </div>
            <p className="text-muted-foreground leading-relaxed flex-grow">
              Gestão completa de redes sociais, conteúdo estratégico e presença digital estruturada para o maior shopping popular de São Luís.
            </p>
          </div>

          {/* Via Táxi Aéreo */}
          <div
            className="rounded-2xl p-8 relative overflow-hidden flex flex-col"
            style={{ backgroundColor: "#161616", border: "1px solid rgba(0,204,240,0.15)" }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "rgba(0,204,240,0.15)", color: "#00ccf0" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Case Real
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">
                Turismo & Aviação
              </span>
            </div>
            <h3 className="font-heading font-bold text-2xl mb-2">Via Táxi Aéreo</h3>
            <div className="mb-4">
              <span className="text-3xl md:text-4xl font-extrabold" style={{ color: "#00ccf0", fontWeight: 800 }}>11.600</span>
              <span className="block text-sm text-muted-foreground mt-1">seguidores</span>
            </div>
            <p className="text-muted-foreground leading-relaxed flex-grow">
              Construímos a presença digital da Via Táxi Aéreo do zero. Social media estratégico que transformou uma marca local em referência digital no setor aéreo do Maranhão.
            </p>
          </div>

          {/* Face Implantes */}
          <div
            className="rounded-2xl p-8 relative overflow-hidden flex flex-col"
            style={{ backgroundColor: "#161616", border: "1px solid rgba(0,204,240,0.15)" }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "rgba(0,204,240,0.15)", color: "#00ccf0" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Case Real
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">
                Saúde & Odontologia
              </span>
            </div>
            <h3 className="font-heading font-bold text-2xl mb-2">Face Implantes</h3>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-4 mb-4">
              <div>
                <span className="text-2xl md:text-3xl whitespace-nowrap" style={{ color: "#00ccf0", fontWeight: 800 }}>14.700</span>
                <span className="block text-sm text-muted-foreground mt-1">seguidores</span>
              </div>
              <div>
                <span className="text-2xl md:text-3xl whitespace-nowrap" style={{ color: "#00ccf0", fontWeight: 800 }}>Agenda cheia</span>
                <span className="block text-sm text-muted-foreground mt-1">todos os meses</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed flex-grow">
              Do zero à referência. Combinamos social media e tráfego pago para lotar a agenda do Face Implantes e consolidar a marca como autoridade em implantes dentários em São Luís.
            </p>
          </div>
        </div>

        {/* Espaço para futuros cases */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">Em breve, mais cases de sucesso.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Niches;
