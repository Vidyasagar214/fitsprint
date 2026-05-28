import { avatars, thumbs } from "@/lib/media";

export const adminMetrics = [
  { label: "Monthly Revenue", value: "$138,200", trend: "+10.7%", up: true, icon: "dollar" },
  { label: "Total Members", value: "512,841", trend: "+8.4%", up: true, icon: "users" },
  { label: "Active Subs", value: "48,920", trend: "+5.2%", up: true, icon: "card" },
  { label: "Churn Rate", value: "2.3%", trend: "-0.4%", up: true, icon: "trend" },
  { label: "Avg. Session", value: "38 min", trend: "+4 min", up: true, icon: "clock" },
  { label: "Support Tickets", value: "142", trend: "-14%", up: false, icon: "ticket" },
];

export const revenueTrend = [
  { month: "Jan", value: 72 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 92 },
  { month: "May", value: 98 },
  { month: "Jun", value: 105 },
  { month: "Jul", value: 110 },
  { month: "Aug", value: 115 },
  { month: "Sep", value: 120 },
  { month: "Oct", value: 125 },
  { month: "Nov", value: 132 },
  { month: "Dec", value: 138 },
];

export const planDistribution = [
  { name: "Pro", pct: 58, color: "#3b82f6" },
  { name: "Elite", pct: 24, color: "#a855f7" },
  { name: "Starter", pct: 18, color: "#22d3ee" },
];

export const platformHealth = [
  { label: "Server Uptime", value: "99.98%", status: "good" },
  { label: "API Latency", value: "42ms", status: "good" },
  { label: "Error Rate", value: "0.02%", status: "warn" },
];

export const recentSignups = [
  {
    name: "Marcus Webb",
    email: "marcus@gmail.com",
    status: "Active",
    date: "May 21, 2025",
    avatar: avatars.marcus,
  },
  {
    name: "Priya Nair",
    email: "priya.n@outlook.com",
    status: "Active",
    date: "May 20, 2025",
    avatar: avatars.priya,
  },
  {
    name: "Leo Chen",
    email: "leo.chen@icloud.com",
    status: "Pending",
    date: "May 19, 2025",
    avatar: avatars.leo,
  },
];

export const flaggedContent = [
  {
    user: "anon_user_402",
    reason: "Spam report",
    priority: "MEDIUM",
    thumb: thumbs.promo,
  },
  {
    user: "fitfan_88",
    reason: "Inappropriate image",
    priority: "HIGH",
    thumb: thumbs.workoutHiit,
  },
  {
    user: "coach_mike",
    reason: "Copyright claim",
    priority: "LOW",
    thumb: thumbs.video,
  },
];

export const managedUsers = [
  {
    name: "Jordan Miles",
    email: "jordan@example.com",
    plan: "Pro",
    status: "Active",
    avatar: avatars.jordan,
  },
  {
    name: "Taylor Brooks",
    email: "taylor@example.com",
    plan: "Starter",
    status: "Suspended",
    avatar: avatars.taylor,
  },
  {
    name: "Casey Lin",
    email: "casey@example.com",
    plan: "Elite",
    status: "Active",
    avatar: avatars.casey,
  },
];

export const contentItems = [
  {
    title: "HIIT Inferno — 45 min",
    type: "Workout",
    status: "Published",
    author: "FitSprint",
    thumb: thumbs.workoutHiit,
    video: true,
  },
  {
    title: "Macro Calculator v2",
    type: "Tool",
    status: "Draft",
    author: "Product",
    thumb: thumbs.nutrition,
  },
  {
    title: "Meal prep basics",
    type: "Article",
    status: "Review",
    author: "Nutrition",
    thumb: thumbs.article,
  },
];

export const trainers = [
  {
    name: "Elena Voss",
    specialty: "Strength",
    clients: 42,
    rating: 4.9,
    avatar: avatars.elena,
    thumb: thumbs.workoutStrength,
  },
  {
    name: "David Park",
    specialty: "HIIT",
    clients: 28,
    rating: 4.7,
    avatar: avatars.david,
    thumb: thumbs.workoutHiit,
  },
  {
    name: "Mia Ortiz",
    specialty: "Yoga",
    clients: 35,
    rating: 4.8,
    avatar: avatars.mia,
    thumb: thumbs.promo,
  },
];

export const subscriptionRows = [
  { plan: "Pro", mrr: "$72,400", subs: 28400, churn: "1.8%" },
  { plan: "Elite", mrr: "$48,200", subs: 11800, churn: "2.1%" },
  { plan: "Starter", mrr: "$17,600", subs: 8720, churn: "3.4%" },
];

export const reportSummaries = [
  {
    name: "Q2 Revenue Summary",
    generated: "May 18, 2025",
    format: "PDF",
    thumb: thumbs.report,
  },
  {
    name: "User Growth — April",
    generated: "May 01, 2025",
    format: "CSV",
    thumb: thumbs.report,
  },
  {
    name: "Trainer Performance",
    generated: "Apr 28, 2025",
    format: "PDF",
    thumb: thumbs.video,
  },
];
