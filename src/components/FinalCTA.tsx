import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5598982990007&text=Olá%2C%20vim%20do%20site%20SLZ%20Digital.";

const FinalCTA = () => (
  <section id="contato" className="py-24 relative overflow-hidden">
    {/* Cyan radial glow */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
    </div>

    <div className="container mx-auto px-4 relative z-10 text-center">
      <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
        Pronto para sua empresa crescer no digital?
      </h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
        Fale com a nossa equipe agora e receba um diagnóstico gratuito do seu negócio.
      </p>
      <Button variant="cyan" size="lg" asChild>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="w-5 h-5" />
          Falar no WhatsApp agora
        </a>
      </Button>
    </div>
  </section>
);

export default FinalCTA;
