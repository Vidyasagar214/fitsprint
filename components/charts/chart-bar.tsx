"use client";

import { useMemo } from "react";
import { Bar, Chart } from "react-chartjs-2";
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
import type { ChartAccent, ChartPoint } from "@/components/charts/types";
import { cn } from "@/lib/utils";

type ChartBarProps = {
  data: ChartPoint[];
  accent?: ChartAccent;
  height?: number;
  unit?: string;
  showValues?: boolean;
  showTrendLine?: boolean;
  className?: string;
};

function barBackground(accent: ChartAccent) {
  return (context: ScriptableContext<"bar">) => {
    const { chart } = context;
    const { ctx, chartArea } = chart;
    if (!chartArea) return CHART_ACCENTS[accent].main;
    return createBarGradient(ctx, chartArea, accent);
  };
}

export function ChartBar({
  data,
  accent = "green",
  height = 200,
  unit = "",
  showValues = false,
  showTrendLine = false,
  className,
}: ChartBarProps) {
  const { colors, isDark } = useChartTheme();

  const labels = useMemo(() => data.map((d) => d.label), [data]);
  const values = useMemo(() => data.map((d) => d.value), [data]);

  const barOnlyData = useMemo<ChartData<"bar">>(
    () => ({
      labels,
      datasets: [
        {
          data: values,
          borderRadius: 6,
          borderSkipped: false,
          backgroundColor: barBackground(accent),
          hoverBackgroundColor: CHART_ACCENTS[accent].light,
        },
      ],
    }),
    [labels, values, accent],
  );

  const mixedData = useMemo<ChartData<"bar" | "line">>(
    () => ({
      labels,
      datasets: [
        {
          type: "bar",
          data: values,
          borderRadius: 6,
          borderSkipped: false,
          backgroundColor: barBackground(accent),
          hoverBackgroundColor: CHART_ACCENTS[accent].light,
        },
        {
          type: "line",
          data: values,
          borderColor: CHART_ACCENTS[accent].light,
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.35,
        },
      ],
    }),
    [labels, values, accent],
  );

  const options = useMemo(
    () =>
      ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        animation: CHART_ANIMATION,
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltipOptions(colors, isDark),
            callbacks: {
              label(ctx: { parsed: { y: number | null } }) {
                const value = ctx.parsed.y ?? 0;
                return `${value}${unit}`;
              },
            },
          },
        },
        scales: {
          x: categoryScale(colors),
          y: linearScale(colors, "left", unit),
        },
      }) as ChartOptions<"bar">,
    [colors, isDark, unit],
  );

  const mixedOptions = options as ChartOptions<"bar" | "line">;

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      {showTrendLine ? (
        <Chart type="bar" data={mixedData} options={mixedOptions} />
      ) : (
        <Bar data={barOnlyData} options={options} />
      )}
      {showValues ? (
        <p className="sr-only">
          {data.map((d) => `${d.label}: ${d.value}${unit}`).join(", ")}
        </p>
      ) : null}
    </div>
  );
}
