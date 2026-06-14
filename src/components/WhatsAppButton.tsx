import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5598982990007&text=Olá%2C%20vim%20do%20site%20SLZ%20Digital.";

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-whatsapp-pulse group"
    title="Falar no WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-foreground" aria-hidden="true" />
    <span className="absolute right-full mr-3 bg-card border border-border text-foreground text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Falar no WhatsApp
    </span>
  </a>
);

export default WhatsAppButton;
