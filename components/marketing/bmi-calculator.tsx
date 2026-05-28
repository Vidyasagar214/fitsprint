"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function getCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" };
  if (bmi < 25) return { label: "Normal", color: "text-green-400" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-400" };
  return { label: "Obese", color: "text-red-400" };
}

export function BmiCalculator() {
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("72");
  const [showResult, setShowResult] = useState(false);

  const bmi = useMemo(() => {
    const h = parseFloat(heightCm) / 100;
    const w = parseFloat(weightKg);
    if (!h || !w || h <= 0 || w <= 0) return null;
    return w / (h * h);
  }, [heightCm, weightKg]);

  const category = bmi ? getCategory(bmi) : null;

  return (
    <div className="glass-card card-hover-lift mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/10">
      <div className="border-b border-border/50 bg-gradient-to-r from-primary/10 via-green-500/10 to-orange-500/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Calculator className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="font-display font-bold">BMI Calculator</h3>
            <p className="text-xs text-muted-foreground">Instant body mass index estimate</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              min={100}
              max={250}
              value={heightCm}
              onChange={(e) => {
                setHeightCm(e.target.value);
                setShowResult(false);
              }}
              className="auth-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min={30}
              max={300}
              value={weightKg}
              onChange={(e) => {
                setWeightKg(e.target.value);
                setShowResult(false);
              }}
              className="auth-input"
            />
          </div>
        </div>
        <Button
          type="button"
          variant="gradient"
          className="w-full"
          onClick={() => setShowResult(true)}
        >
          Calculate BMI
        </Button>
        {showResult && bmi && category ? (
          <div
            className={cn(
              "animate-fade-in-up rounded-xl border border-border/50 bg-white/5 p-5 text-center",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your BMI
            </p>
            <p className="font-display mt-1 text-4xl font-bold text-gradient">
              {bmi.toFixed(1)}
            </p>
            <p className={cn("mt-2 text-sm font-semibold", category.color)}>
              {category.label}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              For athletes, BMI is a guide only—body composition matters more.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
