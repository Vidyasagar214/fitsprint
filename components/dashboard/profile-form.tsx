"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileActionState } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { calculateBmi } from "@/lib/fitness/bmi";

const initial: ProfileActionState = {};

type ProfileFormProps = {
  fullName: string;
  email: string;
  bio: string;
  fitnessGoal: string;
  heightCm: number | null;
  weightKg: number | null;
};

export function ProfileForm({
  fullName,
  email,
  bio,
  fitnessGoal,
  heightCm,
  weightKg,
}: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfile, initial);
  const bmi =
    weightKg && heightCm ? calculateBmi(weightKg, heightCm) : null;

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Display name</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={fullName}
            className="auth-input"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            defaultValue={email}
            readOnly
            className="auth-input opacity-80"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Input
          id="bio"
          name="bio"
          defaultValue={bio}
          placeholder="Strength athlete · chasing PRs"
          className="auth-input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fitnessGoal">Fitness goal</Label>
        <Input
          id="fitnessGoal"
          name="fitnessGoal"
          defaultValue={fitnessGoal}
          placeholder="Build muscle · lose fat · improve endurance"
          className="auth-input"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="heightCm">Height (cm)</Label>
          <Input
            id="heightCm"
            name="heightCm"
            type="number"
            min={50}
            max={300}
            defaultValue={heightCm ?? ""}
            placeholder="175"
            className="auth-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weightKg">Weight (kg)</Label>
          <Input
            id="weightKg"
            name="weightKg"
            type="number"
            min={20}
            max={500}
            step="0.1"
            defaultValue={weightKg ?? ""}
            placeholder="78"
            className="auth-input"
          />
        </div>
      </div>
      {bmi ? (
        <p className="text-sm text-muted-foreground">
          Current BMI: <span className="font-semibold text-foreground">{bmi}</span>
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-400">
          {state.success}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button variant="gradient" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
        </Button>
        <Button variant="outline" type="button" asChild>
          <Link href="/forgot-password">Change password</Link>
        </Button>
      </div>
    </form>
  );
}
