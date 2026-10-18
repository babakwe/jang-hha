"use client";
import { BASE } from "@/lib/base";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Lang } from "./types";
import { audioKey } from "./hash";

/**
 * Audio layer.
 * 1. Pre-generated ElevenLabs MP3s live in /audio/<lang>/<key>.mp3 and are listed in /audio/manifest.json
 *    (built by scripts/gen_audio.py). Those play first: offline-capable, consistent voice.
 * 2. Anything not pre-generated falls back to the browser's speech synthesis in the right language.
 * speak(text, lang, id) plays one item; speakAll(items) plays a sequence (listen mode).
 */
type Item = { text: string; lang: Lang; id: string };
type Ctx = {
  speak: (text: string, lang: Lang, id: string) => void;
  speakAll: (items: Item[]) => void;
  stop: () => void;
  activeId: string | null;
  playing: boolean;
  ready: boolean;
};
const AudioCtx = createContext<Ctx>({ speak: () => {}, speakAll: () => {}, stop: () => {}, activeId: null, playing: false, ready: false });

export function AudioProvider({ children }: { children: ReactNode }) {
  const manifest = useRef<Record<string, 1> | null>(null);
  const [ready, setReady] = useState(false);
  const player = useRef<HTMLAudioElement | null>(null);
  const queue = useRef<Item[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch(`${BASE}/audio/manifest.json`).then(r => r.ok ? r.json() : {}).catch(() => ({}))
      .then(m => { manifest.current = m; setReady(true); });
  }, []);

  const stop = useCallback(() => {
    queue.current = [];
    if (player.current) { player.current.pause(); player.current.src = ""; }
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
    setActiveId(null); setPlaying(false);
  }, []);

  const playNext = useCallback(() => {
    const item = queue.current.shift();
    if (!item) { setActiveId(null); setPlaying(false); return; }
    setActiveId(item.id); setPlaying(true);
    const key = audioKey(item.lang, item.text);
    const has = manifest.current?.[`${item.lang}/${key}`];
    if (has) {
      const a = player.current ?? (player.current = new Audio());
      a.src = `${BASE}/audio/${item.lang}/${key}.mp3`;
      a.onended = () => playNext();
      a.onerror = () => fallback(item);
      a.play().catch(() => fallback(item));
    } else fallback(item);

    function fallback(it: Item) {
      if (typeof speechSynthesis === "undefined") { playNext(); return; }
      const u = new SpeechSynthesisUtterance(it.text);
      u.lang = it.lang === "en" ? "en-US" : "fr-FR"; // no Wolof voices in browsers; French voice reads Wolof text as fallback
      u.rate = 0.92;
      const voices = speechSynthesis.getVoices();
      const v = voices.find(v => v.lang.toLowerCase().startsWith(it.lang === "en" ? "en" : "fr"));
      if (v) u.voice = v;
      u.onend = () => playNext();
      u.onerror = () => playNext();
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }
  }, []);

  const speakAll = useCallback((items: Item[]) => { stop(); queue.current = [...items]; playNext(); }, [stop, playNext]);
  const speak = useCallback((text: string, lang: Lang, id: string) => speakAll([{ text, lang, id }]), [speakAll]);

  useEffect(() => () => stop(), [stop]);
  return <AudioCtx.Provider value={{ speak, speakAll, stop, activeId, playing, ready }}>{children}</AudioCtx.Provider>;
}
export const useAudio = () => useContext(AudioCtx);
