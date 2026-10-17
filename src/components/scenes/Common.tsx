"use client";
/** Steps that recur in almost every procedure. */
import { Aide, Bed, Bubble, Check, Client, Clipboard, Frame, Phone, Chair, L, INK, ACC, SKIN, WATER, SOAP } from "./kit";

export type CommonPhase = "prep" | "explain" | "wash" | "gloves" | "privacy" | "equipment" | "report" | "comfort" | "safety" | "supervisor" | "clean" | "dispose";

function Gloves({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} className="s-bob">
      <path d="M-14 20c-4-10-2-22 4-24 3-1 5 2 5 6V-6a3 3 0 0 1 6 0v8V-10a3 3 0 0 1 6 0v12V-6a3 3 0 0 1 6 0v18c0 8-5 12-12 12" fill="#bfe3f7" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  );
}

export function Common({ phase }: { phase: CommonPhase }) {
  switch (phase) {
    case "explain":
      return <Frame label="explain"><Client x={110} y={190} /><Aide x={210} y={206} armUp /><Bubble x={130} y={60} /><Chair x={96} y={204} /></Frame>;
    case "prep":
      return (
        <Frame label="prepare">
          <Client x={80} y={190} /><Chair x={66} y={204} />
          <Aide x={190} y={206} gloves />
          <Bubble x={92} y={56} />
          <g transform="translate(262,120)"><path {...L} d="M-14 0h28" /><circle cx="-4" cy="10" r="3" fill={WATER} className="s-drop" /><circle cx="4" cy="10" r="3" fill={WATER} className="s-drop" /></g>
          <Gloves x={268} y={176} />
        </Frame>
      );
    case "wash":
      return (
        <Frame label="wash hands">
          <path {...L} d="M90 170h140v16a14 14 0 0 1-14 14H104a14 14 0 0 1-14-14z" fill="var(--surface)" />
          <path {...L} d="M160 90V74a16 16 0 0 1 16-16h22" />
          <circle cx="158" cy="104" r="3.5" fill={WATER} className="s-drop" /><circle cx="164" cy="104" r="3" fill={WATER} className="s-drop" style={{ animationDelay: ".4s" }} />
          <g className="s-slide"><path d="M130 160c-4-10-2-22 6-24 3-1 6 2 6 6v-8a3 3 0 0 1 6 0v8 -10a3 3 0 0 1 6 0v12" fill={SKIN} stroke={INK} strokeWidth="2.5" /><path d="M190 160c4-10 2-22-6-24-3-1-6 2-6 6v-8a3 3 0 0 0-6 0v8 -10a3 3 0 0 0-6 0v12" fill={SKIN} stroke={INK} strokeWidth="2.5" /></g>
          <circle cx="150" cy="134" r="6" fill={SOAP} className="s-pulse" /><circle cx="170" cy="128" r="4" fill={SOAP} className="s-pulse" />
        </Frame>
      );
    case "gloves":
      return <Frame label="gloves"><Aide x={150} y={206} gloves /><Gloves x={226} y={120} /><Gloves x={78} y={120} /></Frame>;
    case "privacy":
      return (
        <Frame label="privacy">
          <Bed x={30} y={206} /><Client x={130} y={186} pose="lie" />
          <g className="s-slide"><path d="M240 40v166M240 40h70" stroke={INK} strokeWidth="3" /><path d="M244 44h62v150h-62z" fill="var(--accent-soft)" stroke={ACC} strokeWidth="2.5" /><path d="M260 44v150M276 44v150M292 44v150" stroke={ACC} strokeWidth="1.5" /></g>
        </Frame>
      );
    case "equipment":
      return (
        <Frame label="equipment">
          <Aide x={90} y={206} />
          <rect x="150" y="150" width="140" height="10" rx="3" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /><path {...L} d="M160 160v46M280 160v46" />
          <g className="s-bob"><rect x="160" y="126" width="26" height="24" rx="4" fill="var(--fr-soft)" stroke={INK} strokeWidth="2.5" /><rect x="196" y="118" width="16" height="32" rx="3" fill={SOAP} stroke={INK} strokeWidth="2.5" /><path d="M222 150c0-14 30-14 30 0z" fill="#bfe3f7" stroke={INK} strokeWidth="2.5" /><rect x="260" y="132" width="22" height="18" rx="3" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /></g>
        </Frame>
      );
    case "report":
      return <Frame label="observe, record, report"><Aide x={100} y={206} holding={null} /><Clipboard x={180} y={130} /><Phone x={250} y={124} /><g className="s-pulse"><circle cx="100" cy="88" r="16" fill="none" stroke={ACC} strokeWidth="3" /><path d="M112 100l12 12" stroke={ACC} strokeWidth="4" strokeLinecap="round" /></g></Frame>;
    case "supervisor":
      return <Frame label="call supervisor"><Aide x={120} y={206} armUp holding={<rect x="-7" y="-14" width="14" height="24" rx="3" fill="var(--surface)" stroke={INK} strokeWidth="2" />} /><Phone x={230} y={110} /><Check x={230} y={170} ok={false} /></Frame>;
    case "comfort":
      return <Frame label="comfort"><Bed x={30} y={206} /><Client x={130} y={186} pose="lie" /><g className="s-pulse"><path d="M230 70c-8-10-24-4-20 8 2 8 20 18 20 18s18-10 20-18c4-12-12-18-20-8z" fill="var(--bad-soft)" stroke={ACC} strokeWidth="2.5" /></g><Check x={270} y={150} /></Frame>;
    case "safety":
      return <Frame label="safety"><Client x={120} y={190} /><Chair x={106} y={204} wheels /><g className="s-pulse"><path d="M230 70l30 12v18c0 16-12 26-30 32-18-6-30-16-30-32V82z" fill="var(--ok-soft)" stroke="var(--ok)" strokeWidth="3" /><path d="M218 100l8 8 14-16" stroke="var(--ok)" strokeWidth="4" fill="none" strokeLinecap="round" /></g></Frame>;
    case "clean":
      return <Frame label="clean and store"><Aide x={100} y={206} gloves /><g className="s-slide"><rect x="170" y="140" width="36" height="22" rx="4" fill="var(--fr-soft)" stroke={INK} strokeWidth="2.5" /></g><rect x="220" y="110" width="70" height="96" rx="4" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /><path {...L} d="M220 142h70M220 174h70" /></Frame>;
    case "dispose":
      return <Frame label="dispose"><Aide x={100} y={206} gloves /><path d="M210 130h56l-6 76h-44z" fill="var(--surface)" stroke={INK} strokeWidth="2.5" /><path {...L} d="M204 130h68M226 122h24" /><g className="s-drop"><rect x="230" y="70" width="16" height="16" rx="3" fill={ACC} /></g></Frame>;
  }
}
