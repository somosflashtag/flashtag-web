import { cn } from "@/lib/cn";
import { eventos } from "@/content/pixeles";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";

/**
 * MAQUETAS DEL PANEL — la versión de escritorio de my.flashtag.tech.
 *
 * Complementan a `mocks.tsx` (que son las pantallas en el teléfono). Mismas
 * reglas (AGENTS.md §5): en código, con tokens, sin JS. El que elige qué
 * pantalla se ve es el componente cliente que las envuelve (`PanelHero`,
 * `Pilares`); acá cada pantalla es un componente puro.
 *
 * El comercio es Café Rivas, ficticio. Las personas y los competidores
 * también son inventados: es demo, no prueba social.
 */

/* ---------- Piezas ---------- */

export function Etiqueta({
  children,
  tono = "brand",
  className,
}: {
  children: React.ReactNode;
  tono?: "brand" | "teal" | "gold" | "coral" | "ink";
  className?: string;
}) {
  const tonos = {
    brand: "bg-brand-soft text-brand",
    teal: "bg-teal/10 text-ink",
    gold: "bg-gold/25 text-ink",
    coral: "bg-coral/15 text-ink",
    ink: "bg-ink text-paper",
  };
  return (
    <span className={cn("inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-bold", tonos[tono], className)}>
      {children}
    </span>
  );
}

function Fila({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 border-t border-line py-2.5 text-[12.5px] first:border-t-0", className)}>
      {children}
    </div>
  );
}

function Der({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("ml-auto text-right", className)}>{children}</span>;
}

function Kpis({ items }: { items: { label: string; valor: React.ReactNode }[] }) {
  return (
    <div className="mb-3 grid grid-cols-3 gap-2">
      {items.map((k) => (
        <div key={k.label} className="rounded-xl bg-surface/60 p-2.5 text-[10.5px] text-muted">
          {k.label}
          <b className="mt-0.5 block font-display text-[17px] font-semibold text-ink tnum">{k.valor}</b>
        </div>
      ))}
    </div>
  );
}

function Barra({ label, pct, valor, tono = "brand" }: { label: string; pct: number; valor: React.ReactNode; tono?: "brand" | "teal" | "coral" }) {
  const color = { brand: "bg-brand", teal: "bg-teal", coral: "bg-coral" }[tono];
  return (
    <div className="grid grid-cols-[88px_1fr_36px] items-center gap-2.5 py-1 text-[12px]">
      <span className="truncate">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <i className={cn("block h-full rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
      <b className="text-right tnum">{valor}</b>
    </div>
  );
}

export function Estrellas({ n = 5, className }: { n?: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-px align-middle", className)} aria-label={`${n} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" width="10" height="10" fill={i < n ? "var(--color-gold)" : "var(--color-line)"} aria-hidden="true">
          <path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" />
        </svg>
      ))}
    </span>
  );
}

function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[10px] font-bold text-brand">
      {children}
    </span>
  );
}

function Titulo({ titulo, bajada }: { titulo: string; bajada: React.ReactNode }) {
  return (
    <>
      <h4 className="font-display text-[16px] font-semibold">{titulo}</h4>
      <p className="mb-3 mt-0.5 text-[12.5px] text-muted">{bajada}</p>
    </>
  );
}

function Respuesta({ children, titulo = "Tu respuesta publicada" }: { children: React.ReactNode; titulo?: string }) {
  return (
    <div className="mt-2 rounded-xl border border-teal/30 bg-teal/5 px-3 py-2 text-[12px]">
      <small className="mb-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-ink">
        <Glifo id="check" size={11} className="text-teal" /> {titulo}
      </small>
      {children}
    </div>
  );
}

function Burbuja({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-[14px_14px_14px_4px] bg-teal/10 px-3 py-2.5 text-left text-[12px] leading-relaxed">
      {children}
    </div>
  );
}

/** Teléfono chico, para las pantallas que el cliente ve en su celular. */
function MiniTelefono({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[230px] rounded-[30px] bg-ink p-2.5 shadow-[var(--shadow-device)]">
      <div className="min-h-[330px] rounded-[22px] bg-paper p-4 text-center text-[12px]">{children}</div>
    </div>
  );
}

function BotonLP({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("mt-2 block rounded-xl border border-line px-3 py-2 text-[11.5px] font-semibold", className)}>
      {children}
    </span>
  );
}

function Sellos({ hechos, total, columnas = Math.min(total, 8) }: { hechos: number; total: number; columnas?: number }) {
  return (
    <ul className="my-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))` }}>
      {Array.from({ length: total }).map((_, i) => (
        <li
          key={i}
          className={cn(
            "flex aspect-square items-center justify-center rounded-full text-[10px] font-bold",
            i < hechos ? "bg-gold text-ink" : "border-2 border-dashed border-white/35",
          )}
        >
          {i < hechos ? "✓" : i === total - 1 ? <Glifo id="corona" size={11} /> : null}
        </li>
      ))}
    </ul>
  );
}

