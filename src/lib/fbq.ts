// Meta Pixel helper — safe to call even when the pixel is blocked/unloaded.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) window.fbq("track", event, params);
    else window.fbq("track", event);
  }
}

// Fires Meta Pixel "Contact" on any click on a WhatsApp link anywhere on the site.
export function initWhatsAppContactTracking() {
  document.addEventListener("click", (e) => {
    const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
    const href = anchor?.getAttribute("href") ?? "";
    if (/whatsapp\.com|wa\.me/i.test(href)) {
      fbqTrack("Contact");
    }
  });
}
