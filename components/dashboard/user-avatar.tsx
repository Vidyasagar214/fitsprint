import Image from "next/image";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { box: "h-8 w-8", text: "text-xs", px: 32 },
  md: { box: "h-10 w-10", text: "text-sm", px: 40 },
  lg: { box: "h-14 w-14", text: "text-lg", px: 56 },
};

export function UserAvatar({ src, name, size = "md", className }: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const s = sizes[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={s.px}
        height={s.px}
        className={cn("rounded-full object-cover ring-2 ring-white/10", s.box, className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--glow-blue)] to-[var(--glow-purple)] font-bold text-white ring-2 ring-white/10",
        s.box,
        s.text,
        className,
      )}
    >
      {initial}
    </span>
  );
}
