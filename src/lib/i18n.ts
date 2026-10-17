import type { Lang } from "./types";

const UI = {
  en: {
    appName: "Jàng HHA", tagline: "Home Health Aide training, in English and French, with audio.",
    learn: "Lessons", procedures: "Procedures", practice: "Practice", glossary: "Glossary",
    listen: "Listen", listenAll: "Listen to this page", stop: "Stop", minutes: "min",
    module: "Module", required: "Required skill", steps: "steps", step: "Step",
    whenToReport: "When to report", keyTerms: "Key terms in this module", practiceThis: "Practice this module",
    questions: "questions", start: "Start", next: "Next", check: "Check answer", correct: "Correct", wrong: "Not quite",
    showAnswer: "Show answer", again: "Again", score: "Score", flashcards: "Flashcards", quiz: "Quiz",
    allModules: "All modules", difficulty: "Difficulty", easy: "Easy", medium: "Medium", hard: "Hard", any: "Any",
    source: "Source: NYS Department of Health, Home Care Curriculum (2007). Practice questions written from the curriculum outline; not official state test items.",
    offline: "Works offline once loaded. Add to your home screen.",
    language: "Language", search: "Search a word…", nothing: "No match.",
    homeLearn: "Twelve short lessons, one per curriculum module.", homeProc: "The 43 skills you will be tested on, step by step.",
    homePractice: "188 practice questions and flashcards.", homeGloss: "70 words every aide must know, English and French.",
    alsoIn: "Also in", procedureOf: "Procedure", warning: "Important", notes: "Note",
    installHint: "On iPhone: Share → Add to Home Screen. On Android: menu → Install app.",
    explanation: "Why", chooseMode: "Choose how to study", allDone: "Done! Your score:", restart: "Start over",
  },
  fr: {
    appName: "Jàng HHA", tagline: "Formation d'aide à domicile, en anglais et en français, avec audio.",
    learn: "Leçons", procedures: "Procédures", practice: "Entraînement", glossary: "Lexique",
    listen: "Écouter", listenAll: "Écouter cette page", stop: "Arrêter", minutes: "min",
    module: "Module", required: "Compétence obligatoire", steps: "étapes", step: "Étape",
    whenToReport: "Quand signaler", keyTerms: "Mots clés de ce module", practiceThis: "S'entraîner sur ce module",
    questions: "questions", start: "Commencer", next: "Suivant", check: "Vérifier", correct: "Correct", wrong: "Pas tout à fait",
    showAnswer: "Voir la réponse", again: "Encore", score: "Score", flashcards: "Cartes", quiz: "Quiz",
    allModules: "Tous les modules", difficulty: "Difficulté", easy: "Facile", medium: "Moyen", hard: "Difficile", any: "Toutes",
    source: "Source : Département de la Santé de l'État de New York, programme de soins à domicile (2007). Questions d'entraînement rédigées à partir du programme ; ce ne sont pas les questions officielles de l'examen.",
    offline: "Fonctionne hors ligne une fois chargé. Ajoutez-le à votre écran d'accueil.",
    language: "Langue", search: "Chercher un mot…", nothing: "Aucun résultat.",
    homeLearn: "Douze leçons courtes, une par module du programme.", homeProc: "Les 43 gestes sur lesquels vous serez évalué, étape par étape.",
    homePractice: "188 questions d'entraînement et cartes mémoire.", homeGloss: "70 mots que chaque aide doit connaître, en anglais et en français.",
    alsoIn: "Aussi en", procedureOf: "Procédure", warning: "Important", notes: "Remarque",
    installHint: "Sur iPhone : Partager → Sur l'écran d'accueil. Sur Android : menu → Installer l'application.",
    explanation: "Pourquoi", chooseMode: "Choisissez comment étudier", allDone: "Terminé ! Votre score :", restart: "Recommencer",
  },
} as const;

export type UiKey = keyof typeof UI.en;
export const t = (lang: Lang, k: UiKey): string => UI[lang][k] ?? UI.en[k];
