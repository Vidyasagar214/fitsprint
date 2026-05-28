import type { Metadata } from "next";
import { pricingPlans } from "@/lib/data/user-dashboard";
import { DashboardPage, DashboardSection } from "@/components/dashboard/dashboard-page";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; from?: string }>;
}) {
  const params = await searchParams;
  const showPremiumGate =
    params.reason === "premium" && params.from === "progress";

  return (
    <DashboardPage>
      <DashboardSection>
        <PageHeader
          kicker="// PLANS"
          title="Choose your plan"
          description="Upgrade anytime. Your workout history and logs stay on your account."
        />
        {showPremiumGate ? (
          <p
            className="mt-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground"
            role="status"
          >
            Progress analytics and advanced charts are included on the{" "}
            <strong>Pro</strong> plan and above. Upgrade to unlock{" "}
            <strong>/dashboard/progress</strong>.
          </p>
        ) : null}
      </DashboardSection>

      <DashboardSection delay={1} className="grid gap-4 md:grid-cols-3">
        {pricingPlans.map((plan, i) => {
          const isPopular = i === 1;
          const isCurrent = plan.cta === "Current plan";
          return (
            <Card
              key={plan.name}
              className={`card-hover-lift flex flex-col ${
                isPopular ? "ring-2 ring-primary/50 shadow-lg shadow-primary/10" : ""
              }`}
            >
              <CardHeader className="p-5 pb-2">
                {isPopular ? (
                  <Badge className="mb-2 w-fit border-primary/40 bg-primary/15 text-primary">
                    Most popular
                  </Badge>
                ) : null}
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-gradient">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-2">
                <ul className="mb-5 flex-1 space-y-2.5 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-muted-foreground">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-green-400"
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={isCurrent ? "outline" : "gradient"}
                  size="sm"
                  className="w-full"
                  type="button"
                  disabled={isCurrent}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </DashboardSection>
    </DashboardPage>
  );
}
