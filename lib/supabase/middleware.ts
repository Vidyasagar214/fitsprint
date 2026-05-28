import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  canAccessPath,
  getAccessDeniedRedirect,
  isAuthPath,
  parseUserRole,
} from "@/lib/auth/rbac";
import { getPostLoginPath, isAdminUser } from "@/lib/auth/roles";
import { isEmailVerified, requiresEmailVerification } from "@/lib/auth/session";
import { getSupabaseEnv } from "@/lib/env";

export async function updateSession(request: NextRequest) {
  const env = getSupabaseEnv();
  let response = NextResponse.next({ request });

  if (!env) {
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "config");
      return NextResponse.redirect(url);
    }
    return response;
  }

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  let profileRole: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    profileRole = profile?.role ?? null;
  }

  const role = parseUserRole(profileRole);
  const isAdmin = user ? isAdminUser(user.email, profileRole) : false;

  if (
    !user &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthPath(pathname)) {
    const url = request.nextUrl.clone();
    if (pathname === "/reset-password") {
      return response;
    }
    if (pathname === "/verify-email" && !isEmailVerified(user)) {
      return response;
    }
    url.pathname = getPostLoginPath(user.email, profileRole);
    return NextResponse.redirect(url);
  }

  if (user && requiresEmailVerification(pathname) && !isEmailVerified(user)) {
    const url = request.nextUrl.clone();
    url.pathname = "/verify-email";
    if (user.email) {
      url.searchParams.set("email", user.email);
    }
    return NextResponse.redirect(url);
  }

  if (user && pathname.startsWith("/admin") && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (user && isAdmin && pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (user && !canAccessPath(pathname, role, { isAdminByEmail: isAdmin })) {
    const denied = getAccessDeniedRedirect(pathname, role);
    if (denied) {
      const url = request.nextUrl.clone();
      url.pathname = denied.split("?")[0] ?? "/dashboard/pricing";
      const query = denied.includes("?") ? denied.split("?")[1] : "";
      if (query) {
        new URLSearchParams(query).forEach((value, key) => {
          url.searchParams.set(key, value);
        });
      }
      return NextResponse.redirect(url);
    }
  }

  return response;
}
