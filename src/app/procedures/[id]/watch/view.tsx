"use client";
/**
 * Picture mode: one step at a time, big animated picture, audio plays by itself, text hidden until asked.
 * Built for learners who are stronger in listening than reading. Controls are icons, not words.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { useAudio } from "@/lib/audio";
import { LangToggle } from "@/components/ui";
import { PROCEDURES } from "@/lib/data";
import scenesJson from "@/data/scenes.json";
import { Scene } from "@/components/scenes";
import { pick, pickLang } from "@/lib/types";

const SCENES = scenesJson as unknown as Record<string, { steps: (string | null)[]; alt?: (string | null)[] }>;

export default function WatchView({ id }: { id: string }) {
  const { lang, t } = useLang();
  const { speak, stop, playing, activeId } = useAudio();
  const p = PROCEDURES.find(x => x.id === id)!;
  const sc = SCENES[p.id];
  const frames = [
    ...p.steps.map((s, i) => ({ bi: s, scene: sc?.steps?.[i] ?? undefined, n: i + 1, id: `${p.id}-w-${i}` })),
    ...(p.alt ? p.alt.steps.map((s, i) => ({ bi: s, scene: sc?.alt?.[i] ?? undefined, n: i + 1, id: `${p.id}-w-alt-${i}` })) : []),
  ];
  const [i, setI] = useState(0);
  const [showText, setShowText] = useState(false);
  const [auto, setAuto] = useState(true);
  const f = frames[i];
  const text = `${t("step")} ${f.n}. ${pick(f.bi, lang)}`;
  const startedRef = useRef(false);

  const play = useCallback(() => speak(text, pickLang(f.bi, lang), f.id), [speak, text, f, lang]);

  // speak each frame as it appears (after the first user tap, which browsers require)
  useEffect(() => { if (startedRef.current) play(); return () => stop(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, lang]);

  // auto-advance when this frame's audio ends
  const wasPlaying = useRef(false);
  useEffect(() => {
    if (playing && activeId === f.id) wasPlaying.current = true;
    if (!playing && wasPlaying.current && auto) {
      wasPlaying.current = false;
      const tm = setTimeout(() => { if (i < frames.length - 1) setI(i + 1); }, 900);
      return () => clearTimeout(tm);
    }
  }, [playing, activeId, auto, i, frames.length, f.id]);

  function go(n: number) { startedRef.current = true; stop(); setI(Math.max(0, Math.min(frames.length - 1, n))); if (n === i) play(); }

  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <header className="flex items-center gap-3 px-4 py-3">
        <Link href={`/procedures/${p.id}`} aria-label="Back" className="btn btn-ghost !min-h-11 !px-3 text-xl">←</Link>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-fr">{p.number}</div>
          <div className="font-extrabold truncate">{pick(p.title, lang)}</div>
        </div>
        <LangToggle />
      </header>

      {/* progress dots */}
      <div className="flex gap-1.5 justify-center px-4" aria-label={`${i + 1} / ${frames.length}`}>
        {frames.map((_, k) => <button key={k} onClick={() => go(k)} aria-label={`${k + 1}`} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-brand" : k < i ? "w-2.5 bg-brand/40" : "w-2.5 bg-line"}`} />)}
      </div>

      {/* picture */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-3 max-w-xl w-full mx-auto">
        <button onClick={() => (playing ? stop() : go(i))} className={`card w-full p-3 ${activeId === f.id ? "speaking" : ""}`} aria-label={t("listen")}>
          <Scene id={f.scene} fallbackIcon={p.icon} step={f.n} />
        </button>
        {showText && (
          <div className="card mt-3 w-full p-4">
            <p className="text-xl font-bold leading-snug">{pick(f.bi, lang)}</p>
            <p className="text-sm text-muted mt-2">{lang === "en" ? f.bi.fr : f.bi.en}</p>
          </div>
        )}
      </main>

      {/* controls: icons only */}
      <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-w-xl w-full mx-auto">
        <div className="grid grid-cols-5 gap-2 items-center">
          <button onClick={() => go(i - 1)} disabled={i === 0} aria-label="previous" className="btn btn-ghost !min-h-16 text-2xl">⏮</button>
          <button onClick={() => (playing ? stop() : go(i))} aria-label={playing ? t("stop") : t("listen")} className={`btn ${playing ? "btn-accent" : "btn-brand"} !min-h-16 text-3xl col-span-2`}>{playing ? "⏸" : "▶"}</button>
          <button onClick={() => setShowText(s => !s)} aria-pressed={showText} aria-label="text" className={`btn !min-h-16 text-xl font-black ${showText ? "btn-brand" : "btn-ghost"}`}>Aa</button>
          <button onClick={() => go(i + 1)} disabled={i === frames.length - 1} aria-label="next" className="btn btn-ghost !min-h-16 text-2xl">⏭</button>
        </div>
        <label className="flex items-center justify-center gap-2 mt-3 text-xs text-muted">
          <input type="checkbox" checked={auto} onChange={e => setAuto(e.target.checked)} /> {lang === "fr" ? "Passer tout seul à l'étape suivante" : lang === "wo" ? "Topp jéego bi ci boppam" : "Move to the next step by itself"}
        </label>
      </div>
    </div>
  );
}
