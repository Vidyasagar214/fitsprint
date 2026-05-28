import { createClient } from "@/lib/supabase/server";
import { dayLabelForDate, lastNDays, todayDateString } from "@/lib/db/dates";
import { ensureUserSetup, getProfileByUserId } from "@/lib/db/profile";
import { getRecentSessions } from "@/lib/db/workouts";
import type { DailyGoalsRow } from "@/lib/db/types";
import { macroBreakdown } from "@/lib/data/user-dashboard";

export async function ensureTodayGoals(userId: string): Promise<DailyGoalsRow> {
  const supabase = await createClient();
  const today = todayDateString();

  await ensureUserSetup(userId);

  const { data: existing } = await supabase
    .from("user_daily_goals")
    .select("*")
    .eq("user_id", userId)
    .eq("goal_date", today)
    .maybeSingle();

  if (existing) {
    return {
      calories_current: existing.calories_current,
      calories_target: existing.calories_target,
      protein_current_g: existing.protein_current_g,
      protein_target_g: existing.protein_target_g,
      steps_current: existing.steps_current,
      steps_target: existing.steps_target,
      water_glasses_filled: existing.water_glasses_filled,
      water_glasses_target: existing.water_glasses_target,
    };
  }

  const { data: created } = await supabase
    .from("user_daily_goals")
    .insert({ user_id: userId, goal_date: today })
    .select("*")
    .single();

  return {
    calories_current: created?.calories_current ?? 0,
    calories_target: created?.calories_target ?? 2200,
    protein_current_g: created?.protein_current_g ?? 0,
    protein_target_g: created?.protein_target_g ?? 180,
    steps_current: created?.steps_current ?? 0,
    steps_target: created?.steps_target ?? 10000,
    water_glasses_filled: created?.water_glasses_filled ?? 0,
    water_glasses_target: created?.water_glasses_target ?? 8,
  };
}

export async function getWeeklyActivity(userId: string) {
  const supabase = await createClient();
  const days = lastNDays(7);

  const { data } = await supabase
    .from("daily_activity_snapshots")
    .select("activity_date, calories_burned, active_minutes")
    .eq("user_id", userId)
    .gte("activity_date", days[0])
    .lte("activity_date", days[days.length - 1]);

  const byDate = new Map(
    (data ?? []).map((r) => [r.activity_date as string, r]),
  );

  return days.map((date) => ({
    day: dayLabelForDate(date),
    calories: byDate.get(date)?.calories_burned ?? 0,
    minutes: byDate.get(date)?.active_minutes ?? 0,
  }));
}

export async function getDashboardData(userId: string) {
  await ensureUserSetup(userId);
  const profile = await getProfileByUserId(userId);
  const goals = await ensureTodayGoals(userId);
  const weeklyActivity = await getWeeklyActivity(userId);
  const recentWorkouts = await getRecentSessions(userId, 3);

  const todayCalories = goals.calories_current;
  const todayMinutes = weeklyActivity.find(
    (d) => d.day === dayLabelForDate(todayDateString()),
  )?.minutes ?? 0;

  const calPct = goals.calories_target
    ? Math.round((todayCalories / goals.calories_target) * 100)
    : 0;

  const statCards = [
    {
      label: "Calories burned",
      value: todayCalories.toLocaleString(),
      hint: `Today · goal ${goals.calories_target.toLocaleString()}`,
      trend: calPct >= 100 ? "Goal met" : `${calPct}% of goal`,
      trendUp: todayCalories >= goals.calories_target * 0.5,
      icon: "flame" as const,
      accent: "orange",
    },
    {
      label: "Active minutes",
      value: `${todayMinutes} min`,
      hint: `From logged workouts today`,
      trend: todayMinutes > 0 ? "Active" : "Log a workout",
      trendUp: todayMinutes > 0,
      icon: "clock" as const,
      accent: "blue",
    },
    {
      label: "Workout streak",
      value: `${profile?.streak_days ?? 0} days`,
      hint: "Consecutive training days",
      trend: profile?.streak_days ? "Keep it up" : "Start today",
      trendUp: (profile?.streak_days ?? 0) > 0,
      icon: "heart" as const,
      accent: "red",
    },
    {
      label: "Steps",
      value: goals.steps_current.toLocaleString(),
      hint: `Goal ${goals.steps_target.toLocaleString()}`,
      trend: `${Math.round((goals.steps_current / goals.steps_target) * 100)}%`,
      trendUp: goals.steps_current >= goals.steps_target * 0.5,
      icon: "activity" as const,
      accent: "purple",
    },
  ];

  const todayGoals = [
    {
      label: "Calories",
      current: goals.calories_current,
      target: goals.calories_target,
      color: "orange" as const,
    },
    {
      label: "Protein",
      current: goals.protein_current_g,
      target: goals.protein_target_g,
      color: "blue" as const,
      unit: "g",
    },
    {
      label: "Steps",
      current: goals.steps_current,
      target: goals.steps_target,
      color: "green" as const,
    },
  ];

  return {
    profile,
    statCards,
    weeklyActivity,
    todayGoals,
    waterGlasses: {
      filled: goals.water_glasses_filled,
      total: goals.water_glasses_target,
    },
    macroBreakdown,
    macroTotalKcal: goals.calories_current || 1840,
    recentWorkouts,
    streakDays: profile?.streak_days ?? 0,
  };
}
