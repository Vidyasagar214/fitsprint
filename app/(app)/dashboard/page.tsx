import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { full_name: string | null; role: string } | null = null;
  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .maybeSingle();
    if (!error) profile = data;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back
          {profile?.full_name ? `, ${profile.full_name}` : ""}. Workout logging
          arrives in the next phase.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Signed in successfully</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{user?.email}</p>
            <p className="mt-1">Role: {profile?.role ?? "user"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workouts</CardTitle>
            <CardDescription>Phase 2</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Exercise library, templates, and session logging coming soon.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>Phase 3</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Charts, measurements, and PR tracking on the roadmap.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
