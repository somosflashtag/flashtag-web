import { MapaMarco } from "@/components/MapaMarco";
import { Button } from "@/components/ui/Button";
import { Titulo } from "@/components/ui/Titulo";
import { mapaEmbed } from "@/lib/mapa";
import { cta } from "@/lib/site";

/**
 * El bloque del mapa de comercios: titular, mapa navegable y un botón.
 * Va sobre fondo claro (papel o arena): el embebido no tiene versión oscura.
 * Quien lo usa pregunta antes `mapaAbierto()` (lib/mapa.ts) y, si da `false`,
 * no lo dibuja.
 */
export function MapaComercios({ tamano = "mega" }: { tamano?: "mega" | "chico" }) {
  return (
    <>
      <Titulo
        tamano={tamano}
        titulo="Comercios de todo el país ya lo usan"
        bajada="Cada punto es un local con un cartel FlashTag. Movete por el mapa, acercate a tu barrio y mirá quiénes ya lo tienen. Se actualiza solo."
      />
      <div data-reveal className="mt-8 md:mt-12">
        <MapaMarco src={mapaEmbed} />
      </div>
      <div className="mt-8 flex justify-center">
        <Button href={cta.secondary.href} variant="secondary" size="lg" arrow className="w-full sm:w-auto">
          {cta.secondary.label}
        </Button>
      </div>
    </>
  );
}
