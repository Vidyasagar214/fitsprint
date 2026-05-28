"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ensureAdminAccountReady,
  isEmailNotConfirmed,
} from "@/lib/auth/ensure-admin";
import {
  ADMIN_DEMO_PASSWORD,
  getPostLoginPath,
  isAdminEmail,
} from "@/lib/auth/roles";
import { isEmailVerified } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { getAppUrl } from "@/lib/app-url";
import { hasSupabaseEnv } from "@/lib/env";

export type AuthActionState = {
  error?: string;
  success?: string;
};

function authCallbackUrl(next?: string) {
  const base = `${getAppUrl()}/auth/callback`;
  if (next) {
    return `${base}?next=${encodeURIComponent(next)}`;
  }
  return base;
}

export async function signInWithPassword(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase is not configured. Add keys to .env.local." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  let { error } = await supabase.auth.signInWithPassword({ email, password });

  if (
    error &&
    isAdminEmail(email) &&
    password === ADMIN_DEMO_PASSWORD
  ) {
    const shouldProvision =
      isEmailNotConfirmed(error.message) ||
      error.message.toLowerCase().includes("invalid login");

    if (shouldProvision) {
      const provision = await ensureAdminAccountReady();
      if (!provision.ok) {
        return { error: provision.error ?? error.message };
      }
      const retry = await supabase.auth.signInWithPassword({ email, password });
      error = retry.error;
    }
  }

  if (error) {
    if (isEmailNotConfirmed(error.message)) {
      return {
        error:
          "Please confirm your email before signing in. Check your inbox or request a new link below.",
      };
    }
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminEmail(email) && user) {
    await supabase.from("profiles").update({ role: "admin" }).eq("id", user.id);
  }

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  if (user && !isEmailVerified(user) && !isAdminEmail(email)) {
    revalidatePath("/", "layout");
    redirect(`/verify-email?email=${encodeURIComponent(email)}`);
  }

  revalidatePath("/", "layout");
  redirect(getPostLoginPath(user?.email, profile?.role));
}

export async function signUpWithPassword(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase is not configured. Add keys to .env.local." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (isAdminEmail(email)) {
    return { error: "Use the sign-in page for the admin account." };
  }

  const { registerUser } = await import("@/lib/auth/register-user");
  const result = await registerUser({ email, password, fullName });

  if (!result.ok) {
    return { error: result.error };
  }

  revalidatePath("/", "layout");

  if (!result.needsVerification) {
    redirect("/dashboard");
  }

  redirect(`/verify-email?email=${encodeURIComponent(email)}&pending=1`);
}

export async function requestPasswordReset(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase is not configured. Add keys to .env.local." };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: authCallbackUrl("/reset-password"),
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      "If an account exists for that email, you will receive a password reset link shortly.",
  };
}

export async function updatePassword(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase is not configured. Add keys to .env.local." };
  }

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your reset session expired. Request a new link." };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: error.message };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  revalidatePath("/", "layout");
  redirect(getPostLoginPath(user.email, profile?.role));
}

export async function resendVerificationEmail(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase is not configured. Add keys to .env.local." };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: authCallbackUrl() },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Verification email sent. Check your inbox." };
}

export async function signOut() {
  if (!hasSupabaseEnv()) {
    redirect("/");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
