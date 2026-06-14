import { useEffect, useRef, useState } from "react";
import { X, Send, Check } from "lucide-react";
import slzLogo from "@/assets/slz-logo.png";

type Step = {
  id: string;
  question: string;
  type: "text" | "choice" | "date";
  options?: string[];
  placeholder?: string;
};

const steps: Step[] = [
  { id: "nome", question: "Pra começar, qual é o seu nome completo?", type: "text", placeholder: "Digite seu nome" },
  {
    id: "segmento",
    question: "Qual é o seu segmento de atuação?",
    type: "choice",
    options: ["Saúde", "Jurídico/Consultoria", "Turismo/Eventos", "Varejo", "Arquitetura/Design", "Outro"],
  },
  {
    id: "desafio",
    question: "Qual o seu maior desafio hoje?",
    type: "choice",
    options: [
      "Presença fraca nas redes",
      "Marketing sem retorno",
      "Poucos clientes qualificados",
      "Marca sem identidade",
      "Quero usar IA",
    ],
  },
  {
    id: "investe",
    question: "Você já investe em marketing?",
    type: "choice",
    options: [
      "Sim, sem resultado",
      "Sim, com resultado parcial",
      "Nunca investi",
      "Já tive agência e parei",
    ],
  },
  { id: "whatsapp", question: "Qual o melhor WhatsApp para confirmação?", type: "text", placeholder: "(98) 99999-9999" },
  { id: "data", question: "Escolha o melhor dia e horário para a sua call:", type: "date" },
];

type Msg = { from: "bot" | "user"; text: string };

const WHATSAPP_BASE = "https://api.whatsapp.com/send?phone=5598982990007";

function getNextDays(n: number) {
  const days: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0) continue; // pular domingo
    days.push({
      label: d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }),
      value: d.toISOString().slice(0, 10),
    });
  }
  return days.slice(0, 6);
}

const TIMES = ["09:00", "10:30", "14:00", "15:30", "17:00"];

export default function BookingChat({ onClose }: { onClose: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: steps[0].question }]);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const progress = Math.min(100, ((stepIdx + (done ? 1 : 0)) / steps.length) * 100);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, selectedDate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const advance = (userText: string, raw?: string) => {
    const current = steps[stepIdx];
    const value = raw ?? userText;
    setAnswers((a) => ({ ...a, [current.id]: value }));
    setMessages((m) => [...m, { from: "user", text: userText }]);
    const next = stepIdx + 1;
    setTimeout(() => {
      if (next < steps.length) {
        setMessages((m) => [...m, { from: "bot", text: steps[next].question }]);
        setStepIdx(next);
      } else {
        setDone(true);
      }
    }, 400);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    advance(input.trim());
    setInput("");
  };

  const confirmCall = () => {
    const msg = encodeURIComponent(
      `Olá! Acabei de agendar minha call gratuita pelo site SLZ Digital.\n\n` +
        `Nome: ${answers.nome}\n` +
        `Segmento: ${answers.segmento}\n` +
        `Desafio: ${answers.desafio}\n` +
        `Investimento atual: ${answers.investe}\n` +
        `WhatsApp: ${answers.whatsapp}\n` +
        `Data preferida: ${selectedDate} às ${selectedTime}`,
    );
    window.open(`${WHATSAPP_BASE}&text=${msg}`, "_blank");
    setTimeout(onClose, 500);
  };

  const current = steps[stepIdx];
  const days = getNextDays(8);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "#080808" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b" style={{ borderColor: "#1a1a1a" }}>
        <div className="flex items-center gap-3">
          <img src={slzLogo} alt="SLZ Digital" className="h-8 w-auto" />
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/5"
          aria-label="Fechar"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      {/* Progress */}
      <div className="h-1 w-full" style={{ background: "#161616" }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "#00ccf0", boxShadow: "0 0 10px #00ccf0" }}
        />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-0 py-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              {m.from === "bot" && (
                <div className="w-9 h-9 rounded-full mr-2 flex-shrink-0 flex items-center justify-center" style={{ background: "#161616", border: "1px solid #222" }}>
                  <img src={slzLogo} alt="" className="w-5 h-5 object-contain" />
                </div>
              )}
              <div
                className="max-w-[80%] px-4 py-3 rounded-2xl text-sm md:text-base"
                style={
                  m.from === "bot"
                    ? { background: "#161616", border: "1px solid #222", color: "#fff" }
                    : { background: "#00ccf0", color: "#000", fontWeight: 500 }
                }
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Date picker step */}
          {!done && current?.type === "date" && (
            <div className="rounded-2xl p-4 md:p-6 mt-2" style={{ background: "#161616", border: "1px solid #222" }}>
              <p className="text-sm text-silver mb-3">Escolha o dia:</p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-5">
                {days.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDate(d.value)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={
                      selectedDate === d.value
                        ? { background: "#00ccf0", color: "#000" }
                        : { background: "#0e0e0e", border: "1px solid #222", color: "#fff" }
                    }
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-silver mb-3">Escolha o horário:</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {TIMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    disabled={!selectedDate}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                    style={
                      selectedTime === t
                        ? { background: "#00ccf0", color: "#000" }
                        : { background: "#0e0e0e", border: "1px solid #222", color: "#fff" }
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
              {selectedDate && selectedTime && (
                <button
                  onClick={() => {
                    advance(`${selectedDate} às ${selectedTime}`, `${selectedDate} ${selectedTime}`);
                  }}
                  className="mt-5 w-full py-3 rounded-xl font-heading font-bold transition-transform hover:scale-[1.01]"
                  style={{ background: "#00ccf0", color: "#000" }}
                >
                  Continuar
                </button>
              )}
            </div>
          )}

          {/* Done state */}
          {done && (
            <div className="rounded-2xl p-6 mt-2 text-center" style={{ background: "#161616", border: "1px solid #222" }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#00ccf0" }}>
                <Check className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Tudo pronto, {answers.nome?.split(" ")[0]}!</h3>
              <p className="text-silver mb-5 text-sm">
                Vamos confirmar sua call no WhatsApp em instantes.
              </p>
              <button
                onClick={confirmCall}
                className="w-full py-3 rounded-xl font-heading font-bold transition-transform hover:scale-[1.01]"
                style={{ background: "#00ccf0", color: "#000" }}
              >
                Confirmar Call
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      {!done && current?.type !== "date" && (
        <div className="border-t px-4 md:px-0 py-4" style={{ borderColor: "#1a1a1a" }}>
          <div className="max-w-2xl mx-auto">
            {current?.type === "choice" ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {current.options!.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => advance(opt)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{ background: "#161616", border: "1px solid #222", color: "#fff" }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={current.placeholder}
                  className="flex-1 px-4 py-3 rounded-xl outline-none text-white placeholder:text-silver/50"
                  style={{ background: "#161616", border: "1px solid #222" }}
                />
                <button
                  onClick={handleSend}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
                  style={{ background: "#00ccf0" }}
                  aria-label="Enviar"
                >
                  <Send className="w-5 h-5 text-black" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}