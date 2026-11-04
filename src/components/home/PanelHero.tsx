"use client";

import { useState } from "react";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { QRMark } from "@/components/ui/QRMark";
import { cn } from "@/lib/cn";

/**
 * La mini app del hero: el panel de escritorio con el menú lateral que
 * funciona. Las vistas llegan ya renderizadas desde el server
 * (`components/app/panel.tsx`); acá solo se elige cuál se ve.
 */
export function PanelHero({
  menu,
  vistas,
}: {
  menu: { id: string; label: string; glifo: GlifoId }[];
  vistas: Record<string, React.ReactNode>;
}) {
  const [activa, setActiva] = useState(menu[0].id);
  const [tocado, setTocado] = useState(false);

  return (
    <div className="grid gap-2 rounded-[22px] bg-ink p-2 shadow-[var(--shadow-device)] transition-transform duration-500 ease-[var(--ease-ft)] sm:grid-cols-[124px_1fr] lg:[transform:perspective(1600px)_rotateY(-6deg)_rotateX(2deg)] lg:group-hover:[transform:none]">
      <nav aria-label="Secciones de la app de ejemplo" className="hidden content-start gap-1 px-1.5 py-2.5 text-[11.5px] text-muted-dark sm:grid">
        <span className="flex items-center gap-1.5 px-1.5 pb-2 text-[13px] font-semibold text-paper">
          <QRMark size={13} tone="paper" /> Café Rivas
        </span>
        {menu.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={activa === m.id}
            onClick={() => {
              setActiva(m.id);
              setTocado(true);
            }}
            className={cn(
              "flex min-h-8 items-center gap-1.5 rounded-lg px-2 py-1.5 text-left transition-colors duration-200",
              activa === m.id ? "bg-paper font-bold text-ink" : "hover:bg-white/10",
            )}
          >
            <Glifo id={m.glifo} size={13} />
            {m.label}
          </button>
        ))}
      </nav>

      <div className="relative min-h-[380px] rounded-2xl bg-paper p-4 text-[12px]">
        {!tocado && (
          <span
            aria-hidden="true"
            className="ft-nudge absolute -top-3.5 right-3.5 z-10 hidden rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-paper shadow-[var(--shadow-float)] sm:block"
          >
            Tocá el menú y recorré la app
          </span>
        )}
        <div key={activa} className="ft-fade">
          {vistas[activa]}
        </div>
      </div>
    </div>
  );
}
