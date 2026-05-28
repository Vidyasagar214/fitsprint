"use client";

import { useEffect, useId, useState } from "react";
import { niceTicks, formatAxisValue } from "@/components/charts/chart-utils";

export type BarPoint = { label: string; value: number };

type SimpleBarChartProps = {
  data: BarPoint[];
  unit?: string;
  color?: string;
  accent?: "blue" | "green" | "orange";
  showValues?: boolean;
  className?: string;
};

const accentColors = {
  blue: { from: "#3b82f6", to: "#60a5fa" },
  green: { from: "#22c55e", to: "#4ade80" },
  orange: { from: "#f97316", to: "#fb923c" },
};

export function SimpleBarChart({
  data,
  unit = "",
  accent = "green",
  showValues = true,
  className,
}: SimpleBarChartProps) {
  const [ready, setReady] = useState(false);
  const gradId = useId().replace(/:/g, "");
  const colors = accentColors[accent];

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const ticks = niceTicks(maxVal, 4);
  const yMax = ticks[ticks.length - 1] ?? maxVal;

  const W = 100;
  const H = 100;
  const padL = 12;
  const padR = 4;
  const padT = 6;
  const padB = 14;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = data.length;
  const gap = chartW / n;
  const barW = gap * 0.5;

  const toY = (v: number) => padT + chartH - (v / yMax) * chartH;

  return (
    <div className={className}>
      <div className="relative h-[200px] w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`barGrad-${gradId}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
          </defs>

          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={padL}
                y1={toY(tick)}
                x2={W - padR}
                y2={toY(tick)}
                stroke="currentColor"
                strokeOpacity="0.08"
              />
              <text
                x={padL - 0.5}
                y={toY(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground"
                style={{ fontSize: "3.5px" }}
              >
                {formatAxisValue(tick, unit)}
              </text>
            </g>
          ))}

          {data.map((d, i) => {
            const x = padL + i * gap + (gap - barW) / 2;
            const y = toY(d.value);
            const h = padT + chartH - y;
            const cx = x + barW / 2;
            return (
              <g key={d.label}>
                <rect
                  x={x}
                  y={ready ? y : padT + chartH}
                  width={barW}
                  height={ready ? h : 0}
                  rx={1}
                  fill={`url(#barGrad-${gradId})`}
                  className="transition-all duration-700 ease-out"
                  style={{ transitionDelay: `${i * 55}ms` }}
                />
                {showValues && ready ? (
                  <text
                    x={cx}
                    y={y - 1.5}
                    textAnchor="middle"
                    className="fill-foreground font-medium"
                    style={{ fontSize: "3.2px" }}
                  >
                    {d.value}
                  </text>
                ) : null}
                <text
                  x={cx}
                  y={H - 3}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ fontSize: "3.5px" }}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
