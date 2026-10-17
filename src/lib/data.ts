import questionsJson from "@/data/questions.json";
import vocabJson from "@/data/vocab.json";
import proceduresJson from "@/data/procedures.json";
import lessonsJson from "@/data/lessons.json";
import type { Question, VocabTerm, Procedure, Lesson } from "./types";

export const QUESTIONS = questionsJson as Question[];
export const VOCAB = vocabJson as VocabTerm[];
export const PROCEDURES = proceduresJson as Procedure[];
export const LESSONS = lessonsJson as Lesson[];

export const MODULE_ORDER = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
export const lessonByModule = (m: string) => LESSONS.find(l => l.module === m);
export const questionsByModule = (m: string) => QUESTIONS.filter(q => q.module === m);
export const proceduresForLesson = (m: string) => PROCEDURES.filter(p => p.module === m);
