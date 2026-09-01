export type Token = {
  displayLen: number;
  alts: string[];
  kind: "kana" | "literal";
};

const DIGRAPHS: Record<string, string[]> = {
  きゃ: ["kya"],
  きゅ: ["kyu"],
  きょ: ["kyo"],
  しゃ: ["sha", "sya"],
  しゅ: ["shu", "syu"],
  しょ: ["sho", "syo"],
  ちゃ: ["cha", "tya", "cya"],
  ちゅ: ["chu", "tyu", "cyu"],
  ちょ: ["cho", "tyo", "cyo"],
  にゃ: ["nya"],
  にゅ: ["nyu"],
  にょ: ["nyo"],
  ひゃ: ["hya"],
  ひゅ: ["hyu"],
  ひょ: ["hyo"],
  みゃ: ["mya"],
  みゅ: ["myu"],
  みょ: ["myo"],
  りゃ: ["rya"],
  りゅ: ["ryu"],
  りょ: ["ryo"],
  ぎゃ: ["gya"],
  ぎゅ: ["gyu"],
  ぎょ: ["gyo"],
  じゃ: ["ja", "jya", "zya"],
  じゅ: ["ju", "jyu", "zyu"],
  じょ: ["jo", "jyo", "zyo"],
  びゃ: ["bya"],
  びゅ: ["byu"],
  びょ: ["byo"],
  ぴゃ: ["pya"],
  ぴゅ: ["pyu"],
  ぴょ: ["pyo"],
  ゔぁ: ["va"],
  ゔぃ: ["vi"],
  ゔぇ: ["ve"],
  ゔぉ: ["vo"],
};

const MONO: Record<string, string[]> = {
  あ: ["a"],
  い: ["i"],
  う: ["u", "wu"],
  え: ["e"],
  お: ["o"],
  か: ["ka", "ca"],
  き: ["ki"],
  く: ["ku", "cu", "qu"],
  け: ["ke"],
  こ: ["ko", "co"],
  さ: ["sa"],
  し: ["shi", "si", "ci"],
  す: ["su"],
  せ: ["se", "ce"],
  そ: ["so"],
  た: ["ta"],
  ち: ["chi", "ti"],
  つ: ["tsu", "tu"],
  て: ["te"],
  と: ["to"],
  な: ["na"],
  に: ["ni"],
  ぬ: ["nu"],
  ね: ["ne"],
  の: ["no"],
  は: ["ha"],
  ひ: ["hi"],
  ふ: ["fu", "hu"],
  へ: ["he"],
  ほ: ["ho"],
  ま: ["ma"],
  み: ["mi"],
  む: ["mu"],
  め: ["me"],
  も: ["mo"],
  や: ["ya"],
  ゆ: ["yu"],
  よ: ["yo"],
  ら: ["ra"],
  り: ["ri"],
  る: ["ru"],
  れ: ["re"],
  ろ: ["ro"],
  わ: ["wa"],
  ゐ: ["wyi"],
  ゑ: ["wye"],
  を: ["wo", "o"],
  ん: ["n", "nn", "xn"],
  が: ["ga"],
  ぎ: ["gi"],
  ぐ: ["gu"],
  げ: ["ge"],
  ご: ["go"],
  ざ: ["za"],
  じ: ["ji", "zi"],
  ず: ["zu"],
  ぜ: ["ze"],
  ぞ: ["zo"],
  だ: ["da"],
  ぢ: ["di", "ji"],
  づ: ["du", "zu"],
  で: ["de"],
  ど: ["do"],
  ば: ["ba"],
  び: ["bi"],
  ぶ: ["bu"],
  べ: ["be"],
  ぼ: ["bo"],
  ぱ: ["pa"],
  ぴ: ["pi"],
  ぷ: ["pu"],
  ぺ: ["pe"],
  ぽ: ["po"],
  ぁ: ["la", "xa"],
  ぃ: ["li", "xi", "lyi", "xyi"],
  ぅ: ["lu", "xu"],
  ぇ: ["le", "xe", "lye", "xye"],
  ぉ: ["lo", "xo"],
  ゃ: ["lya", "xya"],
  ゅ: ["lyu", "xyu"],
  ょ: ["lyo", "xyo"],
  ゎ: ["lwa", "xwa"],
  っ: ["ltu", "xtu", "ltsu", "xtsu"],
  ー: ["-"],
  ゔ: ["vu"],
};

