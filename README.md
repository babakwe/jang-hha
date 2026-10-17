# Jàng HHA

Home Health Aide training for New York, in **English, French and (draft) Wolof**, with audio. A free, installable web app (PWA) that works offline once loaded.

Built for immigrant workers in NYC, many of them women from French-speaking West Africa, for whom HHA is an entry-level job.

## What's inside

| Section | Content | Source |
|---|---|---|
| Lessons | 12 modules of the NYS Home Care Curriculum, rewritten as short bilingual lessons | NYS DOH Home Care Curriculum (2006/2007) |
| Procedures | all 43 skills checklists, step by step (12 are required for the certificate) | same, Appendix |
| Practice | 188 multiple-choice questions, quiz and flashcard modes | 118 written from the curriculum outline + 70 earlier in-house questions |
| Glossary | 70 terms, EN / FR / WO | curriculum + Peace Corps Wolof materials |

Practice questions are study aids written from the curriculum; they are **not** the official state test items.

## Languages

- English and French are complete.
- **Wolof is a draft**: interface strings, the welcome message and the 70-term glossary. Lessons, procedures and questions fall back to French when Wolof text is missing. Drafted from the 1970 Peace Corps Dakar course and the Wolof-English phrasebook held on the project drive, in CLAD orthography, with Dakar loanwords where that is what aides actually say. **Needs a native-speaker review before it is treated as final.** Same caveat for the French: drafted by Claude from the curriculum, proofreading owed.

## Audio

Every sentence has a play button and every page has "Listen to this page". Audio resolution order:

1. Pre-generated MP3 in `public/audio/<lang>/<key>.mp3` (content-addressed; see `scripts/gen_audio.py`).
2. Otherwise the phone's own speech voice (French or English; Wolof text is read by the French voice, there is no Wolof browser voice).

Engines in `scripts/gen_audio.py` (all run locally on a Mac):

| Engine | Languages | Cost | Licence |
|---|---|---|---|
| `kokoro` (default) | fr, en | free | Apache-2.0 |
| `mms` (Meta MMS-TTS) | wo and other African languages | free | CC BY-NC 4.0 (non-commercial) |
| `elevenlabs` | any | paid | commercial |

```bash
python3.12 -m venv .venv && . .venv/bin/activate && pip install kokoro soundfile transformers torch
brew install espeak-ng ffmpeg
python3 scripts/gen_audio.py --lang fr --engine kokoro --dry-run   # plan
python3 scripts/gen_audio.py --lang fr --engine kokoro             # ~177K characters
python3 scripts/gen_audio.py --lang wo --engine mms
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

Next.js 16, Tailwind 4, static export, deploys on Vercel from `main`.

## Data lineage

Content is authored in `/Volumes/5TB1/study-teacher/data/hha_curriculum/` (owner's drive) and copied into `src/data/`. The 70 original questions and their French came from the earlier `jang-nyc` site.
