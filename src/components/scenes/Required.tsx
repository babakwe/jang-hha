"use client";
/** Specific scenes for the 12 required procedures (beyond handwashing). Phase names map to step meaning. */
import { Aide, Bed, Bubble, Check, Chair, Client, Frame, L, INK, ACC, BRAND, SKIN, SKIN2, GOWN, WATER, SOAP, OK } from "./kit";

// ── XII-5 Bed bath ───────────────────────────────────────────────────────────
export function BedBath({ phase }: { phase: string }) {
  const basin = <g><path d="M240 168h50l-6 22h-38z" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /><path d="M246 172h38" stroke={WATER} strokeWidth="4" /></g>;
  const lying = <><Bed x={20} y={206} w={200} /><Client x={120} y={186} pose="lie" /></>;
  switch (phase) {
    case "towels": return <Frame label="protect bed">{lying}<g className="s-slide"><rect x="70" y="160" width="110" height="10" rx="3" fill="var(--accent-soft)" stroke={ACC} strokeWidth="2" /></g></Frame>;
    case "water": return <Frame label="test water">{lying}{basin}<g className="s-bob"><path d="M262 150c-3-10 0-18 6-18s8 6 6 12l-4 14" fill={SKIN} stroke={INK} strokeWidth="2.5" /></g><text x="266" y="120" textAnchor="middle" fontSize="18">🌡️</text></Frame>;
    case "mitt": return <Frame label="washcloth mitt"><g transform="translate(160,120)" className="s-bob"><path d="M-30 30v-40c0-14 12-24 30-24s30 10 30 24v40z" fill="var(--fr-soft)" stroke={INK} strokeWidth="3" /><path d="M-20 0h40M-20 14h40" stroke={BRAND} strokeWidth="2" /><path d="M30 -10c10 0 16 8 12 18" stroke={INK} strokeWidth="3" fill="none" /></g></Frame>;
    case "headtoe": return <Frame label="head to toe">{lying}<path d="M50 150h150" stroke={ACC} strokeWidth="4" strokeDasharray="6 8" /><g className="s-step"><path d="M190 150l10 0-6-6M200 150l-6 6" stroke={ACC} strokeWidth="4" fill="none" strokeLinecap="round" /></g><text x="54" y="138" fontSize="14" fontWeight="700" fill={ACC}>1</text><text x="190" y="138" fontSize="14" fontWeight="700" fill={ACC}>2</text></Frame>;
    case "exposure": return <Frame label="cover client">{lying}<rect x="40" y="152" width="180" height="22" rx="6" fill="var(--accent-soft)" stroke={ACC} strokeWidth="2.5" opacity=".9" /><g className="s-pulse"><rect x="74" y="150" width="34" height="26" rx="4" fill="none" stroke={OK} strokeWidth="3" /></g></Frame>;
    case "handsfeet": return <Frame label="hands and feet">{basin}<g className="s-bob"><path d="M262 166c-4-8-2-16 4-18" stroke={SKIN2} strokeWidth="10" strokeLinecap="round" /></g><Aide x={120} y={206} /></Frame>;
    case "participate": return <Frame label="let client help"><Client x={120} y={190} /><Chair x={106} y={204} /><g className="s-wave"><rect x="132" y="150" width="18" height="12" rx="3" fill="var(--fr-soft)" stroke={INK} strokeWidth="2" /></g><Aide x={230} y={206} /><Check x={190} y={80} /></Frame>;
    case "last": return <Frame label="genitals last">{lying}<g className="s-pulse"><circle cx="150" cy="166" r="14" fill="none" stroke={ACC} strokeWidth="3" /></g><text x="150" y="128" textAnchor="middle" fontSize="20" fontWeight="900" fill={ACC}>3</text></Frame>;
    case "dress": return <Frame label="lotion and dress">{lying}<g className="s-bob"><rect x="240" y="140" width="20" height="40" rx="5" fill={SOAP} stroke={INK} strokeWidth="2.5" /></g><Bubble x={210} y={70} /></Frame>;
    default: return <Frame label="bed bath">{lying}{basin}<Aide x={270} y={206} /></Frame>;
  }
}

