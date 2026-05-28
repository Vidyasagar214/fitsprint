import type { Metadata } from "next";
import { macroBreakdown, nutritionMeals, todayGoals } from "@/lib/data/user-dashboard";
import { DashboardPage, DashboardSection } from "@/components/dashboard/dashboard-page";
import { PageHeader } from "@/components/dashboard/page-header";
import { MacroDonutChart } from "@/components/charts/macro-donut-chart";
import { GoalProgress } from "@/components/dashboard/goal-progress";
import { MediaThumb } from "@/components/dashboard/media-thumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nutrition",
};

const mealTotalKcal = nutritionMeals.reduce((s, m) => s + m.kcal, 0);
const mealTotalProtein = nutritionMeals.reduce((s, m) => s + m.protein, 0);

export default function NutritionPage() {
  return (
    <DashboardPage>
      <DashboardSection>
        <PageHeader
          kicker="// FUEL TRACKING"
          title="Nutrition"
          description="Log meals, balance macros, and stay aligned with your daily calorie and protein targets."
          action={
            <Button variant="gradient" size="sm" type="button">
              Log meal
            </Button>
          }
        />
      </DashboardSection>

      <DashboardSection delay={1} className="grid gap-3 sm:grid-cols-3">
        <Card className="card-hover-lift">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Logged today</p>
            <p className="font-display mt-1 text-2xl font-bold">{mealTotalKcal.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">kcal from meals</p>
          </CardContent>
        </Card>
        <Card className="card-hover-lift">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Protein</p>
            <p className="font-display mt-1 text-2xl font-bold">{mealTotalProtein}g</p>
            <p className="text-xs text-muted-foreground">from logged meals</p>
          </CardContent>
        </Card>
        <Card className="card-hover-lift">
          <CardContent className="space-y-3 p-4">
            <GoalProgress
              label="Daily calories"
              current={todayGoals[0].current}
              target={todayGoals[0].target}
              color="orange"
            />
          </CardContent>
        </Card>
      </DashboardSection>

      <DashboardSection delay={2} className="grid gap-4 lg:grid-cols-3">
        <Card className="card-hover-lift lg:col-span-1">
          <CardHeader className="border-b border-border/30 p-4 pb-3">
            <CardTitle className="text-base font-semibold">Macro breakdown</CardTitle>
            <p className="text-xs text-muted-foreground">Share of today&apos;s intake</p>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-4">
            <MacroDonutChart slices={macroBreakdown} totalKcal={1840} />
            <Button variant="outline" size="sm" className="mt-4 w-full" type="button">
              Edit macro targets
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover-lift lg:col-span-2">
          <CardHeader className="border-b border-border/30 p-4 pb-3">
            <CardTitle className="text-base font-semibold">Today&apos;s meals</CardTitle>
            <p className="text-xs text-muted-foreground">
              Tap Edit to adjust portions or swap items
            </p>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-4 pt-4">
            {nutritionMeals.map((meal) => (
              <div
                key={meal.meal}
                className="flex gap-3 rounded-xl border border-border/40 bg-white/[0.03] p-3 transition-colors hover:border-primary/25 hover:bg-white/[0.05]"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                  <MediaThumb
                    src={meal.thumb}
                    alt={meal.meal}
                    aspect="wide"
                    className="h-full w-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{meal.meal}</p>
                  <p className="text-sm text-muted-foreground">{meal.items}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-center gap-0.5 text-sm">
                  <span className="font-bold text-orange-400">{meal.kcal} kcal</span>
                  <span className="text-xs text-primary">{meal.protein}g protein</span>
                  <Button variant="ghost" size="sm" type="button" className="mt-1 h-7 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardPage>
  );
}
