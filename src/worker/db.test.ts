import { describe, expect, it } from "vite-plus/test";
import { parsePlayBody } from "./db";

describe("parsePlayBody", () => {
  it("rejects missing player id", () => {
    expect(parsePlayBody({})).toBeNull();
  });

  it("accepts a valid payload", () => {
    const play = parsePlayBody({
      playerId: "550e8400-e29b-41d4-a716-446655440000",
      difficulty: "beginner",
      durationSec: 120,
      salary: 800000,
      wpm: 40,
      cpm: 200,
      accuracy: 0.96,
      missCount: 3,
      maxStreak: 20,
      sentCount: 4,
      keyStats: [{ key: "a", hits: 10, misses: 1 }],
      fingerStats: [{ finger: "左小指", hits: 10, misses: 1 }],
      bigramStats: [{ pair: "k → a", hits: 4, misses: 0 }],
    });
    expect(play?.salary).toBe(800000);
  });
});
