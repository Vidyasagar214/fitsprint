import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">About FitSprint</h1>
      <p className="mt-4 text-muted-foreground">
        FitSprint is a modular fitness SaaS platform. We are building workout
        logging, nutrition, progress analytics, and community features in phased
        releases—starting with a strength-training-first experience for solo
        gym lifters.
      </p>
    </div>
  );
}
