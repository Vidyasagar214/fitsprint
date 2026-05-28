"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  UserCog,
  BarChart3,
  FileBarChart,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FitSprintLogo } from "@/components/brand/fitsprint-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";

const sections = [
  {
    title: "MAIN",
    items: [{ href: "/admin", label: "Overview", icon: LayoutDashboard }],
  },
  {
    title: "MANAGE",
    items: [
      { href: "/admin/users", label: "User Management", icon: Users },
      { href: "/admin/content", label: "Content Management", icon: FileText },
      { href: "/admin/trainers", label: "Trainer Management", icon: UserCog },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { href: "/admin/subscriptions", label: "Subscription Analytics", icon: BarChart3 },
      { href: "/admin/reports", label: "Reports", icon: FileBarChart },
    ],
  },
  {
    title: "SYSTEM",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

export function AdminSidebar({ displayName }: { displayName: string }) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar-glass relative z-40 flex w-64 shrink-0 flex-col">
      <div className="border-b border-border/50 p-5 dark:border-white/10">
        <FitSprintLogo href="/admin" size="md" />
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Admin Panel
        </p>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto p-4" aria-label="Admin">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-[10px] font-bold tracking-widest text-muted-foreground">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href ||
                  (href !== "/admin" && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "admin-nav-link",
                        active && "admin-nav-link-active",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="admin-sidebar-footer space-y-3 border-t border-border/50 p-4">
        <div className="admin-sidebar-profile flex items-center gap-3 rounded-xl p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--glow-blue)] to-[var(--glow-purple)] text-sm font-bold">
            AU
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <Badge variant="purple" className="mt-1">
              ADMIN
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Link>
        </Button>
        <SignOutButton
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
        />
      </div>
    </aside>
  );
}
