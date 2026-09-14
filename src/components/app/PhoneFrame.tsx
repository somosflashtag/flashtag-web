import { cn } from "@/lib/cn";

/**
 * Marco de teléfono para las maquetas de la app.
 * Proporción 9:19.5, bordes de dispositivo, sin marca de ningún fabricante.
 * El contenido es un componente React: nunca una captura que envejece.
 */
export function PhoneFrame({
  children,
  className,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[320px]", className)}>
      {glow && (
        <div
          aria-hidden="true"
          className="glow-brand absolute -inset-x-5 -inset-y-10 -z-10"
        />
      )}
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.6rem] border-[6px] border-ink bg-ink shadow-[var(--shadow-device)]">
        {/* Notch */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-ink"
        />
        <div className="flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-paper">
          {children}
        </div>
      </div>
    </div>
  );
}