function ClubWallet({ hechos = 3, total = 8, compacto = false }: { hechos?: number; total?: number; compacto?: boolean }) {
  return (
    <div className="rounded-2xl bg-ink p-4 text-left text-paper">
      <div className="flex items-start">
        <b className={compacto ? "text-[13px]" : "font-display text-[16px]"}>Club Rivas</b>
        <span className="ml-auto text-right text-[9.5px] uppercase tracking-wide text-white/70">
          Sellos
          <b className="block text-[15px] normal-case tracking-normal text-paper tnum">
            {hechos} de {total}
          </b>
        </span>
      </div>
      <Sellos hechos={hechos} total={total} />
      <b className="text-[11.5px]">Te faltan {total - hechos} sellos para tu premio</b>
    </div>
  );
}

/* ================================================================
   MINI APP DEL HERO — siete vistas del menú lateral
   ================================================================ */

export const menuPanel: { id: string; label: string; glifo: GlifoId }[] = [
  { id: "inicio", label: "Inicio", glifo: "menu" },
  { id: "experiencias", label: "Experiencias", glifo: "chispa" },
  { id: "google", label: "Google", glifo: "google" },
  { id: "lealtad", label: "Lealtad", glifo: "corona" },
  { id: "cumple", label: "Cumpleaños", glifo: "torta" },
  { id: "contactos", label: "Contactos", glifo: "persona" },
  { id: "anuncios", label: "Anuncios", glifo: "objetivo" },
];

function Cabecera({ titulo, bajada }: { titulo: string; bajada: string }) {
  return (
    <p className="mb-2.5 font-display text-[15px] font-semibold">
      {titulo}
      <small className="block font-sans text-[11px] font-normal text-muted">{bajada}</small>
    </p>
  );
}

function KpiFila({ items }: { items: { label: string; valor: React.ReactNode }[] }) {
  return (
    <div className="flex justify-between gap-1.5 border-b border-line pb-2.5 text-[10px] text-muted">
      {items.map((k) => (
        <div key={k.label}>
          {k.label}
          <b className="block text-[13px] text-ink tnum">{k.valor}</b>
        </div>
      ))}
    </div>
  );
}

function Tile({ glifo, titulo, texto, accion }: { glifo: GlifoId; titulo: string; texto: string; accion?: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-line p-2.5 text-[11px] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/50">
      <span className="flex size-7 items-center justify-center rounded-lg bg-brand-soft text-brand">
        <Glifo id={glifo} size={14} />
      </span>
      <b className="mt-1 text-[12px]">{titulo}</b>
      <span className="text-muted">{texto}</span>
      {accion && <span className="mt-0.5 font-bold text-brand">＋ {accion}</span>}
    </div>
  );
}

function MiniFila({ label, valor }: { label: string; valor: React.ReactNode }) {
  return (
    <div className="mt-1.5 flex justify-between gap-2.5 border-t border-line py-2 text-[11px]">
      <span className="text-muted">{label}</span>
      <b className="text-right">{valor}</b>
    </div>
  );
}

export function VistaInicio() {
  return (
    <>
      <KpiFila
        items={[
          { label: "Vistas (90 d)", valor: "1.121" },
          { label: "Reseñas", valor: "173" },
          { label: "Google", valor: "4,4 ★" },
          { label: "Respuesta", valor: "87%" },
        ]}
      />
      <p className="mx-auto mb-3 mt-5 max-w-[300px] text-balance text-center font-display text-[17px] font-semibold leading-tight">
        ¡Hola, Café Rivas! Acá tenés todo para hacer crecer tu negocio.
      </p>
      <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 text-[11.5px] text-muted shadow-[var(--shadow-rest)]">
        <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-paper">F</span>
        Preguntale a Flashy: “¿qué local rindió mejor?”
      </div>
      <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
        <span className="rounded-full border border-line px-2 py-1 text-[10px] font-semibold">
          Responder reseñas <em className="rounded bg-coral/15 px-1 not-italic text-ink">22</em>
        </span>
        <span className="rounded-full border border-line px-2 py-1 text-[10px] font-semibold">Cómo va cada local</span>
        <span className="rounded-full border border-line px-2 py-1 text-[10px] font-semibold">Mi cartel más fuerte</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-[10.5px] text-muted">
        {[
          ["22 reseñas sin responder", "Google premia a los que responden"],
          ["37 escaneos sin asignar", "7 productos sin sucursal"],
          ["Líder del equipo: Sofi", "39 pedidos de reseña"],
          ["Tu ficha: 100/100", "Protección activa"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-line p-2.5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/50">
            <b className="block text-[11.5px] text-ink">{t}</b>
            {d}
          </div>
        ))}
      </div>
    </>
  );
}

