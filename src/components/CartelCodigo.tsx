import Image from "next/image";
import { Glifo } from "@/components/ui/Glifo";
import { cartelCodigo } from "@/content/activar";
import { cn } from "@/lib/cn";

/**
 * El cartel de Google de la tienda con su ID/código marcado: un anillo que
 * late alrededor del código impreso y, si se pide, el aviso de vidrio que lo
 * nombra. Es la respuesta visual a "¿dónde está el código?".
 *
 * Lo usan el hero de /activar-tu-flashtag (con aviso) y el paso 3 de
 * /como-funciona (solo el anillo, como adorno). La imagen y la posición del
 * código salen de `content/activar.ts`.
 *
 * El anillo va en `brand`: es el único acento del manual que se lee sobre el
 * blanco del cartel (7.1:1). El aviso es `.vidrio`, pensado para fondo oscuro.
 */
export function CartelCodigo({
  className,
  sizes,
  aviso = false,
  decorativo = false,
  eager = false,
}: {
  className?: string;
  sizes: string;
  /** Muestra el aviso "Tu ID/código está acá" pegado al anillo. */
  aviso?: boolean;
  /** Va dentro de un bloque `aria-hidden`: sin texto alternativo. */
  decorativo?: boolean;
  /** Está arriba del pliegue: se carga sin esperar al scroll. */
  eager?: boolean;
}) {
  const { src, alt, codigo, chip, detalle } = cartelCodigo;
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={decorativo ? "" : alt}
        width={600}
        height={600}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]"
      />
      <span
        aria-hidden="true"
        className="absolute h-[7.5%] w-[17%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${codigo.x}%`, top: `${codigo.y}%` }}
      >
        <span className="absolute inset-0 rounded-full border-[3px] border-brand" />
        <span className="ft-ping absolute inset-0 rounded-full border-2 border-brand" />
      </span>
      {aviso && (
        <p
          aria-hidden={decorativo ? true : undefined}
          className="vidrio ft-float absolute right-[-3%] top-[91%] flex items-center gap-2.5 rounded-2xl py-2 pl-2 pr-3.5 text-left"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-gold text-ink">
            <Glifo id="qr" size={18} />
          </span>
          <span className="leading-tight">
            <b className="block text-[13px] md:text-sm">{chip}</b>
            <span className="text-[12px] text-paper/80 md:text-[13px]">{detalle}</span>
          </span>
        </p>
      )}
    </div>
  );
}
