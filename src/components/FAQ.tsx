import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Quanto custa trabalhar com a SLZ Digital?",
    answer:
      "Cada negócio tem um momento e uma necessidade diferente. Por isso não temos um preço fixo — montamos uma estratégia sob medida e apresentamos o investimento na call gratuita de diagnóstico. Sem surpresas, sem letras miúdas.",
  },
  {
    question: "Preciso assinar contrato de longo prazo?",
    answer:
      "Não exigimos fidelidade forçada. Acreditamos que cliente satisfeito não precisa de contrato para ficar. Trabalhamos com ciclos mensais e você acompanha os resultados de perto desde o primeiro mês.",
  },
  {
    question: "Quanto tempo até começar a ver resultado?",
    answer:
      "Depende do serviço. Tráfego pago pode gerar resultado nas primeiras semanas. Social media constrói autoridade em 60 a 90 dias. O que garantimos é transparência total durante o processo — relatório mensal sem enrolação.",
  },
  {
    question:
      "Já tive agência antes e não funcionou. Por que a SLZ seria diferente?",
    answer:
      "Essa é a objeção que mais ouvimos — e faz sentido. A diferença está no diagnóstico antes de qualquer ação. Não chegamos com pacote pronto. Entendemos seu negócio, seu mercado e seu cliente antes de investir um centavo. E você acompanha tudo em tempo real.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <p
          className="text-xs uppercase tracking-[0.3em] font-heading mb-4 text-center"
          style={{ color: "#00ccf0" }}
        >
          DÚVIDAS FREQUENTES
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-white">
          Respostas antes da sua call
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  backgroundColor: "#111111",
                  border: "1px solid rgba(0,204,240,0.12)",
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                >
                  <span className="font-heading font-bold text-white text-base md:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200"
                    style={{
                      backgroundColor: "rgba(0,204,240,0.12)",
                      color: "#00ccf0",
                    }}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? "500px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
