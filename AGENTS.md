# 返信打

IT エンジニアのチャット返信を題材にしたタイピングゲーム。React SPA と Hono API を 1 つの Cloudflare Worker に載せ、D1 に問題とプレイ結果を保存する。

## コマンド

JavaScript ツールは Vite+（`vp`）に任せる。日常操作は just 経由。

- `just dev` — ローカル開発（ローカル D1）
- `just check` — lint / typecheck / test / build
- `just deploy` — 本番 migrate・seed のあと Workers へデプロイ
- `just db-migrate` — ローカル D1 に migration を適用
- `just db-seed` — ローカル D1 に問題データを投入

Ubuntu 20.04 では npm 付属の workerd が glibc 不足で失敗することがある。`just dev` は Nix の wrangler に同梱された workerd を使う。初回は `direnv allow`。`vp` が無ければ `curl -fsSL https://vite.plus | bash`。

キー入力をプレイ中に API へ送らない。集計はブラウザ内、保存は終了時のみ。個人情報は保存しない。

## 仕様

- [docs/specs/mvp.md](docs/specs/mvp.md)
- 完成条件: [docs/tasks/mvp_acceptance_checklist.md](docs/tasks/mvp_acceptance_checklist.md)
- UI の正: [mockups/pattern-a/](mockups/pattern-a/)

問題文はトラブル多めの IT 企業の業務チャットとして自然な日本語にする。主人公の返信は漢字を好むトーン。

## コミット

`[type]: [日本語で説明] [gitmoji]`

例: `feat: タイピング画面を追加 :sparkles:`

## Skills

公式のみ。`.cursor/skills/cloudflare` と `.cursor/skills/wrangler`（[cloudflare/skills](https://github.com/cloudflare/skills/)）。
