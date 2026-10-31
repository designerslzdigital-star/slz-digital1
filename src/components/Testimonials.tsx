import YouTubeTestimonial from "./YouTubeTestimonial";
import shoppingThumbnail from "@/assets/testimonial-ZgSan0-SEog.jpg.asset.json";
import genialThumbnail from "@/assets/testimonial-_O1eJPMhMVs.jpg.asset.json";
import viaThumbnail from "@/assets/testimonial-It1tOy7ghEM.jpg.asset.json";

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
          { id: "ZgSan0-SEog", thumbnail: shoppingThumbnail.url, name: "Shopping da Limpeza", segment: "Varejo" },
          { id: "_O1eJPMhMVs", thumbnail: genialThumbnail.url, name: "Genial Consultoria", segment: "Consultoria" },
          { id: "It1tOy7ghEM", thumbnail: viaThumbnail.url, name: "Via Táxi Aéreo", segment: "Transporte" },
        ].map((t) => (
          <div
            key={t.name}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: "#161616", border: "1px solid rgba(0,204,240,0.15)" }}
          >
            <YouTubeTestimonial id={t.id} name={t.name} thumbnail={t.thumbnail} />
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