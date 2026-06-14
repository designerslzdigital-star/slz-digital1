import { useState } from "react";
import { Calendar } from "lucide-react";
import BookingChat from "./BookingChat";

const BookingCTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <section id="agendar" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-heading mb-4">
          Próximo passo
        </p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5 max-w-3xl mx-auto">
          Pronto para transformar seu <span className="text-primary">negócio</span>?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Uma call gratuita de diagnóstico com o nosso time. Sem compromisso.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-base md:text-lg transition-transform hover:scale-[1.03]"
          style={{
            background: "#00ccf0",
            color: "#000",
            boxShadow: "0 0 40px -8px rgba(0,204,240,0.6)",
          }}
        >
          <Calendar className="w-5 h-5" />
          Marcar minha call gratuita
        </button>
      </div>
      {open && <BookingChat onClose={() => setOpen(false)} />}
    </section>
  );
};

export default BookingCTA;