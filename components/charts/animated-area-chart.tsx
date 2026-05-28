"use client";

import { useEffect, useState } from "react";
import { AreaTrendChart } from "@/components/charts/area-trend-chart";

type Point = { label: string; value: number; value2?: number };

type AnimatedAreaChartProps = {
  data: Point[];
  showSecondSeries?: boolean;
  height?: number;
};

export function AnimatedAreaChart(props: AnimatedAreaChartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className="transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <AreaTrendChart {...props} />
    </div>
  );
}
