"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { todayDateString } from "@/lib/db/dates";
import { getWorkoutTemplateById } from "@/lib/db/workouts";
import { createClient } from "@/lib/supabase/server";

export type WorkoutActionState = { error?: string };

export async function startWorkoutAction(formData: FormData): Promise<void> {
  const templateId = String(formData.get("templateId") ?? "");
  if (!templateId) {
    redirect("/dashboard/workouts?error=missing");
  }
  await startWorkoutFromTemplate(templateId);
}

async function startWorkoutFromTemplate(templateId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const template = await getWorkoutTemplateById(templateId);
  if (!template) {
    redirect("/dashboard/workouts?error=not_found");
  }

  const { data: session, error } = await supabase
    .from("workout_sessions")
    .insert({
      user_id: user.id,
      template_id: template.id,
      name: template.name,
    })
    .select("id")
    .single();

  if (error || !session) {
    redirect(
      `/dashboard/workouts?error=${encodeURIComponent(error?.message ?? "start_failed")}`,
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/workouts");
  redirect(`/dashboard/workouts/session/${session.id}`);
}

export async function completeWorkoutSession(
  _prev: WorkoutActionState,
  formData: FormData,
): Promise<WorkoutActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const sessionId = String(formData.get("sessionId") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!sessionId) {
    return { error: "Invalid session." };
  }

  const { data: session } = await supabase
    .from("workout_sessions")
    .select("id, template_id, name, started_at, completed_at")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!session) {
    return { error: "Session not found." };
  }

  if (session.completed_at) {
    redirect("/dashboard");
  }

  const template = session.template_id
    ? await getWorkoutTemplateById(session.template_id)
    : null;

  const started = new Date(session.started_at);
  const now = new Date();
  const elapsedMinutes = Math.max(
    1,
    Math.round((now.getTime() - started.getTime()) / 60000),
  );
  const durationMinutes = template?.duration_minutes ?? elapsedMinutes;
  const caloriesBurned = template?.calories_estimate ?? Math.round(durationMinutes * 8);

  const { error: updateError } = await supabase
    .from("workout_sessions")
    .update({
      completed_at: now.toISOString(),
      duration_minutes: durationMinutes,
      calories_burned: caloriesBurned,
      notes: notes || null,
    })
    .eq("id", sessionId);

  if (updateError) {
    return { error: updateError.message };
  }

  const today = todayDateString();

  const { data: snapshot } = await supabase
    .from("daily_activity_snapshots")
    .select("id, calories_burned, active_minutes")
    .eq("user_id", user.id)
    .eq("activity_date", today)
    .maybeSingle();

  if (snapshot) {
    await supabase
      .from("daily_activity_snapshots")
      .update({
        calories_burned: snapshot.calories_burned + caloriesBurned,
        active_minutes: snapshot.active_minutes + durationMinutes,
      })
      .eq("id", snapshot.id);
  } else {
    await supabase.from("daily_activity_snapshots").insert({
      user_id: user.id,
      activity_date: today,
      calories_burned: caloriesBurned,
      active_minutes: durationMinutes,
    });
  }

  const { data: goals } = await supabase
    .from("user_daily_goals")
    .select("id, calories_current")
    .eq("user_id", user.id)
    .eq("goal_date", today)
    .maybeSingle();

  if (goals) {
    await supabase
      .from("user_daily_goals")
      .update({
        calories_current: goals.calories_current + caloriesBurned,
      })
      .eq("id", goals.id);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("streak_days")
    .eq("id", user.id)
    .single();

  const { count: todayCount } = await supabase
    .from("workout_sessions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .not("completed_at", "is", null)
    .gte("completed_at", `${today}T00:00:00`);

  if (todayCount === 1 && profile) {
    await supabase
      .from("profiles")
      .update({ streak_days: (profile.streak_days ?? 0) + 1 })
      .eq("id", user.id);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/workouts");
  revalidatePath("/dashboard/progress");
  redirect("/dashboard?workout=completed");
}
