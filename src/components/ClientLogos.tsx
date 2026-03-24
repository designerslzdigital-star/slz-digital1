import shoppingLimpeza from "@/assets/clients/shopping-limpeza.png";
import genialConsultoria from "@/assets/clients/genial-consultoria.png";
import viaTaxi from "@/assets/clients/via-taxi.png";
import uarauTour from "@/assets/clients/uarau-tour.png";
import bucomed from "@/assets/clients/bucomed.png";
import faceimplante from "@/assets/clients/faceimplante.png";
import pagcarro from "@/assets/clients/pagcarro.png";
import taguatur from "@/assets/clients/taguatur.png";
import editoraInternacional from "@/assets/clients/editora-internacional.png";
import decanter from "@/assets/clients/decanter.png";

const clients = [
  { name: "Shopping da Limpeza", logo: shoppingLimpeza },
  { name: "Genial Consultoria", logo: genialConsultoria },
  { name: "Via Táxi Aéreo", logo: viaTaxi },
  { name: "Uarau Tour", logo: uarauTour },
  { name: "Bucomed", logo: bucomed },
  { name: "Faceimplante", logo: faceimplante },
  { name: "PagCarro", logo: pagcarro },
  { name: "Taguatur", logo: taguatur },
  { name: "Editora Internacional", logo: editoraInternacional },
  { name: "Decanter", logo: decanter },
];

const ClientLogos = () => {
  const allClients = [...clients, ...clients];

  return (
    <section id="portfolio" className="py-16">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm text-silver font-heading">
          Empresas que confiam na SLZ Digital
        </p>
      </div>
      <div className="overflow-hidden marquee-mask">
        <div className="animate-marquee-slow whitespace-nowrap inline-flex items-center gap-12">
          {allClients.map((client, i) => (
            <img
              key={i}
              src={client.logo}
              alt={client.name}
              className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            />
          ))}
          {allClients.map((client, i) => (
            <img
              key={`dup-${i}`}
              src={client.logo}
              alt={client.name}
              className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
