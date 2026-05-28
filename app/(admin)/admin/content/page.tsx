import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { MediaThumb } from "@/components/dashboard/media-thumb";
import { SectionLabel } from "@/components/dashboard/section-label";
import { getAdminHeaderProps } from "@/lib/admin-page-props";
import { contentItems } from "@/lib/data/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Content Management" };

export default async function AdminContentPage() {
  const header = await getAdminHeaderProps();

  return (
    <>
      <AdminPageHeader title="Content Management" {...header} />
      <AdminPageShell>
        <SectionLabel text="// LIBRARY" />
        <Button variant="gradient" size="sm" type="button">
          + Create content
        </Button>
        <div className="grid gap-3 md:grid-cols-3">
          {contentItems.map((item) => (
            <Card key={item.title} className="card-hover-lift overflow-hidden">
              <div className="group relative">
                <MediaThumb
                  src={item.thumb}
                  alt={item.title}
                  aspect="video"
                  showPlay={item.video}
                />
              </div>
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm">{item.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {item.type} · {item.author}
                </p>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 px-3 pb-3 pt-0">
                <Badge
                  variant={
                    item.status === "Published"
                      ? "success"
                      : item.status === "Review"
                        ? "warning"
                        : "secondary"
                  }
                >
                  {item.status}
                </Badge>
                <Button variant="outline" size="sm" type="button" className="h-7 text-xs">
                  Update
                </Button>
                {item.status === "Review" ? (
                  <>
                    <Button size="sm" variant="gradient" type="button" className="h-7 text-xs">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" type="button" className="h-7 text-xs">
                      Reject
                    </Button>
                  </>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminPageShell>
    </>
  );
}
