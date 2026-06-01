import { describe, expect, it } from "vitest";
import { isEmailVerified, requiresEmailVerification } from "@/lib/auth/session";
import { ADMIN_EMAIL } from "@/lib/auth/roles";

describe("isEmailVerified", () => {
  it("returns false without a user", () => {
    expect(isEmailVerified(null)).toBe(false);
  });

  it("treats admin email as verified without confirmation timestamp", () => {
    expect(
      isEmailVerified({
        id: "1",
        email: ADMIN_EMAIL,
        email_confirmed_at: undefined,
      } as never),
    ).toBe(true);
  });

  it("requires email_confirmed_at for regular users", () => {
    expect(
      isEmailVerified({
        id: "2",
        email: "user@example.com",
        email_confirmed_at: "2026-01-01T00:00:00Z",
      } as never),
    ).toBe(true);
    expect(
      isEmailVerified({
        id: "2",
        email: "user@example.com",
        email_confirmed_at: undefined,
      } as never),
    ).toBe(false);
  });
});

describe("requiresEmailVerification", () => {
  it("applies to dashboard and admin paths", () => {
    expect(requiresEmailVerification("/dashboard")).toBe(true);
    expect(requiresEmailVerification("/admin/users")).toBe(true);
    expect(requiresEmailVerification("/")).toBe(false);
    expect(requiresEmailVerification("/login")).toBe(false);
  });
});
