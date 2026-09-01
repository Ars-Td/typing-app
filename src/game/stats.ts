import { fingerForChar, FINGER_ORDER, type Finger } from "./fingers";
import type { BigramStat, FingerStat, KeyStat } from "./types";

export type Counters = {
  keys: Map<string, { hits: number; misses: number }>;
  fingers: Map<Finger, { hits: number; misses: number }>;
  bigrams: Map<string, { hits: number; misses: number }>;
  lastKey: string | null;
};

export function createCounters(): Counters {
  return { keys: new Map(), fingers: new Map(), bigrams: new Map(), lastKey: null };
}

function bump(
  map: Map<string, { hits: number; misses: number }>,
  id: string,
  miss: boolean,
): void {
  const cur = map.get(id) ?? { hits: 0, misses: 0 };
  cur.hits += 1;
  if (miss) {
    cur.misses += 1;
  }
  map.set(id, cur);
}

export function recordKey(counters: Counters, ch: string, miss: boolean): void {
  const key = ch === "\n" ? "Enter" : ch;
  bump(counters.keys, key, miss);
  const finger = fingerForChar(ch);
  const f = counters.fingers.get(finger) ?? { hits: 0, misses: 0 };
  f.hits += 1;
  if (miss) {
    f.misses += 1;
  }
  counters.fingers.set(finger, f);
  if (counters.lastKey !== null) {
    const prev = counters.lastKey === "\n" ? "Enter" : counters.lastKey;
    bump(counters.bigrams, `${prev} → ${key}`, miss);
  }
  counters.lastKey = ch;
}

function rate(hits: number, misses: number): number {
  return hits === 0 ? 0 : misses / hits;
}

export function keyStatsFrom(counters: Counters): KeyStat[] {
  return [...counters.keys.entries()]
    .map(([key, v]) => ({ key, hits: v.hits, misses: v.misses }))
    .sort((a, b) => rate(b.hits, b.misses) - rate(a.hits, a.misses) || b.hits - a.hits);
}

export function fingerStatsFrom(counters: Counters): FingerStat[] {
  return FINGER_ORDER.map((finger) => {
    const v = counters.fingers.get(finger) ?? { hits: 0, misses: 0 };
    return { finger, hits: v.hits, misses: v.misses };
  }).filter((row) => row.hits > 0)
    .sort((a, b) => rate(b.hits, b.misses) - rate(a.hits, a.misses));
}

export function bigramStatsFrom(counters: Counters, limit = 8): BigramStat[] {
  return [...counters.bigrams.entries()]
    .map(([pair, v]) => ({ pair, hits: v.hits, misses: v.misses }))
    .sort((a, b) => rate(b.hits, b.misses) - rate(a.hits, a.misses) || b.hits - a.hits)
    .slice(0, limit);
}

export function mergeStats<T extends { hits: number; misses: number }>(
  rows: T[][],
  keyOf: (row: T) => string,
  make: (key: string, hits: number, misses: number) => T,
): T[] {
  const map = new Map<string, { hits: number; misses: number }>();
  for (const group of rows) {
    for (const row of group) {
      const k = keyOf(row);
      const cur = map.get(k) ?? { hits: 0, misses: 0 };
      cur.hits += row.hits;
      cur.misses += row.misses;
      map.set(k, cur);
    }
  }
  return [...map.entries()].map(([k, v]) => make(k, v.hits, v.misses));
}
