import { formatYen } from "../../game/score";
import type { StatsResponse } from "../api";
import { Shell } from "../components/Shell";

type Props = {
  stats: StatsResponse;
  onHome: () => void;
};

function rate(hits: number, misses: number): string {
  if (hits === 0) {
    return "—";
  }
  return `${Math.round((misses / hits) * 100)}%`;
}

export function Analysis({ stats, onHome }: Props) {
  const empty = stats.playCount === 0;
  const maxFinger = Math.max(0, ...stats.fingerStats.map((f) => (f.hits ? f.misses / f.hits : 0)));
  return (
    <Shell active="analysis">
      <main className="main">
        <h1>タイピング分析</h1>
        <p className="lead">通算の苦手傾向。母数 20 回未満は参考扱い。</p>
        {stats.bestSalary ? (
          <p className="best-line">
            自己ベスト年収 <b>{formatYen(stats.bestSalary)}</b> · {stats.playCount} プレイ
          </p>
        ) : null}
        {empty ? (
          <p className="empty">まだ査定材料が足りません。シフトを終えると、ここに通算の苦手傾向が出ます。</p>
        ) : (
          <div className="grid-3">
            <section>
              <h2>苦手キー</h2>
              <table>
                <thead>
                  <tr>
                    <th>キー</th>
                    <th>入力</th>
                    <th>ミス</th>
                    <th>率</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.keyStats.slice(0, 8).map((row) => (
                    <tr key={row.key}>
                      <td>
                        {row.key === " " ? "Space" : row.key}
                        {row.hits < 20 ? <span className="ref"> 参考</span> : null}
                      </td>
                      <td>{row.hits}</td>
                      <td>{row.misses}</td>
                      <td>{rate(row.hits, row.misses)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section>
              <h2>苦手な指</h2>
              {stats.fingerStats.map((row) => (
                <div className="finger" key={row.finger}>
                  {row.finger}
                  <div className="bar">
                    <i style={{ width: `${maxFinger ? ((row.hits ? row.misses / row.hits : 0) / maxFinger) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </section>
            <section>
              <h2>苦手な動き</h2>
              <table>
                <thead>
                  <tr>
                    <th>遷移</th>
                    <th>出現</th>
                    <th>ミス率</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.bigramStats.slice(0, 8).map((row) => (
                    <tr key={row.pair}>
                      <td>{row.pair}</td>
                      <td>{row.hits}</td>
                      <td>{rate(row.hits, row.misses)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}
        <p>
          <button className="link" type="button" onClick={onHome}>
            ホームへ
          </button>
        </p>
      </main>
    </Shell>
  );
}
