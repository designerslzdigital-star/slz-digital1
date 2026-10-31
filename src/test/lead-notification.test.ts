import { describe, expect, it } from 'vitest';
import { notificationPayload } from '../../supabase/functions/capture-lead/notification';

describe('internal lead notifications', () => {
  const lead = {
    id: 'test', nome: 'Maria Silva', empresa: 'Empresa Teste', email: 'lead@example.com',
    telefone: '98999999999', segmento: 'Saúde', desafio: 'Marketing sem retorno',
    data_horario_escolhido: '2026-11-02T13:30:00Z', created_at: '2026-10-31T13:00:00Z',
    observacoes: null, investimento_atual: 'Nunca investi',
  };
  it('sends only to atendimento and uses the announced verified-domain sender', () => {
    const email = notificationPayload(lead);
    expect(email.to).toEqual(['atendimento@slzdigital.com.br']);
    expect(email.from).toBe('SLZ Digital <atendimento@slzdigital.com.br>');
    expect(email.to).not.toContain(lead.email);
  });
  it('includes the collected details and chosen time in São Paulo time', () => {
    const email = notificationPayload(lead);
    for (const value of ['Maria Silva', 'Empresa Teste', 'lead@example.com', '98999999999', 'Saúde', 'Marketing sem retorno', 'Nunca investi', '02/11/2026, 10:30:00']) {
      expect(email.text).toContain(value);
    }
  });
});