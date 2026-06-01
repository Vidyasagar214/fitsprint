import { describe, expect, it } from "vitest";
import { CHART_ACCENTS, getChartColors } from "@/components/charts/chart-theme";

describe("getChartColors", () => {
  it("returns light theme tokens when not dark", () => {
    const colors = getChartColors(false);
    expect(colors.foreground).toBe("#0c0c10");
    expect(colors.grid).toContain("15, 23, 42");
  });

  it("returns dark theme tokens when dark", () => {
    const colors = getChartColors(true);
    expect(colors.foreground).toBe("#f1f5f9");
    expect(colors.grid).toContain("255,255,255");
  });
});

describe("CHART_ACCENTS", () => {
  it("defines main and light color for each accent", () => {
    for (const accent of ["blue", "green", "orange", "purple"] as const) {
      expect(CHART_ACCENTS[accent].main).toMatch(/^#/);
      expect(CHART_ACCENTS[accent].light).toMatch(/^#/);
    }
  });
});
