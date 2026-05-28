"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  resendVerificationEmail,
  type AuthActionState,
} from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

type VerifyEmailPanelProps = {
  email?: string;
  pending?: boolean;
  confirmed?: boolean;
};

export function VerifyEmailPanel({
  email: initialEmail,
  pending,
  confirmed,
}: VerifyEmailPanelProps) {
  const [state, formAction, formPending] = useActionState(
    resendVerificationEmail,
    initialState,
  );

  return (
    <div className="space-y-5">
      {confirmed ? (
        <p
          className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-400"
          role="status"
        >
          Email confirmed. You can sign in to your dashboard.
        </p>
      ) : pending ? (
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to your inbox. Open it to activate your
          account, then sign in.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Confirm your email to access your dashboard and training data.
        </p>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={initialEmail ?? ""}
            placeholder="you@example.com"
            className="auth-input"
          />
        </div>
        {state.error ? (
          <p
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p
            className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-400"
            role="status"
          >
            {state.success}
          </p>
        ) : null}
        <Button
          type="submit"
          variant="gradient"
          className="w-full"
          disabled={formPending}
        >
          {formPending ? "Sending…" : "Resend verification email"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