export function VistaExperiencias() {
  return (
    <>
      <Cabecera titulo="Experiencias" bajada="Lo que tus clientes escanean o tocan" />
      <div className="grid grid-cols-2 gap-2">
        <Tile glifo="qr" titulo="Código QR" texto="Cambiás el destino sin reimprimir" accion="Crear" />
        <Tile glifo="link" titulo="Link Page" texto="Tu minisitio con métricas por botón" accion="Crear" />
        <Tile glifo="ruleta" titulo="Ruleta" texto="Premios a cambio de un contacto" accion="Crear" />
        <Tile glifo="tarjeta" titulo="FlashCard" texto="Tu tarjeta digital por NFC" accion="Crear" />
      </div>
      <MiniFila label="Formatos de descarga" valor="PNG · JPEG · SVG · EPS · PDF" />
    </>
  );
}

export function VistaGoogle() {
  return (
    <>
      <Cabecera titulo="Google Tu Negocio" bajada="Café Rivas · Palermo" />
      <KpiFila
        items={[
          { label: "Promedio", valor: "4,4 ★" },
          { label: "Reseñas", valor: "173" },
          { label: "Respuesta", valor: "87%" },
          { label: "Sin responder", valor: "22" },
        ]}
      />
      <div className="mt-2.5 rounded-xl border border-line p-2.5 text-[11px]">
        <b>Daniel H.</b> <Estrellas />
        <p className="my-0.5 text-muted">Muy buena atención y el café, impecable.</p>
        <Respuesta titulo="Respuesta publicada">¡Gracias, Daniel! Nos alegra que lo hayas disfrutado…</Respuesta>
      </div>
      <MiniFila label="«café de especialidad»" valor="Top 3 en 9 de 49 · 2° en la zona" />
      <MiniFila label="Auditoría de la ficha" valor="100/100" />
    </>
  );
}

export function VistaLealtad() {
  return (
    <>
      <Cabecera titulo="Programa de lealtad" bajada="Tarjeta de sellos en Apple y Google Wallet" />
      <ClubWallet compacto />
      <MiniFila label="Modo caja" valor="Cada empleado con su PIN de 4 dígitos" />
      <MiniFila label="Extras" valor="Gift card · Multipases · Cupones" />
      <MiniFila label="Métricas" valor="En riesgo · tasa de canje · frecuencia" />
    </>
  );
}

export function VistaCumple() {
  return (
    <>
      <Cabecera titulo="Cumpleaños" bajada="Un saludo por WhatsApp con un regalo" />
      <Burbuja>
        ¡Feliz cumple, Ana! De parte de Café Rivas te regalamos un café con torta. Mostrá este código cuando vengas:{" "}
        <b>CUMPLE-7K2QX</b>. Vale hasta el 11/11.
      </Burbuja>
      <MiniFila label="Sale" valor="3 días antes, a las 10 de la mañana" />
      <MiniFila label="El cupón vale" valor="3, 7, 15 o 30 días" />
      <MiniFila label="Llega a" valor="Clientes del club y del WiFi" />
    </>
  );
}

export function VistaContactos() {
  return (
    <>
      <Cabecera titulo="Contactos" bajada="Una base con todos los que dejaron sus datos" />
      <div className="grid grid-cols-2 gap-2">
        <Tile glifo="corona" titulo="Club" texto="Nombre, WhatsApp y cumple" />
        <Tile glifo="ruleta" titulo="Ruleta" texto="Quién jugó, qué ganó y si canjeó" />
        <Tile glifo="wifi" titulo="WiFi dinámico" texto="Teléfono antes de conectarse" />
        <Tile glifo="escudo" titulo="Filtro de reseñas" texto="Las quejas en privado" />
      </div>
      <MiniFila label="Exportar" valor="CSV con un clic" />
    </>
  );
}

export function VistaAnuncios() {
  return (
    <>
      <Cabecera titulo="Anuncios y medición" bajada="Pegás tus IDs una vez y aplica a todo" />
      <MiniFila label="Meta Pixel · GA4 · Tag Manager" valor={<span className="inline-flex items-center gap-1"><i className="size-1.5 rounded-full bg-teal" />Conectados</span>} />
      {eventos.map((e) => (
        <MiniFila key={e.nombre} label={e.nombre} valor="GA4 · Meta" />
      ))}
    </>
  );
}

export const vistasHero: Record<string, () => React.JSX.Element> = {
  inicio: VistaInicio,
  experiencias: VistaExperiencias,
  google: VistaGoogle,
  lealtad: VistaLealtad,
  cumple: VistaCumple,
  contactos: VistaContactos,
  anuncios: VistaAnuncios,
};

