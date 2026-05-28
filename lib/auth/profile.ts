import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/roles";

export type AuthProfile = {
  full_name: string | null;
  role: string;
  bio: string | null;
  units: "metric" | "imperial";
  streak_days: number;
  training_focus: string[] | null;
  height_cm: number | null;
  weight_kg: number | null;
  fitness_goal: string | null;
};

export async function getAuthContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null, isAdmin: false, displayName: "Guest" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, role, bio, units, streak_days, training_focus, height_cm, weight_kg, fitness_goal",
    )
    .eq("id", user.id)
    .maybeSingle();

  const typed = profile as AuthProfile | null;
  const displayName =
    typed?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Athlete";

  return {
    user,
    profile: typed,
    isAdmin: isAdminUser(user.email, typed?.role),
    displayName,
  };
}
