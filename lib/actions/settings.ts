"use server";

import { revalidatePath } from "next/cache";
import { ensureUserSetup } from "@/lib/db/profile";
import { createClient } from "@/lib/supabase/server";
import type { ProfileActionState } from "@/lib/actions/profile";

export async function updateSettings(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  await ensureUserSetup(user.id);

  const units = String(formData.get("units") ?? "metric");
  if (units !== "metric" && units !== "imperial") {
    return { error: "Invalid units." };
  }

  const workoutReminders = formData.get("workoutReminders") === "on";
  const goalProgress = formData.get("goalProgress") === "on";
  const communityActivity = formData.get("communityActivity") === "on";

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ units })
    .eq("id", user.id);

  if (profileError) {
    return { error: profileError.message };
  }

  const { error: prefsError } = await supabase
    .from("user_notification_preferences")
    .upsert(
      {
        user_id: user.id,
        workout_reminders: workoutReminders,
        goal_progress: goalProgress,
        community_activity: communityActivity,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  if (prefsError) {
    return { error: prefsError.message };
  }

  revalidatePath("/dashboard/settings");
  return { success: "Settings saved." };
}
