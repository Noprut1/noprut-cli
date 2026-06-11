---
title: "config"
type: stub
source: src/utils/config.ts
status: active
created: 2026-06-05
updated: 2026-06-05
tags:
  - stub
  - source
  - config
aliases:
  - config
  - config.ts
  - getConfig
  - CliConfig
---

# config

> **Source file:** `src/utils/config.ts`

Reads `NOPRUT_API_BASE_URL`, `NOPRUT_API_KEY`, `NOPRUT_MODEL_ID` from `process.env` (Bun auto-loads `.env.local` and `.env` at startup).

```ts
getConfig(): CliConfig
// { baseUrl, apiKey, apiToken?, bearerToken?, modelId }
```

Defaults:
- `baseUrl` → `https://www.noprut-ai.dev`
- `modelId` → first model in the catalog

## See also

- [[08-config-and-env]] — how `/config` rewrites the .env file
- [[env-file]] — the in-process writer
- [[api]] — the consumer of `CliConfig`
