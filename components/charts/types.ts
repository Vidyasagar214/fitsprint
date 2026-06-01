export type ChartPoint = { label: string; value: number };

export type ChartAccent = "blue" | "green" | "orange" | "purple";

export type PieSlice = {
  name: string;
  value: number;
  color: string;
  pct?: number;
};

export type WeeklyActivityPoint = {
  day: string;
  calories: number;
  minutes: number;
};

export type MacroSlice = {
  name: string;
  grams: number;
  color: string;
  pct: number;
};

/** Map percentage-based distribution rows to Chart.js pie slices. */
export function toPctPieSlices(
  items: ReadonlyArray<{ name: string; pct: number; color: string }>,
): PieSlice[] {
  return items.map((item) => ({
    name: item.name,
    value: item.pct,
    color: item.color,
    pct: item.pct,
  }));
}
