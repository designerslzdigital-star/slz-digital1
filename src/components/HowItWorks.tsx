const steps = [
  { number: "1", title: "Diagnóstico", desc: "Entendemos seu negócio e objetivos" },
  { number: "2", title: "Estratégia", desc: "Montamos o plano ideal para sua empresa" },
  { number: "3", title: "Execução", desc: "Nossa equipe coloca tudo em prática" },
  { number: "4", title: "Resultados", desc: "Acompanhamos e otimizamos continuamente" },
];

const HowItWorks = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading mb-4 text-center">
        Processo
      </p>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
        Como funciona
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto relative">
        {/* Dashed line connecting steps */}
        <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-primary/40" />

        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <span className="font-heading font-bold text-primary-foreground text-xl">{step.number}</span>
            </div>
            <h3 className="font-heading font-bold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
