"use server";

import { revalidatePath } from "next/cache";
import { calculateBmi } from "@/lib/fitness/bmi";
import { createClient } from "@/lib/supabase/server";

export type ProfileActionState = {
  error?: string;
  success?: string;
};

export async function updateProfile(
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

  const fullName = String(formData.get("fullName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const fitnessGoal = String(formData.get("fitnessGoal") ?? "").trim();
  const heightRaw = String(formData.get("heightCm") ?? "").trim();
  const weightRaw = String(formData.get("weightKg") ?? "").trim();

  const heightCm = heightRaw ? Number(heightRaw) : null;
  const weightKg = weightRaw ? Number(weightRaw) : null;

  if (heightCm !== null && (Number.isNaN(heightCm) || heightCm < 50 || heightCm > 300)) {
    return { error: "Enter a valid height (50–300 cm)." };
  }

  if (weightKg !== null && (Number.isNaN(weightKg) || weightKg < 20 || weightKg > 500)) {
    return { error: "Enter a valid weight (20–500 kg)." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName || null,
      bio: bio || null,
      fitness_goal: fitnessGoal || null,
      height_cm: heightCm,
      weight_kg: weightKg,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");

  const bmi =
    weightKg && heightCm ? calculateBmi(weightKg, heightCm) : null;

  return {
    success: bmi
      ? `Profile saved. Your BMI is ${bmi}.`
      : "Profile saved successfully.",
  };
}

const FOCUS_OPTIONS = ["Strength", "HIIT", "Mobility"] as const;

export async function updateTrainingFocus(
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

  const selected = FOCUS_OPTIONS.filter(
    (f) => formData.get(`focus_${f}`) === "on",
  );

  const { error } = await supabase
    .from("profiles")
    .update({ training_focus: selected })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/profile");
  return { success: "Training preferences updated." };
}
