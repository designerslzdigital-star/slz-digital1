import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

describe("deferred Meta Pixel", () => {
  it("retains early conversion events and PageView without fetching before load and idle", () => {
    const html = readFileSync("index.html", "utf8");
    const source = html.split("<!-- Meta Pixel Code -->")[1]?.split("</script>")[0]?.replace(/^[\s\S]*?<script>/, "");
    if (!source) throw new Error("Pixel script missing");
    let onLoad: (() => void) | undefined;
    let onIdle: (() => void) | undefined;
    const appendChild = vi.fn();
    const window = {
      fbq: undefined as undefined | (((...args: unknown[]) => void) & { queue: unknown[][] }),
      addEventListener: vi.fn((_name: string, handler: () => void) => { onLoad = handler; }),
      requestIdleCallback: vi.fn((handler: () => void) => { onIdle = handler; }),
    };
    runInNewContext(source, { window, document: { readyState: "loading", createElement: () => ({}), head: { appendChild } } });
    window.fbq?.("track", "Lead", {}, { eventID: "early-lead" });
    expect(appendChild).not.toHaveBeenCalled();
    expect(window.fbq?.queue).toEqual([
      ["init", "1721314979917926"], ["track", "PageView"], ["track", "Lead", {}, { eventID: "early-lead" }],
    ]);
    onLoad?.();
    expect(appendChild).not.toHaveBeenCalled();
    onIdle?.();
    expect(appendChild).toHaveBeenCalledTimes(1);
    expect(appendChild).toHaveBeenCalledWith({ async: true, src: "https://connect.facebook.net/en_US/fbevents.js" });
  });
});