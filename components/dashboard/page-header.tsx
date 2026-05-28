import type { ReactNode } from "react";
import { SectionLabel } from "@/components/dashboard/section-label";

type PageHeaderProps = {
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ kicker, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <SectionLabel text={kicker} />
        <h1 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
