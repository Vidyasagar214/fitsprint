export const ADMIN_EMAIL = "admin@fitsprint.com";

/** Demo admin password (Phase 1); create this user in Supabase Auth or use auto-provision on first sign-in */
export const ADMIN_DEMO_PASSWORD = "password";

export function isAdminEmail(email: string | null | undefined): boolean {
  return email?.toLowerCase() === ADMIN_EMAIL;
}

export function isAdminRole(role: string | null | undefined): boolean {
  return role === "admin";
}

export function isAdminUser(
  email: string | null | undefined,
  role?: string | null,
): boolean {
  return isAdminEmail(email) || isAdminRole(role);
}

export function getPostLoginPath(
  email: string | null | undefined,
  role?: string | null,
): "/admin" | "/dashboard" {
  return isAdminUser(email, role) ? "/admin" : "/dashboard";
}
