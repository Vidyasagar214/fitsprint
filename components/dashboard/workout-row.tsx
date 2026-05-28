import Image from "next/image";
import { Dumbbell, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type WorkoutRowProps = {
  name: string;
  when: string;
  calories: string;
  image?: string;
  accent?: "orange" | "blue" | "green";
};

const accentStyles = {
  orange: { ring: "ring-orange-500/30", text: "text-orange-400", badge: "bg-orange-500/15" },
  blue: { ring: "ring-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/15" },
  green: { ring: "ring-green-500/30", text: "text-green-400", badge: "bg-green-500/15" },
};

export function WorkoutRow({
  name,
  when,
  calories,
  image,
  accent = "blue",
}: WorkoutRowProps) {
  const a = accentStyles[accent];

  return (
    <div className="group flex gap-3 rounded-xl border border-border/40 bg-white/[0.03] p-2.5 transition-all hover:border-primary/25 hover:bg-white/[0.05]">
      {image ? (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
          <Image src={image} alt="" fill className="object-cover" sizes="64px" />
          <div className="absolute inset-0 bg-black/20" />
          <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/90 opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="h-3 w-3 fill-white text-white" />
          </span>
        </div>
      ) : (
        <div
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ring-1",
            a.ring,
            a.badge,
          )}
        >
          <Dumbbell className={cn("h-6 w-6", a.text)} aria-hidden />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="truncate font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{when}</p>
      </div>
      <div className="flex flex-col items-end justify-center gap-1">
        <span className={cn("text-sm font-bold", a.text)}>{calories}</span>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" type="button">
          Details
        </Button>
      </div>
    </div>
  );
}
