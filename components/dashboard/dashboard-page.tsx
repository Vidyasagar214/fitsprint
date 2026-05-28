import { cn } from "@/lib/utils";

type DashboardPageProps = {
  children: React.ReactNode;
  className?: string;
};

/** Compact dashboard content wrapper with staggered entrance */
export function DashboardPage({ children, className }: DashboardPageProps) {
  return (
    <div className={cn("dashboard-page animate-fade-in-up", className)}>
      {children}
    </div>
  );
}

export function DashboardSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
}) {
  const delayClass =
    delay === 1
      ? "animate-fade-in-up-delay-1"
      : delay === 2
        ? "animate-fade-in-up-delay-2"
        : delay === 3
          ? "animate-fade-in-up-delay-3"
          : "";
  return (
    <section className={cn("dashboard-section", delayClass, className)}>
      {children}
    </section>
  );
}
