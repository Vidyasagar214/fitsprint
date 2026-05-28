import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { getAdminHeaderProps } from "@/lib/admin-page-props";
import { managedUsers } from "@/lib/data/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/dashboard/section-label";

export const metadata: Metadata = { title: "User Management" };

export default async function AdminUsersPage() {
  const header = await getAdminHeaderProps();

  return (
    <>
      <AdminPageHeader title="User Management" subtitle="Manage members, plans, and access" {...header} />
      <AdminPageShell>
        <SectionLabel text="// MEMBERS" />
        <div className="flex flex-wrap gap-2">
          <Button variant="gradient" size="sm" type="button">
            + Add user
          </Button>
          <Button variant="outline" size="sm" type="button">
            Export CSV
          </Button>
        </div>
        <Card className="card-hover-lift">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">All users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-4 pt-0">
            {managedUsers.map((u) => (
              <div
                key={u.email}
                className="flex items-center gap-3 rounded-lg border border-border/40 bg-white/5 p-2.5"
              >
                <UserAvatar src={u.avatar} name={u.name} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <Badge variant="default">{u.plan}</Badge>
                <Badge variant={u.status === "Active" ? "success" : "destructive"}>
                  {u.status}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" type="button" className="h-8">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={u.status === "Suspended" ? "gradient" : "destructive"}
                    type="button"
                    className="h-8"
                  >
                    {u.status === "Suspended" ? "Approve" : "Suspend"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </AdminPageShell>
    </>
  );
}
