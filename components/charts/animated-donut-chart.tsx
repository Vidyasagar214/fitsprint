"use client";

import { useEffect, useState } from "react";
import { DonutChart } from "@/components/charts/donut-chart";

type Slice = { name: string; pct: number; color: string };

type AnimatedDonutChartProps = {
  slices: Slice[];
  size?: number;
  centerLabel?: string;
};

export function AnimatedDonutChart(props: AnimatedDonutChartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.9)",
      }}
    >
      <DonutChart {...props} />
    </div>
  );
}
