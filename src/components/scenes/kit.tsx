/**
 * Shared figure kit for scenes. Simple, warm, readable at phone size.
 * Aide = teal scrubs, head wrap in accent colour. Client = soft blue gown.
 * Everything is inline SVG; animation via CSS classes defined in <SceneStyle/>.
 */
export const INK = "var(--ink)", BRAND = "var(--brand)", ACC = "var(--accent)", SKIN = "#8d5a3b", SKIN2 = "#6b4026", GOWN = "#cfe0f5", WATER = "#4aa3df", SOAP = "#e9c46a", OK = "var(--ok)", BAD = "var(--bad)";
export const L = { fill: "none", stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function SceneStyle() {
  return (
    <style>{`
      @keyframes s-bob { 0%,100%{translate:0 0} 50%{translate:0 -5px} }
      @keyframes s-pulse { 0%,100%{opacity:.35} 50%{opacity:1} }
      @keyframes s-talk { 0%,100%{scale:1} 50%{scale:1.08} }
      @keyframes s-wave { 0%,100%{rotate:0deg} 50%{rotate:-14deg} }
      @keyframes s-slide { 0%{translate:-14px 0} 100%{translate:14px 0} }
      @keyframes s-step { 0%,100%{translate:0 0} 50%{translate:12px 0} }
      @keyframes s-drop { 0%{translate:0 0;opacity:0} 20%{opacity:1} 100%{translate:0 40px;opacity:0} }
      @keyframes s-check { 0%{stroke-dashoffset:40} 60%,100%{stroke-dashoffset:0} }
      @keyframes s-roll { 0%,100%{rotate:0deg} 50%{rotate:-18deg} }
      .s-bob{animation:s-bob 1.4s ease-in-out infinite}
      .s-pulse{animation:s-pulse 1.2s ease-in-out infinite}
      .s-talk{animation:s-talk .7s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
      .s-wave{animation:s-wave .9s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom left}
      .s-slide{animation:s-slide 1.2s ease-in-out infinite alternate}
      .s-step{animation:s-step 1.6s ease-in-out infinite}
      .s-drop{animation:s-drop 1.1s linear infinite}
      .s-check{stroke-dasharray:40;animation:s-check 1.6s ease-out infinite}
      .s-roll{animation:s-roll 1.8s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom center}
      @media (prefers-reduced-motion: reduce){ .s-bob,.s-pulse,.s-talk,.s-wave,.s-slide,.s-step,.s-drop,.s-check,.s-roll{animation:none} }
    `}</style>
  );
}

/** Standing aide, origin = feet centre. */
export function Aide({ x, y, s = 1, armUp = false, gloves = false, holding }: { x: number; y: number; s?: number; armUp?: boolean; gloves?: boolean; holding?: React.ReactNode }) {
  const hand = gloves ? "#7cc6e8" : SKIN;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-14 0v-46h28v46" fill={BRAND} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M-18 -46c0-22 8-30 18-30s18 8 18 30z" fill={BRAND} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="0" cy="-92" r="13" fill={SKIN} stroke={INK} strokeWidth="2.5" />
      <path d="M-14 -96c2-12 26-12 28 0-6-4-22-4-28 0z" fill={ACC} stroke={INK} strokeWidth="2" />
      <path d="M-18 -70l-10 30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="-28" cy="-38" r="5" fill={hand} stroke={INK} strokeWidth="2" />
      <g className={armUp ? "s-wave" : ""}>
        <path d={armUp ? "M18 -70l14 -20" : "M18 -70l10 30"} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={armUp ? 33 : 28} cy={armUp ? -92 : -38} r="5" fill={hand} stroke={INK} strokeWidth="2" />
        {holding && <g transform={`translate(${armUp ? 33 : 28},${armUp ? -92 : -38})`}>{holding}</g>}
      </g>
    </g>
  );
}

