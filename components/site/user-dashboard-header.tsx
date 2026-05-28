"use client";

import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileDropdown } from "@/components/site/profile-dropdown";
import { UserDashboardNav } from "@/components/site/user-dashboard-nav";
import { Button } from "@/components/ui/button";

type UserDashboardHeaderProps = {
  displayName: string;
  email?: string | null;
};

export function UserDashboardHeader({
  displayName,
  email,
}: UserDashboardHeaderProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-end gap-2 overflow-visible lg:justify-between lg:gap-4">
      <UserDashboardNav displayName={displayName} linksOnly />
      <div className="relative z-[60] flex shrink-0 items-center gap-1.5 overflow-visible sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden shrink-0 sm:inline-flex"
          type="button"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <ProfileDropdown displayName={displayName} email={email} />
      </div>
    </div>
  );
}
