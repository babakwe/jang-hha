"use client";
/**
 * Handwashing scene (Procedure XII-1). One animated SVG, phases drive what is shown and what moves.
 * Pure inline SVG + CSS keyframes: no assets, instant, works offline, respects reduced motion.
 */
export type HandwashPhase = "gather" | "sleeves" | "wet" | "soap" | "scrub" | "rinse" | "dry" | "tapoff" | "gel" | "rub";

const INK = "var(--ink)", BRAND = "var(--brand)", ACC = "var(--accent)", WATER = "#4aa3df", SOAP = "#e9c46a";
const L = { fill: "none", stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function Handwash({ phase }: { phase: HandwashPhase }) {
  const water = phase === "wet" || phase === "rinse";
  const hands = phase !== "gather";
  const low = phase === "rinse"; // hands lower than wrists
  const bubbles = phase === "soap" || phase === "scrub";
  const show = (p: HandwashPhase[]) => p.includes(phase);
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" role="img" aria-label={phase}>
      <style>{`
        @keyframes drop { 0%{translate:0 0;opacity:0} 15%{opacity:1} 100%{translate:0 90px;opacity:0} }
        @keyframes rub { 0%,100%{translate:0 0;rotate:0deg} 50%{translate:10px 0;rotate:-6deg} }
        @keyframes rub2 { 0%,100%{translate:0 0;rotate:0deg} 50%{translate:-10px 0;rotate:6deg} }
        @keyframes pop { 0%{scale:.6;opacity:.2} 50%{opacity:1} 100%{scale:1.2;opacity:0} }
        @keyframes glow { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes nudge { 0%,100%{translate:0 0} 50%{translate:0 -6px} }
        .d{animation:drop 1.1s linear infinite} .d2{animation-delay:.35s} .d3{animation-delay:.7s}
        .r1{animation:rub .9s ease-in-out infinite;transform-origin:150px 150px} .r2{animation:rub2 .9s ease-in-out infinite;transform-origin:170px 150px}
        .b{animation:pop 1.6s ease-out infinite;transform-box:fill-box;transform-origin:center} .b2{animation-delay:.5s} .b3{animation-delay:1s}
        .g{animation:glow 1.2s ease-in-out infinite} .n{animation:nudge 1s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){ .d,.r1,.r2,.b,.g,.n{animation:none} }
      `}</style>
      {/* sink */}
      <path {...L} d="M40 170h240v22a18 18 0 0 1-18 18H58a18 18 0 0 1-18-18z" fill="var(--surface)" />
      <path {...L} d="M60 170v-16a6 6 0 0 1 6-6h0" />
      {/* tap */}
      <path {...L} d="M160 80V60a24 24 0 0 1 24-24h30" />
      <path {...L} d="M214 24v24" />
      <rect x="152" y="80" width="16" height="12" rx="3" fill={INK} />
      {/* soap bottle + towel (gather) */}
      <g opacity={show(["gather", "soap"]) ? 1 : 0.25}>
        <rect {...L} x="248" y="118" width="26" height="46" rx="5" fill={SOAP} />
        <rect x="256" y="106" width="10" height="14" rx="2" fill={INK} />
      </g>
      <g opacity={show(["gather", "dry", "tapoff"]) ? 1 : 0.25}>
        <rect {...L} x="46" y="118" width="40" height="46" rx="4" fill="var(--fr-soft)" />
        <path {...L} d="M54 130h24M54 142h24M54 154h24" strokeWidth={2} />
      </g>
      {/* sanitizer bottle (gel/rub) */}
      {show(["gel", "rub"]) && (
        <g className={phase === "gel" ? "n" : ""}>
          <rect {...L} x="128" y="84" width="30" height="60" rx="6" fill="#bfe3f7" />
          <rect x="138" y="70" width="10" height="16" rx="2" fill={INK} />
          <path {...L} d="M148 70h14" />
          {phase === "gel" && <circle cx="166" cy="104" r="4" fill={WATER} className="d" />}
        </g>
      )}
      {/* water */}
      {water && (
        <g>
          <circle cx="156" cy="100" r="4" fill={WATER} className="d" />
          <circle cx="163" cy="100" r="3.5" fill={WATER} className="d d2" />
          <circle cx="160" cy="100" r="3" fill={WATER} className="d d3" />
        </g>
      )}
      {/* sleeves / watch (sleeves phase) */}
      {phase === "sleeves" && (
        <g>
          <path {...L} d="M96 150l-26-40" />
          <circle {...L} cx="70" cy="110" r="9" fill="var(--surface)" />
          <path {...L} d="M70 104v6h4" strokeWidth={2} />
          <path d="M84 118l20 10" stroke={ACC} strokeWidth="4" strokeLinecap="round" className="g" />
          <path {...L} d="M104 128l6-14" stroke={ACC} />
        </g>
      )}
      {/* hands */}
      {hands && (
        <g transform={low ? "translate(0,22)" : ""}>
          <g className={phase === "scrub" || phase === "rub" ? "r1" : ""}>
            <path {...L} d="M112 160c-6-14-4-30 6-34 4-2 8 2 8 8V120a4 4 0 0 1 8 0v14V114a4 4 0 0 1 8 0v20V118a4 4 0 0 1 8 0v26c0 12-10 20-24 20" fill="var(--surface)" />
          </g>
          <g className={phase === "scrub" || phase === "rub" ? "r2" : ""}>
            <path {...L} d="M208 160c6-14 4-30-6-34-4-2-8 2-8 8V120a4 4 0 0 0-8 0v14V114a4 4 0 0 0-8 0v20V118a4 4 0 0 0-8 0v26c0 12 10 20 24 20" fill="var(--surface)" />
          </g>
          {/* forearms */}
          <path {...L} d="M112 164l-20 40M208 164l20 40" />
          {low && <path d="M250 150v30M250 180l-6-8M250 180l6-8" stroke={ACC} strokeWidth="4" strokeLinecap="round" fill="none" className="g" />}
        </g>
      )}
      {/* bubbles */}
      {bubbles && (
        <g fill={SOAP} opacity=".9">
          <circle cx="150" cy="128" r="7" className="b" /><circle cx="170" cy="120" r="5" className="b b2" /><circle cx="162" cy="140" r="6" className="b b3" />
          <circle cx="140" cy="140" r="4" className="b b2" /><circle cx="182" cy="136" r="4" className="b" />
        </g>
      )}
      {/* towel in hand (dry) / towel on tap (tapoff) */}
      {phase === "dry" && <rect {...L} x="132" y="118" width="56" height="30" rx="4" fill="var(--fr-soft)" className="n" />}
      {phase === "tapoff" && (
        <g>
          <rect {...L} x="140" y="72" width="40" height="22" rx="4" fill="var(--fr-soft)" className="n" />
          <path d="M100 86h24M124 86l-6-6M124 86l-6 6" stroke={ACC} strokeWidth="4" strokeLinecap="round" fill="none" className="g" />
        </g>
      )}
      {/* clock hint during scrub: 20 s */}
      {phase === "scrub" && (
        <g>
          <circle {...L} cx="272" cy="60" r="18" fill="var(--surface)" />
          <path {...L} d="M272 60V48M272 60l8 6" stroke={ACC} />
          <text x="272" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACC}>20 s</text>
        </g>
      )}
    </svg>
  );
}
