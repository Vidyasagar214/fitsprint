import Image from "next/image";
import { eliteCoaches } from "@/lib/data/landing";
import { LandingSectionHeader } from "@/components/marketing/landing-section-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { Button } from "@/components/ui/button";

export function LandingCoaches() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
      <LandingSectionHeader
        kicker="// ELITE COACHES"
        title={
          <>
            Learn from <span className="text-gradient">proven experts</span>
          </>
        }
        description="Certified coaches across strength, HIIT, and mobility—available on Elite tiers and expanding every phase."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {eliteCoaches.map((coach, i) => (
          <article
            key={coach.name}
            className="group card-hover-lift overflow-hidden rounded-2xl border border-border/50 bg-card/50 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={coach.image}
                alt={coach.role}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>
            <div className="-mt-10 relative px-5 pb-5">
              <UserAvatar src={coach.avatar} name={coach.name} size="lg" className="ring-4 ring-background" />
              <h3 className="font-display mt-3 text-lg font-bold">{coach.name}</h3>
              <p className="text-sm text-primary">{coach.role}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {coach.clients} · ★ {coach.rating}
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full" type="button">
                View profile
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
