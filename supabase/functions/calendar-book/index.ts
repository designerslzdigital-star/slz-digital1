import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_calendar/calendar/v3';
const CALENDAR_ID = 'c_c7a88252efcc8ea41fffa21f975286ed420819f48ef97c47e5e3a22e0fe08e94@group.calendar.google.com';
const TZ = 'America/Sao_Paulo';
const SLOT_MIN = 30;

function authHeaders() {
  return {
    Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
    'X-Connection-Api-Key': Deno.env.get('GOOGLE_CALENDAR_API_KEY') ?? '',
    'Content-Type': 'application/json',
  };
}

const BodySchema = z.object({
  nome: z.string().trim().min(1).max(120),
  empresa: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  telefone: z.string().trim().min(6).max(40),
  observacoes: z.string().trim().max(1000).optional().default(''),
  startIso: z.string().min(10),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'validation', details: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { nome, empresa, email, telefone, observacoes, startIso } = parsed.data;
    const startMs = new Date(startIso).getTime();
    if (isNaN(startMs)) {
      return new Response(JSON.stringify({ error: 'invalid start' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const endIso = new Date(startMs + SLOT_MIN * 60000).toISOString();

    // Conflict check via freeBusy
    const fb = await fetch(`${GATEWAY_URL}/freeBusy`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        timeMin: new Date(startMs).toISOString(),
        timeMax: endIso,
        timeZone: TZ,
        items: [{ id: CALENDAR_ID }],
      }),
    });
    if (!fb.ok) {
      const t = await fb.text();
      return new Response(JSON.stringify({ error: 'freeBusy failed', status: fb.status, details: t }), {
        status: fb.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const fbData = await fb.json();
    const busy = fbData?.calendars?.[CALENDAR_ID]?.busy ?? [];
    if (busy.length > 0) {
      return new Response(JSON.stringify({ error: 'slot_taken' }), {
        status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const requestId = crypto.randomUUID();
    const event = {
      summary: `Call Comercial - ${nome} (${empresa})`,
      description:
        `Call de diagnóstico agendada pelo site SLZ Digital.\n\n` +
        `Nome: ${nome}\nEmpresa: ${empresa}\nE-mail: ${email}\nTelefone: ${telefone}\n\n` +
        `Observações: ${observacoes || '—'}`,
      start: { dateTime: startIso, timeZone: TZ },
      end: { dateTime: new Date(startMs + SLOT_MIN * 60000).toISOString(), timeZone: TZ },
      attendees: [{ email, displayName: nome }],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: { useDefault: true },
    };

    const url = new URL(`${GATEWAY_URL}/calendars/${encodeURIComponent(CALENDAR_ID)}/events`);
    url.searchParams.set('conferenceDataVersion', '1');
    url.searchParams.set('sendUpdates', 'all');

    const evRes = await fetch(url.toString(), {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(event),
    });
    if (!evRes.ok) {
      const t = await evRes.text();
      console.error('event create failed', evRes.status, t);
      return new Response(JSON.stringify({ error: 'event_create_failed', status: evRes.status, details: t }), {
        status: evRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const created = await evRes.json();
    return new Response(JSON.stringify({
      ok: true,
      eventId: created.id,
      htmlLink: created.htmlLink,
      meetLink: created.hangoutLink ?? null,
      start: created.start,
      end: created.end,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});