function toHiraganaChar(ch: string): string {
  const code = ch.charCodeAt(0);
  if (code >= 0x30a1 && code <= 0x30f6) {
    return String.fromCharCode(code - 0x60);
  }
  return ch;
}

function kanaAlts(kana: string): string[] | undefined {
  return DIGRAPHS[kana] ?? MONO[kana];
}

function sokuonAlts(nextAlts: string[]): string[] {
  const out = new Set<string>(["ltu", "xtu", "ltsu", "xtsu"]);
  for (const alt of nextAlts) {
    const first = alt[0];
    if (first && first >= "a" && first <= "z") {
      out.add(first);
    }
  }
  return [...out];
}

export function tokenizeYomi(yomi: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < yomi.length) {
    const ch = toHiraganaChar(yomi[i]);
    if (ch === "\r") {
      i += 1;
      continue;
    }
    if (ch === "。" ) {
      tokens.push({ displayLen: 1, alts: ["."], kind: "literal" });
      i += 1;
      continue;
    }
    if (ch === "、") {
      tokens.push({ displayLen: 1, alts: [","], kind: "literal" });
      i += 1;
      continue;
    }
    if (ch === "　") {
      tokens.push({ displayLen: 1, alts: [" "], kind: "literal" });
      i += 1;
      continue;
    }
    if (ch === "っ") {
      const rest = yomi.slice(i + 1);
      const nextTwo = rest.length >= 2 ? toHiraganaChar(rest[0]) + toHiraganaChar(rest[1]) : "";
      const nextOne = rest.length >= 1 ? toHiraganaChar(rest[0]) : "";
      const nextAlts = (nextTwo && DIGRAPHS[nextTwo]) || (nextOne ? MONO[nextOne] : undefined) || [];
      tokens.push({ displayLen: 1, alts: sokuonAlts(nextAlts), kind: "kana" });
      i += 1;
      continue;
    }
    const two = i + 1 < yomi.length ? ch + toHiraganaChar(yomi[i + 1]) : "";
    if (two && DIGRAPHS[two]) {
      tokens.push({ displayLen: 2, alts: DIGRAPHS[two], kind: "kana" });
      i += 2;
      continue;
    }
    const alts = kanaAlts(ch);
    if (alts) {
      tokens.push({ displayLen: 1, alts, kind: "kana" });
      i += 1;
      continue;
    }
    tokens.push({ displayLen: 1, alts: [yomi[i]], kind: "literal" });
    i += 1;
  }
  return tokens;
}

function nextIsNnAmbiguous(tokens: Token[], index: number): boolean {
  const next = tokens[index + 1];
  if (!next) {
    return false;
  }
  return next.alts.some((alt) => {
    const c = alt[0];
    return c === "a" || c === "i" || c === "u" || c === "e" || c === "o" || c === "y" || c === "n";
  });
}

export function isPrefixOfAlt(buffer: string, alts: string[]): boolean {
  return alts.some((alt) => alt.startsWith(buffer));
}

/** Prefer committing when the buffer is a complete alt and not a strict prefix of a different spelling, except ん. */
export function shouldCommit(buffer: string, token: Token, tokens: Token[], index: number): boolean {
  if (token.alts.includes(buffer)) {
    const isN = token.alts.includes("nn") && token.alts.includes("n");
    if (isN && buffer === "n") {
      return !nextIsNnAmbiguous(tokens, index);
    }
    const longerDifferent = token.alts.some((alt) => alt.startsWith(buffer) && alt.length > buffer.length && alt !== "nn" && alt !== "xn");
    if (longerDifferent) {
      return false;
    }
    return true;
  }
  return false;
}

export function displayProgress(reply: string, tokens: Token[], tokenIndex: number): {
  done: string;
  current: string;
  rest: string;
} {
  const chars = [...reply];
  if (tokenIndex >= tokens.length) {
    return { done: reply, current: "", rest: "" };
  }
  const idx = Math.min(Math.max(chars.length - 1, 0), Math.floor((tokenIndex / Math.max(tokens.length, 1)) * chars.length));
  return {
    done: chars.slice(0, idx).join(""),
    current: chars[idx] ?? "",
    rest: chars.slice(idx + 1).join(""),
  };
}