// ── XII-10 Mouth care ────────────────────────────────────────────────────────
export function Mouth({ phase }: { phase: string }) {
  const brush = <g className="s-slide"><rect x="146" y="112" width="70" height="8" rx="4" fill={BRAND} stroke={INK} strokeWidth="2" /><path d="M146 108v16" stroke="#fff" strokeWidth="6" /></g>;
  const face = <g><circle cx="120" cy="116" r="44" fill={SKIN2} stroke={INK} strokeWidth="3" /><path d="M100 128c10 10 30 10 40 0" fill="#fff" stroke={INK} strokeWidth="2.5" /><circle cx="104" cy="104" r="4" fill={INK} /><circle cx="136" cy="104" r="4" fill={INK} /></g>;
  switch (phase) {
    case "selfbrush": return <Frame label="client brushes">{face}{brush}<g transform="translate(260,150)"><path d="M-14 -20h28l-4 36h-20z" fill="#bfe3f7" stroke={INK} strokeWidth="2.5" /></g></Frame>;
    case "position": return <Frame label="position upright"><Bed x={30} y={206} /><g transform="translate(110,180) rotate(-30)"><path d="M-48 -18h70a10 10 0 0 1 0 20h-70z" fill={GOWN} stroke={INK} strokeWidth="2.5" /></g><circle cx="74" cy="120" r="12" fill={SKIN2} stroke={INK} strokeWidth="2.5" /><g transform="translate(110,156)"><path d="M-18 0h36l-4 12h-28z" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /></g></Frame>;
    case "brush": return <Frame label="brush gently">{face}{brush}<path d="M216 92a20 20 0 1 1 0 40" stroke={ACC} strokeWidth="3" fill="none" className="s-pulse" /></Frame>;
    case "rinse": return <Frame label="rinse">{face}<g transform="translate(220,118)"><path d="M-14 -20h28l-4 36h-20z" fill="#bfe3f7" stroke={INK} strokeWidth="2.5" /></g><circle cx="120" cy="150" r="3" fill={WATER} className="s-drop" /></Frame>;
    case "dentures-out": return <Frame label="remove dentures"><g className="s-bob"><path d="M120 110c20-16 60-16 80 0v14c-20 10-60 10-80 0z" fill="#fff" stroke={INK} strokeWidth="3" /><path d="M132 112v10M144 108v14M156 106v16M168 106v16M180 108v14M192 112v10" stroke={INK} strokeWidth="1.5" /></g><path d="M110 170h100l-8 30h-84z" fill="#bfe3f7" stroke={INK} strokeWidth="2.5" /></Frame>;
    case "sink": return <Frame label="padded sink"><path {...L} d="M70 160h180v20a16 16 0 0 1-16 16H86a16 16 0 0 1-16-16z" fill="var(--surface)" /><rect x="96" y="164" width="128" height="10" rx="3" fill="var(--fr-soft)" stroke={BRAND} strokeWidth="2" /><path d="M100 178h120" stroke={WATER} strokeWidth="4" /><g className="s-bob"><path d="M130 120c16-12 44-12 60 0v10c-16 8-44 8-60 0z" fill="#fff" stroke={INK} strokeWidth="3" /></g><Check x={270} y={90} /></Frame>;
    case "dentures-in": return <Frame label="insert or store in water">{face}<g transform="translate(240,140)"><path d="M-22 -24h44l-6 46h-32z" fill="#bfe3f7" stroke={INK} strokeWidth="2.5" /><path d="M-12 0c8-6 16-6 24 0" stroke={INK} strokeWidth="2.5" fill="#fff" /></g></Frame>;
    default: return <Frame label="mouth care">{face}{brush}</Frame>;
  }
}

// ── XII-14 Helping to walk ───────────────────────────────────────────────────
export function Walk({ phase }: { phase: string }) {
  const pair = (weak = true) => (
    <g className={phase === "walk" || phase === "short" ? "s-step" : ""}>
      <Client x={140} y={166} pose="stand" />
      <Aide x={weak ? 186 : 96} y={206} />
      <rect x="126" y="134" width="28" height="7" rx="3" fill={ACC} />
    </g>
  );
  switch (phase) {
    case "reassure": return <Frame label="reassure"><Client x={110} y={190} /><Chair x={96} y={204} /><Aide x={220} y={206} armUp /><Bubble x={140} y={50}><path d="M20 22c-6-8-18-2-14 6 2 4 14 10 14 10s12-6 14-10c4-8-8-14-14-6z" fill={ACC} /></Bubble></Frame>;
    case "shoes": return <Frame label="closed non-slip shoes"><g transform="translate(160,160)" className="s-bob"><path d="M-60 0c0-20 20-26 40-26 10 0 16 10 30 14 20 6 40 6 40 22v6h-110z" fill={BRAND} stroke={INK} strokeWidth="3" /><path d="M-60 12h110" stroke={INK} strokeWidth="5" /><path d="M-50 18h10M-30 18h10M-10 18h10M10 18h10" stroke={INK} strokeWidth="3" /></g><Check x={270} y={80} /></Frame>;
    case "practice": return <Frame label="stand and shift weight"><Client x={160} y={166} pose="stand" /><g className="s-slide"><path d="M120 214h80" stroke={ACC} strokeWidth="4" strokeLinecap="round" /></g></Frame>;
    case "weak": return <Frame label="walk on weak side">{pair(true)}<g className="s-pulse"><path d="M158 60v40" stroke={ACC} strokeWidth="5" strokeLinecap="round" /><path d="M150 92l8 10 8-10" stroke={ACC} strokeWidth="5" fill="none" strokeLinecap="round" /></g><text x="200" y="56" fontSize="14" fontWeight="800" fill={ACC}>gait belt</text></Frame>;
    case "short": return <Frame label="short distance">{pair()}<path d="M60 220h200" stroke={INK} strokeWidth="2" strokeDasharray="4 6" /><text x="60" y="234" fontSize="12" fill={INK}>←  short  →</text></Frame>;
    default: return <Frame label="walk slowly">{pair()}</Frame>;
  }
}

