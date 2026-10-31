import shoppingLimpezaAsset from "@/assets/clients/shopping-limpeza.webp.asset.json";
import genialConsultoria from "@/assets/clients/genial-consultoria.webp";
import viaTaxi from "@/assets/clients/via-taxi.webp";
import uarauTour from "@/assets/clients/uarau-tour.webp";
import bucomed from "@/assets/clients/bucomed.webp";
import faceimplante from "@/assets/clients/faceimplante.webp";
import pagcarro from "@/assets/clients/pagcarro.webp";
import taguatur from "@/assets/clients/taguatur.webp";
import editoraInternacional from "@/assets/clients/editora-internacional.webp";
import decanter from "@/assets/clients/decanter.webp";
import aruaAsset from "@/assets/clients/arua.webp.asset.json";
import acmAsset from "@/assets/clients/acm.webp.asset.json";
import uniflexAsset from "@/assets/clients/uniflex.webp.asset.json";
import logoAltaBranco from "@/assets/clients/logo-alta-branco.webp.asset.json";
import vivenciarLogo from "@/assets/clients/vivenciar-logo.webp.asset.json";
import logoCliente3 from "@/assets/clients/logo-cliente-3.webp.asset.json";

const clients = [
  { name: "Shopping da Limpeza", logo: shoppingLimpezaAsset.url, width: 480, height: 600 },
  { name: "Genial Consultoria", logo: genialConsultoria, width: 600, height: 272 },
  { name: "Via Táxi Aéreo", logo: viaTaxi, width: 600, height: 600 },
  { name: "Uarau Tour", logo: uarauTour, width: 600, height: 259 },
  { name: "Bucomed", logo: bucomed, width: 600, height: 600 },
  { name: "Faceimplante", logo: faceimplante, width: 500, height: 500 },
  { name: "PagCarro", logo: pagcarro, width: 600, height: 285 },
  { name: "Taguatur", logo: taguatur, width: 600, height: 143 },
  { name: "Editora Internacional", logo: editoraInternacional, width: 600, height: 265 },
  { name: "Decanter", logo: decanter, width: 600, height: 166 },
  { name: "Aruá", logo: aruaAsset.url, width: 600, height: 217 },
  { name: "ACM Comércio e Equipamentos", logo: acmAsset.url, width: 600, height: 141 },
  { name: "Uniflex Móveis para Escritório", logo: uniflexAsset.url, width: 480, height: 600 },
  { name: "Alta Branco", logo: logoAltaBranco.url, width: 600, height: 600 },
  { name: "Vivenciar", logo: vivenciarLogo.url, width: 600, height: 600 },
  { name: "Cliente", logo: logoCliente3.url, width: 600, height: 200 },
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
                width={client.width}
                height={client.height}
                loading="lazy"
                decoding="async"
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
                width={client.width}
                height={client.height}
                loading="lazy"
                decoding="async"
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
