import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthShell } from "@/components/design/auth-shell";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const configError = params.error === "config";

  return (
    <AuthShell
      title="Welcome back"
      description="Access your FitSprint dashboard and training data."
    >
      {configError ? (
        <p
          className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          Supabase is not configured. Copy `.env.example` to `.env.local` and add
          your project keys.
        </p>
      ) : null}
      {params.error && params.error !== "config" ? (
        <p
          className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {decodeURIComponent(params.error)}
        </p>
      ) : null}
      <SignInForm />
    </AuthShell>
  );
}
