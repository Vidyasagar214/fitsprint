"use client";

import { useMemo } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import "@/components/charts/register";
import { CHART_ANIMATION, tooltipOptions } from "@/components/charts/chart-theme";
import { useChartTheme } from "@/components/charts/use-chart-theme";
import type { PieSlice } from "@/components/charts/types";
import { cn } from "@/lib/utils";

type ChartPieProps = {
  slices: PieSlice[];
  variant?: "pie" | "doughnut";
  size?: number;
  centerContent?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function ChartPie({
  slices,
  variant = "doughnut",
  size = 160,
  centerContent,
  className,
  ariaLabel = "Distribution chart",
}: ChartPieProps) {
  const { colors, isDark } = useChartTheme();

  const chartData = useMemo(
    () => ({
      labels: slices.map((s) => s.name),
      datasets: [
        {
          data: slices.map((s) => s.value),
          backgroundColor: slices.map((s) => s.color),
          borderColor: isDark ? "rgba(6, 6, 8, 0.85)" : "rgba(255, 255, 255, 0.9)",
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    }),
    [slices, isDark],
  );

  const plugins = useMemo(
    () => ({
      legend: { display: false },
      tooltip: {
        ...tooltipOptions(colors, isDark),
        callbacks: {
          label(ctx: { dataIndex: number; parsed: number }) {
            const slice = slices[ctx.dataIndex];
            if (slice.pct != null) return `${slice.name}: ${slice.pct}%`;
            return `${slice.name}: ${ctx.parsed}`;
          },
        },
      },
    }),
    [colors, isDark, slices],
  );

  const doughnutOptions = useMemo(
    () =>
      ({
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        animation: CHART_ANIMATION,
        plugins,
      }) as ChartOptions<"doughnut">,
    [plugins],
  );

  const pieOptions = useMemo(
    () =>
      ({
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        plugins,
      }) as ChartOptions<"pie">,
    [plugins],
  );

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      {variant === "pie" ? (
        <Pie data={chartData as ChartData<"pie">} options={pieOptions} />
      ) : (
        <Doughnut data={chartData as ChartData<"doughnut">} options={doughnutOptions} />
      )}
      {centerContent ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerContent}
        </div>
      ) : null}
    </div>
  );
}
