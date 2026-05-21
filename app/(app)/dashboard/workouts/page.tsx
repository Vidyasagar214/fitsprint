import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workouts",
};

export default function WorkoutsPlaceholderPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Workouts</h1>
      <p className="mt-2 text-muted-foreground">
        Workout module placeholder—implement in Phase 2.
      </p>
    </div>
  );
}
