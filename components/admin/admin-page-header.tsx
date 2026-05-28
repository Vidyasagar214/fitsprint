"use client";

import { Bell, RefreshCw } from "lucide-react";
import { ProfileDropdown } from "@/components/site/profile-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
  displayName: string;
  email?: string | null;
  showActions?: boolean;
};

export function AdminPageHeader({
  title,
  subtitle,
  displayName,
  email,
  showActions = true,
}: AdminPageHeaderProps) {
  const now = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <header className="header-glass relative z-50 flex flex-wrap items-center justify-between gap-3 overflow-visible px-4 py-3 lg:px-5">
      <div className="min-w-0">
        <h1 className="font-display truncate text-xl font-bold tracking-tight lg:text-2xl">
          {title}
        </h1>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {subtitle ?? now}
        </p>
      </div>
      {showActions ? (
        <div className="relative z-[60] flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button variant="outline" size="sm" type="button" className="hidden sm:inline-flex">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="ghost" size="icon" type="button" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <ProfileDropdown
            displayName={displayName}
            email={email}
            variant="admin"
          />
        </div>
      ) : null}
    </header>
  );
}
