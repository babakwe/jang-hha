"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import { useAudio } from "@/lib/audio";
import { pick, pickLang, type Lang, type Bi } from "@/lib/types";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="inline-flex rounded-full border border-line bg-surface p-1">
      {(["en", "fr", "wo"] as Lang[]).map(l => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`px-2.5 py-1.5 rounded-full text-sm font-bold ${lang === l ? "bg-brand text-brand-ink" : "text-muted"}`}>
          {l === "en" ? "EN" : l === "fr" ? "FR" : "WO"}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useLang();
  const path = usePathname();
  const items = [
    ["/", "🏠", t("appName")], ["/learn", "📘", t("learn")], ["/procedures", "🧤", t("procedures")],
    ["/practice", "✅", t("practice")], ["/glossary", "🔤", t("glossary")],
  ] as const;
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 bg-surface border-t border-line pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5 max-w-3xl mx-auto">
        {items.map(([href, icon, label]) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <li key={href}>
              <Link href={href} className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold ${active ? "text-brand" : "text-muted"}`}>
                <span className="text-xl" aria-hidden>{icon}</span>{label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Header({ title, back }: { title: string; back?: string }) {
  return (
    <header className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-line">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        {back && <Link href={back} aria-label="Back" className="btn btn-ghost !min-h-10 !px-3">←</Link>}
        <h1 className="flex-1 text-lg font-extrabold truncate">{title}</h1>
        <LangToggle />
      </div>
    </header>
  );
}

/** Play button for one piece of text. Highlights while playing. */
export function Speak({ text, id, lang, className = "" }: { text: string; id: string; lang?: Lang; className?: string }) {
  const { lang: cur, t } = useLang();
  const { speak, stop, activeId } = useAudio();
  const l = lang ?? cur;
  const on = activeId === id;
  return (
    <button onClick={() => (on ? stop() : speak(text, l, id))} aria-label={on ? t("stop") : t("listen")}
      className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border ${on ? "bg-accent text-white border-accent" : "bg-surface border-line text-brand"} ${className}`}>
      {on ? "■" : "▶"}
    </button>
  );
}

/** A bilingual block: shows current language large, other language small underneath, with a play button. */
export function BiText({ bi, id, as = "p", big = false, showOther = true }: { bi: Bi; id: string; as?: "p" | "h2" | "h3" | "li"; big?: boolean; showOther?: boolean }) {
  const { lang, other } = useLang();
  const { activeId } = useAudio();
  const Tag = as;
  const main = pick(bi, lang), mainLang = pickLang(bi, lang);
  const sub = lang === "wo" ? (bi.wo ? bi.fr : bi.en) : bi[other];
  return (
    <div className={`flex gap-3 items-start ${activeId === id ? "speaking" : ""}`}>
      <Speak text={main} id={id} lang={mainLang} />
      <div className="flex-1 min-w-0">
        <Tag className={big ? "text-xl font-extrabold leading-snug" : "leading-relaxed"}>{main}</Tag>
        {showOther && <p className="text-sm text-muted mt-1 leading-snug">{sub}</p>}
      </div>
    </div>
  );
}

export function ListenAll({ items }: { items: { text: string; id: string }[] }) {
  const { lang, t } = useLang();
  const { speakAll, stop, playing } = useAudio();
  return (
    <button onClick={() => (playing ? stop() : speakAll(items.map(i => ({ ...i, lang }))))}
      className={`btn ${playing ? "btn-accent" : "btn-brand"} w-full`}>
      {playing ? `■ ${t("stop")}` : `🔊 ${t("listenAll")}`}
    </button>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  return <main className="max-w-3xl mx-auto px-4 pt-4 pb-28 space-y-4">{children}</main>;
}
