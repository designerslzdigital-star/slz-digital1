type BookingAnswers = { nome?: string; segmento?: string; desafio?: string };

export function bookingWhatsAppUrl(answers: BookingAnswers, startIso: string) {
  const date = new Date(startIso);
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo", weekday: "long", day: "numeric", month: "long",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  const when = `${part("weekday")}, ${part("day")} de ${part("month")} às ${part("hour")}:${part("minute")}`;
  const message = `Olá, tudo bem? Vim pelo site da SLZ Digital e gostaria de agendar uma reunião!

Meu nome: ${answers.nome ?? ""}

Segmento: ${answers.segmento ?? ""}

Meu maior desafio hoje: ${answers.desafio ?? ""}

Horário que escolhi: ${when}

Fico no aguardo da confirmação de vocês!`;
  return `https://wa.me/5598982990007?text=${encodeURIComponent(message)}`;
}