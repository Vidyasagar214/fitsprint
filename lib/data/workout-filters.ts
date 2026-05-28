export const workoutFilters = [
  { id: "all" as const, label: "All" },
  { id: "cardio" as const, label: "Cardio" },
  { id: "strength" as const, label: "Strength" },
  { id: "flexibility" as const, label: "Flexibility" },
];

export type WorkoutFilterId = (typeof workoutFilters)[number]["id"];
