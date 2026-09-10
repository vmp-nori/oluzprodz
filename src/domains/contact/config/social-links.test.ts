import { describe, expect, it } from "vitest";
import { socialLinks } from "./social-links";

describe("social links", () => {
  it("keeps the verified Instagram destination", () => {
    expect(new URL(socialLinks.instagram.href).hostname).toBe(
      "www.instagram.com",
    );
    expect(new URL(socialLinks.instagram.href).pathname).toBe("/oluzprodz/");
  });

  it("keeps the verified YouTube destination", () => {
    expect(new URL(socialLinks.youtube.href).hostname).toBe("www.youtube.com");
    expect(new URL(socialLinks.youtube.href).pathname).toBe("/@OluzProdz");
  });
});
