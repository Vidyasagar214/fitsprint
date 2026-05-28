import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { MediaThumb } from "@/components/dashboard/media-thumb";
import { SectionLabel } from "@/components/dashboard/section-label";
import { getAdminHeaderProps } from "@/lib/admin-page-props";
import { trainers } from "@/lib/data/admin-dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Trainer Management" };

export default async function AdminTrainersPage() {
  const header = await getAdminHeaderProps();

  return (
    <>
      <AdminPageHeader title="Trainer Management" {...header} />
      <AdminPageShell>
        <SectionLabel text="// COACHES" />
        <Button variant="gradient" size="sm" type="button">
          + Invite trainer
        </Button>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t) => (
            <Card key={t.name} className="card-hover-lift overflow-hidden">
              <MediaThumb src={t.thumb} alt={t.specialty} aspect="wide" />
              <CardContent className="space-y-3 p-3">
                <div className="flex items-center gap-3">
                  <UserAvatar src={t.avatar} name={t.name} size="lg" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-primary">{t.specialty}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.clients} clients · ★ {t.rating}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" type="button" className="h-8 flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="gradient" type="button" className="h-8 flex-1">
                    Assign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminPageShell>
    </>
  );
}
