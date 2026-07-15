const stats = [
  { value: "9 Anos", label: "de mercado" },
  { value: "97+", label: "clientes atendidos" },
  { value: "R$ 4,5M+", label: "em campanhas gerenciadas" },
  { value: "São Luís, MA", label: "localização" },
];

const Stats = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center relative">
            <p className="text-3xl md:text-4xl font-heading text-primary" style={{ fontWeight: 800 }}>{stat.value}</p>
            <p className="mt-2" style={{ fontSize: "12px", color: "#666", fontWeight: 400 }}>{stat.label}</p>
            {i < stats.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-silver/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
