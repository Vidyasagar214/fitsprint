import { isAdminEmail } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { getAppUrl } from "@/lib/app-url";

export type RegisterInput = {
  email: string;
  password: string;
  fullName?: string;
};

export type RegisterResult =
  | { ok: true; needsVerification: boolean; email: string }
  | { ok: false; error: string };

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const email = input.email.trim();
  const password = input.password;

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  if (isAdminEmail(email)) {
    return { ok: false, error: "Use the sign-in page for the admin account." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: input.fullName?.trim() ?? "" },
      emailRedirectTo: `${getAppUrl()}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const needsVerification = !data.session;

  return { ok: true, needsVerification, email };
}