/* ================================================================
   PILARES — una pantalla por funcionalidad
   ================================================================ */

function BotonChico({ children, primario = false }: { children: React.ReactNode; primario?: boolean }) {
  return (
    <span
      className={cn(
        "ml-auto rounded-lg px-2.5 py-1 text-[11px] font-bold",
        primario ? "bg-brand text-paper" : "border border-line",
      )}
    >
      {children}
    </span>
  );
}

function Dato({ children }: { children: React.ReactNode }) {
  return <span className="w-[84px] shrink-0 text-muted">{children}</span>;
}

/* Que te encuentren */

function PantallaFicha() {
  return (
    <>
      <Titulo titulo="Gestionar perfil" bajada="Editás tu ficha de Google desde FlashTag. Los cambios se publican al guardar." />
      <Kpis items={[{ label: "Auditoría", valor: "100/100" }, { label: "Vistas (90 d)", valor: "1.121" }, { label: "Cómo llegar", valor: "131" }]} />
      <Fila><Dato>Horario</Dato><b>Lunes a domingo · 8 a 21</b><BotonChico>Editar</BotonChico></Fila>
      <Fila><Dato>Feriados</Dato><b>Sin fechas especiales</b><BotonChico primario>Agregar</BotonChico></Fila>
      <Fila><Dato>Fotos</Dato><b>9 fotos · portada y logo</b><BotonChico>Subir</BotonChico></Fila>
      <Fila><Dato>Publicación</Dato><b className="min-w-0 truncate">“Volvió el chocolate caliente”</b><Der><Etiqueta tono="teal">Publicado</Etiqueta></Der></Fila>
    </>
  );
}

const grilla49: (number | "vos")[] = [
  0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 4, 12, 0,
  4, 4, 3, 0, 3, 4, 1,
  0, 0, 1, "vos", 0, 4, 1,
  12, 5, 3, 1, 0, 12, 0,
  0, 0, 3, 0, 14, 0, 0,
  0, 0, 3, 4, 4, 0, 0,
];

function PantallaMaps() {
  return (
    <>
      <Titulo titulo="«café de especialidad»" bajada="49 puntos cada 1 km · top 3 en 9 de 49 · puesto promedio 5" />
      <Kpis items={[{ label: "En el top 3", valor: "9 de 49" }, { label: "Visibilidad", valor: "38" }, { label: "Ranking zona", valor: "2°" }]} />
      <div className="grid grid-cols-7 gap-1 rounded-2xl bg-surface/60 p-3" aria-hidden="true">
        {grilla49.map((v, i) => (
          <b
            key={i}
            className={cn(
              "flex aspect-square items-center justify-center rounded-full text-[10px] font-bold transition-transform duration-200 hover:scale-125",
              v === "vos" ? "bg-brand text-paper" : v === 0 ? "bg-line text-muted" : v <= 3 ? "bg-teal text-ink" : v <= 10 ? "bg-gold text-ink" : "bg-coral text-paper",
            )}
          >
            {v === "vos" ? <Glifo id="ubicacion" size={11} /> : v === 0 ? "–" : v}
          </b>
        ))}
      </div>
      <Fila className="mt-2"><Etiqueta>Qué hacer para subir</Etiqueta><span>Respondé las reseñas: 15 de 21 en los últimos 90 días</span></Fila>
      <a href="#simulador" className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-[13px] font-bold text-brand underline-offset-4 hover:underline">
        Probá el simulador con tu rubro <span aria-hidden="true">↓</span>
      </a>
    </>
  );
}

function PantallaProteccion() {
  return (
    <>
      <Titulo titulo="Protección del perfil" bajada="Cualquiera puede sugerir cambios en tu ficha desde Maps. Revisamos cada 15 minutos." />
      <Fila><span className="size-2 rounded-full bg-teal" /><b>Activado · última revisión hace 12 min</b></Fila>
      <Fila><Glifo id="repetir" size={14} /><b>Revertimos solos</b><Der className="text-muted">horario, teléfono, web, descripción y estado</Der></Fila>
      <Fila><Glifo id="alerta" size={14} /><b>Te avisamos</b><Der className="text-muted">nombre, dirección y categoría</Der></Fila>
      <Fila><Glifo id="check" size={14} /><b>Auditoría de la ficha</b><Der><Etiqueta tono="teal">100/100</Etiqueta></Der></Fila>
    </>
  );
}

