export type Lang = "en" | "fr" | "wo";
/** Bilingual core (en, fr) with optional Wolof; use pick() to read with fallback. */
export type Bi = { en: string; fr: string; wo?: string };
export const pick = (b: Bi | undefined, l: Lang): string => (b ? (l === "wo" ? b.wo ?? b.fr : b[l]) : "");
/** Which language text actually came from (for audio + labels). */
export const pickLang = (b: Bi | undefined, l: Lang): Lang => (l === "wo" && !b?.wo ? "fr" : l);

export type Question = {
  id: string; module: string; topic: string; difficulty: "easy" | "medium" | "hard";
  answer: number; source: "curriculum" | "inhouse";
  en: { q: string; choices: string[]; exp: string };
  fr: { q: string; choices: string[]; exp: string };
  wo?: { q: string; choices: string[]; exp: string };
};

export type VocabTerm = {
  id: string; term: string; term_fr: string; term_wo?: string; definition_en: string; definition_fr: string; definition_wo?: string;
  example: string; module: string; category: string;
};

export type Procedure = {
  id: string; number: string; required: boolean; title: Bi; module: string; icon: string;
  steps: Bi[]; warning?: Bi; note?: Bi; alt?: { title: Bi; steps: Bi[] };
};

export type Lesson = {
  id: string; module: string; minutes: number; icon: string; title: Bi; intro: Bi; note?: Bi;
  sections: { heading: Bi; points: Bi[] }[]; report: Bi;
};
