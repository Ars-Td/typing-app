import { Hono } from "hono";
import { isDifficulty, listProblems, loadStats, parsePlayBody, insertPlay, type Env } from "./db";
import { mergeStats } from "../game/stats";
import type { BigramStat, FingerStat, KeyStat } from "../game/types";

const app = new Hono<Env>();

app.get("/api/problems", async (c) => {
  const difficulty = c.req.query("difficulty") ?? "";
  if (!isDifficulty(difficulty)) {
    return c.json({ error: "invalid difficulty" }, 400);
  }
  const problems = await listProblems(c, difficulty);
  return c.json({ problems });
});

app.post("/api/plays", async (c) => {
  const play = parsePlayBody(await c.req.json().catch(() => null));
  if (!play) {
    return c.json({ error: "invalid body" }, 400);
  }
  const id = await insertPlay(c, play);
  return c.json({ id });
});

app.get("/api/stats", async (c) => {
  const playerId = c.req.query("playerId") ?? "";
  if (!playerId) {
    return c.json({ error: "playerId required" }, 400);
  }
  const raw = await loadStats(c, playerId);
  const keyStats = mergeStats([raw.keyStats], (r) => r.key, (key, hits, misses) => ({ key, hits, misses } satisfies KeyStat))
    .sort((a, b) => b.misses / Math.max(b.hits, 1) - a.misses / Math.max(a.hits, 1));
  const fingerStats = mergeStats([raw.fingerStats], (r) => r.finger, (finger, hits, misses) => ({ finger, hits, misses } satisfies FingerStat))
    .sort((a, b) => b.misses / Math.max(b.hits, 1) - a.misses / Math.max(a.hits, 1));
  const bigramStats = mergeStats([raw.bigramStats], (r) => r.pair, (pair, hits, misses) => ({ pair, hits, misses } satisfies BigramStat))
    .sort((a, b) => b.misses / Math.max(b.hits, 1) - a.misses / Math.max(a.hits, 1))
    .slice(0, 12);
  return c.json({
    playCount: raw.playCount,
    bestSalary: raw.bestSalary,
    keyStats,
    fingerStats,
    bigramStats,
  });
});

export default app;
