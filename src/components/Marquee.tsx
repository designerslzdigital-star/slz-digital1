const items = [
  "SLZ DIGITAL",
  "SOCIAL MEDIA",
  "TRÁFEGO PAGO",
  "VIDEOMAKER",
  "DESIGN",
  "ESTRATÉGIA",
  "INTELIGÊNCIA ARTIFICIAL",
  "SÃO LUÍS",
];

const MarqueeSection = () => {
  const text = items.map((item) => `${item} • `).join("");
  const repeated = text + text;

  return (
    <section className="py-6 bg-card border-y border-border overflow-hidden marquee-mask">
      <div className="animate-marquee whitespace-nowrap inline-flex">
        <span className="text-2xl md:text-4xl font-heading font-bold text-silver tracking-wider">
          {repeated}
        </span>
        <span className="text-2xl md:text-4xl font-heading font-bold text-silver tracking-wider">
          {repeated}
        </span>
      </div>
    </section>
  );
};

export default MarqueeSection;
