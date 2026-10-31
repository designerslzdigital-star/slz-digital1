## Brand assets
- Keep the shared SLZ wordmark tightly cropped and preserve its original colors; transparent outer margins otherwise make the header logo appear tiny.
- Derive the square favicon from the globe in the same supplied brand image, with an opaque background and a versioned head reference to avoid stale browser icons.

## Booking
- Build the WhatsApp booking message in the shared booking helper so dates use the calendar's São Paulo timezone and message encoding preserves line breaks.
- Capture booking requests through a server-only lead insertion function with a stable submission ID; keep leads inaccessible to visitors and keep Calendar access read-only.
- Send internal lead notifications through Resend only after private storage, with a lead-ID idempotency key and persisted send status; notification failures must not discard leads or block WhatsApp.

## Loading
- Keep hero content outside scroll-reveal wrappers and gate its image source and preload with the same desktop media query to prevent hidden mobile downloads.
- Split lower-page sections, the footer map and the booking chat with React.lazy; load testimonial players only after interaction to reduce initial JavaScript and third-party requests.
- Host Latin variable fonts as asset pointers, declare only supported requested weights with swap, and keep the head preloads synchronized with CSS URLs.
- Initialize the Pixel queue early, but fetch its external script only after load/idle so early conversions are retained without blocking page rendering.