"use client";
import { BASE } from "@/lib/base";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/lib/lang";
import { useAudio } from "@/lib/audio";
import { Header, Page, Speak } from "@/components/ui";
import { LESSONS, MODULE_ORDER, QUESTIONS, topicLabel } from "@/lib/data";
import { pick, type Question } from "@/lib/types";
import artJson from "@/data/art.json";
const ART = artJson as Record<string, string>;

type Mode = "setup" | "quiz" | "flash" | "done";
const LETTERS = ["A", "B", "C", "D"];

function shuffle<T>(a: T[]): T[] { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

export default function PracticeView() {
  const { t, lang, other } = useLang();
  const { speak, speakAll, stop, activeId } = useAudio();
  const sp = useSearchParams();
  const [module, setModule] = useState<string>(sp.get("module") ?? "all");
  const [diff, setDiff] = useState<string>("any");
  const [mode, setMode] = useState<Mode>("setup");
  const [deck, setDeck] = useState<Question[]>([]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);

  const pool = useMemo(() => QUESTIONS.filter(q => (module === "all" || q.module === module) && (diff === "any" || q.difficulty === diff)), [module, diff]);
  useEffect(() => { stop(); }, [i, mode, stop]);

  function start(m: Mode) { setDeck(shuffle(pool).slice(0, m === "quiz" ? Math.min(20, pool.length) : pool.length)); setI(0); setPicked(null); setFlipped(false); setScore(0); setMode(m); }
  const q = deck[i];
  const qLang = lang === "wo" && !q?.wo ? "fr" : lang;
  const L = q ? (q[qLang] ?? q.fr) : undefined!, O = q ? (qLang === "en" ? q.fr : q.en) : undefined!;

  function readQuestion() {
    if (!q) return;
    speakAll([{ text: L.q, lang: qLang, id: `q-${q.id}` }, ...L.choices.map((c, k) => ({ text: `${LETTERS[k]}. ${c}`, lang: qLang, id: `c-${q.id}-${k}` }))]);
  }
  function choose(k: number) { if (picked !== null) return; setPicked(k); if (k === q.answer) setScore(s => s + 1); speakAll([{ text: `${k === q.answer ? t("correct") : t("wrong")}.`, lang, id: `verdict-${q.id}` }, { text: L.exp, lang: qLang, id: `exp-${q.id}` }]); }
  function next() { if (i + 1 >= deck.length) setMode("done"); else { setI(i + 1); setPicked(null); setFlipped(false); } }

  if (mode === "setup") return (
    <>
      <Header title={t("practice")} back="/" />
      <Page>
        <div className="card p-4 space-y-3">
          <label className="block font-bold">{t("module")}
            <select value={module} onChange={e => setModule(e.target.value)} className="mt-1 w-full card p-3 text-base">
              <option value="all">{t("allModules")} ({QUESTIONS.length})</option>
              {MODULE_ORDER.map(m => { const n = QUESTIONS.filter(q => q.module === m).length; const l = LESSONS.find(x => x.module === m); return <option key={m} value={m}>{t("module")} {m} — {l ? pick(l.title, lang) : ""} ({n})</option>; })}
            </select>
          </label>
          <div className="font-bold">{t("difficulty")}</div>
          <div className="grid grid-cols-4 gap-2">
            {(["any", "easy", "medium", "hard"] as const).map(d => (
              <button key={d} onClick={() => setDiff(d)} className={`btn ${diff === d ? "btn-brand" : "btn-ghost"} !px-2`}>{t(d)}</button>
            ))}
          </div>
          <div className="text-sm text-muted">{pool.length} {t("questions")}</div>
        </div>
        <div className="font-extrabold">{t("chooseMode")}</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={() => start("quiz")} disabled={!pool.length} className="card p-4 text-left hover:border-brand">
            <div className="text-3xl">✅</div><div className="font-extrabold text-lg">{t("quiz")}</div>
            <div className="text-sm text-muted">{lang === "en" ? "20 questions, with the explanation after each answer." : lang === "fr" ? "20 questions, réponse expliquée après chaque choix." : "20 laaj, ñu leeral tontu bi ginnaaw bu nga tànnee."}</div>
          </button>
          <button onClick={() => start("flash")} disabled={!pool.length} className="card p-4 text-left hover:border-brand">
            <div className="text-3xl">🃏</div><div className="font-extrabold text-lg">{t("flashcards")}</div>
            <div className="text-sm text-muted">{lang === "en" ? "Question on the front, right answer on the back. Listen and repeat." : lang === "fr" ? "Question devant, bonne réponse derrière. Écoutez et répétez." : "Laaj bi ci kanam, tontu bi ci ginnaaw. Déglul te baamtu."}</div>
          </button>
        </div>
      </Page>
    </>
  );

  if (mode === "done") return (
    <>
      <Header title={t("practice")} back="/" />
      <Page>
        <div className="card p-6 text-center space-y-3">
          <div className="text-5xl">🎉</div>
          <div className="font-extrabold text-xl">{t("allDone")}</div>
          {deck.length > 0 && mode === "done" && <div className="text-4xl font-black text-brand">{score} / {deck.length}</div>}
          <button onClick={() => setMode("setup")} className="btn btn-brand w-full">{t("restart")}</button>
        </div>
      </Page>
    </>
  );

  return (
    <>
      <Header title={`${i + 1} / ${deck.length}`} back="/practice" />
      <Page>
        <div className="flex gap-2 text-xs">
          <span className="chip bg-fr-soft text-fr">{t("module")} {q.module}</span>
          <span className="chip bg-surface border border-line">{t(q.difficulty)}</span>
          <span className="chip bg-surface border border-line">{topicLabel(q.topic, lang)}</span>
        </div>
        {ART[`q:${q.id}`] && (
          // eslint-disable-next-line @next/next/no-img-element
          <button onClick={readQuestion} className="card p-2 w-full" aria-label={t("listen")}><img src={`${BASE}/art/${ART[`q:${q.id}`]}`} alt="" className="w-full h-auto rounded-xl" /></button>
        )}
        <div className={`card p-4 flex gap-3 items-start ${activeId === `q-${q.id}` ? "speaking" : ""}`}>
          <button onClick={readQuestion} aria-label={t("listen")} className="w-10 h-10 rounded-full bg-brand text-brand-ink shrink-0">▶</button>
          <div className="flex-1">
            <p className="text-lg font-extrabold leading-snug">{L.q}</p>
            <p className="text-sm text-muted mt-2">{O.q}</p>
          </div>
        </div>

        {mode === "quiz" && (
          <div className="space-y-2">
            {L.choices.map((c, k) => {
              const state = picked === null ? "" : k === q.answer ? "bg-ok-soft border-ok" : k === picked ? "bg-bad-soft border-bad" : "opacity-60";
              return (
                <button key={k} onClick={() => choose(k)} className={`card w-full p-3 text-left flex gap-3 items-start ${state} ${activeId === `c-${q.id}-${k}` ? "speaking" : ""}`}>
                  <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center font-black shrink-0">{LETTERS[k]}</span>
                  <span className="flex-1"><span className="font-medium">{c}</span><span className="block text-xs text-muted mt-0.5">{O.choices[k]}</span></span>
                </button>
              );
            })}
            {picked !== null && (
              <div className={`card p-4 ${picked === q.answer ? "bg-ok-soft" : "bg-bad-soft"} border-0 space-y-2`}>
                <div className="font-extrabold">{picked === q.answer ? `✅ ${t("correct")}` : `❌ ${t("wrong")} — ${LETTERS[q.answer]}`}</div>
                <div className="flex gap-3 items-start"><Speak text={L.exp} id={`exp-${q.id}`} /><p className="leading-relaxed">{L.exp}</p></div>
                <p className="text-sm text-muted">{O.exp}</p>
                <button onClick={next} className="btn btn-brand w-full">{t("next")} →</button>
              </div>
            )}
          </div>
        )}

        {mode === "flash" && (
          <div className="space-y-3">
            {!flipped ? (
              <button onClick={() => { setFlipped(true); speakAll([{ text: `${LETTERS[q.answer]}. ${L.choices[q.answer]}`, lang: qLang, id: `c-${q.id}-${q.answer}` }, { text: L.exp, lang: qLang, id: `exp-${q.id}` }]); }} className="btn btn-brand w-full">{t("showAnswer")}</button>
            ) : (
              <div className="card p-4 bg-ok-soft border-0 space-y-2">
                <div className="flex gap-3 items-start"><Speak text={L.exp} id={`exp-${q.id}`} />
                  <div><p className="font-extrabold text-lg">{L.choices[q.answer]}</p><p className="mt-1 leading-relaxed">{L.exp}</p><p className="text-sm text-muted mt-1">{O.choices[q.answer]}</p></div></div>
                <button onClick={next} className="btn btn-brand w-full">{t("next")} →</button>
              </div>
            )}
          </div>
        )}
      </Page>
    </>
  );
}
