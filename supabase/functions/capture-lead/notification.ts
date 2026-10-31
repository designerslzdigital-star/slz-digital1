export const notificationAddress = 'atendimento@slzdigital.com.br';
export type StoredLead = {
  id: string; nome: string; empresa: string | null; email: string | null;
  telefone: string; segmento: string; desafio: string;
  data_horario_escolhido: string; created_at: string;
  observacoes: string | null; investimento_atual: string | null;
};

export function notificationPayload(lead: StoredLead) {
  const format = (date: string) => new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  return {
    from: `SLZ Digital <${notificationAddress}>`,
    to: [notificationAddress],
    subject: 'Novo lead pelo site da SLZ Digital',
    text: `Nova solicitação de reunião pelo site. Horário ainda pendente de confirmação pelo WhatsApp.

Nome: ${lead.nome}
Empresa: ${lead.empresa || 'Não informada'}
E-mail: ${lead.email || 'Não informado'}
Telefone: ${lead.telefone}
Segmento: ${lead.segmento}
Desafio: ${lead.desafio}
Investimento atual: ${lead.investimento_atual || 'Não informado'}
Horário escolhido (São Paulo): ${format(lead.data_horario_escolhido)}
Registro (São Paulo): ${format(lead.created_at)}
Observações: ${lead.observacoes || 'Nenhuma'}`,
  };
}