function PantallaCompetidores() {
  return (
    <>
      <Titulo titulo="Competidores" bajada="Tu valoración y tus reseñas al lado de las de tu zona, con datos de Google." />
      <Fila><b>1 · Café Lumbre</b><Der>★ 4,8 · 193</Der></Fila>
      <Fila className="-mx-2.5 rounded-lg bg-brand-soft px-2.5"><b>2 · Café Rivas</b><Etiqueta>vos</Etiqueta><Der>★ 4,4 · 173</Der></Fila>
      <Fila><b>3 · La Esquina Tostada</b><Der>★ 4,3 · 120</Der></Fila>
      <Fila><Etiqueta>Te faltan 21 reseñas para alcanzar al 1°</Etiqueta></Fila>
      <Fila><span className="text-muted">Seguís hasta 10 competidores · se actualiza todos los días</span></Fila>
    </>
  );
}

/* Que te elijan */

function PantallaIA() {
  return (
    <>
      <Titulo titulo="Responder reseñas" bajada={<>Tasa de respuesta <b>87%</b> · promedio <b>4,4 ★</b> · autopublica <b>solo 4 y 5 ★</b></>} />
      <Fila className="items-start">
        <Avatar>DH</Avatar>
        <div><b>Daniel H.</b> <Estrellas /><p className="text-muted">Muy buena atención y el café, impecable. Lo recomiendo.</p></div>
      </Fila>
      <Respuesta>¡Gracias, Daniel! Nos alegra que hayas disfrutado el café y la atención. Te esperamos pronto. Café Rivas</Respuesta>
      <Fila className="mt-2 items-start">
        <Avatar>NM</Avatar>
        <div><b>Norma M.</b> <Estrellas /><p className="text-muted">Lindo lugar, a la tarde se llena pero vale la pena.</p></div>
        <Der><Etiqueta tono="teal">Respondida</Etiqueta></Der>
      </Fila>
    </>
  );
}

function PantallaFiltro() {
  return (
    <MiniTelefono>
      <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand"><Glifo id="taza" size={22} /></span>
      <b className="mt-1 block">Café Rivas</b>
      <p className="mt-0.5 text-muted">¿Cómo fue tu experiencia?</p>
      <p className="mb-1 mt-4 flex justify-center gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 12 12" width="24" height="24" fill="var(--color-line)"><path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" /></svg>
        ))}
      </p>
      <p className="text-[10px] text-muted">Tocá las estrellitas para puntuar</p>
      <BotonLP className="text-left font-normal text-muted">¿Qué podríamos hacer mejor?</BotonLP>
      <BotonLP className="text-left font-normal text-muted">Tu teléfono (opcional)</BotonLP>
      <BotonLP className="border-ink bg-ink text-paper">Enviar</BotonLP>
      <p className="mt-2.5 text-[10px] text-muted underline">También podés dejar tu reseña en Google</p>
    </MiniTelefono>
  );
}

function PantallaSentimiento() {
  return (
    <>
      <Titulo titulo="Análisis de sentimiento" bajada="Analizamos 165 de 173 reseñas · 75% positivas" />
      <Barra label="Atención" pct={56} valor="56%" tono="teal" />
      <Barra label="Calidad" pct={67} valor="67%" tono="teal" />
      <Barra label="Ambiente" pct={48} valor="48%" tono="teal" />
      <Barra label="Espera" pct={12} valor="12%" tono="coral" />
      <Barra label="Precio" pct={18} valor="18%" tono="coral" />
      <Fila className="mt-2"><Etiqueta tono="gold">Lo primero que arreglaría</Etiqueta><span>La espera al mediodía</span></Fila>
    </>
  );
}

function PantallaEquipo() {
  return (
    <>
      <Titulo titulo="Ranking del equipo" bajada="Asignás cada producto FlashTag a un local y a una persona." />
      <Kpis items={[{ label: "Pedidos de reseña", valor: "39" }, { label: "Personas activas", valor: "3" }, { label: "Líder", valor: "Sofi" }]} />
      <Fila><b className="w-4 text-brand">1</b><Avatar>S</Avatar><b>Sofi</b><Etiqueta>Tarjeta NFC</Etiqueta><Der><b>39 pedidos</b></Der></Fila>
      <Fila><b className="w-4 text-brand">2</b><Avatar>J</Avatar><b>Juli</b><Etiqueta>Cartel</Etiqueta><Der><b>24 pedidos</b></Der></Fila>
      <Fila><b className="w-4 text-brand">3</b><Avatar>M</Avatar><b>Martín</b><Der><Etiqueta tono="gold">Sin producto asignado</Etiqueta></Der></Fila>
      <Fila><Etiqueta>Widget</Etiqueta><span>144 reseñas de 5 ★ listas para mostrar en tu web</span></Fila>
    </>
  );
}

/* Que te escriban */

