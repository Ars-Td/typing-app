import { useEffect, useRef } from "react";
import { composerView, currentProblem, handleKey, sendThread, threadComplete, type PlayState } from "../../game/engine";
import { formatYen } from "../../game/score";
import { DIFFICULTY_LABEL } from "../../game/types";
import { Shell } from "../components/Shell";

type Props = {
  state: PlayState;
  remaining: number;
  onState: (s: PlayState) => void;
  onAbort: () => void;
};

function mmss(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Play({ state, remaining, onState, onAbort }: Props) {
  const problem = currentProblem(state);
  const view = composerView(problem.reply, state.thread);
  const complete = threadComplete(state.thread);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.focus();
  }, [state.cursor]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Enter" || e.key.length === 1) {
        e.preventDefault();
        onState(handleKey(state, e.key));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onState]);

  return (
    <Shell active="play">
      <div className="col">
        <header className="play-head">
          <h1>
            {problem.channel} · {DIFFICULTY_LABEL[state.difficulty]}
          </h1>
          <div className="pills">
            <span className="pill time">残り {mmss(remaining)}</span>
            <span className="pill pay">年収 {formatYen(state.salary)}</span>
          </div>
        </header>
        <div className="msgs">
          {problem.incoming.map((msg) => (
            <div className="msg" key={`${msg.name}-${msg.body}`}>
              <div className="av">{msg.name.slice(0, 1)}</div>
              <div>
                <div className="who">
                  {msg.name} <span>今</span>
                </div>
                <div className="body">{msg.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="composer">
          <div
            className="box"
            ref={boxRef}
            tabIndex={0}
            role="textbox"
            aria-label="ローマ字入力"
          >
            <div className="hint">お手本（日本語） · ローマ字で入力</div>
            <div className="jp">
              <span className="ok">{view.done}</span>
              <span className="cur">{view.current}</span>
              <span className="wait">{view.rest}</span>
            </div>
            <div className="roma">
              <span className="ok">{view.romaOk}</span>
              <span className="bad">{view.romaBad}</span>
              <span className="wait">{view.romaWait}</span>
            </div>
            <div className="bar">
              <span className="meta">
                ミス {state.misses} · コンボ {state.streak}
              </span>
              <div>
                <button className="ghost" type="button" onClick={onAbort}>
                  中断
                </button>
                <button className="send" type="button" disabled={!complete} onClick={() => onState(sendThread(state))}>
                  送信
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
