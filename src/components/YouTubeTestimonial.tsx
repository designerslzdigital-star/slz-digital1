import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function YouTubeTestimonial({ id, name, thumbnail }: { id: string; name: string; thumbnail: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-[9/16]">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={name}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <img src={thumbnail} alt={name} width={480} height={360} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <Button variant="ghost" onClick={() => setPlaying(true)} aria-label={`Reproduzir depoimento de ${name}`} className="absolute inset-0 w-full h-full rounded-none bg-transparent hover:bg-transparent">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Play className="!h-7 !w-7 fill-current" aria-hidden="true" />
            </span>
          </Button>
        </>
      )}
    </div>
  );
}