function PantallaQR() {
  return (
    <>
      <Titulo titulo="Ranking de escaneos" bajada="De la ciudad o de afuera: sale de dónde estaba el celular al escanear." />
      <Kpis items={[{ label: "De la ciudad", valor: "44%" }, { label: "De afuera", valor: "56%" }, { label: "Sin escaneos", valor: "0" }]} />
      <Barra label="Palermo" pct={100} valor="412" />
      <Barra label="Nordelta" pct={46} valor="190" />
      <Barra label="Belgrano" pct={30} valor="124" />
      <Fila className="mt-2"><span className="text-muted">QR dinámicos en PNG, JPEG, SVG, EPS, PDF y ASCII · mapa de calor por día y hora</span></Fila>
    </>
  );
}

function PantallaLinkPage() {
  return (
    <MiniTelefono>
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand"><Glifo id="taza" size={26} /></span>
      <b className="mt-1.5 block">Café Rivas</b>
      <p className="text-[11px] text-muted">Café de especialidad · Palermo</p>
      <BotonLP className="border-brand bg-brand text-paper">Escribinos por WhatsApp</BotonLP>
      <BotonLP>Dejanos tu reseña</BotonLP>
      <BotonLP>Instagram</BotonLP>
      <BotonLP>Ver el menú</BotonLP>
      <p className="mt-2.5 text-[10px] text-muted">Métricas por botón</p>
    </MiniTelefono>
  );
}

function PantallaRuleta() {
  return (
    <MiniTelefono>
      <b>Ruleta de premios</b>
      <p className="text-[11px] text-muted">Girá y llevate un regalo</p>
      <div
        aria-hidden="true"
        className="mx-auto my-4 size-[150px] rounded-full shadow-[inset_0_0_0_6px_var(--color-paper),0_0_0_2px_var(--color-line)]"
        style={{ background: "conic-gradient(var(--color-brand) 0 25%, var(--color-coral) 0 50%, var(--color-gold) 0 75%, var(--color-teal) 0)" }}
      />
      <BotonLP className="text-left font-normal text-muted">Tu email para recibir el premio</BotonLP>
      <BotonLP className="border-ink bg-ink text-paper">Girar</BotonLP>
      <p className="mt-2 text-[10px] text-muted">Cada jugada suma un contacto a tu base</p>
    </MiniTelefono>
  );
}

function PantallaFlashCard() {
  return (
    <>
      <Titulo titulo="FlashCard, WiFi y cobros" bajada="Tu tarjeta de presentación digital: la compartís por QR o link y se actualiza sola." />
      <Fila><Etiqueta>FlashCard</Etiqueta><span>El QR y el link quedan listos en el acto</span></Fila>
      <Fila><Etiqueta>WiFi dinámico</Etiqueta><span>Pedí teléfono y cumpleaños antes de conectarse</span></Fila>
      <Fila><Etiqueta tono="teal">Mercado Pago</Etiqueta><span>Quien escanea escribe el monto y te paga</span></Fila>
      <Fila><Etiqueta>Contactos</Etiqueta><span>Quién jugó, qué ganó y si vino a canjearlo</span></Fila>
    </>
  );
}

/* Que vuelvan */

function PantallaClub() {
  return (
    <div className="mx-auto max-w-[300px]">
      <ClubWallet />
      <div className="mt-3 rounded-xl bg-surface/70 p-2.5 text-center font-mono text-[11px] tracking-widest text-muted">
        ABCD-EFGH-JKLM
        <span className="block font-sans tracking-normal">Mostralo en la caja para sumar sellos</span>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        <Etiqueta>Apple Wallet</Etiqueta>
        <Etiqueta>Google Wallet</Etiqueta>
        <Etiqueta>Web</Etiqueta>
      </div>
    </div>
  );
}

function PantallaCaja() {
  return (
    <>
      <Titulo titulo="Modo caja y staff" bajada="Quienes pueden sumar sellos y canjear premios, cada uno con su PIN de 4 dígitos." />
      <Fila><Glifo id="celular" size={14} /><b>El cliente muestra su tarjeta</b><Der className="text-muted">desde la Wallet o la web</Der></Fila>
      <Fila><Glifo id="teclado" size={14} /><b>Tu empleado escanea o lo busca</b><Der className="text-muted">por nombre o WhatsApp</Der></Fila>
      <Fila><Glifo id="check" size={14} /><b>Sello sumado al instante</b><Der className="text-muted">con antifraude entre sellos</Der></Fila>
      <Fila><Etiqueta>Extras</Etiqueta><span>Sello de bienvenida · sello doble en horario valle</span></Fila>
    </>
  );
}

