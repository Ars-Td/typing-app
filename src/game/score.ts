import type { Difficulty } from "./types";
import { BASE_CPM } from "./types";

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function rewardForThread(opts: {
  baseReward: number;
  difficulty: Difficulty;
  correctKeys: number;
  seconds: number;
  misses: number;
  totalKeys: number;
}): number {
  const cpm = opts.seconds <= 0 ? 0 : (opts.correctKeys / opts.seconds) * 60;
  const speed = clamp(cpm / BASE_CPM[opts.difficulty], 0.7, 1.5);
  const missRate = opts.totalKeys <= 0 ? 0 : opts.misses / opts.totalKeys;
  const accuracy = Math.max(0.3, 1 - missRate * 1.2);
  return Math.round(opts.baseReward * speed * accuracy);
}

export function playSpeed(correctKeys: number, durationSec: number): { cpm: number; wpm: number } {
  const cpm = durationSec <= 0 ? 0 : (correctKeys / durationSec) * 60;
  return { cpm, wpm: cpm / 5 };
}

export function playAccuracy(totalKeys: number, misses: number): number {
  if (totalKeys <= 0) {
    return 1;
  }
  return (totalKeys - misses) / totalKeys;
}

export function formatYen(n: number): string {
  return `¥${Math.round(n).toLocaleString("ja-JP")}`;
}
