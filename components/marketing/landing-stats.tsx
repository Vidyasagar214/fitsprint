import { landingStats } from "@/lib/data/landing";

export function LandingStatsBand() {
  return (
    <section className="landing-stats-band border-y border-border/50 py-10">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {landingStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass-card card-hover-lift flex items-center gap-4 rounded-xl px-5 py-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-green-500/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-gradient stat-glow">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
