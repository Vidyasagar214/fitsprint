import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaThumbProps = {
  src: string;
  alt: string;
  aspect?: "video" | "square" | "wide";
  showPlay?: boolean;
  className?: string;
};

const aspectClass = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[5/3]",
};

export function MediaThumb({
  src,
  alt,
  aspect = "wide",
  showPlay = false,
  className,
}: MediaThumbProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white/5",
        aspectClass[aspect],
        className,
      )}
    >
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="200px" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {showPlay ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg">
            <Play className="h-4 w-4 fill-current" aria-hidden />
          </span>
        </span>
      ) : null}
    </div>
  );
}
