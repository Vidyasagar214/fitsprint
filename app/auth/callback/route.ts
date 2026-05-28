import { NextResponse } from "next/server";
import { getPostLoginPath } from "@/lib/auth/roles";
import { isEmailVerified } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");
  const errorDescription = searchParams.get("error_description");

  if (errorDescription) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorDescription)}`,
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (nextParam === "/reset-password") {
        return NextResponse.redirect(`${origin}/reset-password`);
      }

      const { data: profile } = user
        ? await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .maybeSingle()
        : { data: null };

      if (user && !isEmailVerified(user)) {
        return NextResponse.redirect(
          `${origin}/verify-email?email=${encodeURIComponent(user.email ?? "")}`,
        );
      }

      const safeNext =
        nextParam &&
        nextParam.startsWith("/") &&
        !nextParam.startsWith("//") &&
        !nextParam.startsWith("/admin");

      const path = safeNext
        ? nextParam
        : getPostLoginPath(user?.email, profile?.role);

      return NextResponse.redirect(`${origin}${path}?confirmed=1`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback`);
}
