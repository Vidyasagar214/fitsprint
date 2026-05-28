"use client";

type Point = { label: string; value: number; value2?: number };

type AreaTrendChartProps = {
  data: Point[];
  height?: number;
  showSecondSeries?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
};

export function AreaTrendChart({
  data,
  height = 200,
  showSecondSeries = false,
  primaryColor = "var(--glow-green)",
  secondaryColor = "var(--glow-blue)",
}: AreaTrendChartProps) {
  const width = 100;
  const pad = 8;
  const maxVal = Math.max(
    ...data.flatMap((d) => [d.value, d.value2 ?? 0]),
    1,
  );

  const toY = (v: number) => height - pad - ((v / maxVal) * (height - pad * 2));
  const step = (width - pad * 2) / Math.max(data.length - 1, 1);

  const linePath = (key: "value" | "value2") =>
    data
      .map((d, i) => {
        const x = pad + i * step;
        const y = toY(key === "value" ? d.value : (d.value2 ?? 0));
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const areaPath = (key: "value" | "value2") => {
    const line = linePath(key);
    const lastX = pad + (data.length - 1) * step;
    return `${line} L ${lastX} ${height - pad} L ${pad} ${height - pad} Z`;
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="chart-animate h-full w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Trend chart"
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath("value")} fill="url(#areaFill)" />
      <path
        d={linePath("value")}
        fill="none"
        stroke={primaryColor}
        strokeWidth="1.5"
        className="chart-path-draw"
        vectorEffect="non-scaling-stroke"
      />
      {showSecondSeries ? (
        <path
          d={linePath("value2")}
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1.2"
          style={{ animation: "chart-fade-in 0.8s ease-out 0.3s both" }}
          strokeDasharray="3 2"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </svg>
  );
}
