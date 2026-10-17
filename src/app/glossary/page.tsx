"use client";
import { useState } from "react";
import { useLang } from "@/lib/lang";
import { useAudio } from "@/lib/audio";
import { Header, Page, Speak } from "@/components/ui";
import { VOCAB } from "@/lib/data";

export default function Glossary() {
  const { t, lang } = useLang();
  const { activeId } = useAudio();
  const [q, setQ] = useState("");
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const list = VOCAB.filter(v => !q || norm(`${v.term} ${v.term_fr} ${v.term_wo ?? ""} ${v.definition_en} ${v.definition_fr} ${v.definition_wo ?? ""}`).includes(norm(q)))
    .sort((a, b) => (lang === "en" ? a.term : a.term_fr).localeCompare(lang === "en" ? b.term : b.term_fr, lang === "en" ? "en" : "fr"));
  return (
    <>
      <Header title={t("glossary")} back="/" />
      <Page>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={t("search")} aria-label={t("search")}
          className="w-full card p-3 text-lg outline-none focus:border-brand" />
        {list.length === 0 && <p className="text-muted">{t("nothing")}</p>}
        {list.map(v => {
          const main = lang === "wo" ? (v.term_wo ?? v.term_fr) : lang === "fr" ? v.term_fr : v.term, sub = lang === "en" ? v.term_fr : v.term;
          const def = lang === "wo" ? (v.definition_wo ?? v.definition_fr) : lang === "fr" ? v.definition_fr : v.definition_en;
          const defLang = lang === "wo" && !v.definition_wo ? "fr" : lang;
          const spoken = `${main}. ${def}`;
          return (
            <div key={v.id} id={v.id} className={`card p-4 scroll-mt-20 ${activeId === v.id ? "speaking" : ""}`}>
              <div className="flex gap-3 items-start">
                <Speak text={spoken} id={v.id} lang={defLang} />
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-extrabold leading-tight">{main}</div>
                  <div className="text-sm text-fr font-bold">{sub}</div>
                  <p className="mt-2 leading-relaxed">{def}</p>
                  <p className="text-sm text-muted mt-1">{lang === "en" ? v.definition_fr : lang === "fr" ? v.definition_en : v.definition_fr}</p>
                  <p className="text-sm italic text-muted mt-2">“{v.example}”</p>
                  <span className="chip bg-fr-soft text-fr mt-2">{t("module")} {v.module}</span>
                </div>
              </div>
            </div>
          );
        })}
      </Page>
    </>
  );
}
