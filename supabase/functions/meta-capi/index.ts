const PIXEL_ID = "1721314979917926";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sha256(v?: string) {
  if (!v) return undefined;
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v.trim().toLowerCase()));
  return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const token = Deno.env.get("META_CAPI_TOKEN");
    if (!token) throw new Error("META_CAPI_TOKEN not configured");
    const b = await req.json();
    const allowed = ["PageView", "Lead", "Contact", "Schedule"];
    if (!allowed.includes(b.event_name)) throw new Error("invalid event");

    const phone = b.phone ? String(b.phone).replace(/\D/g, "") : undefined;
    const [fn, ...rest] = String(b.name ?? "").trim().split(/\s+/);
    const user_data: Record<string, unknown> = {
      client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      client_user_agent: req.headers.get("user-agent") ?? b.user_agent,
      fbp: b.fbp, fbc: b.fbc,
      ph: phone ? [await sha256(phone.startsWith("55") ? phone : "55" + phone)] : undefined,
      fn: fn ? [await sha256(fn)] : undefined,
      ln: rest.length ? [await sha256(rest.join(" "))] : undefined,
      country: [await sha256("br")],
    };

    const res = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: b.event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: b.event_id,
          event_source_url: b.event_source_url,
          action_source: "website",
          user_data,
        }],
      }),
    });
    const out = await res.json();
    return new Response(JSON.stringify(out), { status: res.ok ? 200 : 400, headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
