"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./types";
import { t as tt, type UiKey } from "./i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: UiKey) => string; other: Lang };
const LangCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => tt("en", k), other: "fr" });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jang.lang");
      if (saved === "fr" || saved === "en") setLangState(saved);
      else if (navigator.language?.toLowerCase().startsWith("fr")) setLangState("fr");
    } catch {}
  }, []);
  const setLang = (l: Lang) => { setLangState(l); try { localStorage.setItem("jang.lang", l); } catch {} };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <LangCtx.Provider value={{ lang, setLang, t: (k) => tt(lang, k), other: lang === "en" ? "fr" : "en" }}>
      {children}
    </LangCtx.Provider>
  );
}
export const useLang = () => useContext(LangCtx);
