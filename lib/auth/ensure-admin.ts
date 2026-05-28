import { ADMIN_DEMO_PASSWORD, ADMIN_EMAIL } from "@/lib/auth/roles";
import { createAdminClient } from "@/lib/supabase/admin";

function isEmailNotConfirmed(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("email not confirmed") ||
    lower.includes("email_not_confirmed")
  );
}

async function findUserByEmail(email: string) {
  const admin = createAdminClient();
  if (!admin) return { user: null, admin: null };

  let page = 1;
  const perPage = 200;

  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      return { user: null, admin, error: error.message };
    }

    const match = data.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase(),
    );
    if (match) {
      return { user: match, admin };
    }

    if (data.users.length < perPage) break;
    page += 1;
  }

  return { user: null, admin };
}

/**
 * Ensures the demo admin exists with a confirmed email (requires service role key).
 */
export async function ensureAdminAccountReady(): Promise<{
  ok: boolean;
  error?: string;
}> {
  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      error:
        "Add SUPABASE_SERVICE_ROLE_KEY to .env.local, or confirm admin@fitsprint.com in Supabase → Authentication → Users.",
    };
  }

  const { user, error: findError } = await findUserByEmail(ADMIN_EMAIL);
  if (findError) {
    return { ok: false, error: findError };
  }

  if (!user) {
    const { data, error } = await admin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: "Admin User", role: "admin" },
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    if (data.user) {
      await admin
        .from("profiles")
        .update({ role: "admin", full_name: "Admin User" })
        .eq("id", data.user.id);
    }

    return { ok: true };
  }

  if (!user.email_confirmed_at) {
    const { error } = await admin.auth.admin.updateUserById(user.id, {
      email_confirm: true,
    });
    if (error) {
      return { ok: false, error: error.message };
    }
  }

  await admin.from("profiles").update({ role: "admin" }).eq("id", user.id);

  return { ok: true };
}

export { isEmailNotConfirmed };
