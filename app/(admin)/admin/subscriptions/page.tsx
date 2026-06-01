import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { ChartPanel } from "@/components/dashboard/chart-panel";
import { ChartBar, ChartPie, toPctPieSlices } from "@/components/charts";
import { getAdminHeaderProps } from "@/lib/admin-page-props";
import { subscriptionRows, planDistribution } from "@/lib/data/admin-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Subscription Analytics" };

export default async function AdminSubscriptionsPage() {
  const header = await getAdminHeaderProps();
  const barData = subscriptionRows.map((r, i) => ({
    label: r.plan,
    value: 60 + i * 25,
  }));

  return (
    <>
      <AdminPageHeader title="Subscription Analytics" {...header} />
      <AdminPageShell>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="card-hover-lift lg:col-span-2">
            <CardHeader className="flex flex-row justify-between p-4 pb-2">
              <CardTitle className="text-base">MRR by plan</CardTitle>
              <Button variant="outline" size="sm" type="button">
                Adjust pricing
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ChartPanel>
                <ChartBar data={barData} accent="blue" showTrendLine height={208} />
              </ChartPanel>
              <div className="mt-3 space-y-2">
                {subscriptionRows.map((row) => (
                  <div
                    key={row.plan}
                    className="grid grid-cols-2 gap-2 rounded-lg bg-white/5 p-2 text-xs sm:grid-cols-4"
                  >
                    <span className="font-semibold">{row.plan}</span>
                    <span>{row.mrr}</span>
                    <span className="text-muted-foreground">{row.subs} subs</span>
                    <span className="text-orange-400">Churn {row.churn}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover-lift">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Plan mix</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-4 pt-0">
              <ChartPie slices={toPctPieSlices(planDistribution)} size={150} />
            </CardContent>
          </Card>
        </div>
      </AdminPageShell>
    </>
  );
}
