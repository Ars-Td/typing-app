import type { ReactNode } from "react";

type Props = {
  active: string;
  children: ReactNode;
};

export function Shell({ active, children }: Props) {
  return (
    <div className="app-shell">
      <aside className="side">
        <div className="logo">
          返信<span>打</span>
        </div>
        <div className="sec">CHANNELS</div>
        <div className={active === "home" ? "ch on" : "ch"}># はじめる</div>
        <div className={active === "play" ? "ch on" : "ch"}># incidents</div>
        <div className="ch"># pr-review</div>
        <div className="ch"># customer-success</div>
        <div className="sec">DM</div>
        <div className={active === "analysis" ? "ch on" : "ch"}>分析レポート</div>
        <div className={active === "result" ? "ch on" : "ch"}># 今期の評価</div>
      </aside>
      {children}
    </div>
  );
}
