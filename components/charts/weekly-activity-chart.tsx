"use client";

import { useEffect, useId, useState } from "react";
import { niceTicks, formatAxisValue } from "@/components/charts/chart-utils";

export type WeeklyActivityPoint = {
  day: string;
  calories: number;
  minutes: number;
};

type WeeklyActivityChartProps = {
  data: WeeklyActivityPoint[];
  className?: string;
};

export function WeeklyActivityChart({ data, className }: WeeklyActivityChartProps) {
  const [ready, setReady] = useState(false);
  const gradientId = useId().replace(/:/g, "");

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const maxCal = Math.max(...data.map((d) => d.calories), 1);
  const maxMin = Math.max(...data.map((d) => d.minutes), 1);
  const calTicks = niceTicks(maxCal, 4);
  const calMax = calTicks[calTicks.length - 1] ?? maxCal;
  const minTicks = niceTicks(maxMin, 4);
  const minMax = minTicks[minTicks.length - 1] ?? maxMin;

  const W = 100;
  const H = 100;
  const padL = 14;
  const padR = 14;
  const padT = 8;
  const padB = 16;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const n = data.length;
  const barGap = chartW / n;
  const barW = barGap * 0.45;

  const toYCal = (v: number) => padT + chartH - (v / calMax) * chartH;
  const toYMin = (v: number) => padT + chartH - (v / minMax) * chartH;

  const linePoints = data
    .map((d, i) => {
      const x = padL + i * barGap + barGap / 2;
      const y = toYMin(d.minutes);
      return `${x},${y}`;
    })
    .join(" ");

  const avgCal = Math.round(data.reduce((s, d) => s + d.calories, 0) / n);
  const avgMin = Math.round(data.reduce((s, d) => s + d.minutes, 0) / n);

  return (
    <div className={className}>
      <div className="relative h-[220px] w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          role="img"
          aria-label="Weekly calories and active minutes chart"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`calGrad-${gradientId}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {calTicks.map((tick) => {
            const y = toYCal(tick);
            return (
              <g key={`grid-${tick}`}>
                <line
                  x1={padL}
                  y1={y}
                  x2={W - padR}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.08"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}

          {/* Left Y-axis labels (calories) */}
          {calTicks.map((tick) => (
            <text
              key={`cal-label-${tick}`}
              x={padL - 1}
              y={toYCal(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[3px] sm:text-[3.5px]"
              style={{ fontSize: "3.5px" }}
            >
              {formatAxisValue(tick)}
            </text>
          ))}

          {/* Right Y-axis labels (minutes) */}
          {minTicks.map((tick) => (
            <text
              key={`min-label-${tick}`}
              x={W - padR + 1}
              y={toYMin(tick)}
              textAnchor="start"
              dominantBaseline="middle"
              className="fill-muted-foreground"
              style={{ fontSize: "3.5px" }}
            >
              {tick}
            </text>
          ))}

          {/* Calorie bars */}
          {data.map((d, i) => {
            const x = padL + i * barGap + (barGap - barW) / 2;
            const y = toYCal(d.calories);
            const h = padT + chartH - y;
            return (
              <rect
                key={`bar-${d.day}`}
                x={x}
                y={ready ? y : padT + chartH}
                width={barW}
                height={ready ? h : 0}
                rx={1.2}
                fill={`url(#calGrad-${gradientId})`}
                className="transition-all duration-700 ease-out"
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            );
          })}

          {/* Minutes line */}
          <polyline
            fill="none"
            stroke="#4ade80"
            strokeWidth="0.9"
            points={linePoints}
            className={ready ? "chart-trend-line" : "opacity-0"}
            vectorEffect="non-scaling-stroke"
          />

          {/* Minute dots */}
          {data.map((d, i) => {
            const cx = padL + i * barGap + barGap / 2;
            const cy = toYMin(d.minutes);
            return (
              <circle
                key={`dot-${d.day}`}
                cx={cx}
                cy={cy}
                r={ready ? 1.4 : 0}
                fill="#4ade80"
                stroke="#060608"
                strokeWidth="0.4"
                className="transition-all duration-500"
                style={{ transitionDelay: `${300 + i * 50}ms` }}
              />
            );
          })}

          {/* X labels */}
          {data.map((d, i) => {
            const x = padL + i * barGap + barGap / 2;
            return (
              <text
                key={`x-${d.day}`}
                x={x}
                y={H - 4}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: "3.8px" }}
              >
                {d.day}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3 text-xs">
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400" />
            Calories (left axis)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-4 rounded-full bg-green-400" />
            Active minutes (line)
          </span>
        </div>
        <p className="text-muted-foreground">
          Avg <span className="font-medium text-foreground">{avgCal.toLocaleString()} kcal</span>
          {" · "}
          <span className="font-medium text-foreground">{avgMin} min</span>/day
        </p>
      </div>
    </div>
  );
}
