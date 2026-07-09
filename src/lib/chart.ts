// Deterministic PRNG so SSR and first client render match (no hydration drift).
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Candle = { o: number; h: number; l: number; c: number };

export function buildCandles(seed: number, n: number, base: number, vol: number): Candle[] {
  const rand = mulberry32(seed);
  const out: Candle[] = [];
  let price = base;
  for (let i = 0; i < n; i++) {
    const o = price;
    const drift = (rand() - 0.48) * vol;
    const c = Math.max(base * 0.6, o + drift);
    const h = Math.max(o, c) + rand() * vol * 0.6;
    const l = Math.min(o, c) - rand() * vol * 0.6;
    out.push({ o, h, l, c });
    price = c;
  }
  return out;
}

// Advance the series one tick: nudge the last candle, occasionally roll a new one.
export function tickCandles(prev: Candle[], vol: number, roll: boolean): Candle[] {
  const next = prev.slice();
  const last = { ...next[next.length - 1] };
  const move = (Math.random() - 0.5) * vol;
  last.c = last.c + move;
  last.h = Math.max(last.h, last.c);
  last.l = Math.min(last.l, last.c);
  next[next.length - 1] = last;

  if (roll) {
    next.shift();
    const o = last.c;
    const c = o + (Math.random() - 0.5) * vol;
    next.push({ o, h: Math.max(o, c), l: Math.min(o, c), c });
  }
  return next;
}

export const TIMEFRAMES = [
  { key: "1H", vol: 90, base: 67200, rollEvery: 3 },
  { key: "1D", vol: 320, base: 66800, rollEvery: 4 },
  { key: "1W", vol: 900, base: 64000, rollEvery: 5 },
] as const;

export type TimeframeKey = (typeof TIMEFRAMES)[number]["key"];
