import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, Loader2, Video } from "lucide-react";
import slzLogo from "@/assets/slz-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";

type Slot = { time: string; iso: string };
type Day = { date: string; label: string; slots: Slot[] };
type Form = { nome: string; empresa: string; email: string; telefone: string; observacoes: string };

const emptyForm: Form = { nome: "", empresa: "", email: "", telefone: "", observacoes: "" };

export default function BookingChat({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"slot" | "form" | "done">("slot");
  const [days, setDays] = useState<Day[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ meetLink: string | null; when: string } | null>(null);
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
    let cancelled = false;
    (async () => {
      setLoadingSlots(true);
      setLoadError(null);
      const { data, error } = await supabase.functions.invoke("calendar-availability", {
        body: {},
      });
      if (cancelled) return;
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
    })();
    return () => { cancelled = true; };
  }, []);

  const activeDay = days?.find((d) => d.date === selectedDate) ?? null;

  const validateForm = (): string | null => {
    if (!form.nome.trim() || form.nome.trim().length < 2) return "Informe seu nome completo.";
    if (!form.empresa.trim()) return "Informe o nome da empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Informe um e-mail válido.";
    if (form.telefone.replace(/\D/g, "").length < 10) return "Informe um telefone válido.";
    if (!selectedSlot) return "Selecione um horário.";
    return null;
  };

  const submit = async () => {
    const err = validateForm();
    if (err) { setSubmitError(err); return; }
    setSubmitError(null);
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("calendar-book", {
      body: {
        nome: form.nome.trim(),
        empresa: form.empresa.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        observacoes: form.observacoes.trim(),
        startIso: selectedSlot!.iso,
      },
    });
    setSubmitting(false);
    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("booking failed:", details);
      let msg = "Não foi possível concluir o agendamento. Tente novamente.";
      try {
        const parsed = JSON.parse(details);
        if (parsed?.error === "slot_taken") msg = "Este horário acabou de ser reservado. Escolha outro.";
      } catch { /* ignore */ }
      setSubmitError(msg);
      return;
    }
    const whenDate = new Date(selectedSlot!.iso);
    const whenLabel = whenDate.toLocaleString("pt-BR", {
      weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    setConfirmation({ meetLink: data?.meetLink ?? null, when: whenLabel });
    setStep("done");
  };

  if (typeof document === "undefined") return null;

  const cardStyle = { background: "#111111", border: "1px solid rgba(0,204,240,0.12)" } as const;
  const inputStyle = { background: "#0e0e0e", border: "1px solid #222", color: "#fff" } as const;

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
          <img src={slzLogo} alt="SLZ Digital" className="h-8 w-auto" />
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

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {step === "slot" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                Escolha um horário livre
              </h2>
              <p className="text-silver mb-6 text-sm md:text-base">
                Call comercial de 30 minutos com link do Google Meet. Fuso horário América/São Paulo.
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
                        onClick={() => setSelectedDate(d.date)}
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
                    onClick={() => setStep("form")}
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
                Seus dados
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
                <Field label="Nome completo">
                  <input
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none placeholder:text-silver/50"
                    style={inputStyle}
                    placeholder="Como devemos te chamar"
                    maxLength={120}
                  />
                </Field>
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
                <div className="grid md:grid-cols-2 gap-4">
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
                  <Field label="Telefone">
                    <input
                      value={form.telefone}
                      onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none placeholder:text-silver/50"
                      style={inputStyle}
                      placeholder="(98) 99999-9999"
                      maxLength={40}
                    />
                  </Field>
                </div>
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
                    <><Loader2 className="w-4 h-4 animate-spin" /> Agendando…</>
                  ) : (
                    "Confirmar agendamento"
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
                Call agendada!
              </h3>
              <p className="text-silver mb-2 text-sm">
                Enviamos o convite para <span className="text-white">{form.email}</span>.
              </p>
              <p className="text-white font-medium mb-6">{confirmation.when}</p>
              {confirmation.meetLink && (
                <a
                  href={confirmation.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold transition-transform hover:scale-[1.02] mb-3"
                  style={{ background: "#00ccf0", color: "#000" }}
                >
                  <Video className="w-4 h-4" /> Abrir link do Google Meet
                </a>
              )}
              <div>
                <button onClick={onClose} className="text-silver text-sm underline hover:text-white mt-2">
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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