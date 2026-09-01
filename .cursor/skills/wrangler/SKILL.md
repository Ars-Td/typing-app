---
name: wrangler
description: Cloudflare Workers CLI for deploying, developing, and managing Workers, KV, R2, D1, Vectorize, Hyperdrive, Workers AI, Containers, Queues, Workflows, Pipelines, and Secrets Store. Load before running wrangler commands to ensure correct syntax and best practices. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
---

# Wrangler CLI

Official skill from https://github.com/cloudflare/skills/. Prefer current Wrangler docs over memorized flags.

## This project

- Config: `wrangler.jsonc`
- Worker entry: `src/worker/index.ts`
- Commands go through `just` when possible (`just dev`, `just deploy`, `just db-migrate`)
- D1: `wrangler d1 migrations apply typing-app --local` for local; `--remote` for production
- Do not use GitHub Actions for deploy

## Docs

- https://developers.cloudflare.com/workers/wrangler/
- `wrangler types` after binding changes
- Local bindings are simulated unless `remote: true`
