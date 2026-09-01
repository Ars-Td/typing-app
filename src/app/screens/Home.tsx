import { DIFFICULTY_LABEL, type Difficulty } from "../../game/types";
import { formatYen } from "../../game/score";
import { Shell } from "../components/Shell";

type Props = {
  difficulty: Difficulty;
  durationSec: number;
  bestSalary: number | null;
  onDifficulty: (d: Difficulty) => void;
  onDuration: (n: number) => void;
  onStart: () => void;
  onAnalysis: () => void;
};

const DIFFS: Difficulty[] = ["beginner", "intermediate", "advanced"];
const TIMES = [60, 120, 180];

export function Home({ difficulty, durationSec, bestSalary, onDifficulty, onDuration, onStart, onAnalysis }: Props) {
  return (
    <Shell active="home">
      <main className="main">
        <h1>今日もチャットで年収を稼ごう</h1>
        <p className="lead">届いたメッセージに、漢字多めの名文で返信するだけ。タイピングが速いほど査定が上がります。</p>
        {bestSalary ? (
          <div className="best">
            自己ベスト年収 <b>{formatYen(bestSalary)}</b>
          </div>
        ) : null}
        <h2>難易度</h2>
        <div className="row">
          {DIFFS.map((d) => (
            <button key={d} className={d === difficulty ? "opt sel" : "opt"} type="button" onClick={() => onDifficulty(d)}>
              <span className={`dot ${d}`} />
              <span className="name">{DIFFICULTY_LABEL[d]}</span>
            </button>
          ))}
        </div>
        <h2>制限時間</h2>
        <div className="row">
          {TIMES.map((t) => (
            <button key={t} className={t === durationSec ? "opt sel" : "opt"} type="button" onClick={() => onDuration(t)}>
              {t / 60} 分
            </button>
          ))}
        </div>
        <button className="cta" type="button" onClick={onStart}>
          シフト開始
        </button>
        <div className="links">
          <button className="link" type="button" onClick={onAnalysis}>
            タイピング分析
          </button>
        </div>
      </main>
    </Shell>
  );
}
