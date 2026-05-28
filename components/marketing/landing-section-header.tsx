import { SectionLabel } from "@/components/dashboard/section-label";
import { cn } from "@/lib/utils";

type LandingSectionHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function LandingSectionHeader({
  kicker,
  title,
  description,
  align = "center",
  className,
}: LandingSectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <SectionLabel text={kicker} />
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
