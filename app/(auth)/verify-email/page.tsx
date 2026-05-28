import type { Metadata } from "next";
import { VerifyEmailPanel } from "@/components/auth/verify-email-panel";
import { AuthShell } from "@/components/design/auth-shell";

export const metadata: Metadata = {
  title: "Verify email",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; pending?: string; confirmed?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthShell
      title="Verify your email"
      description="One more step before you can access FitSprint."
    >
      <VerifyEmailPanel
        email={params.email}
        pending={params.pending === "1"}
        confirmed={params.confirmed === "1"}
      />
    </AuthShell>
  );
}
