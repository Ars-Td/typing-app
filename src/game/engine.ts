import { displayProgress, shouldCommit, tokenizeYomi, isPrefixOfAlt, type Token } from "./romaji";
import { rewardForThread } from "./score";
import { bigramStatsFrom, createCounters, fingerStatsFrom, keyStatsFrom, recordKey, type Counters } from "./stats";
import type { Difficulty, Problem } from "./types";

export type ThreadTyping = {
  tokens: Token[];
  tokenIndex: number;
  buffer: string;
  missBuffer: string;
  misses: number;
  correctKeys: number;
  totalKeys: number;
  startedAt: number | null;
};

export type PlayState = {
  difficulty: Difficulty;
  durationSec: number;
  problems: Problem[];
  order: number[];
  cursor: number;
  thread: ThreadTyping;
  salary: number;
  sentCount: number;
  correctKeys: number;
  totalKeys: number;
  misses: number;
  streak: number;
  maxStreak: number;
  counters: Counters;
  ended: boolean;
};

function shuffleOrder(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function currentProblem(state: PlayState): Problem {
  const idx = state.order[state.cursor % state.order.length];
  return state.problems[idx];
}

function newThread(problem: Problem): ThreadTyping {
  return {
    tokens: tokenizeYomi(problem.yomi),
    tokenIndex: 0,
    buffer: "",
    missBuffer: "",
    misses: 0,
    correctKeys: 0,
    totalKeys: 0,
    startedAt: null,
  };
}

export function startPlay(problems: Problem[], difficulty: Difficulty, durationSec: number): PlayState {
  const filtered = problems.filter((p) => p.difficulty === difficulty);
  const order = shuffleOrder(filtered.length);
  const first = filtered[order[0]];
  return {
    difficulty,
    durationSec,
    problems: filtered,
    order,
    cursor: 0,
    thread: newThread(first),
    salary: 0,
    sentCount: 0,
    correctKeys: 0,
    totalKeys: 0,
    misses: 0,
    streak: 0,
    maxStreak: 0,
    counters: createCounters(),
    ended: false,
  };
}

export function threadComplete(thread: ThreadTyping): boolean {
  return thread.tokenIndex >= thread.tokens.length && thread.buffer === "" && thread.missBuffer === "";
}

export function composerView(reply: string, thread: ThreadTyping): {
  done: string;
  current: string;
  rest: string;
  romaOk: string;
  romaBad: string;
  romaWait: string;
} {
  const prog = displayProgress(reply, thread.tokens, thread.tokenIndex);
  const token = thread.tokens[thread.tokenIndex];
  return {
    ...prog,
    romaOk: thread.buffer,
    romaBad: thread.missBuffer,
    romaWait: token && !thread.missBuffer ? token.alts[0]?.slice(thread.buffer.length) ?? "" : "",
  };
}

function applyCorrect(state: PlayState, ch: string): void {
  recordKey(state.counters, ch, false);
  state.thread.correctKeys += 1;
  state.thread.totalKeys += 1;
  state.correctKeys += 1;
  state.totalKeys += 1;
  state.streak += 1;
  state.maxStreak = Math.max(state.maxStreak, state.streak);
}

function applyMiss(state: PlayState, ch: string): void {
  recordKey(state.counters, ch, true);
  state.thread.misses += 1;
  state.thread.totalKeys += 1;
  state.misses += 1;
  state.totalKeys += 1;
  state.streak = 0;
}

export function typeChar(state: PlayState, ch: string): PlayState {
  if (state.ended) {
    return state;
  }
  const next: PlayState = {
    ...state,
    thread: { ...state.thread },
    counters: state.counters,
  };
  const thread = next.thread;
  if (thread.startedAt === null) {
    thread.startedAt = Date.now();
  }
  if (thread.missBuffer) {
    applyMiss(next, ch);
    thread.missBuffer += ch;
    return next;
  }
  if (threadComplete(thread)) {
    return next;
  }
  const token = thread.tokens[thread.tokenIndex];
  const attempt = thread.buffer + ch;
  if (shouldCommit(attempt, token, thread.tokens, thread.tokenIndex)) {
    applyCorrect(next, ch);
    thread.buffer = "";
    thread.tokenIndex += 1;
    return next;
  }
  if (isPrefixOfAlt(attempt, token.alts)) {
    applyCorrect(next, ch);
    thread.buffer = attempt;
    return next;
  }
  applyMiss(next, ch);
  thread.missBuffer = ch;
  return next;
}

export function backspace(state: PlayState): PlayState {
  if (state.ended) {
    return state;
  }
  const thread = { ...state.thread };
  if (thread.missBuffer) {
    thread.missBuffer = thread.missBuffer.slice(0, -1);
    return { ...state, thread };
  }
  if (thread.buffer) {
    thread.buffer = thread.buffer.slice(0, -1);
    return { ...state, thread };
  }
  return state;
}

export function sendThread(state: PlayState): PlayState {
  if (state.ended || !threadComplete(state.thread)) {
    return state;
  }
  const problem = currentProblem(state);
  const elapsedMs = Date.now() - (state.thread.startedAt ?? Date.now());
  const seconds = Math.max(elapsedMs / 1000, 0.5);
  const pay = rewardForThread({
    baseReward: problem.baseReward,
    difficulty: state.difficulty,
    correctKeys: state.thread.correctKeys,
    seconds,
    misses: state.thread.misses,
    totalKeys: state.thread.totalKeys,
  });
  const cursor = state.cursor + 1;
  const nextProblem = state.problems[state.order[cursor % state.order.length]];
  return {
    ...state,
    salary: state.salary + pay,
    sentCount: state.sentCount + 1,
    cursor,
    thread: newThread(nextProblem),
  };
}

export function handleKey(state: PlayState, key: string): PlayState {
  if (key === "Backspace") {
    return backspace(state);
  }
  if (key === "Enter") {
    if (threadComplete(state.thread)) {
      return sendThread(state);
    }
    return typeChar(state, "\n");
  }
  if (key.length === 1) {
    return typeChar(state, key);
  }
  return state;
}

export function snapshotStats(state: PlayState) {
  return {
    keyStats: keyStatsFrom(state.counters),
    fingerStats: fingerStatsFrom(state.counters),
    bigramStats: bigramStatsFrom(state.counters),
  };
}
