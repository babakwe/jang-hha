"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { BiText, Header, ListenAll, Page } from "@/components/ui";
import { LESSONS, VOCAB, proceduresForLesson, questionsByModule } from "@/lib/data";
import { pick } from "@/lib/types";
import { Illustration } from "@/components/Illustration";

export default function LessonView({ id }: { id: string }) {
  const { t, lang } = useLang();
  const l = LESSONS.find(x => x.id === id)!;
  const procs = proceduresForLesson(l.module);
  const terms = VOCAB.filter(v => v.module === l.module);
  const nq = questionsByModule(l.module).length;

  const items: { text: string; id: string }[] = [
    { text: pick(l.title, lang), id: `${l.id}-title` }, { text: pick(l.intro, lang), id: `${l.id}-intro` },
    ...l.sections.flatMap((s, si) => [
      { text: pick(s.heading, lang), id: `${l.id}-s${si}` },
      ...s.points.map((p, pi) => ({ text: pick(p, lang), id: `${l.id}-s${si}-p${pi}` })),
    ]),
    { text: `${t("whenToReport")}. ${pick(l.report, lang)}`, id: `${l.id}-report` },
  ];

  return (
    <>
      <Header title={`${t("module")} ${l.module}`} back="/learn" />
      <Page>
        <div className="flex gap-4 items-start">
          <div className="w-20 h-20 rounded-2xl bg-fr-soft text-brand flex items-center justify-center shrink-0"><Illustration name={l.icon} size={56} /></div>
          <div className="flex-1 min-w-0"><BiText bi={l.title} id={`${l.id}-title`} as="h2" big /></div>
        </div>
        <Link href={`/learn/${l.id}/watch`} className="btn btn-accent w-full text-lg">🖼️ {lang === "fr" ? "Regarder et écouter" : lang === "wo" ? "Xool te déglu" : "Watch and listen"}</Link>
        <ListenAll items={items} />
        <div className="card p-4"><BiText bi={l.intro} id={`${l.id}-intro`} /></div>
        {l.note && <div className="card p-4 bg-fr-soft border-0 text-sm"><strong>{t("notes")}:</strong> {pick(l.note, lang)}</div>}
        {l.sections.map((s, si) => (
          <section key={si} className="card p-4 space-y-3">
            <BiText bi={s.heading} id={`${l.id}-s${si}`} as="h3" big showOther={false} />
            <ul className="space-y-3">
              {s.points.map((p, pi) => <li key={pi}><BiText bi={p} id={`${l.id}-s${si}-p${pi}`} /></li>)}
            </ul>
          </section>
        ))}
        <section className="card p-4 bg-accent-soft border-0 space-y-2">
          <h3 className="font-extrabold text-accent">⚠️ {t("whenToReport")}</h3>
          <BiText bi={l.report} id={`${l.id}-report`} />
        </section>
        {procs.length > 0 && (
          <section className="space-y-2">
            <h3 className="font-extrabold">{t("procedures")} ({procs.length})</h3>
            <div className="grid gap-2">
              {procs.map(p => (
                <Link key={p.id} href={`/procedures/${p.id}`} className="card p-3 flex items-center gap-3 hover:border-brand">
                  <span className="w-10 h-10 rounded-xl bg-fr-soft text-brand flex items-center justify-center shrink-0"><Illustration name={p.icon} size={28} /></span>
                  <span className="flex-1 font-bold">{pick(p.title, lang)} <span className="text-xs text-fr">{p.number}</span></span>
                  {p.required && <span className="chip bg-accent-soft text-accent">★</span>}
                </Link>
              ))}
            </div>
          </section>
        )}
        {terms.length > 0 && (
          <section className="space-y-2">
            <h3 className="font-extrabold">{t("keyTerms")}</h3>
            <div className="flex flex-wrap gap-2">
              {terms.map(v => <Link key={v.id} href={`/glossary#${v.id}`} className="chip bg-surface border border-line">{lang === "wo" ? (v.term_wo ?? v.term_fr) : lang === "fr" ? v.term_fr : v.term}</Link>)}
            </div>
          </section>
        )}
        <Link href={`/practice?module=${l.module}`} className="btn btn-accent w-full">✅ {t("practiceThis")} · {nq} {t("questions")}</Link>
      </Page>
    </>
  );
}
