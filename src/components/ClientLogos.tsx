import shoppingLimpezaAsset from "@/assets/clients/shopping-limpeza.png.asset.json";
import genialConsultoria from "@/assets/clients/genial-consultoria.png";
import viaTaxi from "@/assets/clients/via-taxi.png";
import uarauTour from "@/assets/clients/uarau-tour.png";
import bucomed from "@/assets/clients/bucomed.png";
import faceimplante from "@/assets/clients/faceimplante.png";
import pagcarro from "@/assets/clients/pagcarro.png";
import taguatur from "@/assets/clients/taguatur.png";
import editoraInternacional from "@/assets/clients/editora-internacional.png";
import decanter from "@/assets/clients/decanter.png";
import aruaAsset from "@/assets/clients/arua.png.asset.json";
import acmAsset from "@/assets/clients/acm.png.asset.json";
import uniflexAsset from "@/assets/clients/uniflex.png.asset.json";
import logoAltaBranco from "@/assets/clients/logo-alta-branco.png.asset.json";
import vivenciarLogo from "@/assets/clients/vivenciar-logo.png.asset.json";
import logoCliente3 from "@/assets/clients/logo-cliente-3.png.asset.json";

const clients = [
  { name: "Shopping da Limpeza", logo: shoppingLimpezaAsset.url },
  { name: "Genial Consultoria", logo: genialConsultoria },
  { name: "Via Táxi Aéreo", logo: viaTaxi },
  { name: "Uarau Tour", logo: uarauTour },
  { name: "Bucomed", logo: bucomed },
  { name: "Faceimplante", logo: faceimplante },
  { name: "PagCarro", logo: pagcarro },
  { name: "Taguatur", logo: taguatur },
  { name: "Editora Internacional", logo: editoraInternacional },
  { name: "Decanter", logo: decanter },
  { name: "Aruá", logo: aruaAsset.url },
  { name: "ACM Comércio e Equipamentos", logo: acmAsset.url },
  { name: "Uniflex Móveis para Escritório", logo: uniflexAsset.url },
];

const ClientLogos = () => {
  const allClients = [...clients, ...clients];

  return (
    <section
      id="portfolio"
      className="py-16"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm text-silver font-heading">
          Empresas que confiam na SLZ Digital
        </p>
      </div>
      <div className="overflow-hidden marquee-mask">
        <div className="animate-marquee-slow whitespace-nowrap inline-flex items-center gap-12">
          {allClients.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-16 w-36 flex-shrink-0"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {allClients.map((client, i) => (
            <div
              key={`dup-${i}`}
              className="flex items-center justify-center h-16 w-36 flex-shrink-0"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
