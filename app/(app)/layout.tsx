import { redirect } from "next/navigation";
import { MeshBackground } from "@/components/design/mesh-background";
import { FitSprintLogo } from "@/components/brand/fitsprint-logo";
import { UserDashboardHeader } from "@/components/site/user-dashboard-header";
import { UserDashboardNav } from "@/components/site/user-dashboard-nav";
import { getAuthContext } from "@/lib/auth/profile";
import { hasSupabaseEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasSupabaseEnv()) {
    redirect("/login?error=config");
  }

  const { user, isAdmin, displayName } = await getAuthContext();

  if (!user) {
    redirect("/login");
  }

  if (isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="mesh-background flex min-h-screen flex-col">
      <MeshBackground />
      <header className="header-glass relative z-50 overflow-visible">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 overflow-visible px-4 lg:gap-4 lg:px-6">
          <FitSprintLogo href="/dashboard" size="lg" className="min-h-[2.75rem] shrink-0" />
          <UserDashboardHeader
            displayName={displayName}
            email={user.email}
          />
        </div>
      </header>
      <main id="main-content" className="relative z-0 flex-1 px-4 py-4 lg:px-6 lg:py-5">
        <div className="mx-auto max-w-[1400px]">{children}</div>
      </main>
      <nav
        aria-label="Mobile app"
        className="header-glass relative z-40 lg:hidden"
      >
        <UserDashboardNav displayName={displayName} compact />
      </nav>
    </div>
  );
}
