import type { Context } from "hono";
import type { Difficulty, PlayResult } from "../game/types";

export type Env = {
  Bindings: {
    DB: D1Database;
    ASSETS: Fetcher;
  };
};

const DIFFICULTIES = new Set<Difficulty>(["beginner", "intermediate", "advanced"]);

export function isDifficulty(value: string): value is Difficulty {
  return DIFFICULTIES.has(value as Difficulty);
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function asStatArray(value: unknown, keyName: string): boolean {
  if (!Array.isArray(value) || value.length > 200) {
    return false;
  }
  return value.every((row) => {
    if (!row || typeof row !== "object") {
      return false;
    }
    const rec = row as Record<string, unknown>;
    return typeof rec[keyName] === "string" && Number.isFinite(rec.hits) && Number.isFinite(rec.misses);
  });
}

export function parsePlayBody(body: unknown): PlayResult | null {
  if (!body || typeof body !== "object") {
    return null;
  }
  const b = body as Record<string, unknown>;
  if (typeof b.playerId !== "string" || !isUuid(b.playerId)) {
    return null;
  }
  if (typeof b.difficulty !== "string" || !isDifficulty(b.difficulty)) {
    return null;
  }
  if (b.durationSec !== 60 && b.durationSec !== 120 && b.durationSec !== 180) {
    return null;
  }
  const nums = ["salary", "wpm", "cpm", "accuracy", "missCount", "maxStreak", "sentCount"] as const;
  for (const k of nums) {
    if (typeof b[k] !== "number" || !Number.isFinite(b[k])) {
      return null;
    }
  }
  if ((b.salary as number) < 0 || (b.salary as number) > 1_000_000_000) {
    return null;
  }
  if (!asStatArray(b.keyStats, "key") || !asStatArray(b.fingerStats, "finger") || !asStatArray(b.bigramStats, "pair")) {
    return null;
  }
  return {
    playerId: b.playerId,
    difficulty: b.difficulty,
    durationSec: b.durationSec,
    salary: Math.round(b.salary as number),
    wpm: b.wpm as number,
    cpm: b.cpm as number,
    accuracy: b.accuracy as number,
    missCount: Math.round(b.missCount as number),
    maxStreak: Math.round(b.maxStreak as number),
    sentCount: Math.round(b.sentCount as number),
    keyStats: b.keyStats as PlayResult["keyStats"],
    fingerStats: b.fingerStats as PlayResult["fingerStats"],
    bigramStats: b.bigramStats as PlayResult["bigramStats"],
  };
}

export async function listProblems(c: Context<Env>, difficulty: Difficulty) {
  const rows = await c.env.DB.prepare(
    "SELECT id, difficulty, channel, incoming_json, reply, yomi, base_reward FROM problems WHERE difficulty = ? ORDER BY id",
  )
    .bind(difficulty)
    .all<{
      id: string;
      difficulty: Difficulty;
      channel: string;
      incoming_json: string;
      reply: string;
      yomi: string;
      base_reward: number;
    }>();
  return (rows.results ?? []).map((row) => ({
    id: row.id,
    difficulty: row.difficulty,
    channel: row.channel,
    incoming: JSON.parse(row.incoming_json) as { name: string; body: string }[],
    reply: row.reply,
    yomi: row.yomi,
    baseReward: row.base_reward,
  }));
}

export async function insertPlay(c: Context<Env>, play: PlayResult) {
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO plays (
      id, player_id, difficulty, duration_sec, salary, wpm, cpm, accuracy,
      miss_count, max_streak, sent_count, key_stats_json, finger_stats_json, bigram_stats_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      play.playerId,
      play.difficulty,
      play.durationSec,
      play.salary,
      play.wpm,
      play.cpm,
      play.accuracy,
      play.missCount,
      play.maxStreak,
      play.sentCount,
      JSON.stringify(play.keyStats),
      JSON.stringify(play.fingerStats),
      JSON.stringify(play.bigramStats),
      Date.now(),
    )
    .run();
  return id;
}

export async function loadStats(c: Context<Env>, playerId: string) {
  const rows = await c.env.DB.prepare(
    "SELECT salary, key_stats_json, finger_stats_json, bigram_stats_json FROM plays WHERE player_id = ?",
  )
    .bind(playerId)
    .all<{
      salary: number;
      key_stats_json: string;
      finger_stats_json: string;
      bigram_stats_json: string;
    }>();
  const plays = rows.results ?? [];
  const bestSalary = plays.reduce((m, r) => Math.max(m, r.salary), 0);
  return {
    playCount: plays.length,
    bestSalary: bestSalary || null,
    keyStats: plays.flatMap((p) => JSON.parse(p.key_stats_json) as PlayResult["keyStats"]),
    fingerStats: plays.flatMap((p) => JSON.parse(p.finger_stats_json) as PlayResult["fingerStats"]),
    bigramStats: plays.flatMap((p) => JSON.parse(p.bigram_stats_json) as PlayResult["bigramStats"]),
  };
}
