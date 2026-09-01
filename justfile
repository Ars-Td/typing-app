set shell := ["bash", "-cu"]
export PATH := env("HOME") + "/.local/share/vite-plus/bin:" + env("PATH")

db_name := "typing-app"

# ローカル開発（Vite ビルド + Wrangler。Ubuntu 20.04 では Vite プラグインの workerd が不安定なため）
dev:
    #!/usr/bin/env bash
    set -euo pipefail
    export PATH="${HOME}/.local/share/vite-plus/bin:${PATH}"
    vp build
    wrangler dev

# lint / typecheck / test / build
check:
    #!/usr/bin/env bash
    set -euo pipefail
    export PATH="${HOME}/.local/share/vite-plus/bin:${PATH}"
    vp lint
    vp exec tsc --noEmit -p tsconfig.json
    vp test --run
    vp build

# 本番 D1 を更新して Worker をデプロイ
deploy: db-migrate-prod db-seed-prod
    vp build
    wrangler deploy

# ローカル D1 に migration を適用
db-migrate:
    wrangler d1 migrations apply {{ db_name }} --local

# ローカル D1 に問題データを投入
db-seed: db-migrate
    wrangler d1 execute {{ db_name }} --local --file=seed/problems.sql

# 本番 D1 作成（対話。database_id を wrangler.jsonc に書く）
db-create:
    wrangler d1 create {{ db_name }}

db-migrate-prod:
    wrangler d1 migrations apply {{ db_name }} --remote

db-seed-prod: db-migrate-prod
    wrangler d1 execute {{ db_name }} --remote --file=seed/problems.sql

fmt:
    vp fmt
