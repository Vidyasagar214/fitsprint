"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import "@/components/charts/register";
import {
  accentFillGradient,
  categoryScale,
  CHART_ACCENTS,
  CHART_ANIMATION,
  linearScale,
  tooltipOptions,
} from "@/components/charts/chart-theme";
import { useChartTheme } from "@/components/charts/use-chart-theme";
import type { ChartAccent, ChartPoint } from "@/components/charts/types";
import { cn } from "@/lib/utils";

type ChartLineProps = {
  data: ChartPoint[];
  data2?: ChartPoint[];
  accent?: ChartAccent;
  accent2?: ChartAccent;
  height?: number;
  fill?: boolean;
  showSecondSeries?: boolean;
  className?: string;
};

function areaBackground(accent: ChartAccent, fill: boolean) {
  return (context: ScriptableContext<"line">) => {
    if (!fill) return "transparent";
    const { chart } = context;
    const { ctx, chartArea } = chart;
    if (!chartArea) return CHART_ACCENTS[accent].main;
    return accentFillGradient(ctx, chartArea, accent);
  };
}

export function ChartLine({
  data,
  data2,
  accent = "green",
  accent2 = "blue",
  height = 200,
  fill = true,
  showSecondSeries = false,
  className,
}: ChartLineProps) {
  const { colors, isDark } = useChartTheme();

  const chartData = useMemo<ChartData<"line">>(() => {
    const labels = data.map((d) => d.label);

    const datasets: ChartData<"line">["datasets"] = [
      {
        label: "Primary",
        data: data.map((d) => d.value),
        borderColor: CHART_ACCENTS[accent].light,
        backgroundColor: areaBackground(accent, fill),
        borderWidth: 2,
        fill,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: CHART_ACCENTS[accent].light,
      },
    ];

    if (showSecondSeries && data2) {
      datasets.push({
        label: "Secondary",
        data: data2.map((d) => d.value),
        borderColor: CHART_ACCENTS[accent2].light,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderDash: [4, 4],
        fill: false,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: CHART_ACCENTS[accent2].light,
      });
    }

    return { labels, datasets };
  }, [data, data2, accent, accent2, fill, showSecondSeries]);

  const options = useMemo(
    () =>
      ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        animation: CHART_ANIMATION,
        plugins: {
          legend: { display: showSecondSeries },
          tooltip: tooltipOptions(colors, isDark),
        },
        scales: {
          x: categoryScale(colors),
          y: linearScale(colors, "left"),
        },
      }) as ChartOptions<"line">,
    [colors, isDark, showSecondSeries],
  );

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
