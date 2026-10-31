import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, Loader2, MessageCircle, Send } from "lucide-react";
import slzLogo from "@/assets/slz-logo.webp.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { fbqTrack } from "@/lib/fbq";
import { bookingWhatsAppUrl } from "@/lib/booking-whatsapp";
import { Button } from "@/components/ui/button";

type Slot = { time: string; iso: string };
type Day = { date: string; label: string; slots: Slot[] };
type Form = { empresa: string; email: string; observacoes: string };

const emptyForm: Form = { empresa: "", email: "", observacoes: "" };

type ChatStep = {
  id: "nome" | "segmento" | "desafio" | "investe" | "telefone";
  question: string;
  type: "text" | "choice";
  options?: string[];
  placeholder?: string;
};

const chatSteps: ChatStep[] = [
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
    options: ["Sim, sem resultado", "Sim, com resultado parcial", "Nunca investi", "Já tive agência e parei"],
  },
  { id: "telefone", question: "Qual o melhor WhatsApp para confirmação?", type: "text", placeholder: "(98) 99999-9999" },
];

type Msg = { from: "bot" | "user"; text: string };
type Answers = Partial<Record<ChatStep["id"], string>>;

export default function BookingChat({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"chat" | "slot" | "form" | "done">("chat");

  // Chat state
  const [chatIdx, setChatIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: chatSteps[0].question }]);
  const [input, setInput] = useState("");

  // Slot/form state
  const [days, setDays] = useState<Day[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ whatsappUrl: string; when: string } | null>(null);
  const leadTracked = useRef(false);
  const submissionId = useRef(crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, step]);

  const loadAvailability = async () => {
    setLoadingSlots(true);
    setLoadError(null);
    const { data, error } = await supabase.functions.invoke("calendar-availability", { body: {} });
    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("availability failed:", details);
      setLoadError("Não foi possível carregar os horários. Tente novamente em instantes.");
      setLoadingSlots(false);
      return;
    }
    const list = (data?.days ?? []) as Day[];
    setDays(list);
    if (list[0]) setSelectedDate(list[0].date);
    setLoadingSlots(false);
  };

  const advanceChat = (userText: string) => {
    const current = chatSteps[chatIdx];
    setAnswers((a) => ({ ...a, [current.id]: userText }));
    setMessages((m) => [...m, { from: "user", text: userText }]);
    const next = chatIdx + 1;
    setTimeout(() => {
      if (next < chatSteps.length) {
        setMessages((m) => [...m, { from: "bot", text: chatSteps[next].question }]);
        setChatIdx(next);
      } else {
        setMessages((m) => [...m, {
          from: "bot",
          text: "Perfeito! Agora escolha o melhor dia e horário para a sua call de 30 min.",
        }]);
        setStep("slot");
        if (!days) loadAvailability();
      }
    }, 350);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    advanceChat(input.trim());
    setInput("");
  };

  const activeDay = days?.find((d) => d.date === selectedDate) ?? null;

  const continueWithSlot = () => {
    if (!selectedSlot) return;
    if (!leadTracked.current) {
      leadTracked.current = true;
      fbqTrack("Lead", undefined, { name: answers.nome, phone: answers.telefone });
    }
    setStep("form");
  };

  const validateForm = (): string | null => {
    if (!form.empresa.trim()) return "Informe o nome da empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Informe um e-mail válido.";
    if (!selectedSlot) return "Selecione um horário.";
    return null;
  };

  const submit = async () => {
    const err = validateForm();
    if (err) { setSubmitError(err); return; }
    if (!selectedSlot || submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    const { error } = await supabase.functions.invoke("capture-lead", {
      body: {
        id: submissionId.current,
        nome: (answers.nome ?? "").trim(),
        empresa: form.empresa.trim(),
        email: form.email.trim(),
        telefone: (answers.telefone ?? "").trim(),
        segmento: answers.segmento ?? "",
        desafio: answers.desafio ?? "",
        investimentoAtual: answers.investe ?? "",
        observacoes: form.observacoes.trim(),
        startIso: selectedSlot.iso,
      },
    });
    setSubmitting(false);
    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("booking failed:", details);
      setSubmitError("Não foi possível enviar sua solicitação. Tente novamente.");
      return;
    }
    const whenDate = new Date(selectedSlot.iso);
    const whenLabel = whenDate.toLocaleString("pt-BR", {
      weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    setConfirmation({ whatsappUrl: bookingWhatsAppUrl({ ...answers, empresa: form.empresa.trim() }, selectedSlot.iso), when: whenLabel });
    setStep("done");
  };

  if (typeof document === "undefined") return null;

  const cardStyle = { background: "#111111", border: "1px solid rgba(0,204,240,0.12)" } as const;
  const inputStyle = { background: "#0e0e0e", border: "1px solid #222", color: "#fff" } as const;
  const currentChat = chatSteps[chatIdx];

  const progressSteps = 3; // chat, slot, form
  const progressIdx =
    step === "chat" ? (chatIdx / chatSteps.length) :
    step === "slot" ? 1 + (selectedSlot ? 0.5 : 0) :
    step === "form" ? 2 :
    3;
  const progress = Math.min(100, (progressIdx / progressSteps) * 100);

  return createPortal(
    <div
      className="flex flex-col"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "#080808",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b" style={{ borderColor: "#1a1a1a" }}>
        <div className="flex items-center gap-3">
          <img src={slzLogo.url} alt="SLZ Digital" className="h-8 w-auto" />
          <span className="hidden sm:inline text-xs uppercase tracking-[0.25em] text-silver">
            Agendar call comercial
          </span>
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

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {step === "chat" && (
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  {m.from === "bot" && (
                    <div
                      className="w-9 h-9 rounded-full mr-2 flex-shrink-0 flex items-center justify-center"
                      style={{ background: "#111111", border: "1px solid rgba(0,204,240,0.12)" }}
                    >
                      <img src={slzLogo.url} alt="" className="w-9 h-9 object-cover object-left" />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl text-sm md:text-base"
                    style={
                      m.from === "bot"
                        ? { background: "#111111", border: "1px solid rgba(0,204,240,0.12)", color: "#fff" }
                        : { background: "#00ccf0", color: "#000", fontWeight: 500 }
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === "slot" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                Escolha um horário livre
              </h2>
              <p className="text-silver mb-6 text-sm md:text-base">
                Call comercial de 30 minutos. Confirmamos o horário pelo WhatsApp. Fuso horário América/São Paulo.
              </p>

              {loadingSlots && (
                <div className="flex items-center gap-2 text-silver">
                  <Loader2 className="w-4 h-4 animate-spin" /> Carregando horários disponíveis…
                </div>
              )}
              {loadError && <div className="text-red-400 text-sm">{loadError}</div>}

              {days && days.length === 0 && !loadingSlots && (
                <div className="text-silver text-sm">
                  Nenhum horário disponível nos próximos dias. Fale conosco pelo WhatsApp.
                </div>
              )}

              {days && days.length > 0 && (
                <div className="rounded-2xl p-4 md:p-6" style={cardStyle}>
                  <p className="text-xs uppercase tracking-[0.2em] text-silver mb-3">Dia</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {days.map((d) => (
                      <button
                        key={d.date}
                        onClick={() => { setSelectedDate(d.date); setSelectedSlot(null); }}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        style={
                          selectedDate === d.date
                            ? { background: "#00ccf0", color: "#000" }
                            : { background: "#0e0e0e", border: "1px solid #222", color: "#fff" }
                        }
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-silver mb-3">Horário</p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {activeDay?.slots.map((s) => (
                      <button
                        key={s.iso}
                        onClick={() => setSelectedSlot(s)}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        style={
                          selectedSlot?.iso === s.iso
                            ? { background: "#00ccf0", color: "#000" }
                            : { background: "#0e0e0e", border: "1px solid #222", color: "#fff" }
                        }
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!selectedSlot}
                    onClick={continueWithSlot}
                    className="mt-6 w-full py-3 rounded-xl font-heading font-bold transition-transform hover:scale-[1.01] disabled:opacity-40 disabled:hover:scale-100"
                    style={{ background: "#00ccf0", color: "#000" }}
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "form" && selectedSlot && (
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                Últimos detalhes, {(answers.nome ?? "").split(" ")[0]}
              </h2>
              <p className="text-silver mb-6 text-sm">
                Horário selecionado:{" "}
                <span className="text-white font-medium">
                  {new Date(selectedSlot.iso).toLocaleString("pt-BR", {
                    weekday: "long", day: "2-digit", month: "long",
                    hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo",
                  })}
                </span>
                {" · "}
                <button className="underline hover:text-white" onClick={() => setStep("slot")}>
                  trocar
                </button>
              </p>

              <div className="rounded-2xl p-5 md:p-6 space-y-4" style={cardStyle}>
                <Field label="Empresa">
                  <input
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none placeholder:text-silver/50"
                    style={inputStyle}
                    placeholder="Nome da sua empresa"
                    maxLength={160}
                  />
                </Field>
                <Field label="E-mail">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none placeholder:text-silver/50"
                    style={inputStyle}
                    placeholder="voce@empresa.com"
                    maxLength={200}
                  />
                </Field>
                <Field label="Observações (opcional)">
                  <textarea
                    value={form.observacoes}
                    onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl outline-none placeholder:text-silver/50 resize-none"
                    style={inputStyle}
                    placeholder="Conte um pouco sobre o desafio ou objetivo"
                    maxLength={1000}
                  />
                </Field>

                {submitError && <div className="text-red-400 text-sm">{submitError}</div>}

                <button
                  onClick={submit}
                  disabled={submitting}
                  className="w-full py-3 rounded-xl font-heading font-bold transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{ background: "#00ccf0", color: "#000" }}
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Enviando solicitação…</>
                  ) : (
                    "Enviar solicitação"
                  )}
                </button>
              </div>
            </div>
          )}

          {step === "done" && confirmation && (
            <div className="rounded-2xl p-8 text-center max-w-xl mx-auto" style={cardStyle}>
              <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "#00ccf0" }}>
                <Check className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Quase lá, {(answers.nome ?? "").split(" ")[0]}!
              </h3>
              <p className="text-silver mb-2 text-sm">
                Toque no botão abaixo para enviar sua solicitação no WhatsApp e confirmar o horário com nosso time.
              </p>
              <p className="text-muted-foreground mb-2 text-sm">Solicitação enviada, confirmamos pelo WhatsApp.</p>
              <p className="text-white font-medium mb-6">{confirmation.when}</p>
              <Button asChild variant="whatsapp" size="lg" className="font-heading mb-3 whitespace-normal h-auto py-3">
                <a
                  href={confirmation.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" /> Confirmar no WhatsApp
                </a>
              </Button>
              <div>
                <button onClick={onClose} className="text-silver text-sm underline hover:text-white mt-2">
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat composer */}
      {step === "chat" && (
        <div className="border-t px-4 md:px-0 py-4" style={{ borderColor: "#1a1a1a" }}>
          <div className="max-w-2xl mx-auto">
            {currentChat?.type === "choice" ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {currentChat.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => advanceChat(opt)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{ background: "#111111", border: "1px solid rgba(0,204,240,0.12)", color: "#fff" }}
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
                  placeholder={currentChat?.placeholder}
                  className="flex-1 px-4 py-3 rounded-xl outline-none text-white placeholder:text-silver/50"
                  style={{ background: "#111111", border: "1px solid rgba(0,204,240,0.12)" }}
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
    </div>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-silver mb-2">{label}</span>
      {children}
    </label>
  );
}