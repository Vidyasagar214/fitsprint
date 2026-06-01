"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import { getChartColors } from "@/components/charts/chart-theme";

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return useMemo(
    () => ({
      isDark,
      colors: getChartColors(isDark),
    }),
    [isDark],
  );
}
