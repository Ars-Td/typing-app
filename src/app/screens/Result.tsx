import { DIFFICULTY_LABEL, type Difficulty } from "../../game/types";
import { formatYen } from "../../game/score";
import { Shell } from "../components/Shell";

type Props = {
  salary: number;
  bestSalary: number | null;
  difficulty: Difficulty;
  durationSec: number;
  sentCount: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  missCount: number;
  maxStreak: number;
  onRetry: () => void;
  onHome: () => void;
  onAnalysis: () => void;
};

export function Result(props: Props) {
  return (
    <Shell active="result">
      <main className="main">
        <h1>シフト終了 · 査定結果</h1>
        <p className="meta">
          {DIFFICULTY_LABEL[props.difficulty]} · {props.durationSec / 60} 分 · 送信 {props.sentCount} 件
        </p>
        <div className="hero">
          <div className="label">ゲーム内年収</div>
          <div className="yen">
            ¥<span>{Math.round(props.salary).toLocaleString("ja-JP")}</span>
          </div>
          {props.bestSalary ? <div className="best-note">自己ベスト {formatYen(props.bestSalary)}</div> : null}
        </div>
        <div className="grid-4">
          <div className="card">
            <div className="k">入力速度</div>
            <div className="v">{Math.round(props.wpm)} WPM</div>
            <div className="k">{Math.round(props.cpm)} CPM</div>
          </div>
          <div className="card">
            <div className="k">正確性</div>
            <div className="v">{(props.accuracy * 100).toFixed(1)}%</div>
          </div>
          <div className="card">
            <div className="k">ミス数</div>
            <div className="v">{props.missCount}</div>
          </div>
          <div className="card">
            <div className="k">最大連続入力</div>
            <div className="v">{props.maxStreak}</div>
          </div>
        </div>
        <div className="cta-row">
          <button className="cta" type="button" onClick={props.onRetry}>
            同じ設定で再挑戦
          </button>
          <button className="btn-sec" type="button" onClick={props.onHome}>
            ホーム
          </button>
          <button className="btn-sec" type="button" onClick={props.onAnalysis}>
            分析
          </button>
        </div>
      </main>
    </Shell>
  );
}
