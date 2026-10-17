#!/usr/bin/env python3
"""Merge the Wolof overlay drafts into lessons.json / procedures.json as `wo` fields.
Validates structure (same number of sections, points, steps) so Wolof text never lands on the wrong line.
Idempotent. Run from repo root: python3 scripts/merge_wolof.py"""
import json, pathlib, sys
D = pathlib.Path(__file__).resolve().parent.parent / "src" / "data"
def load(name): return {k: v for k, v in json.loads((D / name).read_text()).items() if not k.startswith("_")}

# lessons
lessons = json.loads((D / "lessons.json").read_text())
wl = {**load("wolof_lessons_1.json"), **load("wolof_lessons_2.json")}
n = 0
for l in lessons:
    w = wl.get(l["id"])
    if not w: continue
    assert len(w["sections"]) == len(l["sections"]), (l["id"], "sections")
    l["title"]["wo"] = w["title"]; l["intro"]["wo"] = w["intro"]; l["report"]["wo"] = w["report"]
    if "note" in w and "note" in l: l["note"]["wo"] = w["note"]
    for s, ws in zip(l["sections"], w["sections"]):
        assert len(ws["points"]) == len(s["points"]), (l["id"], s["heading"]["en"], len(ws["points"]), len(s["points"]))
        s["heading"]["wo"] = ws["heading"]
        for p, wp in zip(s["points"], ws["points"]): p["wo"] = wp
    n += 1
(D / "lessons.json").write_text(json.dumps(lessons, ensure_ascii=False, indent=1))
print(f"lessons with Wolof: {n}/{len(lessons)}")

# procedures
procs = json.loads((D / "procedures.json").read_text())
wp = {**load("wolof_procedures_1.json"), **load("wolof_procedures_2.json")}
n = 0
for p in procs:
    w = wp.get(p["id"])
    if not w: continue
    assert len(w["steps"]) == len(p["steps"]), (p["id"], "steps", len(w["steps"]), len(p["steps"]))
    p["title"]["wo"] = w["title"]
    for s, ws in zip(p["steps"], w["steps"]): s["wo"] = ws
    if "warning" in w: p["warning"]["wo"] = w["warning"]
    if "alt" in w:
        assert len(w["alt"]["steps"]) == len(p["alt"]["steps"]), (p["id"], "alt")
        p["alt"]["title"]["wo"] = w["alt"]["title"]
        for s, ws in zip(p["alt"]["steps"], w["alt"]["steps"]): s["wo"] = ws
    n += 1
(D / "procedures.json").write_text(json.dumps(procs, ensure_ascii=False, indent=1))
print(f"procedures with Wolof: {n}/{len(procs)}")
