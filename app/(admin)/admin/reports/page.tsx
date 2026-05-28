import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { MediaThumb } from "@/components/dashboard/media-thumb";
import { SectionLabel } from "@/components/dashboard/section-label";
import { getAdminHeaderProps } from "@/lib/admin-page-props";
import { reportSummaries } from "@/lib/data/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Reports" };

export default async function AdminReportsPage() {
  const header = await getAdminHeaderProps();

  return (
    <>
      <AdminPageHeader title="Reports" {...header} />
      <AdminPageShell>
        <SectionLabel text="// EXPORTS" />
        <Button variant="gradient" size="sm" type="button">
          + Generate report
        </Button>
        <div className="grid gap-3 md:grid-cols-3">
          {reportSummaries.map((r) => (
            <Card key={r.name} className="card-hover-lift overflow-hidden">
              <MediaThumb src={r.thumb} alt={r.name} aspect="video" />
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm">{r.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {r.generated} · {r.format}
                </p>
              </CardHeader>
              <CardContent className="flex gap-2 px-3 pb-3 pt-0">
                <Button variant="outline" size="sm" type="button" className="h-8 flex-1">
                  Download
                </Button>
                <Button variant="ghost" size="sm" type="button" className="h-8">
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminPageShell>
    </>
  );
}
