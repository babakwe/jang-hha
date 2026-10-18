#!/usr/bin/env python3
"""
Generate candidate pictures for picture mode with FLUX.1-schnell, locally and free (mflux, Apple Silicon).
art/prompts.json: {scene_id: description} plus _style/_aide/_client/_room placeholders.
Output: art/candidates/<scene>__<phase>__s<seed>.png   (3 seeds per scene, resumable: existing files skipped)
Then writes art/candidates/index.html, a contact sheet for picking.

Usage: python3 scripts/gen_art.py [--seeds 3] [--only handwash,med] [--limit N]
"""
import json, os, sys, time, pathlib, argparse, subprocess, html, base64, urllib.request, urllib.error
ROOT = pathlib.Path(__file__).resolve().parent.parent
ART = ROOT / "art"; OUT = ART / "candidates"; OUT.mkdir(parents=True, exist_ok=True)
MODEL = "dhairyashil/FLUX.1-schnell-mflux-4bit"
SEEDS = [7, 21, 42, 77, 101]

def prompts():
    P = json.loads((ART / "prompts.json").read_text())
    subs = {k[1:]: v for k, v in P.items() if k.startswith("_") and k != "_style"}
    out = {}
    for k, v in P.items():
        if k.startswith("_"): continue
        txt = v
        for name, val in subs.items(): txt = txt.replace("{" + name + "}", val)
        out[k] = f"{P['_style']} {txt}"
    return out

def load_env():
    for line in (ROOT / ".env.local").read_text().splitlines():
        line=line.strip()
        if line and not line.startswith("#") and "=" in line:
            k,v=line.split("=",1); os.environ.setdefault(k.strip(), v.split("#")[0].strip())

def gemini(prompt, dst, model, variant):
    """Gemini image model (free AI Studio key). Variant number nudges a different composition."""
    key=os.environ["GEMINI_API_KEY"]
    body={"contents":[{"parts":[{"text": prompt + f" Landscape 4:3 composition. Variation {variant}."}]}],
          "generationConfig":{"responseModalities":["IMAGE"],"imageConfig":{"aspectRatio":"4:3"}}}
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}",
        data=json.dumps(body).encode(), headers={"Content-Type":"application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=180) as r: d=json.load(r)
    for part in d["candidates"][0]["content"]["parts"]:
        inl=part.get("inlineData") or part.get("inline_data")
        if inl: dst.write_bytes(base64.b64decode(inl["data"])); return
    raise RuntimeError("no image in response: "+json.dumps(d)[:300])

def contact_sheet():
    files = sorted(p.name for p in OUT.glob("*.png") if not p.name.startswith("._"))
    by = {}
    for f in files: by.setdefault(f.rsplit("__s", 1)[0], []).append(f)
    rows = "".join(
        f"<section><h2>{html.escape(k.replace('__', ' : '))}</h2><div>" +
        "".join(f"<figure><img src='{f}' loading='lazy'><figcaption>{f.rsplit('__s',1)[1][:-4]}</figcaption></figure>" for f in v) +
        "</div></section>" for k, v in by.items())
    (OUT / "index.html").write_text(f"""<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>
<title>Picture candidates</title><style>body{{font:15px system-ui;margin:16px;background:#fbf7f1}}section{{margin:18px 0}}h2{{font-size:15px}}
div{{display:flex;gap:10px;flex-wrap:wrap}}figure{{margin:0;width:min(31%,260px)}}img{{width:100%;border-radius:10px;border:1px solid #ddd}}figcaption{{font-size:12px;color:#666}}</style>
<h1>Picture candidates ({len(files)} images, {len(by)} scenes)</h1>{rows}""")

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--seeds", type=int, default=3); ap.add_argument("--only", default=""); ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--engine", default="gemini", choices=["gemini","flux"]); ap.add_argument("--model", default="gemini-2.5-flash-image")
    a = ap.parse_args()
    load_env()
    env = {**os.environ, "HF_HOME": "/Volumes/5TB1/hf_cache", "PYTHONWARNINGS": "ignore", "LANG": "en_US.UTF-8", "PYTHONUTF8": "1"}
    exe = str(ROOT / ".venv" / "bin" / "mflux-generate")
    P = prompts(); only = [x for x in a.only.split(",") if x]
    jobs = [(k, s) for k in P for s in SEEDS[:a.seeds] if not only or k.split(":")[0] in only]
    todo = [(k, s) for k, s in jobs if not (OUT / f"{k.replace(':','__')}__s{s}.png").exists()]
    print(f"{len(jobs)} images planned, {len(todo)} to generate", flush=True)
    done = 0; t0 = time.time()
    for k, s in todo:
        if a.limit and done >= a.limit: break
        dst = OUT / f"{k.replace(':','__')}__s{s}.png"
        if a.engine == "gemini":
            try:
                gemini(P[k], dst, a.model, SEEDS.index(s) + 1)
            except urllib.error.HTTPError as e:
                msg = e.read().decode(errors="replace")[:300]; print(f"STOP {k} s{s}: HTTP {e.code} {msg}", flush=True)
                if e.code in (402, 429, 403): break
                continue
            except Exception as e:
                print(f"FAIL {k} s{s}: {e}", flush=True); continue
            done += 1; time.sleep(4)
            if done % 5 == 0 or done == len(todo):
                el = time.time() - t0; print(f"  {done}/{len(todo)}  {el/done:.0f}s/image", flush=True); contact_sheet()
            continue
        r = subprocess.run([exe, "--model", MODEL, "--base-model", "schnell", "--steps", "4", "--seed", str(s),
                            "--width", "768", "--height", "576", "--prompt", P[k], "--output", str(dst)],
                           env=env, capture_output=True, text=True)
        if r.returncode != 0 or not dst.exists():
            print(f"FAIL {k} s{s}: {r.stderr[-400:]}", flush=True); continue
        done += 1
        if done % 5 == 0 or done == len(todo):
            el = time.time() - t0; print(f"  {done}/{len(todo)}  {el/done:.0f}s/image", flush=True)
            contact_sheet()
    contact_sheet(); print(f"done: {done} new images -> {OUT/'index.html'}")

if __name__ == "__main__": main()
