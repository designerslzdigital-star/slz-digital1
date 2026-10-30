const Testimonials = () => (
  <section id="depoimentos" className="py-20 relative">
    <div className="container mx-auto px-4">
      <p className="text-xs uppercase tracking-[0.2em] font-heading mb-4 text-center" style={{ color: "#00ccf0" }}>
        DEPOIMENTOS
      </p>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
        Quem trabalhou com a SLZ Digital fala por nós
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Resultados reais contados por quem viveu.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">

        {[
          { src: "https://www.youtube.com/embed/ZgSan0-SEog", name: "Shopping da Limpeza", segment: "Varejo" },
          { src: "https://www.youtube.com/embed/_O1eJPMhMVs", name: "Genial Consultoria", segment: "Consultoria" },
          { src: "https://www.youtube.com/embed/It1tOy7ghEM", name: "Via Táxi Aéreo", segment: "Transporte" },
        ].map((t) => (
          <div
            key={t.name}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: "#161616", border: "1px solid rgba(0,204,240,0.15)" }}
          >
            <div className="w-full" style={{ aspectRatio: "9 / 16" }}>
              <iframe
                src={t.src}
                title={t.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-xl text-white">{t.name}</h3>
              <p className="text-sm mt-1" style={{ color: "#00ccf0" }}>{t.segment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;