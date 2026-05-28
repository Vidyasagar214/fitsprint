import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getAuthContext } from "@/lib/auth/profile";
import { getWorkoutSession } from "@/lib/db/workouts";
import { DashboardPage, DashboardSection } from "@/components/dashboard/dashboard-page";
import { WorkoutSessionPanel } from "@/components/dashboard/workout-session-panel";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Workout session",
};

export default async function WorkoutSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await getAuthContext();
  if (!user) redirect("/login");

  const { id } = await params;
  const session = await getWorkoutSession(id, user.id);
  if (!session) notFound();

  return (
    <DashboardPage>
      <DashboardSection className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Active session
          </p>
          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight">
            {session.name}
          </h1>
          {session.template?.target ? (
            <p className="text-sm text-primary">{session.template.target}</p>
          ) : null}
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/workouts">Back to library</Link>
        </Button>
      </DashboardSection>

      <DashboardSection delay={1} className="mx-auto max-w-lg">
        <WorkoutSessionPanel
          sessionId={session.id}
          sessionName={session.name}
          startedAt={session.started_at}
          template={session.template ?? null}
          alreadyCompleted={Boolean(session.completed_at)}
        />
      </DashboardSection>
    </DashboardPage>
  );
}
