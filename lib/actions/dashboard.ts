"use server";

import { revalidatePath } from "next/cache";
import { todayDateString } from "@/lib/db/dates";
import { ensureTodayGoals } from "@/lib/db/dashboard";
import { createClient } from "@/lib/supabase/server";

export type DashboardActionState = { error?: string };

export async function logWaterGlass(): Promise<DashboardActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const goals = await ensureTodayGoals(user.id);
  if (goals.water_glasses_filled >= goals.water_glasses_target) {
    return { error: "Daily water goal already reached." };
  }

  const today = todayDateString();
  const { error } = await supabase
    .from("user_daily_goals")
    .update({
      water_glasses_filled: goals.water_glasses_filled + 1,
    })
    .eq("user_id", user.id)
    .eq("goal_date", today);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return {};
}
