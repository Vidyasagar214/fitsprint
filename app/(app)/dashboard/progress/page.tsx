import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/lib/auth/profile";
import { getProgressPageData } from "@/lib/db/progress";
import { DashboardPage, DashboardSection } from "@/components/dashboard/dashboard-page";
import { PageHeader } from "@/components/dashboard/page-header";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Progress",
};

export default async function ProgressPage() {
  const { user } = await getAuthContext();
  if (!user) redirect("/login");

  const { weeklyActivity, weeklyCalorieTrend, metrics } =
    await getProgressPageData(user.id);

  const minutesData = weeklyActivity.map((d) => ({
    label: d.day,
    value: d.minutes,
  }));

  return (
    <DashboardPage>
      <DashboardSection>
        <PageHeader
          kicker="// ANALYTICS"
          title="Your progress"
          description="Charts use live workout activity from your completed sessions."
          action={
            <Button variant="outline" size="sm" type="button" disabled>
              Export CSV (soon)
            </Button>
          }
        />
      </DashboardSection>

      {metrics.length > 0 ? (
        <DashboardSection delay={1} className="grid gap-3 md:grid-cols-3">
          {metrics.map((m) => (
            <Card key={m.label} className="card-hover-lift">
              <CardHeader className="p-4 pb-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {m.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <p className="font-display text-2xl font-bold tracking-tight">
                  {m.value}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                  {m.change}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{m.period}</p>
              </CardContent>
            </Card>
          ))}
        </DashboardSection>
      ) : (
        <DashboardSection delay={1}>
          <p className="text-sm text-muted-foreground">
            Log custom progress metrics from your profile in a future update. Workout
            charts below use your session history.
          </p>
        </DashboardSection>
      )}

      <DashboardSection delay={2} className="grid gap-4 lg:grid-cols-2">
        <Card className="card-hover-lift">
          <CardHeader className="border-b border-border/30 p-4 pb-3">
            <CardTitle className="text-base font-semibold">Active minutes</CardTitle>
            <p className="text-xs text-muted-foreground">Last 7 days · live data</p>
          </CardHeader>
          <CardContent className="p-4 pt-3">
            <SimpleBarChart
              data={minutesData}
              unit=" min"
              accent="green"
              showValues
            />
          </CardContent>
        </Card>

        <Card className="card-hover-lift">
          <CardHeader className="border-b border-border/30 p-4 pb-3">
            <CardTitle className="text-base font-semibold">Calories burned</CardTitle>
            <p className="text-xs text-muted-foreground">Last 7 days · live data</p>
          </CardHeader>
          <CardContent className="p-4 pt-3">
            <SimpleBarChart
              data={weeklyCalorieTrend}
              unit=""
              accent="orange"
              showValues
            />
          </CardContent>
        </Card>
      </DashboardSection>

      <DashboardSection delay={3}>
        <Card className="card-hover-lift">
          <CardHeader className="border-b border-border/30 p-4 pb-3">
            <CardTitle className="text-base font-semibold">Combined weekly view</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-3">
            <WeeklyActivityChart data={weeklyActivity} />
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardPage>
  );
}
