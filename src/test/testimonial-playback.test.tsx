import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import YouTubeTestimonial from "@/components/YouTubeTestimonial";

afterEach(cleanup);

describe("on-demand testimonial playback", () => {
  it("does not load any player until clicked, then starts only the chosen video", () => {
    const { container } = render(<>
      <YouTubeTestimonial id="ZgSan0-SEog" name="Shopping da Limpeza" thumbnail="/shopping.jpg" />
      <YouTubeTestimonial id="_O1eJPMhMVs" name="Genial Consultoria" thumbnail="/genial.jpg" />
    </>);
    expect(container.querySelectorAll("iframe")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Reproduzir depoimento de Shopping da Limpeza" }));
    expect(container.querySelectorAll("iframe")).toHaveLength(1);
    expect(container.querySelector("iframe")?.src).toBe("https://www.youtube.com/embed/ZgSan0-SEog?autoplay=1");
    expect(screen.getByRole("button", { name: "Reproduzir depoimento de Genial Consultoria" })).toBeEnabled();
  });
});