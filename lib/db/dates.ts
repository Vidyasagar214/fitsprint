/** Local calendar date as YYYY-MM-DD for Postgres `date` columns */
export function todayDateString(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function dayLabelForDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`);
  return DAY_LABELS[d.getDay()];
}

export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push(todayDateString(d));
  }
  return out;
}

export function formatRelativeSessionDate(iso: string): string {
  const started = new Date(iso);
  const now = new Date();
  const startDay = todayDateString(started);
  const today = todayDateString(now);

  if (startDay === today) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (startDay === todayDateString(yesterday)) return "Yesterday";

  const diffDays = Math.floor(
    (now.getTime() - started.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays < 7) return `${diffDays} days ago`;

  return started.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
