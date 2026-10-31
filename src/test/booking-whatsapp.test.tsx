import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { bookingWhatsAppUrl } from "@/lib/booking-whatsapp";
import BookingChat from "@/components/BookingChat";

const mocks = vi.hoisted(() => ({ invoke: vi.fn(), track: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: mocks.invoke } } }));
vi.mock("@/lib/fbq", () => ({ fbqTrack: mocks.track }));
const iso = "2026-11-02T13:30:00Z";

beforeEach(() => {
  vi.clearAllMocks();
  Element.prototype.scrollTo = vi.fn();
  mocks.invoke.mockImplementation(async (name: string) => name === "calendar-availability"
    ? { data: { days: [{ date: "2026-11-02", label: "02 nov", slots: [{ time: "10:30", iso }] }] }, error: null }
    : { data: { ok: true }, error: null });
});
afterEach(cleanup);

async function chooseSlot() {
  render(<BookingChat onClose={vi.fn()} />);
  fireEvent.change(screen.getByPlaceholderText("Digite seu nome"), { target: { value: "Maria Silva" } });
  fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
  fireEvent.click(await screen.findByRole("button", { name: "Saúde" }));
  fireEvent.click(await screen.findByRole("button", { name: "Marketing sem retorno" }));
  fireEvent.click(await screen.findByRole("button", { name: "Nunca investi" }));
  fireEvent.change(await screen.findByPlaceholderText("(98) 99999-9999"), { target: { value: "98999999999" } });
  fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
  fireEvent.click(await screen.findByRole("button", { name: "10:30" }));
  fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
}

describe("WhatsApp booking rules", () => {
  it("encodes the supplied message with blank lines, answers and São Paulo time", () => {
    const url = bookingWhatsAppUrl({ nome: "Maria Silva", segmento: "Saúde", desafio: "Marketing sem retorno" }, iso);
    expect(url).toBe("https://wa.me/5598982990007?text=" + encodeURIComponent(
      "Olá, tudo bem? Vim pelo site da SLZ Digital e gostaria de agendar uma reunião!\n\nMeu nome: Maria Silva\n\nSegmento: Saúde\n\nMeu maior desafio hoje: Marketing sem retorno\n\nHorário que escolhi: segunda-feira, 2 de novembro às 10:30\n\nFico no aguardo da confirmação de vocês!"
    ));
  });

  it("tracks Lead once on slot continuation, including when the slot is revisited", async () => {
    await chooseSlot();
    expect(mocks.track).toHaveBeenCalledWith("Lead", undefined, { name: "Maria Silva", phone: "98999999999" });
    expect(mocks.invoke).not.toHaveBeenCalledWith("calendar-book", expect.anything());
    fireEvent.click(screen.getByRole("button", { name: "trocar" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(mocks.track).toHaveBeenCalledTimes(1);
  });

  it("stores the completed lead instead of creating a calendar event, without opening WhatsApp automatically", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    await chooseSlot();
    fireEvent.change(screen.getByPlaceholderText("Nome da sua empresa"), { target: { value: "Empresa Teste" } });
    fireEvent.change(screen.getByPlaceholderText("voce@empresa.com"), { target: { value: "maria@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitação" }));
    await waitFor(() => expect(mocks.invoke).toHaveBeenCalledWith("capture-lead", { body: expect.objectContaining({ startIso: iso, nome: "Maria Silva", empresa: "Empresa Teste", email: "maria@example.com", telefone: "98999999999", segmento: "Saúde", desafio: "Marketing sem retorno" }) }));
    expect(mocks.invoke).not.toHaveBeenCalledWith("calendar-book", expect.anything());
    const link = await screen.findByRole("link", { name: "Confirmar no WhatsApp" });
    expect(link.getAttribute("href")).toBe(bookingWhatsAppUrl({ nome: "Maria Silva", empresa: "Empresa Teste", segmento: "Saúde", desafio: "Marketing sem retorno" }, iso));
    expect(link.getAttribute("target")).toBe("_blank");
    expect(open).not.toHaveBeenCalled();
    open.mockRestore();
  });

  it("adds the collected company after the name", () => {
    const message = new URL(bookingWhatsAppUrl({ nome: "Maria Silva", empresa: "Empresa Teste" }, iso)).searchParams.get("text");
    expect(message).toContain("Meu nome: Maria Silva\n\nEmpresa: Empresa Teste\n\nSegmento:");
  });

  it("keeps WhatsApp unavailable if lead storage fails", async () => {
    await chooseSlot();
    mocks.invoke.mockResolvedValueOnce({ data: null, error: new Error("save_failed") });
    fireEvent.change(screen.getByPlaceholderText("Nome da sua empresa"), { target: { value: "Empresa Teste" } });
    fireEvent.change(screen.getByPlaceholderText("voce@empresa.com"), { target: { value: "maria@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitação" }));
    await waitFor(() => expect(mocks.invoke).toHaveBeenCalledWith("capture-lead", expect.anything()));
    expect(screen.queryByRole("link", { name: "Confirmar no WhatsApp" })).toBeNull();
  });
});