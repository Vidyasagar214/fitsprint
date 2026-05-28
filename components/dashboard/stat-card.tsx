import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  accent?: "blue" | "green" | "orange" | "purple" | "red";
};

const accentMap = {
  blue: "from-blue-500/20 text-blue-400",
  green: "from-green-500/20 text-green-400",
  orange: "from-orange-500/20 text-orange-400",
  purple: "from-purple-500/20 text-purple-400",
  red: "from-red-500/20 text-red-400",
};

export function StatCard({
  label,
  value,
  hint,
  trend,
  trendUp = true,
  icon: Icon,
  accent = "blue",
}: StatCardProps) {
  return (
    <div className="glass-card card-hover-lift rounded-xl p-4">
      <div className="flex items-start justify-between gap-2">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br to-transparent",
            accentMap[accent],
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        {trend ? (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-semibold",
              trendUp
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400",
            )}
          >
            {trend}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="font-display animate-count-up mt-0.5 text-xl font-bold tracking-tight">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
