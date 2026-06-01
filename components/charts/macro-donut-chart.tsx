"use client";

import { ChartPie } from "@/components/charts/chart-pie";
import type { MacroSlice } from "@/components/charts/types";

export type { MacroSlice };

type MacroDonutChartProps = {
  slices: MacroSlice[];
  totalKcal?: number;
  size?: number;
};

export function MacroDonutChart({
  slices,
  totalKcal = 1840,
  size = 168,
}: MacroDonutChartProps) {
  const pieSlices = slices.map((s) => ({
    name: s.name,
    value: s.pct,
    color: s.color,
    pct: s.pct,
  }));

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      <ChartPie
        slices={pieSlices}
        variant="doughnut"
        size={size}
        ariaLabel="Macro nutrient breakdown"
        centerContent={
          <>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Total
            </span>
            <span className="font-display text-lg font-bold leading-tight">
              {totalKcal.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground">kcal</span>
          </>
        }
      />

      <ul className="w-full min-w-[160px] space-y-3">
        {slices.map((s) => (
          <li key={s.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2.5">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-medium">{s.name}</span>
            </span>
            <span className="text-muted-foreground">
              {s.grams}g <span className="text-foreground/80">({s.pct}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
