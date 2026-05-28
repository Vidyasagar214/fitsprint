import Link from "next/link";
import { cn } from "@/lib/utils";

/** Horizontal wordmark — /public/fitsprint-logo.png (transparent PNG) */
const SIZES = {
  sm: { height: 44, width: 200 },
  md: { height: 56, width: 260 },
  lg: { height: 64, width: 300 },
  xl: { height: 88, width: 400 },
  hero: { height: 112, width: 520 },
} as const;

type FitSprintLogoProps = {
  href?: string;
  className?: string;
  size?: keyof typeof SIZES;
  priority?: boolean;
};

export function FitSprintLogo({
  href = "/",
  className,
  size = "md",
  priority = false,
}: FitSprintLogoProps) {
  const { width, height } = SIZES[size];

  const image = (
    // Native img preserves PNG alpha channel
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/fitsprint-logo.png"
      alt="FitSprint"
      width={width}
      height={height}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn(
        "fitsprint-logo-img block w-auto max-w-none bg-transparent object-contain object-left",
        className,
      )}
      style={{ height: `${height}px`, width: "auto", maxWidth: `${width}px` }}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex max-w-full shrink-0 rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="FitSprint home"
      >
        {image}
      </Link>
    );
  }

  return <span className="inline-flex max-w-full shrink-0 bg-transparent">{image}</span>;
}
