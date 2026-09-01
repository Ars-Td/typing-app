# 返信打

業務チャットの返信をローマ字で打ち切るタイピングゲームです。

## 必要環境

- WSL2 上の Linux ファイルシステム
- Nix + direnv（初回は `direnv allow`）
- Vite+（`vp`）: `curl -fsSL https://vite.plus | bash`
- Cloudflare アカウント（デプロイ時）

## コマンド

```bash
just db-seed   # ローカル D1 に問題を投入
just dev       # http://localhost:8787
just check     # lint / typecheck / test / build
just deploy    # 本番 D1 更新のあと Workers へ
```

## デプロイ前に一度だけ

1. `wrangler login`（ブラウザで Cloudflare に認可）
2. `just db-create` の出力にある `database_id` を `wrangler.jsonc` に書く
3. `just deploy`
