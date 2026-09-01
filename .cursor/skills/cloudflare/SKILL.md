---
name: cloudflare
description: Comprehensive Cloudflare platform skill covering Workers, Pages, storage (KV, D1, R2), AI (Workers AI, Vectorize, Agents SDK), feature flags (Flagship), networking (Tunnel, Spectrum), security (WAF, DDoS), and infrastructure-as-code (Terraform, Pulumi). Use for any Cloudflare development task. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
---

# Cloudflare Platform Skill

Official skill from https://github.com/cloudflare/skills/ (trimmed to SKILL.md only). Prefer retrieval from Cloudflare docs over pre-training.

Fetch the latest information before citing specific numbers, API signatures, or configuration options.

| Source | Use for |
|--------|---------|
| https://developers.cloudflare.com/ | Limits, pricing, API reference, compatibility dates/flags |
| node_modules/wrangler/config-schema.json | Config fields, binding shapes |

This project is a React SPA + Hono API on one Worker with D1. Use Workers static assets (`not_found_handling: single-page-application`) and `run_worker_first` for `/api/*`. Local D1 and production D1 must stay separate. Schema changes go through migrations.
