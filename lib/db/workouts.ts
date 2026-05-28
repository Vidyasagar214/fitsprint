import { createClient } from "@/lib/supabase/server";
import { formatRelativeSessionDate } from "@/lib/db/dates";
import type { WorkoutSessionRow, WorkoutTemplateRow } from "@/lib/db/types";

export async function getWorkoutTemplates(): Promise<WorkoutTemplateRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workout_templates")
    .select(
      "id, name, target, category, level, duration_minutes, calories_estimate, image_url",
    )
    .eq("is_public", true)
    .order("name");

  if (error || !data) return [];
  return data as WorkoutTemplateRow[];
}

export async function getWorkoutTemplateById(
  id: string,
): Promise<WorkoutTemplateRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workout_templates")
    .select(
      "id, name, target, category, level, duration_minutes, calories_estimate, image_url",
    )
    .eq("id", id)
    .maybeSingle();

  return (data as WorkoutTemplateRow | null) ?? null;
}

export async function getWorkoutSession(
  sessionId: string,
  userId: string,
): Promise<(WorkoutSessionRow & { template?: WorkoutTemplateRow | null }) | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workout_sessions")
    .select(
      "id, user_id, template_id, name, started_at, completed_at, duration_minutes, calories_burned, notes",
    )
    .eq("id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();

  if (!data) return null;

  let template: WorkoutTemplateRow | null = null;
  if (data.template_id) {
    template = await getWorkoutTemplateById(data.template_id);
  }

  return { ...(data as WorkoutSessionRow), template };
}

export async function getRecentSessions(userId: string, limit = 5) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workout_sessions")
    .select(
      "id, name, started_at, completed_at, duration_minutes, calories_burned, template_id",
    )
    .eq("user_id", userId)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false })
    .limit(limit);

  if (!data) return [];

  const templateIds = [
    ...new Set(data.map((s) => s.template_id).filter(Boolean)),
  ] as string[];

  let imageByTemplate: Record<string, string | null> = {};
  if (templateIds.length > 0) {
    const { data: templates } = await supabase
      .from("workout_templates")
      .select("id, image_url")
      .in("id", templateIds);
    imageByTemplate = Object.fromEntries(
      (templates ?? []).map((t) => [t.id, t.image_url]),
    );
  }

  const accents = ["orange", "blue", "green"] as const;

  return data.map((s, i) => {
    const duration = s.duration_minutes ?? 0;
    const when = `${formatRelativeSessionDate(s.completed_at ?? s.started_at)} · ${duration} min · completed`;
    return {
      id: s.id,
      name: s.name,
      when,
      calories: `${s.calories_burned ?? 0} kcal`,
      accent: accents[i % accents.length],
      image: s.template_id ? imageByTemplate[s.template_id] ?? undefined : undefined,
    };
  });
}
