const pains = [
  "Posts sem estratégia que não vendem",
  "Tráfego que gasta e não retorna",
  "Identidade visual desatualizada",
  "Leads que somem sem fechar",
  "Sem vídeo, seu concorrente sai na frente",
  "Agência que some depois de fechar contrato",
];

const PainPoints = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading mb-4 text-center">
        Entendemos o que está travando seu crescimento
      </p>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-3xl mx-auto mb-12">
        Você já investiu em marketing, mas não conseguiu transformar esse esforço em{" "}
        <span className="text-primary">vendas reais?</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {pains.map((pain, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
            <p className="text-foreground">{pain}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PainPoints;