function PantallaCumple() {
  return (
    <>
      <Titulo titulo="Cumpleaños" bajada="El cumple de cada cliente del WiFi o del club: un saludo por WhatsApp con regalo y código." />
      <Burbuja>
        ¡Feliz cumple, Ana! De parte de Café Rivas te regalamos un café con torta. Mostrá este código cuando vengas:{" "}
        <b>CUMPLE-7K2QX</b>. Vale hasta el 11/11.
      </Burbuja>
      <Fila className="mt-3"><Etiqueta tono="teal">Sale a las 10 de la mañana</Etiqueta><Der>3 días antes · una vez por año</Der></Fila>
    </>
  );
}

function PantallaRiesgo() {
  return (
    <>
      <Titulo titulo="Métricas del club" bajada="Cuántos clientes vuelven, cada cuánto y quiénes se están yendo." />
      <Fila><Glifo id="persona" size={14} /><b>Miembros y activos en 30 días</b></Fila>
      <Fila><Glifo id="alerta" size={14} /><b>En riesgo</b><Der className="text-muted">vinieron, pero hace más de 30 días que no vuelven</Der></Fila>
      <Fila><Glifo id="corona" size={14} /><b>Con premio listo y tasa de canje</b></Fila>
      <Fila><Glifo id="repetir" size={14} /><b>Cada cuánto vuelven</b><Der className="text-muted">y cómo llevan la tarjeta</Der></Fila>
    </>
  );
}

/* Medí y vendé más */

const vistas30 = [7, 14, 30, 17, 15, 4, 6, 14, 6, 8, 7, 7, 5, 13, 7, 15, 7, 10, 1, 9, 13, 5, 8, 3, 6, 11, 9, 12];

function PantallaMetricas() {
  const W = 400;
  const H = 110;
  const bw = W / vistas30.length;
  return (
    <>
      <Titulo titulo="Vistas y acciones · 30 días" bajada={<><b className="text-ink">235</b> vistas · 33 pidieron cómo llegar · interacción 16,6% <b className="text-ink">+2,1 pts</b></>} />
      <svg viewBox={`0 0 ${W} ${H + 6}`} className="w-full" aria-hidden="true">
        {vistas30.map((v, i) => {
          const h = (v / 32) * H;
          return <rect key={i} x={i * bw + 2} y={H - h + 4} width={bw - 4} height={h} rx="2" fill="var(--color-brand)" />;
        })}
      </svg>
      <Fila className="mt-1"><Etiqueta>Contra el período anterior</Etiqueta><span className="text-muted">7 · 30 · 90 días · 6 meses</span></Fila>
    </>
  );
}

function PantallaPixeles() {
  return (
    <>
      <Titulo titulo="Seguimiento · Google y Meta" bajada="Pegás tus IDs una sola vez y FlashTag los pone en todas tus páginas públicas." />
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-line pb-2 text-[11px] font-bold text-muted">
        <span>Qué se manda</span><span>GA4 / GTM</span><span>Meta</span>
      </div>
      {eventos.map((e) => (
        <div key={e.nombre} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-line py-2.5 text-[12px]">
          <span>{e.nombre}</span>
          <Glifo id="check" size={14} className="mx-auto text-teal" />
          <Glifo id="check" size={14} className="mx-auto text-teal" />
        </div>
      ))}
      <p className="mt-3 text-[11px] text-muted">Los datos van a tu cuenta de Google o de Meta, no a la nuestra.</p>
    </>
  );
}

function PantallaValor() {
  return (
    <>
      <Titulo titulo="Calculadora e informes" bajada="90 días · 1.121 vistas · 131 direcciones · 18 clics al sitio" />
      <Kpis items={[{ label: "Conservador", valor: "$75.000" }, { label: "Medio", valor: "$150.000" }, { label: "Optimista", valor: "$375.000" }]} />
      <p className="mb-1 text-[12px] text-muted">Por mes. Cómo te encuentran los clientes:</p>
      <Barra label="café palermo" pct={100} valor="177" />
      <Barra label="café rivas" pct={39} valor="69" />
      <Barra label="brunch" pct={38} valor="67" />
    </>
  );
}

function PantallaSucursales() {
  return (
    <>
      <Titulo titulo="Tus sucursales" bajada="Elegís qué fichas de Google trabajás y les ponés un nombre interno." />
      <Fila><span className="size-2 rounded-full bg-teal" /><b>Cuenta de Google conectada</b><Der><Etiqueta tono="teal">3 sucursales</Etiqueta></Der></Fila>
      <Fila><b>Palermo</b><Estrellas /><Der className="text-muted">173 reseñas</Der></Fila>
      <Fila><b>Nordelta</b><Estrellas n={4} /><Der className="text-muted">96 reseñas</Der></Fila>
      <Fila><b>Belgrano</b><Estrellas /><Der className="text-muted">58 reseñas</Der></Fila>
      <Fila><Etiqueta>Ranking por sucursales</Etiqueta><span>quién suma más este mes</span></Fila>
    </>
  );
}

