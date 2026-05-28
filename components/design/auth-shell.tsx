import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function AuthShell({
  children,
  title,
  description,
  className,
}: AuthShellProps) {
  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      <div className="auth-card animate-fade-in-up">
        <div className="auth-card-accent" aria-hidden />
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
