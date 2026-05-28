import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Shield, Palette } from "lucide-react";
import { getAuthContext } from "@/lib/auth/profile";
import {
  ensureUserSetup,
  getNotificationPrefs,
} from "@/lib/db/profile";
import { DashboardPage, DashboardSection } from "@/components/dashboard/dashboard-page";
import { SectionLabel } from "@/components/dashboard/section-label";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const { user, profile } = await getAuthContext();
  if (!user) redirect("/login");

  await ensureUserSetup(user.id);
  const prefs = (await getNotificationPrefs(user.id)) ?? {
    workout_reminders: true,
    goal_progress: true,
    community_activity: false,
  };

  return (
    <DashboardPage>
      <DashboardSection>
        <SectionLabel text="// PREFERENCES" />
        <h1 className="font-display mt-1 text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Units and notifications are stored in your database profile.
        </p>
      </DashboardSection>

      <DashboardSection delay={1} className="grid gap-4 lg:grid-cols-2">
        <Card className="card-hover-lift">
          <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between px-4 pb-4 pt-0">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">
                Switch between light and dark mode
              </p>
            </div>
            <ThemeToggle />
          </CardContent>
        </Card>

        <Card className="card-hover-lift">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Regional & notifications</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <SettingsForm
              units={profile?.units ?? "metric"}
              prefs={prefs}
            />
          </CardContent>
        </Card>
      </DashboardSection>

      <DashboardSection delay={2}>
        <Card className="card-hover-lift border-destructive/20">
          <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
            <Shield className="h-5 w-5 text-destructive" />
            <CardTitle className="text-base">Privacy & data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 px-4 pb-4 pt-0">
            <Button variant="outline" size="sm" type="button" disabled>
              Export my data (Phase 11)
            </Button>
            <Button variant="destructive" size="sm" type="button" disabled>
              Delete account (Phase 11)
            </Button>
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardPage>
  );
}
