"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  LineChart,
  Users,
  CreditCard,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/dashboard/nutrition", label: "Nutrition", icon: Apple },
  { href: "/dashboard/progress", label: "Progress", icon: LineChart },
  { href: "/dashboard/community", label: "Community", icon: Users },
  { href: "/dashboard/pricing", label: "Pricing", icon: CreditCard },
];

type UserDashboardNavProps = {
  displayName?: string;
  compact?: boolean;
  linksOnly?: boolean;
};

export function UserDashboardNav({
  compact = false,
  linksOnly = false,
}: UserDashboardNavProps) {
  const pathname = usePathname();

  if (compact) {
    return (
      <nav aria-label="App" className="flex flex-1 justify-around gap-1 p-2">
        {links.slice(0, 5).map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span className="max-w-[52px] truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  if (!linksOnly) {
    return null;
  }

  return (
    <nav
      aria-label="Dashboard"
      className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
    >
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href ||
          (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
              active
                ? "nav-active-glow text-foreground"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
