import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthShell } from "@/components/design/auth-shell";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Start your sprint"
      description="Create your account and reach your dashboard in minutes."
    >
      <SignUpForm />
    </AuthShell>
  );
}
