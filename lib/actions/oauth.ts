"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAppUrl } from "@/lib/app-url";
import { hasSupabaseEnv } from "@/lib/env";

export type OAuthProvider = "google" | "apple" | "facebook";

export async function signInWithOAuth(provider: OAuthProvider) {
  if (!hasSupabaseEnv()) {
    redirect("/login?error=config");
  }

  const origin = getAppUrl();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    redirect(data.url);
  }

  redirect("/login?error=oauth");
}
