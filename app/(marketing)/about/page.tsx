import type { Metadata } from "next";
import { FitSprintLogo } from "@/components/brand/fitsprint-logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <h1 className="font-display text-4xl font-bold tracking-tight">About</h1>
        <FitSprintLogo href="/" size="xl" />
      </div>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        FitSprint is a modular fitness SaaS platform with a premium,
        performance-first experience. We are building workout logging, nutrition,
        progress analytics, and community features in phased releases—starting
        with strength training for solo gym lifters.
      </p>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Our design philosophy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            Dark-mode-first interfaces, glassmorphism, energetic gradients, and
            clarity over clutter—aligned with our UI/UX specification for a
            world-class fitness product.
          </p>
          <p>
            Control, flexibility, and insight drive every screen we ship.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
