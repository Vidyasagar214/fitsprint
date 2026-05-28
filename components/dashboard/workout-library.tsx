"use client";

import { useMemo, useState } from "react";
import { Clock, Flame, Play } from "lucide-react";
import { workoutFilters } from "@/lib/data/workout-filters";
import type { WorkoutFilterId } from "@/lib/data/workout-filters";
import type { WorkoutTemplateRow } from "@/lib/db/types";
import { startWorkoutAction } from "@/lib/actions/workouts";
import { SectionLabel } from "@/components/dashboard/section-label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const levelVariant = {
  Advanced: "destructive" as const,
  Intermediate: "warning" as const,
  Beginner: "success" as const,
};

type WorkoutLibraryProps = {
  templates: WorkoutTemplateRow[];
};

export function WorkoutLibrary({ templates }: WorkoutLibraryProps) {
  const [filter, setFilter] = useState<WorkoutFilterId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return templates;
    return templates.filter((w) => w.category === filter);
  }, [filter, templates]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="animate-fade-in-up">
          <SectionLabel text="// AI-POWERED PLANS" />
          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Workout library
          </h1>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">
            Start a session from the catalog — your progress syncs to the dashboard.
          </p>
        </div>
        <div
          className="flex flex-wrap gap-2 animate-fade-in-up-delay-1"
          role="tablist"
          aria-label="Workout filters"
        >
          {workoutFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                filter === f.id
                  ? "nav-active-glow text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {templates.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
          No workouts in the library yet. Run the Phase 3 seed migration in Supabase (
          <code className="text-xs">20260524120000_seed_workouts.sql</code>).
        </p>
      ) : null}

      <div key={filter} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((workout, i) => (
          <article
            key={workout.id}
            className={cn(
              "workout-card group relative overflow-hidden rounded-2xl border border-border/40",
              "animate-fade-in-up",
              i === 1 && "animate-fade-in-up-delay-1",
              i === 2 && "animate-fade-in-up-delay-2",
              i >= 3 && "animate-fade-in-up-delay-3",
            )}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url(${workout.image_url ?? ""})`,
              }}
              role="img"
              aria-label={workout.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/55 to-transparent" />
            <div className="absolute right-3 top-3">
              <Badge variant={levelVariant[workout.level]}>{workout.level}</Badge>
            </div>
            <div className="relative flex min-h-[220px] flex-col justify-end p-4">
              <h2 className="font-display text-lg font-bold text-white">
                {workout.name}
              </h2>
              <p className="text-sm font-medium text-primary/90">
                {workout.target}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {workout.duration_minutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden />
                    {workout.calories_estimate ?? 0} kcal
                  </span>
                </div>
                <form action={startWorkoutAction}>
                  <input type="hidden" name="templateId" value={workout.id} />
                  <Button
                    size="sm"
                    variant="gradient"
                    type="submit"
                    className="btn-glow gap-1.5 shadow-lg transition-transform group-hover:scale-105"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                    Start
                  </Button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && templates.length > 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No workouts in this category yet.
        </p>
      ) : null}
    </div>
  );
}
