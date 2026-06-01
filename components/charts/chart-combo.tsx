"use client";

import { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import "@/components/charts/register";
import {
  categoryScale,
  CHART_ACCENTS,
  CHART_ANIMATION,
  createBarGradient,
  linearScale,
  tooltipOptions,
} from "@/components/charts/chart-theme";
import { useChartTheme } from "@/components/charts/use-chart-theme";
import type { WeeklyActivityPoint } from "@/components/charts/types";
import { cn } from "@/lib/utils";

type ChartComboProps = {
  data: WeeklyActivityPoint[];
  height?: number;
  className?: string;
};

function calorieBarBackground(context: ScriptableContext<"bar">) {
  const { chart } = context;
  const { ctx, chartArea } = chart;
  if (!chartArea) return CHART_ACCENTS.blue.main;
  return createBarGradient(ctx, chartArea, "blue");
}

export function ChartCombo({ data, height = 220, className }: ChartComboProps) {
  const { colors, isDark } = useChartTheme();

  const chartData = useMemo<ChartData<"bar" | "line">>(() => {
    const labels = data.map((d) => d.day);

    return {
      labels,
      datasets: [
        {
          type: "bar" as const,
          label: "Calories",
          data: data.map((d) => d.calories),
          yAxisID: "y",
          borderRadius: 6,
          borderSkipped: false,
          backgroundColor: calorieBarBackground,
          hoverBackgroundColor: CHART_ACCENTS.blue.light,
        },
        {
          type: "line" as const,
          label: "Active minutes",
          data: data.map((d) => d.minutes),
          yAxisID: "y1",
          borderColor: CHART_ACCENTS.green.light,
          backgroundColor: "transparent",
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: CHART_ACCENTS.green.light,
          pointBorderColor: isDark ? "#060608" : "#ffffff",
          pointBorderWidth: 2,
          tension: 0.35,
        },
      ],
    };
  }, [data, isDark]);

  const options = useMemo(
    () =>
      ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        animation: CHART_ANIMATION,
        plugins: {
          legend: { display: false },
          tooltip: tooltipOptions(colors, isDark),
        },
        scales: {
          x: categoryScale(colors),
          y: linearScale(colors, "left"),
          y1: {
            ...linearScale(colors, "right", "", false),
            grid: { drawOnChartArea: false },
          },
        },
      }) as ChartOptions<"bar" | "line">,
    [colors, isDark],
  );

  const avgCal = Math.round(data.reduce((s, d) => s + d.calories, 0) / Math.max(data.length, 1));
  const avgMin = Math.round(data.reduce((s, d) => s + d.minutes, 0) / Math.max(data.length, 1));

  return (
    <div className={className}>
      <div className={cn("relative w-full")} style={{ height }}>
        <Chart type="bar" data={chartData} options={options} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3 text-xs">
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400" />
            Calories (left axis)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-4 rounded-full bg-green-400" />
            Active minutes (right axis)
          </span>
        </div>
        <p className="text-muted-foreground">
          Avg <span className="font-medium text-foreground">{avgCal.toLocaleString()} kcal</span>
          {" · "}
          <span className="font-medium text-foreground">{avgMin} min</span>/day
        </p>
      </div>
    </div>
  );
}