export const pantallasPilares: Record<string, () => React.JSX.Element> = {
  ficha: PantallaFicha,
  maps: PantallaMaps,
  proteccion: PantallaProteccion,
  competidores: PantallaCompetidores,
  ia: PantallaIA,
  filtro: PantallaFiltro,
  sentimiento: PantallaSentimiento,
  equipo: PantallaEquipo,
  qr: PantallaQR,
  linkpage: PantallaLinkPage,
  ruleta: PantallaRuleta,
  flashcard: PantallaFlashCard,
  club: PantallaClub,
  caja: PantallaCaja,
  cumple: PantallaCumple,
  riesgo: PantallaRiesgo,
  metricas: PantallaMetricas,
  pixeles: PantallaPixeles,
  valor: PantallaValor,
  sucursales: PantallaSucursales,
};

/* ================================================================
   RUBROS — el teléfono de ejemplo de cada /para/<slug>
   Comercios inventados: ninguno se parece a un cliente real.
   ================================================================ */

function TelefonoRubro({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[250px] rounded-[34px] bg-ink p-2.5 shadow-[var(--shadow-device)] transition-transform duration-500 ease-[var(--ease-ft)] group-hover:-translate-y-1.5 group-hover:-rotate-2">
      <div className="min-h-[420px] rounded-[26px] bg-paper p-[18px] text-center text-[12.5px]">{children}</div>
    </div>
  );
}

function TelGastronomia() {
  return (
    <TelefonoRubro>
      <b className="font-display text-[15px]">Café Rivas</b>
      <p className="text-[11px] text-muted">Palermo · abierto hasta las 21</p>
      <div className="mt-3.5">
        <div className="rounded-2xl bg-ink p-4 text-left text-paper">
          <div className="flex"><b>Club Rivas</b><span className="ml-auto text-[10px] text-white/70">7 de 10</span></div>
          <Sellos hechos={7} total={10} columnas={5} />
          <b className="text-[12px]">Te faltan 3 para tu café gratis</b>
        </div>
      </div>
      <BotonLP>Ver el menú</BotonLP>
      <BotonLP>Dejanos tu reseña</BotonLP>
    </TelefonoRubro>
  );
}

function TelRetail() {
  return (
    <TelefonoRubro>
      <b className="font-display text-[15px]">Casa Nora</b>
      <p className="text-[11px] text-muted">Nueva colección de verano</p>
      <div aria-hidden="true" className="my-3.5 h-[110px] rounded-2xl" style={{ background: "linear-gradient(135deg, var(--color-surface), var(--color-brand-soft))" }} />
      <BotonLP className="border-brand bg-brand text-paper">Hablá con Mica, tu asesora</BotonLP>
      <BotonLP>Regalá una gift card</BotonLP>
      <BotonLP className="border-brand text-brand">Sumá 5% de cashback</BotonLP>
    </TelefonoRubro>
  );
}

function TelServicios() {
  return (
    <TelefonoRubro>
      <b className="font-display text-[15px]">Studio Glow</b>
      <p className="text-[11px] text-muted">Estética y bienestar</p>
      <div className="mt-3.5 rounded-2xl bg-ink p-4 text-left text-paper">
        <div className="flex"><b>Pack 10 sesiones</b><span className="ml-auto text-[10px] text-white/70">quedan 4</span></div>
        <Sellos hechos={6} total={10} columnas={5} />
      </div>
      <BotonLP className="border-brand bg-brand text-paper">Pedí tu turno</BotonLP>
      <Burbuja>¡Feliz cumple, Ana! Te regalamos un 20% en tu próximo turno.</Burbuja>
    </TelefonoRubro>
  );
}

function TelAgencias() {
  return (
    <TelefonoRubro>
      <b className="font-display text-[15px]">Tus cuentas</b>
      <p className="text-[11px] text-muted">Cambiás de cliente en un toque</p>
      <div className="mt-3 text-left">
        <Fila><b>Cliente A</b><Der><Etiqueta tono="gold">108 sin responder</Etiqueta></Der></Fila>
        <Fila><b>Café Rivas</b><Der><Etiqueta tono="teal">Al día</Etiqueta></Der></Fila>
        <Fila><b>Studio Glow</b><Der><Etiqueta>Informe listo</Etiqueta></Der></Fila>
        <Fila><b>Casa Nora</b><Der><Etiqueta tono="teal">Píxel OK</Etiqueta></Der></Fila>
      </div>
    </TelefonoRubro>
  );
}

export const telefonosRubro: Record<string, () => React.JSX.Element> = {
  gastronomia: TelGastronomia,
  retail: TelRetail,
  servicios: TelServicios,
  agencias: TelAgencias,
};
