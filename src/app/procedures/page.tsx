"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { Header, Page } from "@/components/ui";
import { PROCEDURES } from "@/lib/data";

export default function Procedures() {
  const { t, lang } = useLang();
  const req = PROCEDURES.filter(p => p.required), rest = PROCEDURES.filter(p => !p.required);
  const Row = ({ p }: { p: (typeof PROCEDURES)[number] }) => (
    <Link href={`/procedures/${p.id}`} className="card p-3 flex items-center gap-3 hover:border-brand">
      <span className="chip bg-fr-soft text-fr w-16 justify-center">{p.number}</span>
      <span className="flex-1 font-bold leading-snug">{p.title[lang]}</span>
      <span className="text-xs text-muted">{p.steps.length} {t("steps")}</span>
    </Link>
  );
  return (
    <>
      <Header title={t("procedures")} back="/" />
      <Page>
        <h2 className="font-extrabold text-accent">★ {t("required")} (12)</h2>
        <div className="grid gap-2">{req.map(p => <Row key={p.id} p={p} />)}</div>
        <h2 className="font-extrabold pt-2">{lang === "fr" ? "Autres procédures" : "Other procedures"} ({rest.length})</h2>
        <div className="grid gap-2">{rest.map(p => <Row key={p.id} p={p} />)}</div>
      </Page>
    </>
  );
}
