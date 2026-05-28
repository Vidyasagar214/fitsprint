import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-primary/15 text-primary",
        success: "border-green-500/30 bg-green-500/15 text-green-400",
        warning: "border-orange-500/30 bg-orange-500/15 text-orange-400",
        destructive: "border-destructive/30 bg-destructive/15 text-destructive",
        secondary: "border-border bg-white/5 text-muted-foreground",
        purple: "border-purple-500/30 bg-purple-500/15 text-purple-400",
        cyan: "border-cyan-500/30 bg-cyan-500/15 text-cyan-400",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
