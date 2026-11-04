"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { juego, type ModoJuego } from "@/content/home";
import { cta } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * "Probalo vos": el visitante hace de cliente. Elige qué hace el cartel, toca
 * "Apoyá el celular" y ve las dos puntas a la vez: lo que le aparece en el
 * teléfono y lo que le llega al dueño (contadores, avisos, nivel del local).
 *
 * Todo es de ejemplo (Café Rivas es ficticio). Con prefers-reduced-motion
 * las animaciones se apagan pero el juego funciona igual.
 */

type Fase = "espera" | "toque" | "juega";
type Aviso = { id: number; glifo: GlifoId; titulo: string; detalle: string };
type Evento = { id: number; texto: string; glifo: GlifoId };
type Pieza = { id: number; x: number; dx: number; rot: number; dur: number; delay: number; color: string; forma: string };

const COLORES = ["bg-brand", "bg-gold", "bg-coral", "bg-teal", "bg-paper"];
const SELLOS = 8;
const CONIC = "conic-gradient(var(--color-brand) 0 60deg, var(--color-coral) 0 120deg, var(--color-gold) 0 180deg, var(--color-teal) 0 240deg, var(--color-ink) 0 300deg, var(--color-brand-soft) 0 360deg)";

/** Número que sube animado hasta `valor`. */
function Numero({ valor }: { valor: number }) {
  const [mostrado, setMostrado] = useState(valor);
  const desde = useRef(valor);
  useEffect(() => {
    const inicio = desde.current;
    if (inicio === valor) return;
    const t0 = performance.now();
    let raf = 0;
    const paso = (t: number) => {
      const k = Math.min(1, (t - t0) / 600);
      const v = Math.round(inicio + (valor - inicio) * (1 - (1 - k) ** 3));
      setMostrado(v);
      if (k < 1) raf = requestAnimationFrame(paso);
      else desde.current = valor;
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [valor]);
  return <span className="tnum">{mostrado}</span>;
}

function Estrellas({ n, animar }: { n: number; animar: boolean }) {
  return (
    <span className="flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          width="28"
          height="28"
          fill={i < n ? "var(--color-gold)" : "var(--color-line)"}
          className={cn(animar && i < n && "ft-pop")}
          style={{ animationDelay: `${i * 110}ms` }}
          aria-hidden="true"
        >
          <path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" />
        </svg>
      ))}
    </span>
  );
}

