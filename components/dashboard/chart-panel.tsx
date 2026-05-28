import { cn } from "@/lib/utils";

type ChartPanelProps = {
  children: React.ReactNode;
  className?: string;
};

/** Glass chart container with subtle gradient — specs/design/ui-ux.md */
export function ChartPanel({ children, className }: ChartPanelProps) {
  return (
    <div
      className={cn(
        "chart-panel relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.06] to-transparent p-3",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--glow-green)]/10 blur-3xl"
        aria-hidden
      />
      {children}
    </div>
  );
}