// ── XII-16 Occupied bed ──────────────────────────────────────────────────────
export function OccupiedBed({ phase }: { phase: string }) {
  switch (phase) {
    case "turn": return <Frame label="turn client to side"><Bed x={30} y={206} /><Client x={150} y={186} pose="side" /><Aide x={260} y={206} /></Frame>;
    case "roll": return <Frame label="roll dirty sheet"><Bed x={30} y={206} /><Client x={110} y={186} pose="side" /><g className="s-slide"><ellipse cx="170" cy="182" rx="14" ry="8" fill="var(--bad-soft)" stroke={INK} strokeWidth="2.5" /></g><rect x="180" y="178" width="40" height="8" fill="#fff" stroke={OK} strokeWidth="2.5" /></Frame>;
    case "over": return <Frame label="turn to clean side"><Bed x={30} y={206} /><g transform="translate(320,0) scale(-1,1)"><Client x={150} y={186} pose="side" /></g><rect x="40" y="178" width="110" height="8" fill="#fff" stroke={OK} strokeWidth="2.5" /></Frame>;
    case "pillow": return <Frame label="change pillowcase"><g transform="translate(160,130)" className="s-bob"><rect x="-60" y="-26" width="120" height="52" rx="18" fill="#fff" stroke={INK} strokeWidth="3" /><path d="M-60 -26h60v52h-60" fill="var(--fr-soft)" stroke={BRAND} strokeWidth="2.5" /></g></Frame>;
    default: return <Frame label="occupied bed"><Bed x={30} y={206} /><Client x={130} y={186} pose="lie" /><Aide x={260} y={206} /></Frame>;
  }
}

// ── XII-17 Bedpan ────────────────────────────────────────────────────────────
export function Bedpan({ phase }: { phase: string }) {
  const pan = (x: number, y: number) => <path d={`M${x} ${y}h50c0 10-6 16-14 16h-22c-8 0-14-6-14-16z`} fill="#e6eef5" stroke={INK} strokeWidth="2.5" />;
  switch (phase) {
    case "warm": return <Frame label="warm the bedpan"><g className="s-bob">{pan(130, 120)}</g><g className="s-pulse"><path d="M140 104c0-8 6-8 6-16M156 104c0-8 6-8 6-16M172 104c0-8 6-8 6-16" stroke={ACC} strokeWidth="3" fill="none" strokeLinecap="round" /></g></Frame>;
    case "lift": return <Frame label="lift hips"><Bed x={30} y={206} /><g className="s-bob"><Client x={130} y={176} pose="lie" /></g>{pan(110, 182)}<path d="M150 150v-20M144 136l6-6 6 6" stroke={ACC} strokeWidth="3" fill="none" /></Frame>;
    case "signal": return <Frame label="toilet paper and call bell"><Bed x={30} y={206} /><Client x={130} y={186} pose="lie" /><g className="s-pulse"><circle cx="250" cy="140" r="14" fill={ACC} stroke={INK} strokeWidth="2.5" /><path d="M262 128c6 4 6 12 0 16" stroke={ACC} strokeWidth="3" fill="none" /></g><rect x="214" y="150" width="20" height="20" rx="10" fill="#fff" stroke={INK} strokeWidth="2.5" /></Frame>;
    case "remove": return <Frame label="remove carefully"><Bed x={30} y={206} /><Client x={130} y={186} pose="lie" /><g className="s-slide">{pan(200, 150)}</g></Frame>;
    case "measure": return <Frame label="measure and empty"><g transform="translate(160,150)"><path d="M-26 -40h52l-6 66h-40z" fill="#fff8d6" stroke={INK} strokeWidth="2.5" /><path d="M-20 -20h8M-20 -4h8M-20 12h8" stroke={INK} strokeWidth="2" /></g><text x="230" y="120" fontSize="16" fontWeight="800" fill={ACC}>mL</text></Frame>;
    default: return <Frame label="bedpan"><Bed x={30} y={206} /><Client x={130} y={186} pose="lie" />{pan(220, 150)}</Frame>;
  }
}

