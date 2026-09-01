export const FINGER_ORDER = [
  "左小指",
  "左薬指",
  "左中指",
  "左人差",
  "左親指",
  "右親指",
  "右人差",
  "右中指",
  "右薬指",
  "右小指",
] as const;

export type Finger = (typeof FINGER_ORDER)[number];

const UNSHIFT: Record<string, string> = {
  "!": "1",
  '"': "2",
  "#": "3",
  $: "4",
  "%": "5",
  "&": "6",
  "'": "7",
  "(": "8",
  ")": "9",
  "=": "-",
  "~": "^",
  "|": "¥",
  "`": "@",
  "{": "[",
  "}": "]",
  "+": ";",
  "*": ":",
  "<": ",",
  ">": ".",
  "?": "/",
  _: "\\",
};

const FINGER_BY_KEY: Record<string, Finger> = {
  "1": "左小指",
  q: "左小指",
  a: "左小指",
  z: "左小指",
  "2": "左薬指",
  w: "左薬指",
  s: "左薬指",
  x: "左薬指",
  "3": "左中指",
  e: "左中指",
  d: "左中指",
  c: "左中指",
  "4": "左人差",
  "5": "左人差",
  r: "左人差",
  t: "左人差",
  f: "左人差",
  g: "左人差",
  v: "左人差",
  b: "左人差",
  " ": "左親指",
  "\n": "右小指",
  "6": "右人差",
  "7": "右人差",
  y: "右人差",
  u: "右人差",
  h: "右人差",
  j: "右人差",
  n: "右人差",
  m: "右人差",
  "8": "右中指",
  i: "右中指",
  k: "右中指",
  ",": "右中指",
  "9": "右薬指",
  o: "右薬指",
  l: "右薬指",
  ".": "右薬指",
  "0": "右小指",
  "-": "右小指",
  "^": "右小指",
  p: "右小指",
  "@": "右小指",
  "[": "右小指",
  ";": "右小指",
  ":": "右小指",
  "]": "右小指",
  "/": "右小指",
  "\\": "右小指",
  "¥": "右小指",
};

export function keyForChar(ch: string): string {
  if (ch === "\r") {
    return "\n";
  }
  if (ch.length !== 1) {
    return ch;
  }
  const lower = ch.toLowerCase();
  if (UNSHIFT[ch]) {
    return UNSHIFT[ch];
  }
  return lower;
}

export function fingerForChar(ch: string): Finger {
  const key = keyForChar(ch);
  return FINGER_BY_KEY[key] ?? "右小指";
}
