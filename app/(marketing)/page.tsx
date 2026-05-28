import Link from "next/link";
import { FitSprintLogo } from "@/components/brand/fitsprint-logo";
import { Button } from "@/components/ui/button";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingStatsBand } from "@/components/marketing/landing-stats";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingCoaches } from "@/components/marketing/landing-coaches";
import { LandingStories } from "@/components/marketing/landing-stories";
import { LandingPricing } from "@/components/marketing/landing-pricing";
import { BlurredBgSection } from "@/components/marketing/blurred-bg-section";
import { LandingSectionHeader } from "@/components/marketing/landing-section-header";
import { BmiCalculator } from "@/components/marketing/bmi-calculator";
import { landingBackgrounds } from "@/lib/data/landing";

export default function LandingPage() {
  return (
    <div className="relative">
      <LandingHero />
      <LandingStatsBand />

      <BlurredBgSection imageSrc={landingBackgrounds.features} overlay="mesh">
        <LandingFeatures />
      </BlurredBgSection>

      <BlurredBgSection imageSrc={landingBackgrounds.coaches} overlay="dark">
        <LandingCoaches />
      </BlurredBgSection>

      <BlurredBgSection imageSrc={landingBackgrounds.stories} overlay="mesh">
        <LandingStories />
      </BlurredBgSection>

      <BlurredBgSection imageSrc={landingBackgrounds.bmi} overlay="dark" id="tools">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
          <LandingSectionHeader
            kicker="// FREE TOOL"
            title={
              <>
                Know your numbers with our{" "}
                <span className="text-gradient">BMI calculator</span>
              </>
            }
            description="A quick health snapshot—free for everyone, no account required."
          />
          <BmiCalculator />
        </div>
      </BlurredBgSection>

      <BlurredBgSection imageSrc={landingBackgrounds.pricing} overlay="mesh" id="pricing">
        <LandingPricing />
      </BlurredBgSection>

      <section className="border-t border-border/50 px-4 py-16">
        <div className="glass-card mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl px-6 py-12 text-center animate-fade-in-up">
          <FitSprintLogo href="/" size="md" />
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Ready to <span className="text-gradient">start your sprint</span>?
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Join thousands of athletes logging smarter workouts today.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="gradient" className="btn-glow min-w-[200px]">
              Create free account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
