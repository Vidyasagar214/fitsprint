import { MeshBackground } from "@/components/design/mesh-background";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("mesh-background min-h-screen", className)}>
      <MeshBackground />
      {children}
    </div>
  );
}
