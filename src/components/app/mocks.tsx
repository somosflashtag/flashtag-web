import { AppShell } from "./AppShell";
import { QRCode } from "@/components/ui/QRCode";
import { cn } from "@/lib/cn";

/**
 * PANTALLAS DE LA APP — maquetas en código.
 *
 * Reglas:
 *  - Solo tokens de marca. Ningún hex.
 *  - El comercio es ficticio ("Café Rivas"): es una demo, no prueba social.
 *  - Sin estado ni JS: son server components. El movimiento es CSS y respeta
 *    prefers-reduced-motion.
 *  - Cada una refleja una sección real de my.flashtag.tech. Si la app cambia,
 *    se cambia la maqueta, no al revés.
 */

export type MockId =
  | "dashboard"
  | "qr"
  | "links"
  | "resenas"
  | "metricas"
  | "fidelidad"
  | "ruleta"
  | "pixeles";

/* ---------- piezas comunes ---------- */

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-paper p-3 shadow-[var(--shadow-rest)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Stars({ n = 5, size = 10 }: { n?: number; size?: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          width={size}
          height={size}
          fill={i < n ? "var(--color-gold)" : "var(--color-line)"}
          aria-hidden="true"
        >
          <path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" />
        </svg>
      ))}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
      {children}
    </p>
  );
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data);
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 86}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("h-12 w-full", className)}
      aria-hidden="true"
    >
      <polyline
        points={`0,100 ${pts} 100,100`}
        fill="var(--color-brand)"
        opacity="0.12"
      />
      <polyline
        points={pts}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ---------- 1. Inicio / dashboard ---------- */

export function MockDashboard() {
  return (
    <AppShell active="inicio" title="Café Rivas">
      <div className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <Card>
            <Label>Escaneos · 7 días</Label>
            <p className="mt-1 text-[22px] font-semibold leading-none tnum">347</p>
            <p className="mt-1 text-[10px] font-medium text-teal tnum">+23% ↗</p>
          </Card>
          <Card>
            <Label>Reseñas nuevas</Label>
            <p className="mt-1 text-[22px] font-semibold leading-none tnum">12</p>
            <p className="mt-1 text-[10px] font-medium text-muted">3 sin responder</p>
          </Card>
        </div>
        <Card>
          <div className="flex items-center justify-between">
            <Label>Escaneos por día</Label>
            <span className="rounded-full bg-surface px-2 py-0.5 text-[9px] font-medium text-muted">
              Últimos 7 días
            </span>
          </div>
          <Sparkline data={[18, 24, 21, 39, 44, 62, 58]} className="mt-2" />
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <Label>Fidelidad</Label>
            <span className="text-[10px] font-medium text-brand">Ver</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[12px] font-semibold">28 canjes esta semana</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface">
                <div className="h-full w-[68%] rounded-full bg-brand" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-muted tnum">68%</span>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <span className="relative flex size-8 items-center justify-center rounded-full bg-brand-soft text-brand">
            <span className="ft-ping absolute inset-0 rounded-full border-2 border-brand" />
            <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
              <path d="M6 14a6 6 0 0 1 0-8M14 6a6 6 0 0 1 0 8M8.5 11.5a2 2 0 0 1 0-3M11.5 8.5a2 2 0 0 1 0 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold">Cartel de Google · NFC</p>
            <p className="text-[10px] text-muted">Último toque hace 2 min</p>
          </div>
          <span className="size-2 rounded-full bg-teal" />
        </Card>
      </div>
    </AppShell>
  );
}

/* ---------- 2. QR dinámico: editor de destino ---------- */

