import type { Metadata } from "next";
import { Calendar, Award } from "lucide-react";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/lib/auth/profile";
import { calculateBmi } from "@/lib/fitness/bmi";
import { DashboardPage, DashboardSection } from "@/components/dashboard/dashboard-page";
import { SectionLabel } from "@/components/dashboard/section-label";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { TrainingFocusForm } from "@/components/dashboard/training-focus-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const { user, profile, displayName } = await getAuthContext();
  if (!user) redirect("/login");

  const joined = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  const trainingFocus = profile?.training_focus ?? [];
  const bmi =
    profile?.weight_kg && profile?.height_cm
      ? calculateBmi(Number(profile.weight_kg), profile.height_cm)
      : null;

  return (
    <DashboardPage>
      <DashboardSection>
        <SectionLabel text="// YOUR ACCOUNT" />
        <h1 className="font-display mt-1 text-2xl font-bold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Saved to your Supabase profile — height, weight, and goals included.
        </p>
      </DashboardSection>

      <DashboardSection delay={1} className="grid gap-4 lg:grid-cols-3">
        <Card className="card-hover-lift lg:col-span-1">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--glow-blue)] to-[var(--glow-purple)] text-2xl font-bold text-white shadow-lg">
              {displayName.charAt(0).toUpperCase()}
            </span>
            <h2 className="font-display mt-4 text-xl font-bold">{displayName}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            <Badge className="mt-3" variant="default">
              {profile?.role ?? "user"}
            </Badge>
            <div className="mt-6 w-full space-y-2 text-left text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Member since {joined}
              </p>
              <p className="flex items-center gap-2">
                <Award className="h-4 w-4 text-orange-400" />
                {profile?.streak_days ?? 0} day streak
              </p>
              {bmi ? (
                <p className="text-foreground">
                  BMI: <span className="font-semibold">{bmi}</span>
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-lift lg:col-span-2">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Personal information</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <ProfileForm
              fullName={profile?.full_name ?? displayName}
              email={user.email ?? ""}
              bio={profile?.bio ?? ""}
              fitnessGoal={profile?.fitness_goal ?? ""}
              heightCm={profile?.height_cm ?? null}
              weightKg={profile?.weight_kg ? Number(profile.weight_kg) : null}
            />
          </CardContent>
        </Card>
      </DashboardSection>

      <DashboardSection delay={2}>
        <Card className="card-hover-lift">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Training preferences</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <TrainingFocusForm selected={trainingFocus} />
          </CardContent>
        </Card>
      </DashboardSection>
    </DashboardPage>
  );
}
