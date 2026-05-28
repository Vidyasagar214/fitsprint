import Link from "next/link";
import { FitSprintLogo } from "@/components/brand/fitsprint-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  userEmail?: string | null;
};

export function SiteHeader({ userEmail }: SiteHeaderProps) {
  return (
    <header className="header-glass sticky top-0 z-50">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 lg:px-6">
        <FitSprintLogo size="lg" priority className="min-h-[3rem]" />
        <nav aria-label="Main" className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            About
          </Link>
          {userEmail ? (
            <>
              <Link href="/dashboard">
                <Button size="sm" variant="gradient">
                  Dashboard
                </Button>
              </Link>
              <span className="hidden max-w-[140px] truncate text-xs text-muted-foreground sm:inline">
                {userEmail}
              </span>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" variant="gradient">
                  Get started
                </Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
