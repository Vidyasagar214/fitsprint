import { memberStories } from "@/lib/data/landing";
import { LandingSectionHeader } from "@/components/marketing/landing-section-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { Badge } from "@/components/ui/badge";

export function LandingStories() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
      <LandingSectionHeader
        kicker="// MEMBER STORIES"
        title={
          <>
            Real athletes, <span className="text-gradient">real results</span>
          </>
        }
        description="FitSprint is built with lifters who demand precision—not gimmicks."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {memberStories.map((story, i) => (
          <blockquote
            key={story.name}
            className="glass-card card-hover-lift flex flex-col rounded-2xl p-6 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <p className="flex-1 text-sm leading-relaxed text-foreground/90">
              &ldquo;{story.quote}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
              <UserAvatar src={story.avatar} name={story.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{story.name}</p>
                <p className="truncate text-xs text-muted-foreground">{story.role}</p>
              </div>
              <Badge variant="success" className="shrink-0">
                {story.result}
              </Badge>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