/** Client sitting or lying. Origin = hip. */
export function Client({ x, y, pose = "sit", s = 1 }: { x: number; y: number; pose?: "sit" | "lie" | "side" | "stand"; s?: number }) {
  if (pose === "lie") return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle cx="-62" cy="-10" r="12" fill={SKIN2} stroke={INK} strokeWidth="2.5" />
      <path d="M-48 -18h70a10 10 0 0 1 0 20h-70z" fill={GOWN} stroke={INK} strokeWidth="2.5" />
      <path d="M22 -14h44M22 -4h44" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
  if (pose === "side") return (
    <g transform={`translate(${x},${y}) scale(${s})`} className="s-roll">
      <circle cx="-62" cy="-16" r="12" fill={SKIN2} stroke={INK} strokeWidth="2.5" />
      <path d="M-48 -28c20-6 50-6 70 0v24h-70z" fill={GOWN} stroke={INK} strokeWidth="2.5" />
      <path d="M22 -10l40 -6M22 -4l44 2" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
  if (pose === "stand") return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-8 40V0M8 40V0" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M-16 0v-40c0-8 32-8 32 0v40z" fill={GOWN} stroke={INK} strokeWidth="2.5" />
      <circle cx="0" cy="-54" r="12" fill={SKIN2} stroke={INK} strokeWidth="2.5" />
      <path d="M-14 -34l-10 24M14 -34l10 24" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M0 0h30v34" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M-14 0v-38c0-8 28-8 28 0v38z" fill={GOWN} stroke={INK} strokeWidth="2.5" />
      <circle cx="0" cy="-52" r="12" fill={SKIN2} stroke={INK} strokeWidth="2.5" />
      <path d="M-12 -30l-6 22M12 -30l8 22" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

export function Bed({ x, y, w = 190 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path {...L} d={`M0 0V-46M0 -20h${w}v20M${w} 0v-34`} />
      <rect x="0" y="-26" width={w} height="10" rx="3" fill="var(--surface)" stroke={INK} strokeWidth="2.5" />
    </g>
  );
}

export function Chair({ x, y, wheels = false }: { x: number; y: number; wheels?: boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path {...L} d="M0 -40v40M0 -10h34v10M34 -10v-4" />
      {wheels ? <><circle {...L} cx="10" cy="4" r="16" /><circle {...L} cx="38" cy="10" r="5" /></> : <path {...L} d="M34 0v6M0 0v6" />}
    </g>
  );
}

export function Bubble({ x, y, children }: { x: number; y: number; children?: React.ReactNode }) {
  return (
    <g transform={`translate(${x},${y})`} className="s-talk">
      <path d="M0 0h56a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10H18l-12 10 2-10H0a10 10 0 0 1-10-10V10A10 10 0 0 1 0 0z" fill="var(--surface)" stroke={INK} strokeWidth="2.5" />
      {children ?? <path d="M8 20h8M24 20h8M40 20h8" stroke={ACC} strokeWidth="5" strokeLinecap="round" />}
    </g>
  );
}

export function Check({ x, y, ok = true }: { x: number; y: number; ok?: boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r="18" fill={ok ? "var(--ok-soft)" : "var(--bad-soft)"} stroke={ok ? OK : BAD} strokeWidth="3" />
      {ok ? <path d="M-8 0l6 6 10-12" stroke={OK} strokeWidth="4" fill="none" strokeLinecap="round" className="s-check" />
          : <path d="M-7 -7l14 14M7 -7l-14 14" stroke={BAD} strokeWidth="4" strokeLinecap="round" />}
    </g>
  );
}

export function Phone({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} className="s-bob">
      <rect x="-12" y="-22" width="24" height="44" rx="5" fill="var(--surface)" stroke={INK} strokeWidth="2.5" />
      <circle cx="0" cy="15" r="2.5" fill={INK} />
      <path d="M18 -18c6 4 6 12 0 16M24 -24c10 8 10 22 0 30" stroke={ACC} strokeWidth="3" fill="none" strokeLinecap="round" className="s-pulse" />
    </g>
  );
}

export function Clipboard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-20" y="-26" width="40" height="52" rx="4" fill="var(--surface)" stroke={INK} strokeWidth="2.5" />
      <rect x="-8" y="-30" width="16" height="8" rx="2" fill={INK} />
      <path d="M-12 -10h24M-12 0h24M-12 10h14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 6l4 4 8-10" stroke={ACC} strokeWidth="3" fill="none" strokeLinecap="round" className="s-check" />
    </g>
  );
}

export function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" role="img" aria-label={label}>
      <SceneStyle />
      <rect x="0" y="206" width="320" height="34" fill="var(--fr-soft)" />
      {children}
    </svg>
  );
}
