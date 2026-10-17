#!/usr/bin/env python3
"""
Generate ElevenLabs MP3s for every spoken string in the app, content-addressed so the client can
find them without a lookup table: public/audio/<lang>/<key>.mp3 where key = audioKey(lang, text)
(same FNV-1a double hash as src/lib/hash.ts). Writes public/audio/manifest.json = {"fr/<key>": 1, ...}.

Priority order (so a small plan still covers the most-used material):
  1 procedures  2 lessons  3 vocab  4 questions
Resumable: existing files are skipped. Stops on the first API error (quota, auth) and prints the reason.

Usage:  python3 scripts/gen_audio.py [--lang fr] [--only procedures,lessons] [--dry-run] [--limit N]
Reads ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID_FR / _FR_MALE from .env.local (never committed).
"""
import json, os, sys, time, pathlib, argparse, urllib.request, urllib.error

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
OUT = ROOT / "public" / "audio"
MODEL = "eleven_multilingual_v2"
FMT = "mp3_44100_64"

def load_env():
    for line in (ROOT / ".env.local").read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line: continue
        k, v = line.split("=", 1); v = v.split("#")[0].strip()
        os.environ.setdefault(k.strip(), v)

def fnv1a32(b: bytes, basis: int) -> int:
    h = basis
    for x in b:
        h ^= x; h = (h * 16777619) & 0xFFFFFFFF
    return h
def audio_key(lang: str, text: str) -> str:
    b = f"{lang}|{text}".encode("utf-8")
    return f"{fnv1a32(b, 0x811c9dc5):08x}{fnv1a32(b, 0x01000193):08x}"

# UI strings that are prefixed onto spoken text in the app (must match src/lib/i18n.ts)
UI = {"fr": {"step": "Étape", "procedure": "Procédure", "whenToReport": "Quand signaler", "correct": "Correct", "wrong": "Pas tout à fait"},
      "en": {"step": "Step", "procedure": "Procedure", "whenToReport": "When to report", "correct": "Correct", "wrong": "Not quite"}}
LETTERS = ["A", "B", "C", "D"]
WELCOME = {"fr": "Bienvenue. Cette application vous prépare au certificat d'aide à domicile de l'État de New York. Vous pouvez tout lire, ou tout écouter.",
           "en": "Welcome. This app prepares you for the New York State Home Health Aide certificate. You can read everything, or listen to everything."}

def strings(lang: str):
    """Yield (group, voice, text) exactly as the client speaks them."""
    u = UI[lang]
    yield ("procedures", "main", WELCOME[lang])
    for p in json.loads((DATA / "procedures.json").read_text()):
        yield ("procedures", "main", f"{u['procedure']} {p['number']}. {p['title'][lang]}")
        if p.get("warning"): yield ("procedures", "main", p["warning"][lang])
        for i, s in enumerate(p["steps"]): yield ("procedures", "main", f"{u['step']} {i+1}. {s[lang]}")
        if p.get("alt"):
            yield ("procedures", "main", p["alt"]["title"][lang])
            for i, s in enumerate(p["alt"]["steps"]): yield ("procedures", "main", f"{u['step']} {i+1}. {s[lang]}")
    for l in json.loads((DATA / "lessons.json").read_text()):
        yield ("lessons", "main", l["title"][lang]); yield ("lessons", "main", l["intro"][lang])
        for s in l["sections"]:
            yield ("lessons", "main", s["heading"][lang])
            for p in s["points"]: yield ("lessons", "main", p[lang])
        yield ("lessons", "main", f"{u['whenToReport']}. {l['report'][lang]}")
    for v in json.loads((DATA / "vocab.json").read_text()):
        main = v["term_fr"] if lang == "fr" else v["term"]
        d = v["definition_fr"] if lang == "fr" else v["definition_en"]
        yield ("vocab", "main", f"{main}. {d}")
    for q in json.loads((DATA / "questions.json").read_text()):
        L = q[lang]
        yield ("questions", "main", L["q"])
        for k, c in enumerate(L["choices"]): yield ("questions", "main", f"{LETTERS[k]}. {c}")
        # one explanation clip per question, read by the second voice (Malick)
        yield ("questions", "alt", L["exp"])
    yield ("questions", "alt", f"{u['correct']}."); yield ("questions", "alt", f"{u['wrong']}.")

def tts(text: str, voice: str, key: str) -> bytes:
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format={FMT}",
        data=json.dumps({"text": text, "model_id": MODEL}).encode(),
        headers={"xi-api-key": key, "Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=120) as r: return r.read()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="fr"); ap.add_argument("--only", default="procedures,lessons,vocab,questions")
    ap.add_argument("--dry-run", action="store_true"); ap.add_argument("--limit", type=int, default=0)
    a = ap.parse_args()
    load_env()
    key = os.environ.get("ELEVENLABS_API_KEY"); voices = {"main": os.environ.get("ELEVENLABS_VOICE_ID_FR"), "alt": os.environ.get("ELEVENLABS_VOICE_ID_FR_MALE") or os.environ.get("ELEVENLABS_VOICE_ID_FR")}
    if not a.dry_run and (not key or not voices["main"]): sys.exit("missing ELEVENLABS_API_KEY / voice id in .env.local")
    groups = a.only.split(",")
    outdir = OUT / a.lang; outdir.mkdir(parents=True, exist_ok=True)
    mpath = OUT / "manifest.json"
    manifest = json.loads(mpath.read_text()) if mpath.exists() else {}
    seen, todo, chars = set(), [], 0
    for g, v, text in strings(a.lang):
        if g not in groups: continue
        k = audio_key(a.lang, text)
        if k in seen: continue
        seen.add(k)
        if (outdir / f"{k}.mp3").exists(): manifest[f"{a.lang}/{k}"] = 1; continue
        todo.append((g, v, text, k)); chars += len(text)
    print(f"{len(todo)} clips to generate, {chars:,} characters ({a.lang}); groups={groups}")
    if a.dry_run: return
    done = 0
    for g, v, text, k in todo:
        if a.limit and done >= a.limit: break
        try:
            mp3 = tts(text, voices[v], key)
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors="replace")[:300]
            print(f"\nSTOP: HTTP {e.code} on '{text[:60]}…' → {body}"); break
        except Exception as e:
            print(f"\nSTOP: {e}"); break
        (outdir / f"{k}.mp3").write_bytes(mp3); manifest[f"{a.lang}/{k}"] = 1; done += 1
        if done % 25 == 0:
            mpath.write_text(json.dumps(manifest, separators=(",", ":"))); print(f"  {done}/{len(todo)} ({g})", flush=True)
        time.sleep(0.15)
    mpath.write_text(json.dumps(manifest, separators=(",", ":")))
    print(f"done: {done} new clips; manifest has {len(manifest)} entries")

if __name__ == "__main__": main()
