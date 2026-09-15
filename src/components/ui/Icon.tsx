import { cn } from "@/lib/cn";

/**
 * Iconos de redes y contacto.
 *
 * Trazo propio sobre viewBox 24×24, `currentColor` siempre: el color lo
 * decide el contenedor, así el mismo icono sirve en fondo claro y oscuro.
 * No se agregan iconos "por las dudas" — solo los que el sitio usa.
 */

export type IconName =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "linkedin"
  | "mail"
  | "whatsapp";

const paths: Record<IconName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </>
  ),

  youtube: (
    <>
      <rect
        x="2.5"
        y="5"
        width="19"
        height="14"
        rx="4.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M10.4 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" />
    </>
  ),

  tiktok: (
    <path
      d="M13.6 3h2.6a4.9 4.9 0 0 0 4.3 4.3v2.6a7.5 7.5 0 0 1-4.3-1.5v6.2a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.7a3.2 3.2 0 1 0 2.4 3.1V3Z"
      fill="currentColor"
    />
  ),

  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M7.6 10.4v6.2M7.6 7.6v.1M11.4 16.6v-6.2M11.4 13.1c0-1.5.9-2.4 2.2-2.4s2.2.9 2.2 2.6v3.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </>
  ),

  mail: (
    <>
      <rect x="2.75" y="5" width="18.5" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m4.5 8 6.4 4.5a2 2 0 0 0 2.2 0L19.5 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </>
  ),

  whatsapp: (
    <>
      <path
        d="M3.4 20.6 4.6 16a8.3 8.3 0 1 1 3.2 3.1l-4.4 1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.4c.3-.1.6 0 .8.3l.7 1.3c.1.3.1.6-.1.8l-.5.5a5 5 0 0 0 2.6 2.6l.5-.5c.2-.2.5-.3.8-.2l1.3.7c.3.2.4.5.3.8-.2.8-1 1.4-1.9 1.3a7.3 7.3 0 0 1-6-6c-.1-.9.5-1.7 1.3-1.9Z"
        fill="currentColor"
      />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {paths[name]}
    </svg>
  );
}
