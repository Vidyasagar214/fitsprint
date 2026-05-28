export type WorkoutCategory = "cardio" | "strength" | "flexibility";
export type WorkoutLevel = "Beginner" | "Intermediate" | "Advanced";

export type WorkoutTemplateRow = {
  id: string;
  name: string;
  target: string | null;
  category: WorkoutCategory;
  level: WorkoutLevel;
  duration_minutes: number;
  calories_estimate: number | null;
  image_url: string | null;
};

export type WorkoutSessionRow = {
  id: string;
  user_id: string;
  template_id: string | null;
  name: string;
  started_at: string;
  completed_at: string | null;
  duration_minutes: number | null;
  calories_burned: number | null;
  notes: string | null;
};

export type ProfileRow = {
  id: string;
  email: string | null;
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

export type DailyGoalsRow = {
  calories_current: number;
  calories_target: number;
  protein_current_g: number;
  protein_target_g: number;
  steps_current: number;
  steps_target: number;
  water_glasses_filled: number;
  water_glasses_target: number;
};

export type ActivitySnapshotRow = {
  activity_date: string;
  calories_burned: number;
  active_minutes: number;
};

export type ProgressMetricRow = {
  id: string;
  metric_key: string;
  label: string;
  value: string;
  change_summary: string | null;
  period_label: string | null;
  recorded_at: string;
};
