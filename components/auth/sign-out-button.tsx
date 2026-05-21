"use client";

import { useTransition } from "react";
import { signOut } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => void signOut())}
    >
      <LogOut className="h-4 w-4" aria-hidden />
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
