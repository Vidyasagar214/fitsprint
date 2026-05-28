/** Role hierarchy for FitSprint RBAC (Phase 2). */

export const USER_ROLES = ["user", "premium", "trainer", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

const ROLE_RANK: Record<UserRole, number> = {
  user: 0,
  premium: 1,
  trainer: 2,
  admin: 3,
};

export type RouteAccess = "public" | "authenticated" | "premium" | "trainer" | "admin";

/** Paths that require at least premium (advanced analytics). */
const PREMIUM_PATH_PREFIXES = ["/dashboard/progress"] as const;

/** Reserved for trainer-only surfaces (Phase 8+). */
const TRAINER_PATH_PREFIXES = [] as const;

const AUTH_PATHS = new Set([
  "/login",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
]);

export function parseUserRole(role: string | null | undefined): UserRole {
  if (role && USER_ROLES.includes(role as UserRole)) {
    return role as UserRole;
  }
  return "user";
}

export function hasMinimumRole(
  current: UserRole | null | undefined,
  required: UserRole,
): boolean {
  const c = parseUserRole(current ?? "user");
  return ROLE_RANK[c] >= ROLE_RANK[required];
}

export function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.has(pathname);
}

export function getRouteAccess(pathname: string): RouteAccess {
  if (pathname.startsWith("/admin")) return "admin";
  for (const prefix of TRAINER_PATH_PREFIXES) {
    if (pathname.startsWith(prefix)) return "trainer";
  }
  for (const prefix of PREMIUM_PATH_PREFIXES) {
    if (pathname.startsWith(prefix)) return "premium";
  }
  if (pathname.startsWith("/dashboard")) return "authenticated";
  return "public";
}

export function canAccessPath(
  pathname: string,
  role: UserRole | null | undefined,
  options?: { isAdminByEmail?: boolean },
): boolean {
  const access = getRouteAccess(pathname);
  const parsed = parseUserRole(role);

  if (access === "public") return true;
  if (access === "authenticated") return true;
  if (access === "premium") {
    return hasMinimumRole(parsed, "premium") || options?.isAdminByEmail === true;
  }
  if (access === "trainer") {
    return hasMinimumRole(parsed, "trainer") || options?.isAdminByEmail === true;
  }
  if (access === "admin") {
    return parsed === "admin" || options?.isAdminByEmail === true;
  }
  return false;
}

export function getAccessDeniedRedirect(
  pathname: string,
  role: UserRole | null | undefined,
): string | null {
  const access = getRouteAccess(pathname);
  const parsed = parseUserRole(role);

  if (access === "premium" && !hasMinimumRole(parsed, "premium")) {
    return "/dashboard/pricing?reason=premium&from=progress";
  }
  if (access === "trainer" && !hasMinimumRole(parsed, "trainer")) {
    return "/dashboard/pricing?reason=trainer";
  }
  if (access === "admin" && parsed !== "admin") {
    return "/dashboard";
  }
  return null;
}
