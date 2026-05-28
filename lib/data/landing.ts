import { avatars, thumbs } from "@/lib/media";
import {
  Activity,
  Apple,
  BarChart3,
  Brain,
  Dumbbell,
  LineChart,
  Shield,
  Users,
  Zap,
} from "lucide-react";

export const landingStats = [
  { value: "50K+", label: "Workouts logged", icon: Dumbbell },
  { value: "12K+", label: "Active athletes", icon: Users },
  { value: "98%", label: "Goal completion", icon: Activity },
  { value: "4.9★", label: "Member rating", icon: Zap },
];

export const platformFeatures = [
  {
    icon: Dumbbell,
    title: "Smart workout logging",
    description:
      "Templates, supersets, and RPE—built for real gym sessions, not rigid app flows.",
    image: thumbs.workoutStrength,
    accent: "from-blue-500/25 to-transparent",
  },
  {
    icon: Apple,
    title: "Nutrition sync",
    description:
      "Macros, meals, and hydration in one dashboard as your training evolves.",
    image: thumbs.nutrition,
    accent: "from-green-500/25 to-transparent",
  },
  {
    icon: LineChart,
    title: "Progress analytics",
    description:
      "PR tracking, trend charts, and weekly insights that motivate—not overwhelm.",
    image: thumbs.report,
    accent: "from-orange-500/25 to-transparent",
  },
  {
    icon: Brain,
    title: "AI-assisted plans",
    description:
      "Phase-ready coaching suggestions tailored to your goals and recovery.",
    image: thumbs.promo,
    accent: "from-purple-500/25 to-transparent",
  },
  {
    icon: Shield,
    title: "Your data, your rules",
    description:
      "Export anytime. Transparent storage. OAuth sign-in with email or social.",
    image: thumbs.article,
    accent: "from-cyan-500/25 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Full platform roadmap",
    description:
      "Community, trainers, and premium tiers—shipped in focused releases.",
    image: thumbs.video,
    accent: "from-pink-500/25 to-transparent",
  },
];

export const eliteCoaches = [
  {
    name: "Elena Voss",
    role: "Strength & hypertrophy",
    clients: "420+ athletes",
    rating: 4.9,
    avatar: avatars.elena,
    image: thumbs.workoutStrength,
  },
  {
    name: "David Park",
    role: "HIIT & conditioning",
    clients: "280+ athletes",
    rating: 4.8,
    avatar: avatars.david,
    image: thumbs.workoutHiit,
  },
  {
    name: "Mia Ortiz",
    role: "Mobility & recovery",
    clients: "350+ athletes",
    rating: 4.9,
    avatar: avatars.mia,
    image: thumbs.promo,
  },
];

export const memberStories = [
  {
    quote:
      "FitSprint replaced three apps for me. Logging feels fast, and the progress charts keep me honest.",
    name: "Marcus Webb",
    role: "Powerlifter · 2 years",
    avatar: avatars.marcus,
    result: "-12% body fat",
  },
  {
    quote:
      "The macro dashboard and workout library finally match how I actually train—not how apps think I should.",
    name: "Priya Nair",
    role: "CrossFit · 14 months",
    avatar: avatars.priya,
    result: "+18 kg total",
  },
  {
    quote:
      "Clean UI, no clutter. I open it between sets and I'm back under the bar in seconds.",
    name: "Alex Rivera",
    role: "Hybrid athlete · 8 months",
    avatar: avatars.alex,
    result: "24-day streak",
  },
];

export const landingPricing = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    features: ["Workout logging", "Basic stats", "Community read-only"],
    cta: "Get started free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    features: ["Nutrition tracking", "Progress charts", "Workout templates", "Priority support"],
    cta: "Start Pro trial",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Elite",
    price: "$24",
    period: "/month",
    features: ["AI coaching", "Elite coaches", "Export & API", "Community+"],
    cta: "Go Elite",
    href: "/signup",
    highlighted: false,
  },
];

export const landingBackgrounds = {
  features:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80",
  coaches:
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80",
  stories:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80",
  bmi: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1920&q=80",
  pricing:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80",
};
