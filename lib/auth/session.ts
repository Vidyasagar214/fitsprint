import type { User } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/auth/roles";

export function isEmailVerified(user: User | null | undefined): boolean {
  if (!user) return false;
  if (isAdminUser(user.email)) return true;
  return Boolean(user.email_confirmed_at);
}

export function requiresEmailVerification(pathname: string): boolean {
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/dashboard")) return true;
  return false;
}
