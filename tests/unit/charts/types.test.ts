import { describe, expect, it } from "vitest";
import { toPctPieSlices } from "@/components/charts/types";

describe("toPctPieSlices", () => {
  it("maps plan distribution rows to Chart.js pie slices", () => {
    const input = [
      { name: "Pro", pct: 58, color: "#3b82f6" },
      { name: "Starter", pct: 18, color: "#22d3ee" },
    ];

    expect(toPctPieSlices(input)).toEqual([
      { name: "Pro", value: 58, color: "#3b82f6", pct: 58 },
      { name: "Starter", value: 18, color: "#22d3ee", pct: 18 },
    ]);
  });

  it("returns empty array for empty input", () => {
    expect(toPctPieSlices([])).toEqual([]);
  });
});
