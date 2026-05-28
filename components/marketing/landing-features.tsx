import Image from "next/image";
import { platformFeatures } from "@/lib/data/landing";
import { LandingSectionHeader } from "@/components/marketing/landing-section-header";
import { Card, CardContent } from "@/components/ui/card";

export function LandingFeatures() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
      <LandingSectionHeader
        kicker="// PLATFORM FEATURES"
        title={
          <>
            Everything you need to{" "}
            <span className="text-gradient">train smarter</span>
          </>
        }
        description="Glass-smooth UX, enterprise-grade patterns, and lifter-first workflows—built in phases so you always get value."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {platformFeatures.map(({ icon: Icon, title, description, image, accent }, i) => (
          <Card
            key={title}
            className={`group card-hover-lift overflow-hidden bg-gradient-to-br ${accent} animate-fade-in-up`}
            style={{ animationDelay: `${0.05 + i * 0.06}s` }}
          >
            <div className="relative h-36 overflow-hidden">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 text-primary backdrop-blur-sm">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <CardContent className="p-5 pt-4">
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
