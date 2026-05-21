import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import { AppNav } from "@/components/site/app-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";
import Link from "next/link";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasSupabaseEnv()) {
    redirect("/login?error=config");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b border-border px-4 lg:px-6">
        <Link href="/dashboard" className="font-bold text-primary">
          FitSprint
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user.email}
          </span>
          <SignOutButton />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-56 shrink-0 border-r border-border md:block">
          <AppNav />
        </aside>
        <main id="main-content" className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
      <nav
        aria-label="Mobile app"
        className="flex border-t border-border md:hidden"
      >
        <AppNav />
      </nav>
    </div>
  );
}