export function Jugar() {
  const [modo, setModo] = useState<ModoJuego>("resena");
  const [fase, setFase] = useState<Fase>("espera");
  const [jugada, setJugada] = useState(0);
  const [stats, setStats] = useState({ resenas: 0, sellos: 0, contactos: 0, mensajes: 0 });
  const [sellos, setSellos] = useState(3);
  const [premio, setPremio] = useState(false);
  const [xp, setXp] = useState(0);
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [confeti, setConfeti] = useState<Pieza[]>([]);
  const [angulo, setAngulo] = useState(0);
  const [premioRuleta, setPremioRuleta] = useState<string | null>(null);
  const [respuestaIA, setRespuestaIA] = useState("");
  const timers = useRef<number[]>([]);
  const id = useRef(0);
  const bloqueo = useRef(0);
  const xpRef = useRef(0);
  const sellosRef = useRef(3);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const luego = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const nuevoId = () => ++id.current;

  const nivelIdx = juego.niveles.reduce((acc, n, i) => (xp >= n.desde ? i : acc), 0);
  const nivel = juego.niveles[nivelIdx];
  const siguiente = juego.niveles[nivelIdx + 1];
  const progreso = siguiente ? ((xp - nivel.desde) / (siguiente.desde - nivel.desde)) * 100 : 100;

  const cliente = juego.clientes[jugada % juego.clientes.length];

  const avisar = (a: Omit<Aviso, "id">) => {
    const nid = nuevoId();
    setAvisos((l) => [...l.slice(-2), { ...a, id: nid }]);
    luego(3300, () => setAvisos((l) => l.filter((x) => x.id !== nid)));
  };
  const registrar = (texto: string, glifo: GlifoId) =>
    setEventos((l) => [{ id: nuevoId(), texto, glifo }, ...l].slice(0, 4));

  const festejar = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const piezas = Array.from({ length: 36 }).map(() => ({
      id: nuevoId(),
      x: Math.random() * 100,
      dx: (Math.random() - 0.5) * 160,
      rot: (Math.random() - 0.5) * 1080,
      dur: 1.2 + Math.random() * 0.9,
      delay: Math.random() * 0.25,
      color: COLORES[Math.floor(Math.random() * COLORES.length)],
      forma: Math.random() > 0.5 ? "h-2.5 w-1.5 rounded-sm" : "size-2 rounded-full",
    }));
    setConfeti(piezas);
    luego(2400, () => setConfeti([]));
  };

  const sumarXp = (puntos: number) => {
    const antes = juego.niveles.reduce((acc, n, i) => (xpRef.current >= n.desde ? i : acc), 0);
    const total = xpRef.current + puntos;
    xpRef.current = total;
    const despues = juego.niveles.reduce((acc, n, i) => (total >= n.desde ? i : acc), 0);
    setXp(total);
    if (despues > antes) {
      luego(700, () => {
        festejar();
        avisar({ glifo: "trofeo", titulo: `¡Subiste a ${juego.niveles[despues].nombre}!`, detalle: "Tu local suma reputación sola" });
      });
    }
  };

  const tipear = (texto: string) => {
    setRespuestaIA("");
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido) {
      setRespuestaIA(texto);
      return;
    }
    for (let i = 1; i <= texto.length; i++) luego(i * 22, () => setRespuestaIA(texto.slice(0, i)));
  };

  const apoyar = () => {
    if (fase === "toque" || Date.now() < bloqueo.current) return;
    bloqueo.current = Date.now() + (modo === "ruleta" ? 2900 : 1900);
    const m = juego.modos.find((x) => x.id === modo)!;
    setJugada((j) => j + 1);
    setFase("toque");
    setPremio(false);
    setPremioRuleta(null);
    setRespuestaIA("");

    luego(650, () => {
      setFase("juega");
      if (modo === "resena") {
        luego(900, () => {
          setStats((s) => ({ ...s, resenas: s.resenas + 1 }));
          avisar({ glifo: "estrella", titulo: "Nueva reseña de 5 ★", detalle: `${cliente} escaneó el cartel de Google` });
          registrar(`${cliente} dejó 5 ★ en Google`, "estrella");
          luego(900, () => {
            tipear(`¡Gracias, ${cliente}! Nos alegra que lo hayas disfrutado. Te esperamos pronto ☕`);
            registrar("La IA respondió con el tono del local", "chispa");
          });
          sumarXp(m.xp);
        });
      }
      if (modo === "sello") {
        luego(500, () => {
          const n = sellosRef.current >= SELLOS ? 1 : sellosRef.current + 1;
          sellosRef.current = n;
          setSellos(n);
          setStats((s) => ({ ...s, sellos: s.sellos + 1 }));
          registrar(`${cliente} sumó un sello (${n} de ${SELLOS})`, "corona");
          if (n === SELLOS) {
            setPremio(true);
            luego(400, festejar);
            avisar({ glifo: "corona", titulo: "¡Premio desbloqueado!", detalle: `${cliente} ganó un café gratis y va a volver` });
            sumarXp(m.xp + 30);
          } else {
            avisar({ glifo: "corona", titulo: "Nuevo sello sumado", detalle: `Le faltan ${SELLOS - n} para su premio` });
            sumarXp(m.xp);
          }
        });
      }
      if (modo === "ruleta") {
        const i = Math.floor(Math.random() * juego.premios.length);
        const destino = (360 - (i * 60 + 30)) % 360;
        // Un instante después de que la rueda aparece, para que se la vea girar.
        luego(60, () => setAngulo((a) => a + 1800 + ((destino - (a % 360) + 360) % 360)));
        luego(2300, () => {
          setPremioRuleta(juego.premios[i]);
          setStats((s) => ({ ...s, contactos: s.contactos + 1 }));
          avisar({ glifo: "persona", titulo: "Nuevo contacto en tu base", detalle: `${cliente} dejó su mail para cobrar el premio` });
          registrar(`${cliente} ganó «${juego.premios[i]}»`, "ruleta");
          sumarXp(m.xp);
        });
      }
      if (modo === "whatsapp") {
        luego(700, () => {
          setStats((s) => ({ ...s, mensajes: s.mensajes + 1, contactos: s.contactos + 1 }));
          avisar({ glifo: "celular", titulo: "Nuevo mensaje de WhatsApp", detalle: `${cliente} te escribió desde el cartel` });
          registrar(`${cliente} te escribió por WhatsApp`, "celular");
          sumarXp(m.xp);
        });
      }
    });
  };

  const modoActual = juego.modos.find((x) => x.id === modo)!;

  const pintarAvisos = (lista: Aviso[]) => (lista.map((a) => (
                <div key={a.id} className="ft-toast flex w-full items-center gap-2.5 rounded-2xl border border-line bg-paper px-3 py-2.5 shadow-[var(--shadow-float)]">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
                    <Glifo id={a.glifo} size={16} />
                  </span>
                  <span className="min-w-0">
                    <b className="block text-[13px] leading-tight">{a.titulo}</b>
                    <small className="block truncate text-[11px] text-muted">{a.detalle}</small>
                  </span>
                </div>
              )));

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
      {/* ── Escenario: cartel + teléfono ─────────────────────── */}
      <div className="relative">
        <div className="relative mx-auto flex max-w-[460px] items-end justify-center gap-4 overflow-hidden rounded-[28px] bg-white/[0.06] px-4 pb-6 pt-8 sm:gap-8">
          {/* Avisos (phone/tablet: arriba del escenario, donde se están mirando) */}
          <div aria-live="polite" className="pointer-events-none absolute inset-x-3 top-3 z-20 flex flex-col gap-2 lg:hidden">{pintarAvisos(avisos.slice(-1))}</div>

          {/* Confeti */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
            {confeti.map((p) => (
              <i
                key={p.id}
                className={cn("ft-confeti absolute top-0", p.color, p.forma)}
                style={
                  {
                    left: `${p.x}%`,
                    "--dx": `${p.dx}px`,
                    "--rot": `${p.rot}deg`,
                    "--dur": `${p.dur}s`,
                    animationDelay: `${p.delay}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* El cartel del mostrador */}
          <div className="relative mb-2 w-[118px] shrink-0 rounded-2xl bg-paper p-2.5 text-ink shadow-[var(--shadow-float)] sm:w-[136px]">
            <p className="text-center text-[9px] font-bold uppercase tracking-wide text-muted">Café Rivas</p>
            <div className="relative mt-1.5 flex aspect-square items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Glifo id={modoActual.glifo} size={34} />
              {fase === "toque" && (
                <>
                  <span className="ft-ola absolute inset-0 rounded-xl border-2 border-brand" />
                  <span className="ft-ola absolute inset-0 rounded-xl border-2 border-brand" style={{ animationDelay: "180ms" }} />
                </>
              )}
            </div>
            <p className="mt-1.5 text-center text-[10px] font-semibold leading-tight">{modoActual.label}</p>
            <p className="text-center text-[9px] text-muted">QR + NFC</p>
          </div>

          {/* El teléfono del cliente */}
          <div
            className={cn(
              "relative w-[178px] shrink-0 rounded-[28px] bg-ink p-2 shadow-[var(--shadow-device)] ring-1 ring-white/15 transition-transform duration-500 ease-[var(--ease-ft)] sm:w-[200px]",
              fase === "toque" && "ft-vibra -translate-x-2 -rotate-3",
            )}
          >
            <div className="flex h-[330px] flex-col items-center justify-center overflow-hidden rounded-[22px] bg-paper px-3 text-center text-[12px] text-ink">
              {fase !== "juega" ? (
                <div className="flex flex-col items-center gap-3 text-muted">
                  <span className="ft-brillo flex size-14 items-center justify-center rounded-full bg-brand text-paper">
                    <svg viewBox="0 0 20 20" width="24" height="24" fill="none" aria-hidden="true">
                      <path d="M6 14a6 6 0 0 1 0-8M14 6a6 6 0 0 1 0 8M8.5 11.5a2 2 0 0 1 0-3M11.5 8.5a2 2 0 0 1 0 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <p className="font-semibold">{fase === "toque" ? "Conectando…" : "Acercá el celular al cartel"}</p>
                </div>
              ) : modo === "resena" ? (
                <div className="ft-fade flex w-full flex-col items-center gap-2">
                  <b className="font-display text-[14px]">Café Rivas</b>
                  <p className="text-muted">¿Cómo fue tu experiencia?</p>
                  <Estrellas n={5} animar />
                  <p className="ft-pop rounded-xl bg-surface/70 px-2.5 py-2 text-left text-[11.5px]" style={{ animationDelay: "650ms" }}>
                    “{juego.resenas[jugada % juego.resenas.length]}”
                  </p>
                  <p className="ft-pop text-[11px] font-bold text-ink" style={{ animationDelay: "900ms" }}>
                    ✓ Publicada en Google
                  </p>
                </div>
              ) : modo === "sello" ? (
                <div className="ft-fade w-full">
                  <div className="rounded-2xl bg-ink p-3 text-left text-paper">
                    <div className="flex items-center">
                      <b className="text-[13px]">Club Rivas</b>
                      <span className="ml-auto text-[10px] text-white/70 tnum">
                        {sellos} de {SELLOS}
                      </span>
                    </div>
                    <ul className="my-3 grid grid-cols-4 gap-1.5">
                      {Array.from({ length: SELLOS }).map((_, i) => (
                        <li
                          key={i}
                          className={cn(
                            "flex aspect-square items-center justify-center rounded-full text-[10px] font-bold",
                            i < sellos ? "bg-gold text-ink" : "border-2 border-dashed border-white/35",
                            i === sellos - 1 && "ft-pop",
                          )}
                        >
                          {i < sellos ? "✓" : ""}
                        </li>
                      ))}
                    </ul>
                    <b className="text-[11.5px]">
                      {premio ? "¡Ganaste un café gratis!" : `Te faltan ${SELLOS - sellos} para tu café gratis`}
                    </b>
                  </div>
                  <p className="mt-2 text-[10.5px] text-muted">Guardada en tu Wallet</p>
                </div>
              ) : modo === "ruleta" ? (
                <div className="ft-fade flex w-full flex-col items-center gap-2">
                  <b className="font-display text-[14px]">Girá y ganá</b>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 border-x-[7px] border-t-[12px] border-x-transparent border-t-ink" />
                    <div
                      aria-hidden="true"
                      data-angulo={angulo}
                      className="size-[132px] rounded-full shadow-[inset_0_0_0_5px_var(--color-paper),0_0_0_2px_var(--color-line)] transition-transform duration-[2200ms] ease-[cubic-bezier(0.17,0.67,0.21,1)] motion-reduce:transition-none"
                      style={{ background: CONIC, transform: `rotate(${angulo}deg)` }}
                    />
                  </div>
                  {premioRuleta ? (
                    <p className="ft-pop rounded-xl bg-gold/30 px-3 py-1.5 text-[12px] font-bold">🎁 {premioRuleta}</p>
                  ) : (
                    <p className="text-muted">Girando…</p>
                  )}
                  <p className="text-[10.5px] text-muted">Dejá tu mail para cobrarlo</p>
                </div>
              ) : (
                <div className="ft-fade w-full text-left">
                  <p className="mb-2 text-center text-[11px] font-semibold text-muted">WhatsApp · Café Rivas</p>
                  <p className="ft-pop ml-auto w-fit max-w-[90%] rounded-[12px_12px_4px_12px] bg-teal/15 px-2.5 py-2 text-[11.5px]">
                    {juego.mensajes[jugada % juego.mensajes.length]}
                  </p>
                  <p className="ft-pop mt-2 w-fit max-w-[90%] rounded-[12px_12px_12px_4px] border border-line px-2.5 py-2 text-[11.5px]" style={{ animationDelay: "900ms" }}>
                    ¡Hola {cliente}! Sí, te esperamos 🙌
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Elegí qué hace el cartel + el botón */}
        <div className="mx-auto mt-4 max-w-[460px]">
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Qué hace el cartel">
            {juego.modos.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={modo === m.id}
                onClick={() => {
                  setModo(m.id);
                  setFase("espera");
                }}
                className={cn(
                  "flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold transition-colors",
                  modo === m.id ? "border-paper bg-paper text-ink" : "border-white/25 text-paper hover:border-white/60",
                )}
              >
                <Glifo id={m.glifo} size={14} />
                {m.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={apoyar}
            disabled={fase === "toque"}
            className="ft-brillo mt-4 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-brand text-[17px] font-bold text-paper transition-[transform,background-color] duration-150 hover:bg-brand-press active:scale-[0.98] disabled:opacity-70"
          >
            <svg viewBox="0 0 20 20" width="22" height="22" fill="none" aria-hidden="true">
              <path d="M6 14a6 6 0 0 1 0-8M14 6a6 6 0 0 1 0 8M8.5 11.5a2 2 0 0 1 0-3M11.5 8.5a2 2 0 0 1 0 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            {jugada === 0 ? juego.boton : "Otra vez"}
          </button>
        </div>
      </div>

      {/* ── El panel del dueño ───────────────────────────────── */}
      <div>
        <div className="relative rounded-[24px] bg-paper p-4 text-ink shadow-[var(--shadow-device)] sm:p-6">
          {/* Avisos que entran (desktop: arriba del panel) */}
          <div aria-live="polite" className="pointer-events-none absolute -right-4 -top-4 z-20 hidden w-[290px] flex-col items-end gap-2 lg:flex">
            {pintarAvisos(avisos)}
          </div>

          <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">Panel del dueño · hoy</p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <b className="font-display text-[1.25rem] leading-tight sm:text-[1.5rem]">Café Rivas</b>
            <span className="rounded-full bg-gold/30 px-2.5 py-1 text-[12px] font-bold">{nivel.nombre}</span>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-[11.5px] text-muted">
              <span className="tnum">
                <Numero valor={xp} /> puntos de reputación
              </span>
              <span>{siguiente ? `Próximo: ${siguiente.nombre}` : "¡Nivel máximo!"}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-line">
              <i className="block h-full rounded-full bg-brand transition-[width] duration-700 ease-[var(--ease-ft)]" style={{ width: `${progreso}%` }} />
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-4 gap-2">
            {(
              [
                ["Reseñas", stats.resenas, "estrella"],
                ["Sellos", stats.sellos, "corona"],
                ["Contactos", stats.contactos, "persona"],
                ["Mensajes", stats.mensajes, "celular"],
              ] as const
            ).map(([l, v, g]) => (
              <div key={l} className="rounded-xl bg-surface/60 px-2 py-2.5 text-center">
                <Glifo id={g} size={15} className="mx-auto text-brand" />
                <dd className="mt-1 font-display text-[1.375rem] font-semibold leading-none">
                  <Numero valor={v} />
                </dd>
                <dt className="mt-1 text-[10.5px] text-muted sm:text-[11.5px]">{l}</dt>
              </div>
            ))}
          </dl>

          {respuestaIA && (
            <div className="mt-3 rounded-xl border border-teal/30 bg-teal/5 px-3 py-2 text-[12.5px]">
              <small className="mb-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide">
                <Glifo id="chispa" size={11} className="text-brand" /> La IA respondió la reseña
              </small>
              {respuestaIA}
              <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-ink align-middle" />
            </div>
          )}

          <ul className="mt-3 min-h-[120px] divide-y divide-line">
            {eventos.length === 0 ? (
              <li className="py-6 text-center text-[13px] text-muted">Todavía no pasó nada. Apoyá el celular en el cartel 👉</li>
            ) : (
              eventos.map((e) => (
                <li key={e.id} className="ft-fade flex items-center gap-2.5 py-2 text-[13px]">
                  <Glifo id={e.glifo} size={15} className="shrink-0 text-brand" />
                  <span className="min-w-0 flex-1 truncate">{e.texto}</span>
                  <span className="text-[11px] text-muted">recién</span>
                </li>
              ))
            )}
          </ul>

          {xp >= juego.niveles[2].desde && (
            <div className="ft-fade mt-3 flex flex-col items-center gap-2 rounded-2xl bg-brand-soft p-4 text-center sm:flex-row sm:text-left">
              <p className="flex-1 text-[13.5px] font-semibold">{juego.cierre}</p>
              <Button href={cta.primary.href} variant="primary" size="md" arrow>
                Probá la app gratis
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
