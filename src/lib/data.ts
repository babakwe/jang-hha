import questionsJson from "@/data/questions.json";
import vocabJson from "@/data/vocab.json";
import proceduresJson from "@/data/procedures.json";
import lessonsJson from "@/data/lessons.json";
import topicsJson from "@/data/topics.json";
import type { Question, VocabTerm, Procedure, Lesson, Lang } from "./types";

export const QUESTIONS = questionsJson as Question[];
export const VOCAB = vocabJson as VocabTerm[];
export const PROCEDURES = proceduresJson as Procedure[];
export const LESSONS = lessonsJson as Lesson[];

const TOPICS = topicsJson as unknown as Record<string, { fr: string; wo: string }>;
/** Topic label in the UI language (en = key itself). */
export const topicLabel = (topic: string, lang: Lang): string => lang === "en" ? topic : (TOPICS[topic]?.[lang] ?? TOPICS[topic]?.fr ?? topic);

export const MODULE_ORDER = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
export const lessonByModule = (m: string) => LESSONS.find(l => l.module === m);
export const questionsByModule = (m: string) => QUESTIONS.filter(q => q.module === m);
export const proceduresForLesson = (m: string) => PROCEDURES.filter(p => p.module === m);
