import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';
import { notificationPayload } from './notification.ts';

const schema = z.object({
  id: z.string().uuid(),
  nome: z.string().trim().min(1).max(120),
  empresa: z.string().trim().max(160).optional(),
  email: z.string().trim().email().max(200).optional(),
  telefone: z.string().trim().min(6).max(40),
  segmento: z.string().trim().min(1).max(160),
  desafio: z.string().trim().min(1).max(300),
  startIso: z.string().datetime({ offset: true }),
  observacoes: z.string().trim().max(1000).optional(),
  investimentoAtual: z.string().trim().max(160).optional(),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
  if (req.method !== 'POST') return respond({ error: 'method_not_allowed' }, 405);
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return respond({ error: 'validation' }, 400);
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) return respond({ error: 'configuration' }, 500);
    const db = createClient(url, key);
    const lead = parsed.data;
    const { error } = await db.from('leads').insert({
      id: lead.id, nome: lead.nome, empresa: lead.empresa || null, email: lead.email || null,
      telefone: lead.telefone, segmento: lead.segmento, desafio: lead.desafio,
      data_horario_escolhido: lead.startIso, observacoes: lead.observacoes || null,
      investimento_atual: lead.investimentoAtual || null,
    });
    // The client reuses the same ID on retries, avoiding duplicate submissions.
    if (error && error.code !== '23505') {
      console.error('lead insert failed', error.code);
      return respond({ error: 'save_failed' }, 500);
    }
    // Read stored values: a duplicate request cannot replace the notification data.
    const { data: stored, error: readError } = await db.from('leads').select('*').eq('id', lead.id).single();
    if (readError || !stored) return respond({ ok: true, notification: 'failed' });
    if (stored.email_notificado_em) return respond({ ok: true, notification: 'already_sent' });
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) return respond({ ok: true, notification: 'not_configured' });
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `lead-notification-${stored.id}`,
        },
        body: JSON.stringify(notificationPayload(stored)),
      });
      if (!emailResponse.ok) {
        const details = await emailResponse.text();
        console.error('Resend notification failed', emailResponse.status, details);
        return respond({ ok: true, notification: 'failed', status: emailResponse.status });
      }
      const email = await emailResponse.json();
      const { error: updateError } = await db.from('leads').update({
        email_notificado_em: new Date().toISOString(), email_aviso_id: email.id,
      }).eq('id', stored.id);
      if (updateError) console.error('notification status save failed', updateError.code);
      return respond({ ok: true, notification: 'sent' });
    } catch {
      console.error('Resend notification unavailable');
      return respond({ ok: true, notification: 'failed' });
    }
  } catch {
    return respond({ error: 'invalid_request' }, 400);
  }
});