type Slice = { name: string; pct: number; color: string };

type DonutChartProps = {
  slices: Slice[];
  size?: number;
  centerLabel?: string;
};

type DonutSegment = Slice & { dash: number; offset: number };

function buildDonutSegments(slices: Slice[], circumference: number): DonutSegment[] {
  const segments: DonutSegment[] = [];
  let offset = 0;
  for (const slice of slices) {
    const dash = (slice.pct / 100) * circumference;
    segments.push({ ...slice, dash, offset });
    offset += dash;
  }
  return segments;
}

export function DonutChart({
  slices,
  size = 160,
  centerLabel,
}: DonutChartProps) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const segments = buildDonutSegments(slices, c);

  return (
    <div className="donut-animate relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Distribution chart">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        {segments.map((segment) => (
          <circle
            key={segment.name}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={segment.color}
            strokeWidth="14"
            strokeDasharray={`${segment.dash} ${c - segment.dash}`}
            strokeDashoffset={-segment.offset}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        ))}
      </svg>
      {centerLabel ? (
        <span className="absolute text-center text-xs font-semibold text-muted-foreground">
          {centerLabel}
        </span>
      ) : null}
    </div>
  );
}
