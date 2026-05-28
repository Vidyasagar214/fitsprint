import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { SectionLabel } from "@/components/dashboard/section-label";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAdminHeaderProps } from "@/lib/admin-page-props";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const header = await getAdminHeaderProps();

  return (
    <>
      <AdminPageHeader title="Settings" {...header} />
      <AdminPageShell className="max-w-2xl">
        <SectionLabel text="// PLATFORM" />
        <Card className="card-hover-lift">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-0">
            <div className="space-y-2">
              <Label htmlFor="app-name">App display name</Label>
              <Input id="app-name" defaultValue="FitSprint" className="auth-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email">Support email</Label>
              <Input
                id="support-email"
                defaultValue="support@fitsprint.com"
                className="auth-input"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">Light / dark mode</p>
              </div>
              <ThemeToggle />
            </div>
            <Button variant="gradient" size="sm" type="button">
              Save changes
            </Button>
          </CardContent>
        </Card>
        <Card className="card-hover-lift border-destructive/20">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Security</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 px-4 pb-4 pt-0">
            <Button variant="outline" size="sm" type="button">
              Rotate API keys
            </Button>
            <Button variant="destructive" size="sm" type="button">
              Maintenance mode
            </Button>
          </CardContent>
        </Card>
      </AdminPageShell>
    </>
  );
}
