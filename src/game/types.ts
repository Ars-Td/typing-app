export type Difficulty = "beginner" | "intermediate" | "advanced";

export type IncomingMessage = {
  name: string;
  body: string;
};

export type Problem = {
  id: string;
  difficulty: Difficulty;
  channel: string;
  incoming: IncomingMessage[];
  reply: string;
  yomi: string;
  baseReward: number;
};

export type KeyStat = { key: string; hits: number; misses: number };
export type FingerStat = { finger: string; hits: number; misses: number };
export type BigramStat = { pair: string; hits: number; misses: number };

export type PlayResult = {
  playerId: string;
  difficulty: Difficulty;
  durationSec: number;
  salary: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  missCount: number;
  maxStreak: number;
  sentCount: number;
  keyStats: KeyStat[];
  fingerStats: FingerStat[];
  bigramStats: BigramStat[];
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: "初級 · 新米エンジニア",
  intermediate: "中級 · 慣れてきたエンジニア",
  advanced: "上級 · つよつよエンジニア",
};

export const BASE_CPM: Record<Difficulty, number> = {
  beginner: 180,
  intermediate: 220,
  advanced: 260,
};
