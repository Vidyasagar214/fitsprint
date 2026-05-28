import { PageShell } from "@/components/design/page-shell";
import { SiteHeader } from "@/components/site/site-header";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | null = null;

  if (hasSupabaseEnv()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userEmail = user?.email ?? null;
    } catch {
      userEmail = null;
    }
  }

  return (
    <PageShell>
      <SiteHeader userEmail={userEmail} />
      <main
        id="main-content"
        className="flex min-h-[calc(100vh-4.25rem)] flex-col items-center justify-center px-4 py-8"
      >
        {children}
      </main>
    </PageShell>
  );
}