export function MockQR() {
  const destinos = [
    { label: "Promo de la semana", on: true },
    { label: "Menú de temporada", on: false },
    { label: "Formulario de turnos", on: false },
  ];
  return (
    <AppShell active="qr" title="Mis QR">
      <div className="space-y-2.5">
        <Card className="flex items-center gap-3">
          <div className="relative shrink-0 rounded-xl border border-line bg-paper p-1.5">
            <QRCode size={64} />
            <span
              aria-hidden="true"
              className="ft-scan pointer-events-none absolute inset-x-1.5 top-1.5 h-[3px] rounded-full bg-teal/80 shadow-[0_0_10px_var(--color-teal)]"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold">QR dinámico · Promo</p>
            <p className="text-[10px] text-muted">Creado en la app · activo</p>
            <p className="mt-1.5 text-[11px] font-semibold text-brand tnum">
              1.204 escaneos
            </p>
          </div>
        </Card>

        <Card>
          <Label>A dónde apunta hoy</Label>
          <ul className="mt-2 space-y-1.5">
            {destinos.map((d) => (
              <li
                key={d.label}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-2 text-[12px] font-medium",
                  d.on
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-line text-ink",
                )}
              >
                {d.label}
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full border",
                    d.on ? "border-brand bg-brand" : "border-line",
                  )}
                >
                  {d.on && (
                    <svg viewBox="0 0 10 10" width="8" height="8" fill="none" aria-hidden="true">
                      <path d="M2 5.2l2 2 4-4.4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-[11px] font-semibold text-paper">
            Guardar cambios
            <span className="text-[9px] font-medium text-white/60">
              Se aplica al instante
            </span>
          </div>
        </Card>

        {/* "Guardar como…" de la app: los formatos que baja el mismo QR.
            Los siete son los que genera de verdad (ver content/formatos.ts). */}
        <Card>
          <Label>Descargar</Label>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {["PNG", "JPEG", "SVG", "EPS", "PDF", "SVG Tiny", "ASCII"].map((f) => (
              <li
                key={f}
                className="rounded-lg border border-line px-2 py-1 text-[10px] font-semibold text-ink"
              >
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-[10px] font-medium text-muted">
            100 × 100 mm
            <span className="rounded-full bg-teal/10 px-2 py-0.5 font-semibold text-teal">
              CMYK
            </span>
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <Label>Cambios este mes</Label>
            <p className="text-[12px] font-semibold">4 · desde el celular</p>
          </div>
          <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
            En vivo
          </span>
        </Card>
      </div>
    </AppShell>
  );
}

/* ---------- 3. Link Page ---------- */

export function MockLinkPage() {
  const botones = [
    { label: "Pedir por WhatsApp", clics: 412, accent: true },
    { label: "Ver el menú", clics: 298 },
    { label: "Reservar mesa", clics: 145 },
    { label: "Cómo llegar", clics: 96 },
    { label: "Instagram", clics: 88 },
  ];
  return (
    <AppShell active="links" title="Link Page">
      <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-3 shadow-[var(--shadow-rest)]">
        <div className="flex flex-col items-center pt-1">
          <span className="flex size-12 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper">
            CR
          </span>
          <p className="mt-2 text-[13px] font-semibold">Café Rivas</p>
          <p className="text-[10px] text-muted">Palermo · abierto hasta 20:00</p>
        </div>
        <ul className="mt-3 space-y-1.5">
          {botones.map((b) => (
            <li
              key={b.label}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-[11px] font-semibold",
                b.accent
                  ? "bg-brand text-white"
                  : "border border-line bg-paper text-ink",
              )}
            >
              {b.label}
              <span
                className={cn(
                  "text-[9px] font-medium tnum",
                  b.accent ? "text-white/70" : "text-muted",
                )}
              >
                {b.clics} clics
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-2 text-center text-[9px] text-muted">
          Editás los botones desde la app · cambios al instante
        </p>
      </div>
    </AppShell>
  );
}

/* ---------- 4. Reseñas con IA ---------- */

export function MockResenas() {
  return (
    <AppShell active="resenas" title="Reseñas">
      <div className="space-y-2.5">
        <div className="flex gap-1.5">
          {["Todas · 12", "Automáticas · 9", "5 ★"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-medium",
                i === 1 ? "bg-ink text-paper" : "bg-paper text-muted",
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-surface text-[9px] font-bold">
                M
              </span>
              <div>
                <p className="text-[11px] font-semibold leading-none">Marina G.</p>
                <p className="mt-0.5 text-[9px] text-muted">Google · hace 2 h</p>
              </div>
            </div>
            <Stars n={5} />
          </div>
          <p className="mt-2 text-[11px] leading-snug text-ink/80">
            &ldquo;Muy buen café y atención rapidísima. Vuelvo seguro.&rdquo;
          </p>
          <div className="mt-2.5 rounded-xl border border-brand/30 bg-brand-soft p-2.5">
            <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-brand">
              <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor" aria-hidden="true">
                <path d="M6 0l1.2 3.6L11 4.8 7.2 6 6 9.6 4.8 6 1 4.8l3.8-1.2z" />
              </svg>
              Respondida automáticamente · voz de marca
            </p>
            <p className="mt-1 text-[11px] leading-snug">
              ¡Gracias, Marina! Nos alegra que te haya gustado. Te esperamos con
              el próximo cortado.
            </p>
            <div className="mt-2 flex gap-1.5">
              <span className="flex-1 rounded-lg bg-brand py-1.5 text-center text-[10px] font-semibold text-white">
                Ver en Google
              </span>
              <span className="flex-1 rounded-lg border border-line bg-paper py-1.5 text-center text-[10px] font-semibold">
                Ajustar voz
              </span>
            </div>
          </div>
        </Card>
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-surface text-[9px] font-bold">
              J
            </span>
            <div>
              <p className="text-[11px] font-semibold leading-none">Julián P.</p>
              <p className="mt-0.5 text-[9px] text-muted">Google · ayer</p>
            </div>
          </div>
          <Stars n={4} />
        </Card>
      </div>
    </AppShell>
  );
}

/* ---------- 5. Métricas ---------- */

export function MockMetricas() {
  const horas = [4, 6, 9, 14, 22, 31, 38, 27, 19, 33, 46, 40, 24, 12];
  const max = Math.max(...horas);
  const carteles = [
    { n: "Mostrador · Google", v: 62 },
    { n: "Vidriera · Instagram", v: 41 },
    { n: "Caja · WhatsApp", v: 28 },
  ];
  return (
    <AppShell active="inicio" title="Métricas">
      <div className="space-y-2">
        {/* Totales, únicos y visitas: tres números distintos, con granularidad */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5 rounded-lg bg-surface p-0.5">
              {["Día", "Mes", "Año"].map((g, i) => (
                <span
                  key={g}
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[9px] font-semibold",
                    i === 0 ? "bg-paper text-brand shadow-[var(--shadow-rest)]" : "text-muted",
                  )}
                >
                  {g}
                </span>
              ))}
            </div>
            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[9px] font-semibold text-teal">
              En tiempo real
            </span>
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
            {[
              { k: "Escaneos", v: "1.244", c: "bg-brand" },
              { k: "Únicos", v: "863", c: "bg-teal" },
              { k: "Visitas", v: "1.102", c: "bg-gold" },
            ].map((x) => (
              <div key={x.k} className="rounded-xl bg-surface py-1.5">
                <dt className="flex items-center justify-center gap-1 text-[9px] font-medium text-muted">
                  <span aria-hidden="true" className={cn("size-1.5 rounded-full", x.c)} />
                  {x.k}
                </dt>
                <dd className="text-[13px] font-semibold tnum">{x.v}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <Label>Interacciones por hora</Label>
            <span className="text-[10px] font-semibold text-brand">Pico 19:00</span>
          </div>
          <div className="mt-2.5 flex h-12 items-end gap-[3px]">
            {horas.map((h, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-t-sm",
                  h === max ? "bg-brand" : "bg-brand/25",
                )}
                style={{ height: `${(h / max) * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[8px] text-muted tnum">
            <span>8:00</span>
            <span>14:00</span>
            <span>21:00</span>
          </div>
        </Card>
        <Card>
          <Label>Qué cartel rinde más</Label>
          <ul className="mt-2 space-y-2">
            {carteles.map((c) => (
              <li key={c.n}>
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium">{c.n}</span>
                  <span className="font-semibold text-muted tnum">{c.v}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-teal"
                    style={{ width: `${c.v}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <Card>
            <Label>Giros de ruleta</Label>
            <p className="mt-1 text-[12px] font-semibold tnum">212</p>
          </Card>
          <Card>
            <Label>Nuevos en fidelidad</Label>
            <p className="mt-1 text-[12px] font-semibold tnum">38</p>
          </Card>
        </div>
        {/* El dato también viaja al stack del comercio */}
        <Card className="flex items-center justify-between gap-2 p-2.5">
          <div className="min-w-0">
            <Label>Integraciones</Label>
            <p className="truncate text-[11px] font-semibold">
              Píxel de Meta · Google Analytics
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-teal/10 px-2 py-0.5 text-[9px] font-semibold text-teal">
            Conectadas
          </span>
        </Card>
      </div>
    </AppShell>
  );
}

/* ---------- 6. Fidelidad ---------- */

export function MockFidelidad() {
  const sellos = 7;
  return (
    <AppShell active="fidelidad" title="Fidelidad">
      <div className="space-y-2.5">
        {/* Lo que ve el cliente en su teléfono */}
        <div className="surface-deep rounded-2xl p-3 text-paper">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold">Tarjeta de Café Rivas</p>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium">
              Marina G.
            </span>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-full border text-[10px]",
                  i < sellos
                    ? "border-gold bg-gold text-ink"
                    : "border-white/25 text-white/30",
                )}
              >
                {i < sellos ? "✓" : i + 1}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/80">
            <strong className="text-paper">3 visitas más</strong> y el café es
            gratis.
          </p>
          {/* Sin app: la tarjeta va a la billetera del teléfono. Solo texto,
              sin logos de terceros (AGENTS.md §7). */}
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {["Apple Wallet", "Google Wallet"].map((w) => (
              <span
                key={w}
                className="flex items-center justify-center gap-1 rounded-lg bg-paper py-1.5 text-[9px] font-semibold text-ink"
              >
                <svg viewBox="0 0 12 12" width="9" height="9" fill="none" aria-hidden="true">
                  <path d="M6 2v6M3.5 5.5 6 8l2.5-2.5M2.5 10h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Agregar a {w}
              </span>
            ))}
          </div>
        </div>

        {/* Lo que configura el comercio */}
        <Card>
          <div className="flex items-center justify-between">
            <Label>Premios activos</Label>
            <span className="text-[10px] font-semibold text-brand">Editar</span>
          </div>
          <ul className="mt-2 space-y-1.5 text-[11px]">
            {[
              ["Café gratis", "10 visitas"],
              ["15% en la próxima compra", "5 visitas"],
              ["Medialuna de regalo", "Primera reseña"],
            ].map(([p, c]) => (
              <li
                key={p}
                className="flex items-center justify-between rounded-xl border border-line px-3 py-2"
              >
                <span className="font-medium">{p}</span>
                <span className="text-[10px] text-muted">{c}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid grid-cols-2 gap-2.5">
          <Card>
            <Label>Miembros</Label>
            <p className="mt-1 text-[16px] font-semibold leading-none tnum">418</p>
          </Card>
          <Card>
            <Label>Canjes · mes</Label>
            <p className="mt-1 text-[16px] font-semibold leading-none tnum">96</p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

/* ---------- 7. Ruleta de premios ---------- */

export function MockRuleta() {
  const segs = [
    "15% off",
    "Café gratis",
    "Otra vez",
    "Medialuna",
    "2×1",
    "Sticker",
  ];
  const colors = [
    "var(--color-brand)",
    "var(--color-gold)",
    "var(--color-surface)",
    "var(--color-teal)",
    "var(--color-coral)",
    "var(--color-brand-soft)",
  ];
  const n = segs.length;
  const r = 50;
  const paths = segs.map((_, i) => {
    const a0 = (i / n) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const x0 = 50 + r * Math.cos(a0);
    const y0 = 50 + r * Math.sin(a0);
    const x1 = 50 + r * Math.cos(a1);
    const y1 = 50 + r * Math.sin(a1);
    return `M50 50 L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`;
  });

  return (
    <AppShell active="fidelidad" title="Ruleta">
      <div className="flex h-full flex-col">
        <Card className="text-center">
          <p className="text-[12px] font-semibold">¡Girá y ganá!</p>
          <p className="text-[10px] text-muted">Un giro por visita</p>
        </Card>
        <div className="relative mx-auto mt-3 w-[78%]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 -top-1 z-10 size-0 -translate-x-1/2 border-x-[7px] border-t-[12px] border-x-transparent border-t-ink"
          />
          <svg viewBox="0 0 100 100" className="ft-spin-slow w-full" aria-hidden="true">
            {paths.map((d, i) => (
              <path key={i} d={d} fill={colors[i]} stroke="var(--color-paper)" strokeWidth="0.8" />
            ))}
            <circle cx="50" cy="50" r="7" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.2" />
          </svg>
        </div>
        {/* Lo que configura el comercio: premio, color y suerte por casillero */}
        <Card className="mt-3 p-2.5">
          <div className="flex items-center justify-between">
            <Label>Premios · color · suerte</Label>
            <span className="text-[9px] font-semibold text-brand">Editar</span>
          </div>
          <ul className="mt-1.5 space-y-1 text-[9px] font-medium">
            {segs.map((s, i) => (
              <li key={s} className="flex items-center gap-1.5">
                <span className="size-2.5 shrink-0 rounded-full border border-line" style={{ background: colors[i] }} />
                <span className="flex-1 truncate">{s}</span>
                <span className="text-muted tnum">{[20, 5, 40, 15, 5, 15][i]}%</span>
              </li>
            ))}
          </ul>
        </Card>
        <div className="mt-auto rounded-xl bg-ink px-3 py-2 text-center text-[11px] font-semibold text-paper">
          Girar
        </div>
      </div>
    </AppShell>
  );
}

/* ---------- 8. Píxeles: "Análisis de seguimiento" ---------- */

/**
 * La sección Estadísticas del editor: tres campos de ID y el toggle de
 * eventos, con los mismos nombres que la app. Los IDs son inventados.
 */
export function MockPixeles() {
  const campos = [
    { label: "Google Analytics 4 ID", valor: "G-4K2P7XQ1ZB", activo: false },
    { label: "Meta Pixel ID", valor: "1029384756", activo: false },
    { label: "Google Tag Manager ID", valor: "GTM-K7P2QX4", activo: true },
  ];
  const eventos = [
    { e: "page_view", d: "Link Page", t: "hace 1 min" },
    { e: "click", d: "Pedir por WhatsApp", t: "hace 3 min" },
    { e: "scan", d: "QR · Promo", t: "hace 8 min" },
  ];
  return (
    <AppShell active="links" title="Link Page · Estadísticas">
      <div className="space-y-2.5">
        <Card>
          <Label>Análisis de seguimiento</Label>
          <ul className="mt-2 space-y-2">
            {campos.map((c) => (
              <li key={c.label}>
                <p className="text-[10px] font-medium text-muted">{c.label}</p>
                <p
                  className={cn(
                    "mt-1 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] tnum",
                    c.activo
                      ? "border-brand bg-brand-soft text-ink ring-2 ring-brand/20"
                      : "border-line bg-paper text-ink",
                  )}
                >
                  {c.valor}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="relative h-4 w-7 shrink-0 rounded-full bg-brand">
              <span className="absolute right-0.5 top-0.5 size-3 rounded-full bg-paper" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold leading-none">Seguimiento de eventos</p>
              <p className="mt-0.5 text-[9px] leading-snug text-muted">
                Cada clic en un botón llega a tus herramientas.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <Label>Últimos eventos enviados</Label>
            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[9px] font-semibold text-teal">
              En vivo
            </span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {eventos.map((ev) => (
              <li
                key={ev.e + ev.d}
                className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-1.5"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-teal" />
                <span className="font-mono text-[10px] font-semibold text-brand">{ev.e}</span>
                <span className="min-w-0 flex-1 truncate text-[10px] font-medium">{ev.d}</span>
                <span className="text-[9px] text-muted">{ev.t}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-[11px] font-semibold text-paper">
          Guardar cambios
          <span className="text-[9px] font-medium text-white/60">Sin instalar nada</span>
        </div>
      </div>
    </AppShell>
  );
}

/* ---------- índice ---------- */

export const mocks: Record<MockId, () => React.JSX.Element> = {
  dashboard: MockDashboard,
  qr: MockQR,
  links: MockLinkPage,
  resenas: MockResenas,
  metricas: MockMetricas,
  fidelidad: MockFidelidad,
  ruleta: MockRuleta,
  pixeles: MockPixeles,
};

export function Mock({ id }: { id: MockId }) {
  const C = mocks[id];
  return <C />;
}
