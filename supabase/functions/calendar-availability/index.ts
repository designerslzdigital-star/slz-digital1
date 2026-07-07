import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_calendar/calendar/v3';
const CALENDAR_ID = 'c_c7a88252efcc8ea41fffa21f975286ed420819f48ef97c47e5e3a22e0fe08e94@group.calendar.google.com';
const TZ = 'America/Sao_Paulo';
const SLOT_MIN = 30;
const WORK_START = 9; // 09:00
const WORK_END = 18;  // 18:00 (last slot starts 17:30)
const DAYS_AHEAD = 14;

function authHeaders() {
  return {
    Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
    'X-Connection-Api-Key': Deno.env.get('GOOGLE_CALENDAR_API_KEY') ?? '',
    'Content-Type': 'application/json',
  };
}

// Offset for America/Sao_Paulo is fixed at -03:00 (no DST since 2019).
const TZ_OFFSET = '-03:00';

function pad(n: number) { return n.toString().padStart(2, '0'); }

function toIsoWithOffset(y: number, m: number, d: number, h: number, min: number) {
  return `${y}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00${TZ_OFFSET}`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    // Build window: from now to DAYS_AHEAD days from now (in SP tz roughly)
    const now = new Date();
    const startWindow = new Date(now.getTime());
    const endWindow = new Date(now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000);

    const fbRes = await fetch(`${GATEWAY_URL}/freeBusy`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        timeMin: startWindow.toISOString(),
        timeMax: endWindow.toISOString(),
        timeZone: TZ,
        items: [{ id: CALENDAR_ID }],
      }),
    });
    if (!fbRes.ok) {
      const t = await fbRes.text();
      console.error('freeBusy failed', fbRes.status, t);
      return new Response(JSON.stringify({ error: 'freeBusy failed', status: fbRes.status, details: t }), {
        status: fbRes.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const fbData = await fbRes.json();
    const busy: { start: string; end: string }[] =
      fbData?.calendars?.[CALENDAR_ID]?.busy ?? [];
    const busyRanges = busy.map((b) => ({ start: new Date(b.start).getTime(), end: new Date(b.end).getTime() }));

    // Generate slots per day in SP timezone.
    // We approximate "today in SP" using UTC-3 offset.
    const spNow = new Date(now.getTime() + (-3 * 60 - now.getTimezoneOffset()) * 60000);
    const days: { date: string; label: string; slots: { time: string; iso: string }[] }[] = [];

    for (let i = 0; i < DAYS_AHEAD; i++) {
      const d = new Date(spNow);
      d.setDate(spNow.getDate() + i);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue; // weekends
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();
      const dateStr = `${y}-${pad(m)}-${pad(day)}`;

      const slots: { time: string; iso: string }[] = [];
      for (let h = WORK_START; h < WORK_END; h++) {
        for (const min of [0, 30]) {
          const startIso = toIsoWithOffset(y, m, day, h, min);
          const startMs = new Date(startIso).getTime();
          const endMs = startMs + SLOT_MIN * 60000;
          if (startMs <= now.getTime() + 60 * 60000) continue; // at least 1h ahead
          const conflict = busyRanges.some((b) => startMs < b.end && endMs > b.start);
          if (conflict) continue;
          slots.push({ time: `${pad(h)}:${pad(min)}`, iso: startIso });
        }
      }
      if (slots.length === 0) continue;
      const label = d.toLocaleDateString('pt-BR', {
        weekday: 'short', day: '2-digit', month: '2-digit', timeZone: TZ,
      });
      days.push({ date: dateStr, label, slots });
      if (days.length >= 8) break;
    }

    return new Response(JSON.stringify({ days }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});