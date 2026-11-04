/**
 * SIMULADOR DE POSICIÓN EN MAPS — datos de ejemplo para la home.
 *
 * Imita la pantalla "Posición en Maps" de la app: 49 puntos (7 × 7, uno por
 * kilómetro) alrededor del local, y en cada punto en qué puesto sale cada
 * negocio para una búsqueda. Acá no se consulta Google: todo se genera en el
 * navegador a partir de la palabra buscada, con un generador con semilla, así
 * que la misma búsqueda siempre da el mismo mapa.
 *
 * ⚠️ AGENTS.md §4 y §7: los negocios son INVENTADOS ("Ejemplo ilustrativo" en
 * pantalla). Nunca poner acá el nombre de un comercio real, ni de un cliente
 * ni de un competidor.
 */

export const LADO = 7;
export const PUNTOS = LADO * LADO;
export const CENTRO = Math.floor(PUNTOS / 2);
/** Distancia entre puntos de la grilla, en km. */
export const PASO_KM = 1;
/** Hasta qué puesto se cuenta como "aparecés". */
export const MAX_PUESTO = 20;

export const busquedasSugeridas = [
  "Cafetería",
  "Hamburguesas",
  "Hotel",
  "Kiosco",
  "Peluquería",
  "Heladería",
  "Pizzería",
  "Veterinaria",
];

const sufijos = [
  "La Esquina", "del Barrio", "Central", "Norte", "Express", "Plaza", "Avenida",
  "del Centro", "Diagonal", "Las Flores", "Colonial", "Moderna", "Clásica",
  "Nueva", "del Sol", "Luna", "Estación", "Mercado", "Rincón", "Puerto",
];

export type Negocio = {
  id: number;
  nombre: string;
  vos: boolean;
  estrellas: number;
  resenas: number;
  /** Puesto en cada uno de los 49 puntos. `null`: no aparece (más allá del 20). */
  puestos: (number | null)[];
  visibilidad: number;
  apareceEn: number;
  top3En: number;
  puestoPromedio: number | null;
};

export type Simulacion = {
  busqueda: string;
  negocios: Negocio[];
  vos: Negocio;
  /** Ranking por visibilidad, sin vos. */
  ranking: Negocio[];
  /** Puesto de vos en el ranking de visibilidad (1 = el más visible). */
  tuPuestoZona: number;
};

/* ---------- Azar con semilla ---------- */

