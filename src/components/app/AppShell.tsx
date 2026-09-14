import { cn } from "@/lib/cn";
import { QRMark } from "@/components/ui/QRMark";

/**
 * Chrome de la app: barra superior y navegación inferior.
 * Refleja las secciones reales de my.flashtag.tech: Inicio, QR, Links,
 * Reseñas, Fidelidad. Si la app cambia de secciones, se cambia acá.
 */
export type AppTab = "inicio" | "qr" | "links" | "resenas" | "fidelidad";

const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "inicio",
    label: "Inicio",
    icon: (
      <path d="M3 9.5 10 3l7 6.5V17H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
  {
    id: "qr",
    label: "QR",
    icon: (
      <>
        <rect x="3" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <rect x="11.5" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3" y="11.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 12h2v2h-2zM15 15h2v2h-2zM15 12h2M12 15v2" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: "links",
    label: "Links",
    icon: (
      <path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.5-2.5a3 3 0 0 0-4.2-4.2l-1 1M11.5 8.5a3 3 0 0 0-4.2 0L4.8 11a3 3 0 0 0 4.2 4.2l1-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    ),
  },
  {
    id: "resenas",
    label: "Reseñas",
    icon: (
      <path d="m10 3 2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 13.8 5.8 16l.8-4.7L3.2 8l4.7-.7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
  {
    id: "fidelidad",
    label: "Fidelidad",
    icon: (
      <path d="M10 16.5s-6-3.8-6-8.2A3.3 3.3 0 0 1 10 6a3.3 3.3 0 0 1 6 2.3c0 4.4-6 8.2-6 8.2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
];

export function AppShell({
  active,
  title,
  children,
  className,
}: {
  active: AppTab;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full flex-col bg-surface", className)}>
      {/* Barra superior */}
      <div className="flex items-center justify-between px-4 pb-2 pt-9">
        <div className="flex items-center gap-2">
          <QRMark size={14} />
          <span className="text-[13px] font-semibold text-ink">{title}</span>
        </div>
        <span className="flex size-6 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
          CR
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-3 pb-2">{children}</div>

      {/* Navegación inferior */}
      <nav
        aria-hidden="true"
        className="grid grid-cols-5 border-t border-line bg-paper px-1 pb-4 pt-2"
      >
        {tabs.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex flex-col items-center gap-0.5 text-[9px] font-medium",
              t.id === active ? "text-brand" : "text-muted",
            )}
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
              {t.icon}
            </svg>
            {t.label}
          </div>
        ))}
      </nav>
    </div>
  );
}
