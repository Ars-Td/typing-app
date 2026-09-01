import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProblems, fetchStats, savePlay, type StatsResponse } from "./api";
import { startPlay, snapshotStats, type PlayState } from "../game/engine";
import { playAccuracy, playSpeed } from "../game/score";
import type { Difficulty } from "../game/types";
import { Analysis } from "./screens/Analysis";
import { Home } from "./screens/Home";
import { Play } from "./screens/Play";
import { Result } from "./screens/Result";

type Screen = "home" | "play" | "result" | "analysis";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [durationSec, setDurationSec] = useState(120);
  const [play, setPlay] = useState<PlayState | null>(null);
  const [remaining, setRemaining] = useState(120);
  const [stats, setStats] = useState<StatsResponse>({ playCount: 0, bestSalary: null, keyStats: [], fingerStats: [], bigramStats: [] });
  const [resultBest, setResultBest] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const playRef = useRef<PlayState | null>(null);
  const finishing = useRef(false);
  playRef.current = play;

  const refreshStats = useCallback(() => {
    void fetchStats().then(setStats);
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const begin = useCallback(async () => {
    setError(null);
    const problems = await fetchProblems(difficulty);
    if (problems.length === 0) {
      setError("問題がまだ入っていません。just db-seed を実行してください。");
      return;
    }
    finishing.current = false;
    setPlay(startPlay(problems, difficulty, durationSec));
    setRemaining(durationSec);
    setScreen("play");
  }, [difficulty, durationSec]);

  const finish = useCallback(
    async (state: PlayState) => {
      if (finishing.current) {
        return;
      }
      finishing.current = true;
      const { cpm, wpm } = playSpeed(state.correctKeys, state.durationSec);
      const accuracy = playAccuracy(state.totalKeys, state.misses);
      const snap = snapshotStats(state);
      await savePlay({
        difficulty: state.difficulty,
        durationSec: state.durationSec,
        salary: state.salary,
        wpm,
        cpm,
        accuracy,
        missCount: state.misses,
        maxStreak: state.maxStreak,
        sentCount: state.sentCount,
        ...snap,
      });
      const latest = await fetchStats();
      setStats(latest);
      setResultBest(latest.bestSalary);
      setPlay(state);
      setScreen("result");
    },
    [],
  );

  useEffect(() => {
    if (screen !== "play") {
      return;
    }
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          const current = playRef.current;
          if (current) {
            void finish(current);
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [screen, finish]);

  if (screen === "play" && play) {
    return <Play state={play} remaining={remaining} onState={setPlay} onAbort={() => { setPlay(null); setScreen("home"); }} />;
  }

  if (screen === "result" && play) {
    const { cpm, wpm } = playSpeed(play.correctKeys, play.durationSec);
    return (
      <Result
        salary={play.salary}
        bestSalary={resultBest}
        difficulty={play.difficulty}
        durationSec={play.durationSec}
        sentCount={play.sentCount}
        wpm={wpm}
        cpm={cpm}
        accuracy={playAccuracy(play.totalKeys, play.misses)}
        missCount={play.misses}
        maxStreak={play.maxStreak}
        onRetry={() => void begin()}
        onHome={() => setScreen("home")}
        onAnalysis={() => setScreen("analysis")}
      />
    );
  }

  if (screen === "analysis") {
    return <Analysis stats={stats} onHome={() => setScreen("home")} />;
  }

  return (
    <>
      <Home
        difficulty={difficulty}
        durationSec={durationSec}
        bestSalary={stats.bestSalary}
        onDifficulty={setDifficulty}
        onDuration={setDurationSec}
        onStart={() => void begin()}
        onAnalysis={() => setScreen("analysis")}
      />
      {error ? <p className="banner">{error}</p> : null}
    </>
  );
}
