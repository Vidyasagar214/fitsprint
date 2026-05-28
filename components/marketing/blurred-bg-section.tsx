import Image from "next/image";
import { cn } from "@/lib/utils";

type BlurredBgSectionProps = {
  imageSrc: string;
  children: React.ReactNode;
  className?: string;
  overlay?: "dark" | "light" | "mesh";
  id?: string;
};

export function BlurredBgSection({
  imageSrc,
  children,
  className,
  overlay = "dark",
  id,
}: BlurredBgSectionProps) {
  return (
    <section id={id} className={cn("landing-blur-section relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={imageSrc}
          alt=""
          fill
          className="landing-blur-bg object-cover"
          sizes="100vw"
          priority={false}
        />
        <div
          className={cn(
            "absolute inset-0",
            overlay === "dark" && "bg-background/88 dark:bg-background/92",
            overlay === "light" && "bg-background/90",
            overlay === "mesh" &&
              "bg-gradient-to-b from-background/95 via-background/85 to-background/95",
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
