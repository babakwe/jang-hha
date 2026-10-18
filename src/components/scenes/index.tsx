"use client";
import { BASE } from "@/lib/base";
import { Handwash, type HandwashPhase } from "./Handwash";
import { Common, type CommonPhase } from "./Common";
import { BedBath, Mouth, Walk, OccupiedBed, Bedpan, Transfer, MedCheck } from "./Required";
import { Illustration } from "@/components/Illustration";
import artJson from "@/data/art.json";
const ART = artJson as Record<string, string>;

/**
 * Scene registry: "<scene>:<phase>" → animated SVG. Steps without a scene fall back to the
 * procedure's pictogram with a pulsing step badge.
 */
export function Scene({ id, fallbackIcon, step }: { id?: string; fallbackIcon: string; step: number }) {
  if (id && ART[id]) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`${BASE}/art/${ART[id]}`} alt="" className="w-full h-auto rounded-xl" loading="eager" decoding="async" />;
  }
  if (id) {
    const [scene, phase] = id.split(":");
    switch (scene) {
      case "handwash": return <Handwash phase={phase as HandwashPhase} />;
      case "common": return <Common phase={phase as CommonPhase} />;
      case "bedbath": return <BedBath phase={phase} />;
      case "mouth": return <Mouth phase={phase} />;
      case "walk": return <Walk phase={phase} />;
      case "occbed": return <OccupiedBed phase={phase} />;
      case "bedpan": return <Bedpan phase={phase} />;
      case "transfer": return <Transfer phase={phase} />;
      case "med": return <MedCheck phase={phase} />;
    }
  }
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center text-brand">
      <Illustration name={fallbackIcon} size={200} />
      <div className="absolute bottom-3 right-3 w-14 h-14 rounded-full bg-accent text-white text-2xl font-black flex items-center justify-center animate-pulse">{step}</div>
    </div>
  );
}
