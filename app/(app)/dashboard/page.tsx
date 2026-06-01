import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Clock, Flame, Heart, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/lib/auth/profile";
import { getDashboardData } from "@/lib/db/dashboard";
import {
  DashboardPage as DashboardPageShell,
  DashboardSection,
} from "@/components/dashboard/dashboard-page";
import { StatCard } from "@/components/dashboard/stat-card";
import { GoalProgress } from "@/components/dashboard/goal-progress";
import { ChartCombo, MacroDonutChart } from "@/components/charts";
import { WorkoutRow } from "@/components/dashboard/workout-row";
import { HydrationTracker } from "@/components/dashboard/hydration-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dashboard",
};

const iconMap = {
  flame: Flame,
  clock: Clock,
  heart: Heart,
  activity: Activity,
} as const;

function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ workout?: string }>;
}) {
  const { user, displayName } = await getAuthContext();
  if (!user) redirect("/login");

  const params = await searchParams;
  const data = await getDashboardData(user.id);

  const now = new Date();
  const dateLabel = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const greeting = greetingForHour(now.getHours());

  return (
    <DashboardPageShell>
      {params.workout === "completed" ? (
        <p
          className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          role="status"
        >
          Workout logged successfully. Your dashboard stats have been updated.
        </p>
      ) : null}

      <DashboardSection className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {dateLabel}
          </p>
          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {greeting},{" "}
            <span className="text-gradient">{displayName}</span>
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
            {data.weeklyActivity.some((d) => d.calories > 0)
              ? "Your live activity data is shown below — log another workout anytime."
              : "Start a workout from the library to populate your weekly chart."}
          </p>
        </div>
        <Badge className="border-orange-500/40 bg-orange-500/15 px-3 py-1.5 text-xs font-semibold text-orange-400">
          {data.streakDays}-day streak
        </Badge>
      </DashboardSection>

      <DashboardSection delay={1} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {data.statCards.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            hint={stat.hint}
            trend={stat.trend}
            trendUp={stat.trendUp}
            icon={iconMap[stat.icon]}
            accent={stat.accent as "orange" | "blue" | "red" | "purple"}
          />
        ))}
      </DashboardSection>

      <DashboardSection delay={2} className="grid gap-4 lg:grid-cols-3">
        <Card className="card-hover-lift lg:col-span-2">
          <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 border-b border-border/30 p-4 pb-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">
                This week
              </p>
              <CardTitle className="mt-0.5 text-lg font-semibold">
                Activity overview
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Live data from completed workouts
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/dashboard/progress">
                Full analytics
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-3">
            <ChartCombo data={data.weeklyActivity} />
          </CardContent>
        </Card>

        <Card className="card-hover-lift">
          <CardHeader className="border-b border-border/30 p-4 pb-3">
            <CardTitle className="text-lg font-semibold">Today&apos;s targets</CardTitle>
            <p className="text-xs text-muted-foreground">Synced from your account</p>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pb-4 pt-4">
            {data.todayGoals.map((g) => (
              <GoalProgress
                key={g.label}
                label={g.label}
                current={g.current}
                target={g.target}
                color={g.color}
                unit={"unit" in g ? g.unit : undefined}
              />
            ))}
            <HydrationTracker
              filled={data.waterGlasses.filled}
              total={data.waterGlasses.total}
            />
          </CardContent>
        </Card>
      </DashboardSection>

      <DashboardSection delay={3} className="grid gap-4 lg:grid-cols-2">
        <Card className="card-hover-lift">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 p-4 pb-3">
            <div>
              <CardTitle className="text-lg font-semibold">Nutrition today</CardTitle>
              <p className="text-xs text-muted-foreground">Phase 4 will sync meals</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/nutrition">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-4">
            <MacroDonutChart
              slices={data.macroBreakdown}
              totalKcal={data.macroTotalKcal}
            />
          </CardContent>
        </Card>

        <Card className="card-hover-lift">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 p-4 pb-3">
            <div>
              <CardTitle className="text-lg font-semibold">Recent workouts</CardTitle>
              <p className="text-xs text-muted-foreground">From your session history</p>
            </div>
            <Button size="sm" variant="gradient" asChild>
              <Link href="/dashboard/workouts">Browse library</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-4 pt-4">
            {data.recentWorkouts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No completed workouts yet.{" "}
                <Link href="/dashboard/workouts" className="text-primary hover:underline">
                  Start your first session
                </Link>
                .
              </p>
            ) : (
              data.recentWorkouts.map((w) => (
                <WorkoutRow
                  key={w.id}
                  name={w.name}
                  when={w.when}
                  calories={w.calories}
                  image={w.image}
                  accent={w.accent}
                />
              ))
            )}
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardPageShell>
  );
}
