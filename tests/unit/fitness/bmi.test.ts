import { describe, expect, it } from "vitest";
import { calculateBmi } from "@/lib/fitness/bmi";

describe("calculateBmi", () => {
  it("returns null for non-positive weight or height", () => {
    expect(calculateBmi(0, 180)).toBeNull();
    expect(calculateBmi(70, 0)).toBeNull();
    expect(calculateBmi(-1, 180)).toBeNull();
  });

  it("computes BMI rounded to one decimal", () => {
    // 70 kg, 175 cm → ~22.9
    expect(calculateBmi(70, 175)).toBe(22.9);
  });

  it("handles typical athletic inputs", () => {
    expect(calculateBmi(80, 180)).toBe(24.7);
  });
});
