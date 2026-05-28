import Link from "next/link";
import { FitSprintLogo } from "@/components/brand/fitsprint-logo";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:pt-8 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="landing-hero-glow absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[var(--glow-blue)]/20 blur-[120px]" />
        <div className="landing-hero-glow absolute -right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-[var(--glow-green)]/15 blur-[100px] animation-delay-2" />
      </div>
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="animate-fade-in-up-delay-1 mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          <Zap className="h-3.5 w-3.5" aria-hidden />
          Premium fitness SaaS
        </p>
        <h1 className="font-display animate-fade-in-up-delay-2 mt-8 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-gradient">Transform Your Body.</span>
          <br />
          <span className="text-foreground">Elevate Your Life.</span>
        </h1>
        <p className="animate-fade-in-up-delay-3 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          FitSprint combines precise workout logging, flexible programming, and
          insights for serious lifters—plus nutrition, progress, and community
          as you grow.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" variant="gradient" className="min-w-[180px] btn-glow">
              Get started free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="min-w-[140px]">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
