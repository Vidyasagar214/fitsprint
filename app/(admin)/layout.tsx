import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { MeshBackground } from "@/components/design/mesh-background";
import { getAuthContext } from "@/lib/auth/profile";
import { hasSupabaseEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
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

  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="mesh-background flex min-h-screen">
      <MeshBackground />
      <div className="relative z-10 flex w-full">
        <AdminSidebar displayName={displayName} />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
