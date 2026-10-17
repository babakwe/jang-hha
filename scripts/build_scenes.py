#!/usr/bin/env python3
"""
Build src/data/scenes.json: one scene id per procedure step.
1. Hand-authored maps for the required procedures (exact, per step).
2. Keyword rules for the recurring steps across all 43 procedures (explain / wash / gloves / privacy /
   equipment / report / clean / dispose / comfort / safety / supervisor).
Steps that match nothing stay null and show the procedure pictogram.
"""
import json, pathlib, re
D = pathlib.Path(__file__).resolve().parent.parent / "src" / "data"
procs = json.loads((D / "procedures.json").read_text())

MANUAL = {
 "p01": {"steps": ["handwash:gather","handwash:sleeves","handwash:wet","handwash:soap","handwash:scrub","handwash:rinse","handwash:dry","handwash:tapoff"], "alt": ["handwash:gel","handwash:rub"]},
 "p05": {"steps": ["common:prep","common:privacy","bedbath:towels","bedbath:water","bedbath:mitt","bedbath:headtoe","bedbath:exposure","bedbath:handsfeet","bedbath:participate","bedbath:last","bedbath:dress","common:report"]},
 "p10": {"steps": ["common:prep","mouth:selfbrush","mouth:position","mouth:brush","mouth:rinse","common:report"], "alt": ["mouth:dentures-out","mouth:dentures-out","mouth:sink","mouth:sink","mouth:rinse","mouth:dentures-in"]},
 "p14": {"steps": ["walk:reassure","walk:shoes","walk:practice","walk:walk","walk:weak","walk:short","common:report"]},
 "p16": {"steps": ["common:prep","occbed:base","occbed:base","occbed:turn","occbed:roll","occbed:roll","occbed:roll","occbed:over","occbed:over","occbed:pillow"]},
 "p17": {"steps": ["common:prep","bedpan:warm","common:privacy","bedpan:lift","bedpan:signal","bedpan:signal","bedpan:remove","bedpan:measure","common:report"]},
 "p26": {"steps": ["common:prep","transfer:angle","transfer:belt","transfer:dangle","transfer:pivot","transfer:lower","transfer:footrests","common:report"]},
}
MED = {"p39": "person", "p40": "med", "p41": "dose", "p42": "time", "p43": "route"}

RULES = [  # (regex on English step, scene) — first match wins
 (r"^explain[^.]*\.\s*wash your hands", "common:prep"),
 (r"^explain", "common:explain"),
 (r"^wash your hands\.\s*(observe|record)", "common:report"),
 (r"observe, record and report|record and report|^record", "common:report"),
 (r"contact the supervisor|call the supervisor|report any", "common:supervisor"),
 (r"privacy", "common:privacy"),
 (r"^wash your hands", "common:wash"),
 (r"gloves", "common:gloves"),
 (r"assemble|gather", "common:equipment"),
 (r"dispos|discard|waste bag", "common:dispose"),
 (r"clean (and store|the area|re-usable)|store (the )?equipment|return equipment", "common:clean"),
 (r"comfortable|comfort", "common:comfort"),
 (r"lock|brakes|safety belt|gait belt", "common:safety"),
]

def auto(text):
    t = text.lower()
    for rx, sc in RULES:
        if re.search(rx, t): return sc
    return None

out, filled, total = {}, 0, 0
for p in procs:
    m = MANUAL.get(p["id"])
    if p["id"] in MED:
        r = MED[p["id"]]
        seq = ["common:wash", "med:read"] + [f"med:{r}"] * 0
        steps = []
        for s in p["steps"]:
            t = s["en"].lower()
            if t.startswith("wash your hands"): steps.append("common:wash")
            elif "expiration" in t: steps.append("med:expiry")
            elif t.startswith("read the container label") and "route" not in t: steps.append("med:read")
            elif "if they match" in t or ("give the container" in t and "not" not in t): steps.append("med:match")
            elif "not match" in t or "no information" in t: steps.append("med:mismatch")
            elif t.startswith("record"): steps.append("med:record")
            else: steps.append(f"med:{r}")
        m = {"steps": steps}
    if not m:
        m = {"steps": [auto(s["en"]) for s in p["steps"]]}
        if p.get("alt"): m["alt"] = [auto(s["en"]) for s in p["alt"]["steps"]]
    assert len(m["steps"]) == len(p["steps"]), (p["id"], len(m["steps"]), len(p["steps"]))
    if p.get("alt") and "alt" in m: assert len(m["alt"]) == len(p["alt"]["steps"]), (p["id"], "alt")
    out[p["id"]] = m
    for v in m["steps"] + m.get("alt", []):
        total += 1; filled += v is not None

out["p32"]["steps"][2] = "common:equipment"  # measuring cups, not waste
(D / "scenes.json").write_text(json.dumps(out, indent=1))
print(f"scenes.json: {filled}/{total} steps have a picture ({100*filled//total}%); required procedures fully mapped")
