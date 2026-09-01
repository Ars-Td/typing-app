import { describe, expect, it } from "vite-plus/test";
import { handleKey, startPlay, threadComplete, typeChar } from "./engine";
import { tokenizeYomi } from "./romaji";
import { playAccuracy, rewardForThread } from "./score";
import { fingerForChar } from "./fingers";
import type { Problem } from "./types";

const sample: Problem = {
  id: "t1",
  difficulty: "beginner",
  channel: "#general",
  incoming: [{ name: "佐藤", body: "確認お願いします" }],
  reply: "確認します。",
  yomi: "かくにんします。",
  baseReward: 100000,
};

function typeAll(yomiKeys: string, problem = sample) {
  let state = startPlay([problem], "beginner", 120);
  for (const ch of yomiKeys) {
    state = typeChar(state, ch);
  }
  return state;
}

describe("tokenizeYomi", () => {
  it("maps し to shi/si", () => {
    const shi = tokenizeYomi("し")[0];
    expect(shi.alts).toContain("shi");
    expect(shi.alts).toContain("si");
  });
});

describe("romaji input", () => {
  it("accepts kunrei かくにんします。", () => {
    const state = typeAll("kakuninsimasu.");
    expect(threadComplete(state.thread)).toBe(true);
    expect(state.thread.misses).toBe(0);
  });

  it("accepts hepburn kakuninshimasu.", () => {
    const state = typeAll("kakuninshimasu.");
    expect(threadComplete(state.thread)).toBe(true);
  });

  it("accepts tsu and tu", () => {
    const p: Problem = { ...sample, reply: "次です", yomi: "つぎです" };
    expect(threadComplete(typeAll("tugidesu", p).thread)).toBe(true);
    expect(threadComplete(typeAll("tsugidesu", p).thread)).toBe(true);
  });

  it("accepts chi and ti", () => {
    const p: Problem = { ...sample, reply: "違います", yomi: "ちがいます" };
    expect(threadComplete(typeAll("tigaimasu", p).thread)).toBe(true);
    expect(threadComplete(typeAll("chigaimasu", p).thread)).toBe(true);
  });

  it("accepts fu and hu", () => {
    const p: Problem = { ...sample, reply: "含む", yomi: "ふくむ" };
    expect(threadComplete(typeAll("fukumu", p).thread)).toBe(true);
    expect(threadComplete(typeAll("hukumu", p).thread)).toBe(true);
  });

  it("accepts n for ん before a consonant and nn before n", () => {
    const hon: Problem = { ...sample, reply: "本当です", yomi: "ほんとうです" };
    expect(threadComplete(typeAll("hontoudesu", hon).thread)).toBe(true);
    const ann: Problem = { ...sample, reply: "案内します", yomi: "あんないします" };
    expect(threadComplete(typeAll("annnaisimasu", ann).thread)).toBe(true);
  });

  it("counts misses and keeps them after backspace", () => {
    let state = startPlay([sample], "beginner", 120);
    state = typeChar(state, "x");
    expect(state.thread.misses).toBe(1);
    state = handleKey(state, "Backspace");
    expect(state.thread.missBuffer).toBe("");
    expect(state.thread.misses).toBe(1);
  });

  it("types literals such as @ and #", () => {
    const p: Problem = {
      ...sample,
      reply: "@you #12",
      yomi: "@you #12",
    };
    const state = typeAll("@you #12", p);
    expect(threadComplete(state.thread)).toBe(true);
  });
});

describe("score", () => {
  it("clamps speed and accuracy", () => {
    const high = rewardForThread({
      baseReward: 100000,
      difficulty: "beginner",
      correctKeys: 1000,
      seconds: 1,
      misses: 0,
      totalKeys: 1000,
    });
    expect(high).toBe(150000);
    const messy = rewardForThread({
      baseReward: 100000,
      difficulty: "beginner",
      correctKeys: 10,
      seconds: 10,
      misses: 90,
      totalKeys: 100,
    });
    expect(messy).toBe(Math.round(100000 * 0.7 * 0.3));
  });

  it("computes accuracy", () => {
    expect(playAccuracy(100, 4)).toBeCloseTo(0.96);
  });
});

describe("fingers", () => {
  it("maps shift symbols to the unshifted key finger", () => {
    expect(fingerForChar("#")).toBe(fingerForChar("3"));
    expect(fingerForChar("@")).toBe("右小指");
  });
});
