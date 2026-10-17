"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { LangToggle, Page, Speak } from "@/components/ui";
import { LESSONS, PROCEDURES, QUESTIONS, VOCAB } from "@/lib/data";

export default function Home() {
  const { t, lang } = useLang();
  const tiles = [
    { href: "/learn", icon: "📘", title: t("learn"), desc: t("homeLearn"), n: LESSONS.length },
    { href: "/procedures", icon: "🧤", title: t("procedures"), desc: t("homeProc"), n: PROCEDURES.length },
    { href: "/practice", icon: "✅", title: t("practice"), desc: t("homePractice"), n: QUESTIONS.length },
    { href: "/glossary", icon: "🔤", title: t("glossary"), desc: t("homeGloss"), n: VOCAB.length },
  ];
  const welcome = lang === "fr"
    ? "Bienvenue. Cette application vous prépare au certificat d'aide à domicile de l'État de New York. Vous pouvez tout lire, ou tout écouter."
    : lang === "wo"
    ? "Dalal ak jàmm. Jumtukaay bii dina la waajal ngir am sertifikaa bu aide à domicile ci diiwaanu New York. Mën nga jàng lépp, walla déglu lépp."
    : "Welcome. This app prepares you for the New York State Home Health Aide certificate. You can read everything, or listen to everything.";
  return (
    <Page>
      <div className="flex items-center justify-between pt-2">
        <div><div className="text-3xl font-black tracking-tight">{t("appName")}</div><div className="text-muted text-sm">{t("tagline")}</div></div>
        <LangToggle />
      </div>
      <div className="card p-4 flex gap-3 items-start bg-fr-soft border-0"><Speak text={welcome} id="welcome" /><p className="leading-relaxed">{welcome}</p></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {tiles.map(x => (
          <Link key={x.href} href={x.href} className="card p-4 flex gap-4 items-center hover:border-brand">
            <div className="text-4xl" aria-hidden>{x.icon}</div>
            <div className="flex-1"><div className="font-extrabold text-lg">{x.title} <span className="chip bg-accent-soft text-accent ml-1">{x.n}</span></div><div className="text-sm text-muted">{x.desc}</div></div>
            <div className="text-muted">›</div>
          </Link>
        ))}
      </div>
      <p className="text-xs text-muted leading-relaxed">{t("source")}</p>
      <p className="text-xs text-muted">{t("offline")} {t("installHint")}</p>
    </Page>
  );
}
