import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Access your FitSprint dashboard and training data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {configError ? (
            <p className="mb-4 text-sm text-destructive" role="alert">
              Supabase is not configured. Copy `.env.example` to `.env.local` and
              add your project keys.
            </p>
          ) : null}
          {params.error && params.error !== "config" ? (
            <p className="mb-4 text-sm text-destructive" role="alert">
              {decodeURIComponent(params.error)}
            </p>
          ) : null}
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
