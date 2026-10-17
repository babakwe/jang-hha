"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { useAudio } from "@/lib/audio";
import { Header, ListenAll, Page, Speak } from "@/components/ui";
import { PROCEDURES } from "@/lib/data";
import { pick, pickLang, type Bi } from "@/lib/types";
import { Illustration } from "@/components/Illustration";

function Steps({ steps, prefix }: { steps: Bi[]; prefix: string }) {
  const { lang, other, t } = useLang();
  const { activeId } = useAudio();
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => {
        const id = `${prefix}-${i}`;
        const main = pick(s, lang), sub = lang === "wo" ? (s.wo ? s.fr : s.en) : s[other];
        return (
          <li key={i} className={`card p-3 flex gap-3 items-start ${activeId === id ? "speaking" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-brand text-brand-ink font-black flex items-center justify-center shrink-0">{i + 1}</div>
            <div className="flex-1 min-w-0">
              <p className="leading-relaxed font-medium">{main}</p>
              <p className="text-sm text-muted mt-1">{sub}</p>
            </div>
            <Speak text={`${t("step")} ${i + 1}. ${main}`} id={id} lang={pickLang(s, lang)} />
          </li>
        );
      })}
    </ol>
  );
}

export default function ProcedureView({ id }: { id: string }) {
  const { t, lang } = useLang();
  const idx = PROCEDURES.findIndex(p => p.id === id);
  const p = PROCEDURES[idx];
  const prev = PROCEDURES[idx - 1], next = PROCEDURES[idx + 1];
  const items = [
    { text: `${t("procedureOf")} ${p.number}. ${pick(p.title, lang)}`, id: `${p.id}-title` },
    ...(p.warning ? [{ text: pick(p.warning, lang), id: `${p.id}-warn` }] : []),
    ...p.steps.map((s, i) => ({ text: `${t("step")} ${i + 1}. ${pick(s, lang)}`, id: `${p.id}-${i}` })),
    ...(p.alt ? [{ text: pick(p.alt.title, lang), id: `${p.id}-alt` }, ...p.alt.steps.map((s, i) => ({ text: `${t("step")} ${i + 1}. ${pick(s, lang)}`, id: `${p.id}-alt-${i}` }))] : []),
  ];
  return (
    <>
      <Header title={`${t("procedureOf")} ${p.number}`} back="/procedures" />
      <Page>
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 rounded-2xl bg-fr-soft text-brand flex items-center justify-center shrink-0"><Illustration name={p.icon} size={56} /></div>
          <div className="flex-1">
            <h2 className="text-2xl font-black leading-tight">{pick(p.title, lang)}</h2>
            <p className="text-muted">{lang === "en" ? p.title.fr : lang === "fr" ? p.title.en : p.title.fr}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {p.required && <span className="chip bg-accent-soft text-accent">★ {t("required")}</span>}
              <span className="chip bg-ok-soft text-ok">{p.steps.length} {t("steps")}</span>
              <Link href={`/learn/m12`} className="chip bg-fr-soft text-fr">{t("module")} XII</Link>
            </div>
          </div>
          <Speak text={items[0].text} id={`${p.id}-title`} />
        </div>
        <Link href={`/procedures/${p.id}/watch`} className="btn btn-accent w-full text-lg">🖼️ {lang === "fr" ? "Regarder et écouter, étape par étape" : lang === "wo" ? "Xool te déglu, jéego ci jéego" : "Watch and listen, step by step"}</Link>
        <ListenAll items={items} />
        {p.warning && (
          <div className="card p-3 bg-bad-soft border-0 flex gap-3 items-start">
            <Speak text={pick(p.warning, lang)} id={`${p.id}-warn`} lang={pickLang(p.warning, lang)} />
            <p className="font-bold text-bad leading-snug">{pick(p.warning, lang)}</p>
          </div>
        )}
        <Steps steps={p.steps} prefix={p.id} />
        {p.alt && (
          <section className="space-y-3 pt-2">
            <div className="flex gap-3 items-center">
              <Speak text={pick(p.alt.title, lang)} id={`${p.id}-alt`} lang={pickLang(p.alt.title, lang)} />
              <h3 className="font-extrabold">{pick(p.alt.title, lang)}</h3>
            </div>
            <Steps steps={p.alt.steps} prefix={`${p.id}-alt`} />
          </section>
        )}
        {p.note && <p className="text-xs text-muted leading-relaxed"><strong>{t("notes")}:</strong> {pick(p.note, lang)}</p>}
        <div className="flex gap-2 pt-2">
          {prev ? <Link href={`/procedures/${prev.id}`} className="btn btn-ghost flex-1">← {prev.number}</Link> : <span className="flex-1" />}
          {next ? <Link href={`/procedures/${next.id}`} className="btn btn-ghost flex-1">{next.number} →</Link> : <span className="flex-1" />}
        </div>
      </Page>
    </>
  );
}
