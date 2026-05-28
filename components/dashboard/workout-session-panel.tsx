"use client";

import { useActionState, useEffect, useState } from "react";
import {
  completeWorkoutSession,
  type WorkoutActionState,
} from "@/lib/actions/workouts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { WorkoutTemplateRow } from "@/lib/db/types";

const initial: WorkoutActionState = {};

type WorkoutSessionPanelProps = {
  sessionId: string;
  sessionName: string;
  startedAt: string;
  template: WorkoutTemplateRow | null;
  alreadyCompleted: boolean;
};

export function WorkoutSessionPanel({
  sessionId,
  sessionName,
  startedAt,
  template,
  alreadyCompleted,
}: WorkoutSessionPanelProps) {
  const [state, formAction, pending] = useActionState(
    completeWorkoutSession,
    initial,
  );
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (alreadyCompleted) return;
    const start = new Date(startedAt).getTime();
    const tick = () => setElapsed(Math.floor((Date.now() - start) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt, alreadyCompleted]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  if (alreadyCompleted) {
    return (
      <p className="text-sm text-muted-foreground">
        This session is already completed.{" "}
        <a href="/dashboard" className="text-primary hover:underline">
          Back to dashboard
        </a>
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border/40 bg-white/[0.03] p-6 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Elapsed time
        </p>
        <p className="font-display mt-2 text-4xl font-bold tabular-nums">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </p>
        {template ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Planned: {template.duration_minutes} min · ~
            {template.calories_estimate ?? 0} kcal
          </p>
        ) : null}
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="sessionId" value={sessionId} />
        <div className="space-y-2">
          <Label htmlFor="notes">Session notes (optional)</Label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="How did it feel?"
            className="auth-input w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
          />
        </div>
        {state.error ? (
          <p className="text-sm text-destructive">{state.error}</p>
        ) : null}
        <Button
          type="submit"
          variant="gradient"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Saving…" : `Complete ${sessionName}`}
        </Button>
      </form>
    </div>
  );
}
