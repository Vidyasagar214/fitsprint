"use client";

import { useActionState } from "react";
import { updateSettings } from "@/lib/actions/settings";
import type { ProfileActionState } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { NotificationPrefs } from "@/lib/db/profile";

const initial: ProfileActionState = {};

type SettingsFormProps = {
  units: "metric" | "imperial";
  prefs: NotificationPrefs;
};

export function SettingsForm({ units, prefs }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(updateSettings, initial);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="units">Units</Label>
        <select
          id="units"
          name="units"
          defaultValue={units}
          className="auth-input flex h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
        >
          <option value="metric">Metric (kg, km)</option>
          <option value="imperial">Imperial (lb, mi)</option>
        </select>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Notifications</p>
        <label className="flex items-center justify-between gap-4 rounded-lg border border-border/40 bg-white/5 p-3">
          <span className="text-sm">Workout reminders</span>
          <input
            type="checkbox"
            name="workoutReminders"
            defaultChecked={prefs.workout_reminders}
            className="h-4 w-4 accent-primary"
          />
        </label>
        <label className="flex items-center justify-between gap-4 rounded-lg border border-border/40 bg-white/5 p-3">
          <span className="text-sm">Goal progress</span>
          <input
            type="checkbox"
            name="goalProgress"
            defaultChecked={prefs.goal_progress}
            className="h-4 w-4 accent-primary"
          />
        </label>
        <label className="flex items-center justify-between gap-4 rounded-lg border border-border/40 bg-white/5 p-3">
          <span className="text-sm">Community activity</span>
          <input
            type="checkbox"
            name="communityActivity"
            defaultChecked={prefs.community_activity}
            className="h-4 w-4 accent-primary"
          />
        </label>
      </div>

      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-green-400">{state.success}</p>
      ) : null}

      <Button type="submit" variant="gradient" size="sm" disabled={pending}>
        {pending ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
