import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

export async function GET() {
  const body: { ok: boolean; db?: string } = { ok: true };

  if (hasSupabaseEnv()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("profiles").select("id").limit(1);
      body.db = error ? "unavailable" : "ok";
    } catch {
      body.db = "unavailable";
    }
  }

  return NextResponse.json(body);
}