// ── XII-26 Wheelchair transfer ───────────────────────────────────────────────
export function Transfer({ phase }: { phase: string }) {
  const wc = (x = 210) => <Chair x={x} y={196} wheels />;
  switch (phase) {
    case "angle": return <Frame label="angle chair, lock brakes"><Bed x={10} y={206} w={150} />{wc(190)}<g className="s-pulse"><circle cx="200" cy="200" r="22" fill="none" stroke={ACC} strokeWidth="3" /><path d="M200 190v20M190 200h20" stroke={ACC} strokeWidth="3" /></g><text x="246" y="120" fontSize="20">🔒</text></Frame>;
    case "belt": return <Frame label="safety belt"><Client x={110} y={190} /><rect x="96" y="160" width="28" height="7" rx="3" fill={ACC} className="s-pulse" /><Aide x={220} y={206} /></Frame>;
    case "dangle": return <Frame label="sit at edge"><Bed x={10} y={206} w={150} /><Client x={130} y={172} />{wc(220)}</Frame>;
    case "stand": return <Frame label="stand client up"><Client x={130} y={166} pose="stand" /><g className="s-bob"><Aide x={170} y={206} /></g>{wc(230)}</Frame>;
    case "pivot": return <Frame label="pivot"><Client x={150} y={166} pose="stand" /><path d="M120 60a40 40 0 1 1 60 0" stroke={ACC} strokeWidth="4" fill="none" className="s-pulse" /><path d="M176 52l6 10 8-8" stroke={ACC} strokeWidth="4" fill="none" />{wc(190)}</Frame>;
    case "lower": return <Frame label="lower into chair"><g className="s-bob"><Client x={210} y={180} /></g>{wc(196)}<Aide x={110} y={206} /></Frame>;
    case "footrests": return <Frame label="footrests, release brakes"><Client x={210} y={180} />{wc(196)}<g className="s-pulse"><rect x="236" y="200" width="22" height="6" rx="2" fill={ACC} /></g></Frame>;
    default: return <Frame label="transfer"><Bed x={10} y={206} w={150} />{wc(200)}</Frame>;
  }
}

// ── XII-39..43 Five medication rights ────────────────────────────────────────
export function MedCheck({ phase }: { phase: string }) {
  const bottle = (warn = false) => (
    <g transform="translate(110,130)">
      <rect x="-26" y="-40" width="52" height="80" rx="8" fill="#f2a65a" stroke={INK} strokeWidth="3" />
      <rect x="-30" y="-52" width="60" height="14" rx="3" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="-20" y="-24" width="40" height="40" rx="3" fill="#fff" stroke={warn ? "var(--bad)" : INK} strokeWidth="2.5" />
      <path d="M-14 -14h28M-14 -4h20M-14 6h24" stroke={INK} strokeWidth="2" />
    </g>
  );
  const plan = <g transform="translate(220,130)"><rect x="-30" y="-44" width="60" height="88" rx="4" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /><rect x="-10" y="-50" width="20" height="10" rx="2" fill={INK} /><path d="M-20 -24h40M-20 -10h40M-20 4h28M-20 18h36" stroke={INK} strokeWidth="2" /></g>;
  const icon: Record<string, string> = { person: "🧍🏾‍♀️", med: "💊", dose: "½", time: "🕗", route: "👄", expiry: "📅" };
  switch (phase) {
    case "read": return <Frame label="read the label">{bottle()}<g className="s-pulse"><circle cx="110" cy="126" r="34" fill="none" stroke={ACC} strokeWidth="3" /><path d="M134 150l20 20" stroke={ACC} strokeWidth="5" strokeLinecap="round" /></g></Frame>;
    case "match": return <Frame label="label matches care plan">{bottle()}{plan}<path d="M146 130h38" stroke="var(--ok)" strokeWidth="4" strokeDasharray="5 5" className="s-pulse" /><Check x={165} y={74} /></Frame>;
    case "mismatch": return <Frame label="does not match: call supervisor">{bottle(true)}{plan}<Check x={165} y={74} ok={false} /><g transform="translate(165,190)" className="s-bob"><rect x="-10" y="-16" width="20" height="32" rx="4" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /></g></Frame>;
    case "record": return <Frame label="record and report">{plan}<path d="M120 110l-20 50" stroke={INK} strokeWidth="5" strokeLinecap="round" /><path d="M100 160l-4 8 8-4z" fill={INK} /></Frame>;
    default:
      if (icon[phase]) return <Frame label={phase}>{bottle()}<g className="s-bob"><circle cx="220" cy="110" r="38" fill="var(--fr-soft)" stroke={BRAND} strokeWidth="3" /><text x="220" y="124" textAnchor="middle" fontSize="38" fontWeight="900" fill={BRAND}>{icon[phase]}</text></g></Frame>;
      return <Frame label="medication">{bottle()}</Frame>;
  }
}
