import { cn } from "@/lib/utils";

type GoalProgressProps = {
  label: string;
  current: number;
  target: number;
  color?: "orange" | "blue" | "green";
  unit?: string;
};

const barColors = {
  orange: "bg-gradient-to-r from-orange-500 to-orange-400",
  blue: "bg-gradient-to-r from-blue-500 to-blue-400",
  green: "bg-gradient-to-r from-green-500 to-green-400",
};

export function GoalProgress({
  label,
  current,
  target,
  color = "blue",
  unit = "",
}: GoalProgressProps) {
  const pct = Math.min(100, Math.round((current / target) * 100));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {current.toLocaleString()}
          {unit} / {target.toLocaleString()}
          {unit}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
        <div
          className={cn("h-full rounded-full transition-all", barColors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-right text-xs text-muted-foreground">{pct}%</p>
    </div>
  );
}
