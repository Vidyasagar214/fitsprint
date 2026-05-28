type BarPoint = { label: string; value: number };

type BarLineChartProps = {
  data: BarPoint[];
  height?: number;
  color?: string;
};

export function BarLineChart({
  data,
  height = 180,
  color = "var(--glow-blue)",
}: BarLineChartProps) {
  const width = 100;
  const pad = 10;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = (width - pad * 2) / data.length - 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="chart-animate h-full w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Bar chart"
    >
      {data.map((d, i) => {
        const h = ((d.value / max) * (height - pad * 2));
        const x = pad + i * (barW + 2);
        const y = height - pad - h;
        return (
          <rect
            key={d.label}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx="2"
            fill={color}
            opacity={0.85}
          />
        );
      })}
      <polyline
        fill="none"
        stroke="var(--glow-green)"
        strokeWidth="1.2"
        points={data
          .map((d, i) => {
            const x = pad + i * (barW + 2) + barW / 2;
            const y = height - pad - (d.value / max) * (height - pad * 2);
            return `${x},${y}`;
          })
          .join(" ")}
      />
    </svg>
  );
}
