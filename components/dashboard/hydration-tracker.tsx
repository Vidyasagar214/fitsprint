"use client";

import { useTransition } from "react";
import { logWaterGlass } from "@/lib/actions/dashboard";
import { Button } from "@/components/ui/button";

type HydrationTrackerProps = {
  filled: number;
  total: number;
};

export function HydrationTracker({ filled, total }: HydrationTrackerProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border border-border/40 bg-white/[0.03] p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">Hydration</p>
        <p className="text-xs text-muted-foreground">
          {filled} of {total} glasses
        </p>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={
              i < filled
                ? "h-7 flex-1 rounded-md bg-gradient-to-b from-sky-400/90 to-blue-600/70 shadow-sm"
                : "h-7 flex-1 rounded-md border border-dashed border-border/60 bg-white/[0.02]"
            }
            title={i < filled ? "Logged" : "Empty"}
          />
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-3 w-full"
        type="button"
        disabled={pending || filled >= total}
        onClick={() => startTransition(() => void logWaterGlass())}
      >
        {pending ? "Logging…" : "Log a glass"}
      </Button>
    </div>
  );
}
