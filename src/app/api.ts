import type { Difficulty, PlayResult, Problem } from "../game/types";
import { getPlayerId } from "./player";

export async function fetchProblems(difficulty: Difficulty): Promise<Problem[]> {
  const res = await fetch(`/api/problems?difficulty=${difficulty}`);
  if (!res.ok) {
    throw new Error("failed to load problems");
  }
  const data = (await res.json()) as { problems: Problem[] };
  return data.problems;
}

export async function savePlay(play: Omit<PlayResult, "playerId">): Promise<void> {
  await fetch("/api/plays", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...play, playerId: getPlayerId() }),
  });
}

export type StatsResponse = {
  playCount: number;
  bestSalary: number | null;
  keyStats: PlayResult["keyStats"];
  fingerStats: PlayResult["fingerStats"];
  bigramStats: PlayResult["bigramStats"];
};

export async function fetchStats(): Promise<StatsResponse> {
  const res = await fetch(`/api/stats?playerId=${getPlayerId()}`);
  if (!res.ok) {
    return {
      playCount: 0,
      bestSalary: null,
      keyStats: [],
      fingerStats: [],
      bigramStats: [],
    };
  }
  return (await res.json()) as StatsResponse;
}
