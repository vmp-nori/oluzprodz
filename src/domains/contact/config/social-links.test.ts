import { describe, expect, it } from "vitest";
import { socialLinks } from "./social-links";

describe("social links", () => {
  it("keeps the verified Instagram destination", () => {
    expect(new URL(socialLinks.instagram.href).hostname).toBe(
      "www.instagram.com",
    );
    expect(new URL(socialLinks.instagram.href).pathname).toBe("/oluzprodz/");
  });
});
