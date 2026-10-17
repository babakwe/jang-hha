"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { Header, Page } from "@/components/ui";
import { LESSONS, questionsByModule, proceduresForLesson } from "@/lib/data";
import { pick } from "@/lib/types";
import { Illustration } from "@/components/Illustration";

export default function Learn() {
  const { t, lang } = useLang();
  return (
    <>
      <Header title={t("learn")} back="/" />
      <Page>
        {LESSONS.map(l => {
          const nq = questionsByModule(l.module).length, np = proceduresForLesson(l.module).length;
          return (
            <Link key={l.id} href={`/learn/${l.id}`} className="card p-4 flex gap-4 hover:border-brand">
              <div className="w-16 h-16 rounded-2xl bg-fr-soft text-brand flex items-center justify-center shrink-0"><Illustration name={l.icon} size={44} /></div>
              <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-brand uppercase tracking-wide">{t("module")} {l.module} · {l.minutes} {t("minutes")}</div>
              <div className="text-lg font-extrabold mt-0.5">{pick(l.title, lang)}</div>
              <div className="text-sm text-muted mt-1 line-clamp-2">{pick(l.intro, lang)}</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="chip bg-ok-soft text-ok">{nq} {t("questions")}</span>
                {np > 0 && <span className="chip bg-accent-soft text-accent">{np} {t("procedures").toLowerCase()}</span>}
              </div>
              </div>
            </Link>
          );
        })}
      </Page>
    </>
  );
}
