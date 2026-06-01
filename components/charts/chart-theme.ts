import type { ChartAccent } from "@/components/charts/types";

export const CHART_ACCENTS: Record<ChartAccent, { main: string; light: string }> = {
  blue: { main: "#3b82f6", light: "#60a5fa" },
  green: { main: "#22c55e", light: "#4ade80" },
  orange: { main: "#f97316", light: "#fb923c" },
  purple: { main: "#a855f7", light: "#c084fc" },
};

export type ChartThemeColors = {
  text: string;
  grid: string;
  tooltipBg: string;
  tooltipBorder: string;
  foreground: string;
};

export function getChartColors(isDark: boolean): ChartThemeColors {
  return {
    text: isDark ? "#94a3b8" : "#64748b",
    grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(15, 23, 42, 0.08)",
    tooltipBg: isDark ? "rgba(18, 18, 24, 0.96)" : "rgba(255, 255, 255, 0.96)",
    tooltipBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(15, 23, 42, 0.12)",
    foreground: isDark ? "#f1f5f9" : "#0c0c10",
  };
}

export function createBarGradient(
  ctx: CanvasRenderingContext2D,
  chartArea: { top: number; bottom: number },
  accent: ChartAccent,
): CanvasGradient {
  const { main, light } = CHART_ACCENTS[accent];
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, main);
  gradient.addColorStop(1, light);
  return gradient;
}

export function createAreaGradient(
  ctx: CanvasRenderingContext2D,
  chartArea: { top: number; bottom: number },
  hexColor: string,
): CanvasGradient {
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, hexToRgba(hexColor, 0.35));
  gradient.addColorStop(1, hexToRgba(hexColor, 0));
  return gradient;
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function accentFillGradient(
  ctx: CanvasRenderingContext2D,
  chartArea: { top: number; bottom: number },
  accent: ChartAccent,
): CanvasGradient {
  const { main } = CHART_ACCENTS[accent];
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, hexToRgba(main, 0.35));
  gradient.addColorStop(1, hexToRgba(main, 0));
  return gradient;
}

export const CHART_ANIMATION = {
  duration: 900,
  easing: "easeOutQuart" as const,
};

export function tooltipOptions(colors: ChartThemeColors, _isDark: boolean) {
  return {
    backgroundColor: colors.tooltipBg,
    borderColor: colors.tooltipBorder,
    borderWidth: 1,
    titleColor: colors.foreground,
    bodyColor: colors.text,
    padding: 10,
    cornerRadius: 8,
    displayColors: true,
    boxPadding: 4,
  };
}

type ScaleAxis = Record<string, unknown>;

export function linearScale(
  colors: ChartThemeColors,
  position: "left" | "right",
  unit?: string,
  drawGrid = true,
): ScaleAxis {
  return {
    type: "linear",
    position,
    beginAtZero: true,
    grid: {
      display: drawGrid,
      color: colors.grid,
      drawTicks: false,
    },
    border: { display: false },
    ticks: {
      color: colors.text,
      padding: 8,
      font: { size: 11 },
      callback(value: string | number) {
        const n = Number(value);
        if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k${unit ?? ""}`;
        return `${n}${unit ?? ""}`;
      },
    },
  };
}

export function categoryScale(colors: ChartThemeColors) {
  return {
    grid: { display: false },
    border: { display: false },
    ticks: {
      color: colors.text,
      padding: 8,
      font: { size: 11 },
      maxRotation: 0,
    },
  };
}
