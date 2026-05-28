import Link from "next/link";
import { landingPricing } from "@/lib/data/landing";
import { LandingSectionHeader } from "@/components/marketing/landing-section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function LandingPricing() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
      <LandingSectionHeader
        kicker="// PRICING"
        title={
          <>
            Plans that <span className="text-gradient">scale with you</span>
          </>
        }
        description="Start free. Upgrade when you need nutrition, analytics, and elite coaching."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {landingPricing.map((plan, i) => (
          <div
            key={plan.name}
            className={cn(
              "glass-card card-hover-lift relative flex flex-col rounded-2xl p-6 animate-fade-in-up",
              plan.highlighted && "ring-2 ring-primary/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]",
            )}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {plan.highlighted ? (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
            ) : null}
            <h3 className="font-display text-lg font-bold">{plan.name}</h3>
            <p className="mt-2">
              <span className="font-display text-4xl font-bold text-gradient">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href={plan.href} className="mt-8 block">
              <Button
                variant={plan.highlighted ? "gradient" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
