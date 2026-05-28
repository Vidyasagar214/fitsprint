"use client";

import { useEffect, useState } from "react";

export type ChartPoint = { label: string; value: number };

type Revenue3DChartProps = {
  data: ChartPoint[];
  accent?: "green" | "blue";
  className?: string;
};

export function Revenue3DChart({
  data,
  accent = "green",
  className,
}: Revenue3DChartProps) {
  const [ready, setReady] = useState(false);
  const max = Math.max(...data.map((d) => d.value), 1);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const barClass =
    accent === "green"
      ? "chart-bar-3d-green"
      : "chart-bar-3d-blue";

  const points = data.map((d, i) => {
    const pct = (d.value / max) * 100;
    const x = ((i + 0.5) / data.length) * 100;
    return { x, y: 100 - pct * 0.85 - 8 };
  });
  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className={className}>
      <div className="chart-3d-stage relative h-44 sm:h-52">
        <div className="chart-floor-glow pointer-events-none absolute inset-x-4 bottom-2 h-16 rounded-full" />
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <polyline
            fill="none"
            stroke={accent === "green" ? "#4ade80" : "#60a5fa"}
            strokeWidth="0.8"
            points={linePoints}
            className={ready ? "chart-trend-line" : "opacity-0"}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="relative z-[1] flex h-full items-end justify-between gap-0.5 px-1 pb-5 pt-2">
          {data.map((d, i) => {
            const heightPct = (d.value / max) * 100;
            return (
              <div
                key={d.label}
                className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1"
              >
                <div
                  className={`${barClass} w-[85%] max-w-7 rounded-t-full`}
                  style={{
                    height: ready ? `${heightPct}%` : "0%",
                    transitionDelay: `${i * 55}ms`,
                  }}
                  title={`${d.label}: ${d.value}`}
                />
                <span className="truncate text-[9px] font-medium text-muted-foreground sm:text-[10px]">
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
