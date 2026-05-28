import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/env";

/** Server-only Supabase client with service role (never expose to the browser). */
export function createAdminClient() {
  const env = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!env?.url || !serviceKey) {
    return null;
  }

  return createClient(env.url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function hasAdminClient(): boolean {
  return createAdminClient() !== null;
}
