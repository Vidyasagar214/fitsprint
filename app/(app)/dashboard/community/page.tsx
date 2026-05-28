import type { Metadata } from "next";
import { communityPosts } from "@/lib/data/user-dashboard";
import { DashboardPage, DashboardSection } from "@/components/dashboard/dashboard-page";
import { PageHeader } from "@/components/dashboard/page-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { MediaThumb } from "@/components/dashboard/media-thumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
};

export default function CommunityPage() {
  return (
    <DashboardPage>
      <DashboardSection>
        <PageHeader
          kicker="// SOCIAL"
          title="Community feed"
          description="Celebrate wins, share progress, and find training partners in your circle."
          action={
            <Button variant="gradient" size="sm" type="button">
              New post
            </Button>
          }
        />
      </DashboardSection>

      <DashboardSection delay={1} className="space-y-4">
        {communityPosts.map((post) => (
          <Card key={post.title} className="card-hover-lift overflow-hidden">
            <div className="flex flex-col gap-0 sm:flex-row">
              <div className="relative h-36 w-full shrink-0 sm:h-auto sm:w-44">
                <MediaThumb
                  src={post.thumb}
                  alt=""
                  aspect="wide"
                  showPlay={post.video}
                  className="h-full min-h-[9rem] w-full sm:min-h-full"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex gap-3">
                  <UserAvatar src={post.avatar} name={post.author} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      {post.author} · {post.time}
                    </p>
                    <h2 className="font-display mt-0.5 text-lg font-bold leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">{post.body}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-border/30 pt-3">
                  <Button variant="outline" size="sm" type="button" className="gap-1.5">
                    <Heart className="h-3.5 w-3.5" aria-hidden />
                    {post.likes}
                  </Button>
                  <Button variant="outline" size="sm" type="button" className="gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" type="button" className="ml-auto">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </DashboardSection>
    </DashboardPage>
  );
}
