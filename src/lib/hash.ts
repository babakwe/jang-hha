// Content-addressed audio: same function exists in scripts/gen_audio.py.
// Two FNV-1a 32-bit passes over the UTF-8 bytes of `${lang}|${text}` → 16 hex chars.
function fnv1a32(bytes: Uint8Array, basis: number): number {
  let h = basis >>> 0;
  for (let i = 0; i < bytes.length; i++) {
    h ^= bytes[i];
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
const enc = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
export function audioKey(lang: string, text: string): string {
  const bytes = enc ? enc.encode(`${lang}|${text}`) : new Uint8Array();
  const a = fnv1a32(bytes, 0x811c9dc5).toString(16).padStart(8, "0");
  const b = fnv1a32(bytes, 0x01000193).toString(16).padStart(8, "0");
  return a + b;
}