function hash(texto: string): number {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(semilla: number) {
  let a = semilla;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- Texto ---------- */

export function normalizar(busqueda: string): string {
  const b = busqueda.trim().replace(/\s+/g, " ").slice(0, 40);
  return b ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : "";
}

const coord = (i: number) => ({ x: i % LADO, y: Math.floor(i / LADO) });

/** "A 1,4 km al suroeste". */
export function ubicacionPunto(i: number): string {
  if (i === CENTRO) return "En la puerta de tu local";
  const c = coord(i);
  const o = coord(CENTRO);
  const dx = c.x - o.x;
  const dy = c.y - o.y; // y crece hacia el sur
  const km = Math.hypot(dx, dy) * PASO_KM;
  const ang = (Math.atan2(-dy, dx) * 180) / Math.PI; // 0 = este, 90 = norte
  const rumbos = ["este", "noreste", "norte", "noroeste", "oeste", "suroeste", "sur", "sureste"];
  const rumbo = rumbos[Math.round(((ang + 360) % 360) / 45) % 8];
  return `A ${km.toLocaleString("es-AR", { maximumFractionDigits: 1 })} km al ${rumbo}`;
}

/* ---------- La simulación ---------- */

export function simular(busquedaCruda: string): Simulacion {
  const busqueda = normalizar(busquedaCruda) || busquedasSugeridas[0];
  const azar = mulberry32(hash(busqueda.toLowerCase()));

  // Vos en el centro, con una fuerza que depende de la búsqueda: hay
  // palabras en las que tu ficha encaja y otras en las que no.
  const tuFuerza = 1.6 + azar() * 2.2;
  const base = [
    { nombre: "Tu local", vos: true, x: coord(CENTRO).x, y: coord(CENTRO).y, fuerza: tuFuerza, estrellas: 4.4, resenas: 173 },
  ];

  // Veinte competidores con nombre de ejemplo, repartidos por la grilla.
  const usados = new Set<string>();
  for (let k = 0; k < 20; k++) {
    let suf = sufijos[Math.floor(azar() * sufijos.length)];
    while (usados.has(suf)) suf = sufijos[(sufijos.indexOf(suf) + 1) % sufijos.length];
    usados.add(suf);
    base.push({
      nombre: `${busqueda} ${suf}`,
      vos: false,
      x: azar() * (LADO - 1),
      y: azar() * (LADO - 1),
      fuerza: 0.6 + azar() * 3.4,
      estrellas: Math.round((3.6 + azar() * 1.35) * 10) / 10,
      resenas: Math.round(8 + azar() ** 2 * 900),
    });
  }

  // Puntaje de cada negocio en cada punto: fuerza − distancia + ruido.
  const puestos: (number | null)[][] = base.map(() => []);
  for (let p = 0; p < PUNTOS; p++) {
    const c = coord(p);
    const puntajes = base.map((n, id) => ({
      id,
      v: n.fuerza - Math.hypot(c.x - n.x, c.y - n.y) * 0.85 + (azar() - 0.5) * 1.6,
    }));
    puntajes.sort((a, b) => b.v - a.v);
    puntajes.forEach((s, idx) => {
      // Con puntaje muy bajo Google directamente no lo muestra.
      const visible = idx < MAX_PUESTO && s.v > 0.2;
      puestos[s.id][p] = visible ? idx + 1 : null;
    });
  }

  const negocios: Negocio[] = base.map((n, id) => {
    const ps = puestos[id];
    const aparece = ps.filter((x): x is number => x !== null);
    const visibilidad = Math.round(
      (ps.reduce<number>((acc, x) => acc + (x === null ? 0 : (MAX_PUESTO + 1 - x) / MAX_PUESTO), 0) / PUNTOS) * 100,
    );
    return {
      id,
      nombre: n.nombre,
      vos: n.vos,
      estrellas: n.estrellas,
      resenas: n.resenas,
      puestos: ps,
      visibilidad,
      apareceEn: aparece.length,
      top3En: aparece.filter((x) => x <= 3).length,
      puestoPromedio: aparece.length ? Math.round((aparece.reduce((a, b) => a + b, 0) / aparece.length) * 10) / 10 : null,
    };
  });

  const vos = negocios[0];
  const porVisibilidad = [...negocios].sort((a, b) => b.visibilidad - a.visibilidad);
  return {
    busqueda,
    negocios,
    vos,
    ranking: porVisibilidad.filter((n) => !n.vos),
    tuPuestoZona: porVisibilidad.findIndex((n) => n.vos) + 1,
  };
}

/** Los tres primeros en un punto (y vos, si no estás entre ellos). */
export function quienSale(sim: Simulacion, punto: number) {
  const en = sim.negocios
    .filter((n) => n.puestos[punto] !== null)
    .sort((a, b) => a.puestos[punto]! - b.puestos[punto]!);
  return { top: en.slice(0, 3), vos: sim.vos.puestos[punto] };
}

export type Paso = { titulo: string; texto: string };

/** "Qué hacer para subir": los pasos que la app recomendaría con estos datos. */
export function siguientesPasos(sim: Simulacion): Paso[] {
  const pasos: Paso[] = [];
  const b = sim.busqueda.toLowerCase();
  if (sim.vos.puestos[CENTRO] === null || sim.vos.puestos[CENTRO]! > 3) {
    pasos.push({
      titulo: "Hacé que tu ficha encaje con lo que buscan",
      texto:
        sim.vos.puestos[CENTRO] === null
          ? `En la puerta de tu local no aparecés para «${b}». Revisá la categoría principal y sumá la palabra en la descripción y en tus servicios.`
          : `En la puerta de tu local salís ${sim.vos.puestos[CENTRO]}° para «${b}». Con la categoría y la descripción bien puestas, ahí deberías estar en el top 3.`,
    });
  }
  pasos.push({
    titulo: "Respondé las reseñas",
    texto: "Respondiste 15 de las 20 reseñas de los últimos 90 días. Google premia a los negocios que responden todas.",
  });
  const lider = sim.ranking[0];
  if (lider && lider.resenas > sim.vos.resenas) {
    pasos.push({
      titulo: `Alcanzá a ${lider.nombre}`,
      texto: `Es el más visible de la zona con ${lider.resenas.toLocaleString("es-AR")} reseñas. Te faltan ${(lider.resenas - sim.vos.resenas).toLocaleString("es-AR")}: un cartel con NFC en la caja las pide por vos.`,
    });
  }
  if (sim.vos.top3En < 15) {
    pasos.push({
      titulo: "Publicá en tu ficha todas las semanas",
      texto: "Una publicación por semana con fotos nuevas le dice a Google que tu negocio está activo.",
    });
  }
  return pasos.slice(0, 3);
}
