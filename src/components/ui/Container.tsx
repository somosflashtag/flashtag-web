import { cn } from "@/lib/cn";

/** Contenedor: max-width 1200px, gutters 24/32/48 por breakpoint. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
