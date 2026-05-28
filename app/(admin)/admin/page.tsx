import type { Metadata } from "next";
import {
  DollarSign,
  Users,
  CreditCard,
  TrendingDown,
  Clock,
  Ticket,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartPanel } from "@/components/dashboard/chart-panel";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { MediaThumb } from "@/components/dashboard/media-thumb";
import { Revenue3DChart } from "@/components/charts/revenue-3d-chart";
import { AnimatedDonutChart } from "@/components/charts/animated-donut-chart";
import { getAdminHeaderProps } from "@/lib/admin-page-props";
import {
  adminMetrics,
  revenueTrend,
  planDistribution,
  platformHealth,
  recentSignups,
  flaggedContent,
} from "@/lib/data/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin Overview",
};

const metricIcons = {
  dollar: DollarSign,
  users: Users,
  card: CreditCard,
  trend: TrendingDown,
  clock: Clock,
  ticket: Ticket,
};

export default async function AdminOverviewPage() {
  const header = await getAdminHeaderProps();
  const chartData = revenueTrend.map((r) => ({
    label: r.month,
    value: r.value,
  }));

  return (
    <>
      <AdminPageHeader title="Overview" {...header} />
      <AdminPageShell>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {adminMetrics.map((m, i) => {
            const accents = ["green", "blue", "blue", "orange", "purple", "red"] as const;
            return (
              <StatCard
                key={m.label}
                label={m.label}
                value={m.value}
                trend={m.trend}
                trendUp={m.up}
                icon={metricIcons[m.icon as keyof typeof metricIcons]}
                accent={accents[i % accents.length]}
              />
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="card-hover-lift lg:col-span-2">
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 p-4 pb-0">
              <div>
                <CardTitle className="text-base">Revenue Trend</CardTitle>
                <p className="metric-highlight mt-1">$138,200 this month</p>
              </div>
              <Button variant="outline" size="sm" type="button">
                Download
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <ChartPanel>
                <Revenue3DChart data={chartData} accent="green" />
              </ChartPanel>
            </CardContent>
          </Card>

          <Card className="card-hover-lift">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Plan Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4 pt-0">
              <div className="flex justify-center">
                <AnimatedDonutChart slices={planDistribution} size={140} />
              </div>
              <ul className="space-y-1.5 text-sm">
                {planDistribution.map((p) => (
                  <li key={p.name} className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </span>
                    <span className="font-semibold">{p.pct}%</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-1.5 border-t border-border/50 pt-3 text-xs">
                <p className="font-semibold uppercase tracking-wider text-muted-foreground">
                  Platform Health
                </p>
                {platformHealth.map((h) => (
                  <div key={h.label} className="flex justify-between">
                    <span className="text-muted-foreground">{h.label}</span>
                    <span
                      className={
                        h.status === "warn"
                          ? "text-red-400"
                          : h.status === "good"
                            ? "text-green-400"
                            : "text-blue-400"
                      }
                    >
                      {h.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="card-hover-lift">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-base">Recent Signups</CardTitle>
              <Button variant="outline" size="sm" type="button">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4 pt-0">
              {recentSignups.map((u) => (
                <div
                  key={u.email}
                  className="flex items-center gap-3 rounded-lg border border-border/40 bg-white/5 p-2.5"
                >
                  <UserAvatar src={u.avatar} name={u.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{u.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge variant={u.status === "Active" ? "success" : "warning"}>
                      {u.status}
                    </Badge>
                    {u.status === "Pending" ? (
                      <div className="flex gap-1">
                        <Button size="sm" variant="gradient" type="button" className="h-7 px-2 text-xs">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" type="button" className="h-7 px-2 text-xs">
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">{u.date}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-hover-lift">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-base">Flagged Content</CardTitle>
              <Badge variant="destructive">4 pending</Badge>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4 pt-0">
              {flaggedContent.map((f) => (
                <div
                  key={f.user}
                  className="flex gap-3 rounded-lg border border-border/40 bg-white/5 p-2.5"
                >
                  <MediaThumb src={f.thumb} alt={f.user} aspect="square" className="h-14 w-20 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{f.user}</p>
                    <p className="text-xs text-muted-foreground">{f.reason}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          f.priority === "HIGH"
                            ? "destructive"
                            : f.priority === "MEDIUM"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {f.priority}
                      </Badge>
                      <Button size="sm" variant="outline" type="button" className="h-7 text-xs">
                        Review
                      </Button>
                      <Button size="sm" variant="destructive" type="button" className="h-7 text-xs">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </AdminPageShell>
    </>
  );
}
