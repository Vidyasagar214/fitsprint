import { createClient } from "@/lib/supabase/server";
import { getWeeklyActivity } from "@/lib/db/dashboard";
import type { ProgressMetricRow } from "@/lib/db/types";

export async function getProgressMetrics(
  userId: string,
): Promise<ProgressMetricRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("progress_metrics")
    .select("id, metric_key, label, value, change_summary, period_label, recorded_at")
    .eq("user_id", userId)
    .order("recorded_at", { ascending: false })
    .limit(10);

  return (data as ProgressMetricRow[]) ?? [];
}

export async function getProgressPageData(userId: string) {
  const weeklyActivity = await getWeeklyActivity(userId);
  const metrics = await getProgressMetrics(userId);

  const weeklyCalorieTrend = weeklyActivity.map((d) => ({
    label: d.day,
    value: d.calories,
  }));

  const defaultMetrics =
    metrics.length > 0
      ? metrics.slice(0, 3).map((m) => ({
          label: m.label,
          value: m.value,
          change: m.change_summary ?? "—",
          period: m.period_label ?? "",
        }))
      : [];

  return { weeklyActivity, weeklyCalorieTrend, metrics: defaultMetrics };
}
