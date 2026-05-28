import { cn } from "@/lib/utils";

export function AdminPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("admin-page-content animate-fade-in-up", className)}>
      {children}
    </div>
  );
}
