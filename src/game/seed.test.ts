import { describe, expect, it } from "vite-plus/test";
import problems from "../../seed/problems.json";
import { tokenizeYomi } from "./romaji";

describe("seed yomi", () => {
  it("tokenizes every problem yomi", () => {
    expect(problems.length).toBeGreaterThanOrEqual(36);
    for (const row of problems) {
      const tokens = tokenizeYomi(row.yomi);
      expect(tokens.length, row.id).toBeGreaterThan(0);
    }
  });
});
