/** Íconos de contacto y redes, monocromos, en currentColor. */

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function IconoMail({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconoWhatsApp({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
      <path d="M4 20l1.3-3.8A8.5 8.5 0 1 1 8.3 19.2z" />
      <path d="M9.2 9.3c.2 1.9 2 4 3.9 4.5l1.1-1.1 1.8.8c-.3 1.4-1.4 1.9-2.6 1.7-2.6-.5-5.2-3.1-5.7-5.7-.2-1.2.3-2.3 1.7-2.6l.8 1.8z" />
    </svg>
  );
}

export function IconoInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoYouTube({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoTikTok({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
      <path d="M13.5 3v11.2a3.2 3.2 0 1 1-3.2-3.2" />
      <path d="M13.5 3c.4 2.6 2.1 4.2 4.5 4.5" />
    </svg>
  );
}

export function IconoLinkedIn({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.1M12 17v-3.8a2.2 2.2 0 0 1 4.4 0V17M12 10.5V17" />
    </svg>
  );
}
