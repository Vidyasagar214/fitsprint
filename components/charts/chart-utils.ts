/** Nice round axis ticks for charts */
export function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0];
  const rough = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / mag;
  let niceNorm = 1;
  if (norm > 5) niceNorm = 10;
  else if (norm > 2) niceNorm = 5;
  else if (norm > 1) niceNorm = 2;
  const step = niceNorm * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step * 0.01; v += step) {
    ticks.push(Math.round(v));
  }
  return ticks.length > 6 ? ticks.filter((_, i) => i % 2 === 0) : ticks;
}

export function formatAxisValue(n: number, unit?: string): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k${unit ?? ""}`;
  return `${n}${unit ?? ""}`;
}
