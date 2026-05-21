import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Train with control. Track with clarity.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          FitSprint is a fitness platform built for serious lifters—precise
          workout logging, flexible programming, and insights that respect how
          you train—plus nutrition, progress, and community as you grow.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg">Get started free</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Strength-first</CardTitle>
            <CardDescription>
              Log sets, reps, and load with templates that match real gym
              sessions—not rigid app flows.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Custom exercises, routines, and dashboards designed for lifters.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Full platform</CardTitle>
            <CardDescription>
              Nutrition, progress charts, and premium analytics on one
              roadmap—shipped in focused phases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              One account for training and health data as FitSprint expands.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your data</CardTitle>
            <CardDescription>
              Built on open storage patterns with export and transparency as
              first-class goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sign in with email or Google, Apple, and Facebook.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
