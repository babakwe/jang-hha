"use client";
/**
 * Lesson picture mode: one teaching point per screen, picture first, audio plays by itself,
 * text hidden behind Aa. Same controls as procedure picture mode.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { useAudio } from "@/lib/audio";
import { LangToggle } from "@/components/ui";
import { LESSONS } from "@/lib/data";
import { pick, pickLang, type Bi } from "@/lib/types";
import { Illustration } from "@/components/Illustration";
import artJson from "@/data/art.json";
const ART = artJson as Record<string, string>;

export default function LessonWatch({ id }: { id: string }) {
  const { lang, t } = useLang();
  const { speak, stop, playing, activeId } = useAudio();
  const l = LESSONS.find(x => x.id === id)!;
  const frames: { bi: Bi; art?: string; head: Bi; id: string }[] = [
    { bi: l.intro, art: undefined, head: l.title, id: `${l.id}-w-intro` },
    ...l.sections.flatMap((s, si) => s.points.map((p, pi) => ({ bi: p, art: ART[`lesson:${l.id}-${si}-${pi}`], head: s.heading, id: `${l.id}-w-${si}-${pi}` }))),
    { bi: l.report, art: undefined, head: { en: t("whenToReport"), fr: t("whenToReport"), wo: t("whenToReport") }, id: `${l.id}-w-report` },
  ];
  const [i, setI] = useState(0);
  const [showText, setShowText] = useState(false);
  const [auto, setAuto] = useState(true);
  const f = frames[i];
  const started = useRef(false);
  const play = useCallback(() => speak(pick(f.bi, lang), pickLang(f.bi, lang), f.id), [speak, f, lang]);
  useEffect(() => { if (started.current) play(); return () => stop(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, lang]);
  const was = useRef(false);
  useEffect(() => {
    if (playing && activeId === f.id) was.current = true;
    if (!playing && was.current && auto) { was.current = false; const tm = setTimeout(() => { if (i < frames.length - 1) setI(i + 1); }, 900); return () => clearTimeout(tm); }
  }, [playing, activeId, auto, i, frames.length, f.id]);
  function go(n: number) { started.current = true; stop(); setI(Math.max(0, Math.min(frames.length - 1, n))); if (n === i) play(); }

  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <header className="flex items-center gap-3 px-4 py-3">
        <Link href={`/learn/${l.id}`} aria-label="Back" className="btn btn-ghost !min-h-11 !px-3 text-xl">←</Link>
        <div className="flex-1 min-w-0"><div className="text-xs font-bold text-fr">{t("module")} {l.module}</div><div className="font-extrabold truncate">{pick(f.head, lang)}</div></div>
        <LangToggle />
      </header>
      <div className="px-4"><div className="h-2 rounded-full bg-line overflow-hidden"><div className="h-full bg-brand transition-all" style={{ width: `${((i + 1) / frames.length) * 100}%` }} /></div></div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-3 max-w-xl w-full mx-auto">
        <button onClick={() => (playing ? stop() : go(i))} className={`card w-full p-3 ${activeId === f.id ? "speaking" : ""}`} aria-label={t("listen")}>
          {f.art
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={`/art/${f.art}`} alt="" className="w-full h-auto rounded-xl" />
            : <div className="w-full aspect-[4/3] flex items-center justify-center text-brand"><Illustration name={l.icon} size={200} /></div>}
        </button>
        {showText && <div className="card mt-3 w-full p-4"><p className="text-xl font-bold leading-snug">{pick(f.bi, lang)}</p><p className="text-sm text-muted mt-2">{lang === "en" ? f.bi.fr : f.bi.en}</p></div>}
      </main>
      <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-w-xl w-full mx-auto">
        <div className="grid grid-cols-5 gap-2 items-center">
          <button onClick={() => go(i - 1)} disabled={i === 0} aria-label="previous" className="btn btn-ghost !min-h-16 text-2xl">⏮</button>
          <button onClick={() => (playing ? stop() : go(i))} aria-label={playing ? t("stop") : t("listen")} className={`btn ${playing ? "btn-accent" : "btn-brand"} !min-h-16 text-3xl col-span-2`}>{playing ? "⏸" : "▶"}</button>
          <button onClick={() => setShowText(s => !s)} aria-pressed={showText} aria-label="text" className={`btn !min-h-16 text-xl font-black ${showText ? "btn-brand" : "btn-ghost"}`}>Aa</button>
          <button onClick={() => go(i + 1)} disabled={i === frames.length - 1} aria-label="next" className="btn btn-ghost !min-h-16 text-2xl">⏭</button>
        </div>
        <label className="flex items-center justify-center gap-2 mt-3 text-xs text-muted"><input type="checkbox" checked={auto} onChange={e => setAuto(e.target.checked)} /> {lang === "fr" ? "Passer tout seul à la suite" : lang === "wo" ? "Topp ci boppam" : "Move on by itself"}</label>
      </div>
    </div>
  );
}
