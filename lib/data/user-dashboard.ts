import { avatars, thumbs } from "@/lib/media";

export const userStatCards = [
  {
    label: "Calories burned",
    value: "1,840",
    hint: "Today · goal 2,200",
    trend: "+12%",
    trendUp: true,
    icon: "flame" as const,
    accent: "orange",
  },
  {
    label: "Active minutes",
    value: "54 min",
    hint: "Move ring 72% closed",
    trend: "+8%",
    trendUp: true,
    icon: "clock" as const,
    accent: "blue",
  },
  {
    label: "Resting heart rate",
    value: "62 bpm",
    hint: "7-day avg · excellent",
    trend: "-3 bpm",
    trendUp: true,
    icon: "heart" as const,
    accent: "red",
  },
  {
    label: "Sleep",
    value: "7h 42m",
    hint: "Score 86 · recovery good",
    trend: "+24 min",
    trendUp: true,
    icon: "activity" as const,
    accent: "purple",
  },
];

export const weeklyActivity = [
  { day: "Mon", calories: 1420, minutes: 38 },
  { day: "Tue", calories: 1680, minutes: 52 },
  { day: "Wed", calories: 1840, minutes: 54 },
  { day: "Thu", calories: 1560, minutes: 41 },
  { day: "Fri", calories: 1920, minutes: 58 },
  { day: "Sat", calories: 2100, minutes: 62 },
  { day: "Sun", calories: 1240, minutes: 28 },
];

export const todayGoals = [
  { label: "Calories", current: 1840, target: 2200, color: "orange" },
  { label: "Protein", current: 142, target: 180, color: "blue", unit: "g" },
  { label: "Steps", current: 8800, target: 10000, color: "green" },
];

export const waterGlasses = { filled: 5, total: 8 };

export const macroBreakdown = [
  { name: "Protein", grams: 142, color: "#3b82f6", pct: 33 },
  { name: "Carbs", grams: 210, color: "#22c55e", pct: 49 },
  { name: "Fat", grams: 68, color: "#f97316", pct: 18 },
];

export const recentWorkouts = [
  {
    name: "HIIT Inferno",
    when: "Today · 45 min · completed",
    calories: "620 kcal",
    accent: "orange",
    image: thumbs.workoutHiit,
  },
  {
    name: "Power Sculpt",
    when: "Yesterday · 60 min",
    calories: "480 kcal",
    accent: "blue",
    image: thumbs.workoutStrength,
  },
  {
    name: "Morning Mobility",
    when: "2 days ago · 25 min",
    calories: "180 kcal",
    accent: "green",
    image: thumbs.article,
  },
];

export type WorkoutCategory = "cardio" | "strength" | "flexibility";

export const workoutFilters = [
  { id: "all" as const, label: "All" },
  { id: "cardio" as const, label: "Cardio" },
  { id: "strength" as const, label: "Strength" },
  { id: "flexibility" as const, label: "Flexibility" },
];

export const workoutLibrary = [
  {
    name: "HIIT Inferno",
    target: "Full Body",
    category: "cardio" as WorkoutCategory,
    level: "Advanced" as const,
    duration: "45 min",
    calories: "620 kcal",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  },
  {
    name: "Power Sculpt",
    target: "Upper Body",
    category: "strength" as WorkoutCategory,
    level: "Intermediate" as const,
    duration: "60 min",
    calories: "480 kcal",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  },
  {
    name: "Core Crusher",
    target: "Core",
    category: "strength" as WorkoutCategory,
    level: "Beginner" as const,
    duration: "30 min",
    calories: "280 kcal",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80",
  },
  {
    name: "Sunrise Flow",
    target: "Full Body",
    category: "flexibility" as WorkoutCategory,
    level: "Beginner" as const,
    duration: "35 min",
    calories: "190 kcal",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    name: "Sprint Intervals",
    target: "Lower Body",
    category: "cardio" as WorkoutCategory,
    level: "Intermediate" as const,
    duration: "40 min",
    calories: "540 kcal",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
  },
  {
    name: "Deep Stretch",
    target: "Mobility",
    category: "flexibility" as WorkoutCategory,
    level: "Intermediate" as const,
    duration: "25 min",
    calories: "120 kcal",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80",
  },
];

export const nutritionMeals = [
  {
    meal: "Breakfast",
    items: "Oats, berries, whey",
    kcal: 520,
    protein: 32,
    thumb: thumbs.nutrition,
  },
  {
    meal: "Lunch",
    items: "Chicken bowl, rice",
    kcal: 680,
    protein: 48,
    thumb: thumbs.workoutHiit,
  },
  {
    meal: "Dinner",
    items: "Salmon, greens",
    kcal: 640,
    protein: 42,
    thumb: thumbs.article,
  },
];

export const progressMetrics = [
  {
    label: "Bench press",
    value: "102.5 kg",
    change: "+2.5 kg vs last month",
    period: "Personal best",
  },
  {
    label: "Body weight",
    value: "78.4 kg",
    change: "-1.2 kg trend",
    period: "On track for goal",
  },
  {
    label: "5K pace",
    value: "5:42 /km",
    change: "18 sec faster",
    period: "Last 8 weeks",
  },
];

export const weeklyCalorieTrend = weeklyActivity.map((d) => ({
  label: d.day,
  value: d.calories,
}));

export const communityPosts = [
  {
    author: "Alex R.",
    title: "New squat PR — 140 kg × 3",
    body: "Finally broke through the plateau. Deload week paid off.",
    likes: 24,
    comments: 6,
    time: "2h ago",
    avatar: avatars.alex,
    thumb: thumbs.workoutStrength,
  },
  {
    author: "Sam K.",
    title: "Week 6 cut — down 2.1 kg",
    body: "Macros locked at 2,100 kcal. Energy still solid for evening lifts.",
    likes: 18,
    comments: 4,
    time: "5h ago",
    avatar: avatars.sam,
    thumb: thumbs.nutrition,
  },
  {
    author: "Jordan M.",
    title: "Saturday sunrise run — who’s in?",
    body: "Meeting 6:30 AM at Riverside trail. Easy 5K pace.",
    likes: 9,
    comments: 12,
    time: "1d ago",
    avatar: avatars.jordan,
    thumb: thumbs.video,
    video: true,
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    blurb: "Log workouts and track the basics.",
    features: ["Unlimited workout log", "Weekly activity chart", "Community read-only"],
    cta: "Current plan",
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    blurb: "Full nutrition and progress analytics.",
    features: ["Macro & meal tracking", "Progress exports", "Workout templates", "Priority support"],
    cta: "Upgrade to Pro",
  },
  {
    name: "Elite",
    price: "$24",
    period: "per month",
    blurb: "AI coaching and advanced insights.",
    features: ["AI plan adjustments", "1:1 coach messaging", "Community highlights", "CSV & API export"],
    cta: "Upgrade to Elite",
  },
];
