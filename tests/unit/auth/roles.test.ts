import { describe, expect, it } from "vitest";
import {
  ADMIN_EMAIL,
  getPostLoginPath,
  isAdminEmail,
  isAdminUser,
} from "@/lib/auth/roles";

describe("isAdminEmail", () => {
  it("matches configured admin email case-insensitively", () => {
    expect(isAdminEmail(ADMIN_EMAIL)).toBe(true);
    expect(isAdminEmail("Admin@FitSprint.com")).toBe(true);
    expect(isAdminEmail("user@example.com")).toBe(false);
  });
});

describe("isAdminUser", () => {
  it("is true for admin email or admin role", () => {
    expect(isAdminUser(ADMIN_EMAIL)).toBe(true);
    expect(isAdminUser("user@example.com", "admin")).toBe(true);
    expect(isAdminUser("user@example.com", "user")).toBe(false);
  });
});

describe("getPostLoginPath", () => {
  it("routes admins to /admin and others to /dashboard", () => {
    expect(getPostLoginPath(ADMIN_EMAIL)).toBe("/admin");
    expect(getPostLoginPath("member@example.com", "premium")).toBe("/dashboard");
  });
});
