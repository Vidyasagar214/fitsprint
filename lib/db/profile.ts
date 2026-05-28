import { createClient } from "@/lib/supabase/server";
import { todayDateString } from "@/lib/db/dates";
import type { ProfileRow } from "@/lib/db/types";

export async function getProfileByUserId(userId: string): Promise<ProfileRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, role, bio, units, streak_days, training_focus, height_cm, weight_kg, fitness_goal",
    )
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as ProfileRow;
}

export async function ensureUserSetup(userId: string) {
  const supabase = await createClient();
  const today = todayDateString();

  await supabase.from("user_notification_preferences").upsert(
    { user_id: userId },
    { onConflict: "user_id" },
  );

  await supabase.from("user_daily_goals").upsert(
    { user_id: userId, goal_date: today },
    { onConflict: "user_id,goal_date" },
  );
}

export type NotificationPrefs = {
  workout_reminders: boolean;
  goal_progress: boolean;
  community_activity: boolean;
};

export async function getNotificationPrefs(
  userId: string,
): Promise<NotificationPrefs | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_notification_preferences")
    .select("workout_reminders, goal_progress, community_activity")
    .eq("user_id", userId)
    .maybeSingle();

  return (data as NotificationPrefs | null) ?? null;
}

export { calculateBmi } from "@/lib/fitness/bmi";
