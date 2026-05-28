"use client";

import { useEffect, useState } from "react";

export type MacroSlice = {
  name: string;
  grams: number;
  color: string;
  pct: number;
};

type MacroDonutChartProps = {
  slices: MacroSlice[];
  totalKcal?: number;
  size?: number;
};

export function MacroDonutChart({
  slices,
  totalKcal = 1840,
  size = 168,
}: MacroDonutChartProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const r = 38;
  const c = 2 * Math.PI * r;
  const segments = slices.reduce<
    Array<MacroSlice & { dash: number; offset: number }>
  >((acc, slice) => {
    const dash = (slice.pct / 100) * c;
    const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    acc.push({ ...slice, dash, offset });
    return acc;
  }, []);

  const cx = 50;
  const cy = 50;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          role="img"
          aria-label="Macro nutrient breakdown"
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="12"
          />
          {segments.map((seg, i) => (
            <circle
              key={seg.name}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={`${ready ? seg.dash : 0} ${c - seg.dash}`}
              strokeDashoffset={-seg.offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ transitionDelay: `${i * 120}ms` }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Total
          </span>
          <span className="font-display text-lg font-bold leading-tight">
            {totalKcal.toLocaleString()}
          </span>
          <span className="text-[10px] text-muted-foreground">kcal</span>
        </div>
      </div>

      <ul className="w-full min-w-[160px] space-y-3">
        {slices.map((s) => (
          <li key={s.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2.5">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-medium">{s.name}</span>
            </span>
            <span className="text-muted-foreground">
              {s.grams}g <span className="text-foreground/80">({s.pct}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
