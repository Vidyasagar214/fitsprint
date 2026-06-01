import { describe, expect, it } from "vitest";
import {
  canAccessPath,
  getAccessDeniedRedirect,
  getRouteAccess,
  hasMinimumRole,
  isAuthPath,
  parseUserRole,
} from "@/lib/auth/rbac";

describe("parseUserRole", () => {
  it("defaults unknown roles to user", () => {
    expect(parseUserRole(undefined)).toBe("user");
    expect(parseUserRole("invalid")).toBe("user");
  });

  it("accepts valid roles", () => {
    expect(parseUserRole("premium")).toBe("premium");
    expect(parseUserRole("admin")).toBe("admin");
  });
});

describe("hasMinimumRole", () => {
  it("respects role hierarchy", () => {
    expect(hasMinimumRole("user", "user")).toBe(true);
    expect(hasMinimumRole("user", "premium")).toBe(false);
    expect(hasMinimumRole("premium", "premium")).toBe(true);
    expect(hasMinimumRole("admin", "premium")).toBe(true);
  });
});

describe("getRouteAccess", () => {
  it.each([
    ["/", "public"],
    ["/login", "public"],
    ["/dashboard", "authenticated"],
    ["/dashboard/workouts", "authenticated"],
    ["/dashboard/progress", "premium"],
    ["/admin", "admin"],
    ["/admin/users", "admin"],
  ] as const)("maps %s → %s", (path, access) => {
    expect(getRouteAccess(path)).toBe(access);
  });
});

describe("isAuthPath", () => {
  it("recognizes auth routes", () => {
    expect(isAuthPath("/login")).toBe(true);
    expect(isAuthPath("/dashboard")).toBe(false);
  });
});

describe("canAccessPath", () => {
  it("allows public and dashboard for any signed-in role", () => {
    expect(canAccessPath("/dashboard", "user")).toBe(true);
    expect(canAccessPath("/dashboard/workouts", "user")).toBe(true);
  });

  it("blocks premium progress for free users", () => {
    expect(canAccessPath("/dashboard/progress", "user")).toBe(false);
    expect(canAccessPath("/dashboard/progress", "premium")).toBe(true);
  });

  it("allows admin email override on premium routes", () => {
    expect(
      canAccessPath("/dashboard/progress", "user", { isAdminByEmail: true }),
    ).toBe(true);
  });

  it("restricts admin routes to admin role or admin email", () => {
    expect(canAccessPath("/admin", "user")).toBe(false);
    expect(canAccessPath("/admin", "admin")).toBe(true);
    expect(canAccessPath("/admin", "user", { isAdminByEmail: true })).toBe(true);
  });
});

describe("getAccessDeniedRedirect", () => {
  it("redirects free users from progress to pricing", () => {
    expect(getAccessDeniedRedirect("/dashboard/progress", "user")).toBe(
      "/dashboard/pricing?reason=premium&from=progress",
    );
  });

  it("redirects non-admins away from admin", () => {
    expect(getAccessDeniedRedirect("/admin", "premium")).toBe("/dashboard");
  });

  it("returns null when access is allowed", () => {
    expect(getAccessDeniedRedirect("/dashboard", "user")).toBeNull();
    expect(getAccessDeniedRedirect("/dashboard/progress", "premium")).toBeNull();
  });
});
