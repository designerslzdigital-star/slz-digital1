const clients = [
  "Shopping da Limpeza",
  "Genial Consultoria",
  "Via Táxi Aéreo",
  "Uarau Tour",
  "Bucomed",
  "Faceimplante",
  "PagCarro",
  "Taguatur",
  "Editora Internacional",
];

const ClientLogos = () => {
  const doubled = [...clients, ...clients];

  return (
    <section id="portfolio" className="py-16">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm text-silver font-heading">
          Empresas que confiam na SLZ Digital
        </p>
      </div>
      <div className="overflow-hidden marquee-mask">
        <div className="animate-marquee-slow whitespace-nowrap inline-flex gap-4">
          {doubled.map((client, i) => (
            <span
              key={i}
              className="inline-block px-5 py-2.5 rounded-full border border-silver/20 bg-card text-foreground font-heading font-bold text-sm whitespace-nowrap"
            >
              {client}
            </span>
          ))}
          {doubled.map((client, i) => (
            <span
              key={`dup-${i}`}
              className="inline-block px-5 py-2.5 rounded-full border border-silver/20 bg-card text-foreground font-heading font-bold text-sm whitespace-nowrap"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
