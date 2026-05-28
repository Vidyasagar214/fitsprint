"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signInWithOAuth, type OAuthProvider } from "@/lib/actions/oauth";

const providers: { id: OAuthProvider; label: string }[] = [
  { id: "google", label: "Google" },
  { id: "apple", label: "Apple" },
  { id: "facebook", label: "Facebook" },
];

export function OAuthButtons() {
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-2">
      {providers.map(({ id, label }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          className="auth-oauth-btn w-full"
          disabled={pending}
          onClick={() =>
            startTransition(() => {
              void signInWithOAuth(id);
            })
          }
        >
          Continue with {label}
        </Button>
      ))}
    </div>
  );
}
