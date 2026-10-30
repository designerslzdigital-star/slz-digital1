// Meta Pixel + Conversions API helper (deduplicated via event_id).
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function cookie(name: string) {
  return document.cookie.split("; ").find((c) => c.startsWith(name + "="))?.split("=")[1];
}

export function fbqTrack(
  event: string,
  params?: Record<string, unknown>,
  user?: { name?: string; phone?: string },
) {
  if (typeof window === "undefined") return;
  const eventId = `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  if (typeof window.fbq === "function") {
    window.fbq("track", event, params ?? {}, { eventID: eventId });
  }
  supabase.functions
    .invoke("meta-capi", {
      body: {
        event_name: event,
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: cookie("_fbp"),
        fbc: cookie("_fbc"),
        name: user?.name,
        phone: user?.phone,
      },
    })
    .catch(() => {});
}

// Fires "Contact" on any click on a WhatsApp link anywhere on the site.
export function initWhatsAppContactTracking() {
  document.addEventListener("click", (e) => {
    const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
    const href = anchor?.getAttribute("href") ?? "";
    if (/whatsapp\.com|wa\.me/i.test(href)) fbqTrack("Contact");
  });
}
