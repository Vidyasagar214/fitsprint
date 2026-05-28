import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/lib/auth/profile";
import { getWorkoutTemplates } from "@/lib/db/workouts";
import { WorkoutLibrary } from "@/components/dashboard/workout-library";
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Workouts",
};

export default async function WorkoutsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { user } = await getAuthContext();
  if (!user) redirect("/login");

  const params = await searchParams;
  const templates = await getWorkoutTemplates();

  return (
    <DashboardPage>
      {params.error ? (
        <p
          className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          Could not start workout. Please try again.
        </p>
      ) : null}
      <WorkoutLibrary templates={templates} />
    </DashboardPage>
  );
}
