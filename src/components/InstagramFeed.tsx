import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

const InstagramFeed = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading mb-4 text-center">
        Siga no Instagram
      </p>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-2">
        @slzdigital1
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Conteúdo sobre marketing, estratégia e resultados todo dia
      </p>

      {/* Replace grid with Behold.so widget after deploy for live feed */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors group cursor-pointer"
          >
            <Instagram className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="cyan-outline" asChild>
          <a href="https://www.instagram.com/slzdigital1" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-4 h-4" />
            Seguir no Instagram
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default InstagramFeed;
