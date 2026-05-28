"use client";

import { useActionState } from "react";
import {
  updateTrainingFocus,
  type ProfileActionState,
} from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OPTIONS = ["Strength", "HIIT", "Mobility"] as const;

const initial: ProfileActionState = {};

type TrainingFocusFormProps = {
  selected: string[];
};

export function TrainingFocusForm({ selected }: TrainingFocusFormProps) {
  const [state, formAction, pending] = useActionState(
    updateTrainingFocus,
    initial,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {OPTIONS.map((focus) => (
          <label
            key={focus}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
              selected.includes(focus)
                ? "border-primary/50 bg-primary/10 text-foreground"
                : "border-border/50 bg-white/5 text-muted-foreground hover:border-primary/30",
            )}
          >
            <input
              type="checkbox"
              name={`focus_${focus}`}
              defaultChecked={selected.includes(focus)}
              className="h-4 w-4 accent-primary"
            />
            {focus}
          </label>
        ))}
      </div>
      {state.success ? (
        <p className="text-sm text-green-400">{state.success}</p>
      ) : null}
      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <Button type="submit" variant="outline" size="sm" disabled={pending}>
        {pending ? "Saving…" : "Save preferences"}
      </Button>
    </form>
  );
}
