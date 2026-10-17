/**
 * Illustration set: one consistent line-art pictogram per procedure/lesson `icon` key.
 * Hand-drawn SVG, 2.5px round strokes, two colours (ink + accent). No external assets, no cost,
 * renders crisp at any size and in both themes.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const A = "var(--accent)";

const ART: Record<string, React.ReactNode> = {
  // ── hands / hygiene ────────────────────────────────────────────────────────
  hands: (<><path {...S} d="M20 44c-6-8-4-22 4-24 4-1 6 4 6 8V16a3 3 0 0 1 6 0v10V12a3 3 0 0 1 6 0v14V14a3 3 0 0 1 6 0v16c0 10-6 18-14 18"/><path {...S} stroke={A} d="M54 10c2 3 2 6 0 9M58 6c3 5 3 11 0 16"/><circle cx="50" cy="52" r="3" fill={A} stroke="none"/></>),
  hand: (<><path {...S} d="M18 40c-4-6-3-16 3-18 3-1 5 3 5 6V14a3 3 0 0 1 6 0v12V10a3 3 0 0 1 6 0v16V12a3 3 0 0 1 6 0v18c0 9-5 16-13 16h-3"/><path {...S} stroke={A} d="M46 48l6 6M52 48l-6 6"/></>),
  razor: (<><rect {...S} x="14" y="10" width="36" height="12" rx="3"/><path {...S} d="M32 22v28M26 50h12"/><path {...S} stroke={A} d="M16 16h32"/></>),
  tooth: (<><path {...S} d="M22 12c6-4 14-4 20 0 6 4 6 12 2 22-2 6-4 16-8 16s-4-10-4-10-0 10-4 10-6-10-8-16c-4-10-4-18 2-22z"/><path {...S} stroke={A} d="M46 10l6-4M48 16h6"/></>),
  hair: (<><path {...S} d="M14 34c0-14 8-22 18-22s18 8 18 22c0 6-2 10-4 12H18c-2-2-4-6-4-12z"/><path {...S} d="M18 30c6-6 10-10 14-12 4 2 8 6 14 12"/><path {...S} stroke={A} d="M30 50v6M34 50v6M26 50v6"/></>),
  // ── body / mobility ────────────────────────────────────────────────────────
  back: (<><circle {...S} cx="34" cy="12" r="5"/><path {...S} d="M30 20l-8 12 4 20M30 20l10 2 6 10-4 20"/><path {...S} stroke={A} d="M12 44h40" strokeDasharray="4 4"/></>),
  walk: (<><circle {...S} cx="30" cy="10" r="5"/><path {...S} d="M30 16v16l-8 20M30 32l10 8 4 12M30 20l-10 8M30 20l12 2"/><path {...S} stroke={A} d="M48 24v30"/></>),
  stand: (<><circle {...S} cx="26" cy="10" r="5"/><path {...S} d="M26 16v22l-4 16M26 38l6 16M26 20l-8 10M26 20l10 6"/><path {...S} stroke={A} d="M44 22c6 0 10 4 10 10v22"/></>),
  sit: (<><circle {...S} cx="28" cy="12" r="5"/><path {...S} d="M28 18v16h14v16M28 34l-6 2v14"/><path {...S} stroke={A} d="M46 30v24M14 54h36"/></>),
  wheelchair: (<><circle {...S} cx="26" cy="46" r="10"/><circle {...S} cx="48" cy="52" r="4"/><path {...S} d="M30 10a4 4 0 1 0 0 .1M30 16v14h14l6 14"/><path {...S} stroke={A} d="M26 46h18"/></>),
  leg: (<><path {...S} d="M26 8v24l-6 20h10l6-14 8 14h8"/><path {...S} stroke={A} d="M20 36h16M18 42h18" strokeDasharray="3 3"/></>),
  lift: (<><path {...S} d="M14 54V20h10M24 20h26l6 10"/><path {...S} d="M30 20v10c0 4 4 6 8 6h6c4 0 6 4 4 8l-2 6"/><circle {...S} cx="42" cy="26" r="3"/><path {...S} stroke={A} d="M10 54h44"/></>),
  // ── care settings ─────────────────────────────────────────────────────────
  bed: (<><path {...S} d="M10 48V22M10 36h44v12M54 48V30H26v6"/><circle {...S} cx="18" cy="30" r="4"/><path {...S} stroke={A} d="M10 54h44"/></>),
  bath: (<><path {...S} d="M10 32h44v8a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10z"/><path {...S} d="M14 32V14a4 4 0 0 1 8 0"/><path {...S} stroke={A} d="M30 22c0 3 2 3 2 6M38 20c0 3 2 3 2 6M46 22c0 3 2 3 2 6"/></>),
  shower: (<><path {...S} d="M20 10h16a8 8 0 0 1 8 8v2"/><path {...S} d="M34 20h20"/><path {...S} stroke={A} d="M36 28v6M40 28v8M44 28v6M48 28v8M52 28v6"/><path {...S} d="M20 10v44"/></>),
  toilet: (<><path {...S} d="M20 10h16v16H20z"/><path {...S} d="M14 26h32c0 10-6 18-16 18S14 36 14 26z"/><path {...S} d="M24 44v10h12V44"/><circle cx="46" cy="14" r="3" fill={A} stroke="none"/></>),
  catheter: (<><path {...S} d="M20 8v14c0 6 6 8 10 12 6 6 10 8 10 16v4"/><rect {...S} x="32" y="40" width="16" height="16" rx="3"/><path {...S} stroke={A} d="M36 50h8"/></>),
  shirt: (<><path {...S} d="M22 10h20l10 8-6 8-4-2v30H22V24l-4 2-6-8z"/><path {...S} stroke={A} d="M26 10c2 4 4 6 6 6s4-2 6-6"/></>),
  meal: (<><circle {...S} cx="32" cy="34" r="16"/><circle {...S} cx="32" cy="34" r="8"/><path {...S} d="M10 16v20M10 16c-4 2-4 10 0 12M54 16v38M54 16c-4 4-4 12 0 14"/><circle cx="32" cy="34" r="2" fill={A} stroke="none"/></>),
  cup: (<><path {...S} d="M18 14h24v26a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z"/><path {...S} d="M42 20h6a6 6 0 0 1 0 12h-6"/><path {...S} stroke={A} d="M22 24h16M22 32h16" strokeDasharray="3 3"/></>),
  scale: (<><rect {...S} x="12" y="36" width="40" height="14" rx="4"/><path {...S} d="M32 36V18"/><circle {...S} cx="32" cy="14" r="6"/><path {...S} stroke={A} d="M32 14l4-4"/></>),
  bandage: (<><rect {...S} x="10" y="26" width="44" height="14" rx="7" transform="rotate(-35 32 33)"/><path {...S} stroke={A} d="M26 30l2 2M30 26l2 2M34 34l2 2M38 30l2 2"/></>),
  baby: (<><circle {...S} cx="32" cy="22" r="10"/><path {...S} d="M24 14c2-4 6-6 8-6s6 2 8 6"/><path {...S} d="M18 52c0-10 6-16 14-16s14 6 14 16"/><path {...S} stroke={A} d="M28 24h.1M36 24h.1M30 28c1 1 3 1 4 0"/></>),
  pill: (<><rect {...S} x="12" y="24" width="40" height="16" rx="8" transform="rotate(-30 32 32)"/><path {...S} stroke={A} d="M24 42l16-20"/><circle {...S} cx="50" cy="52" r="5"/></>),
  // ── lesson icons ──────────────────────────────────────────────────────────
  home: (<><path {...S} d="M10 30L32 12l22 18M16 26v26h32V26"/><path {...S} stroke={A} d="M28 52V38h8v14"/></>),
  people: (<><circle {...S} cx="22" cy="18" r="6"/><circle {...S} cx="42" cy="18" r="6"/><path {...S} d="M8 52c0-10 6-16 14-16s14 6 14 16M30 52c0-10 6-16 14-16s12 6 12 16"/><circle cx="32" cy="40" r="2" fill={A} stroke="none"/></>),
  elder: (<><circle {...S} cx="30" cy="12" r="5"/><path {...S} d="M30 18v20l-4 16M30 38l6 16M30 22l-6 10"/><path {...S} stroke={A} d="M44 24v30M44 24c-4 0-6 4-6 8"/></>),
  child: (<><circle {...S} cx="22" cy="14" r="6"/><path {...S} d="M22 20v18l-4 14M22 38l4 14M22 24l-6 6M22 24l6 6"/><path {...S} stroke={A} d="M44 30a8 8 0 1 0 .1 0M44 38v14"/></>),
  mind: (<><path {...S} d="M22 44c-8-2-12-10-10-18 2-10 12-16 22-14 10 2 16 10 14 20-1 5-4 8-8 10v10H26v-8z"/><path {...S} stroke={A} d="M28 26c0-4 8-4 8 0 0 3-4 3-4 7"/><circle cx="32" cy="37" r="1.5" fill={A} stroke="none"/></>),
  dd: (<><circle {...S} cx="32" cy="30" r="20"/><path {...S} d="M32 10v40M12 30h40"/><path {...S} stroke={A} d="M22 20l20 20M42 20L22 40"/></>),
  food: (<><path {...S} d="M12 36h40a20 12 0 0 1-40 0z"/><path {...S} d="M20 36c0-10 6-14 12-14s12 4 12 14"/><path {...S} stroke={A} d="M30 14c0 3 2 3 2 6M38 12c0 3 2 3 2 6"/></>),
  money: (<><rect {...S} x="8" y="18" width="48" height="28" rx="4"/><circle {...S} cx="32" cy="32" r="8"/><path {...S} stroke={A} d="M14 24h.1M50 40h.1M32 28v8"/></>),
  house: (<><path {...S} d="M10 30L32 12l22 18M16 26v26h32V26"/><path {...S} stroke={A} d="M22 40l6-6 6 6 6-6 6 6"/></>),
  safety: (<><path {...S} d="M32 8l20 8v14c0 12-8 20-20 26C20 50 12 42 12 30V16z"/><path {...S} stroke={A} d="M24 30l6 6 10-12"/></>),
  care: (<><path {...S} d="M32 54C16 42 8 34 8 24a10 10 0 0 1 18-6l6 6 6-6a10 10 0 0 1 18 6c0 10-8 18-24 30z"/><path {...S} stroke={A} d="M20 30h8l4-8 4 14 4-6h4"/></>),
};

export function Illustration({ name, size = 64, className = "" }: { name: string; size?: number; className?: string }) {
  const art = ART[name] ?? ART.care;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className={className}>
      {art}
    </svg>
  );
}
