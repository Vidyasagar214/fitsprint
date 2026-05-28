"use client";

import { useTransition } from "react";
import { signOut } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

type SignOutButtonProps = {
  className?: string;
  variant?: "outline" | "ghost" | "destructive";
  showLabel?: boolean;
};

export function SignOutButton({
  className,
  variant = "outline",
  showLabel = true,
}: SignOutButtonProps = {}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      disabled={pending}
      className={cn("gap-2", className)}
      onClick={() => startTransition(() => void signOut())}
    >
      <LogOut className="h-4 w-4" aria-hidden />
      {showLabel ? (
        <>
          <span className="hidden sm:inline">
            {pending ? "Signing out…" : "Sign out"}
          </span>
          <span className="sm:hidden">{pending ? "…" : "Out"}</span>
        </>
      ) : null}
    </Button>
  );
}
