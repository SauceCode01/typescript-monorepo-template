# TypeScript Monorepo (pnpm + Turborepo)

Monorepo for a typed API + web stack. Uses pnpm workspaces and Turborepo to orchestrate builds, dev, and type checks across apps and shared packages.

## Structure

```text
root/
├─ apps/
│  ├─ api/            # Express API
│  └─ web/            # Next.js frontend
├─ packages/
│  ├─ api-contracts   # Route schemas and generated contract bundle 
│  └─ contract-gen    # Contract generator CLI 
├─ configs/           # Shared tsconfig/eslint presets
├─ turbo.json         # Turborepo pipeline
├─ pnpm-workspace.yaml
└─ package.json       # Root scripts (turbo wrappers)
```

## Prerequisites

- Node 18+ (per root engines)
- pnpm 9 (root `packageManager`)

## Install

```bash
pnpm install
```

## Common commands (root)

```bash
turbo dev          # turbo run dev across projects (no cache)
turbo build        # turbo run build (cached) 
turbo start        # turbo run start (builds first)
```

## Run per project

Use Turborepo filters to target a single app/package:

```bash
pnpm dev --filter api
pnpm dev --filter web
pnpm build --filter @packages/api-contracts 
```

## Contract generation

- Generate contracts for `@packages/api-contracts`:
    ```bash
    turbo build --filter @packages/api-contracts 
    ``` 
## Notes

- Turborepo caching is enabled for build/start tasks; dev is non-cached and persistent.
- Shared TypeScript configs live under `configs/typescript-config`; extend these in apps/packages.
- If you add a new app/package, include its folder in `pnpm-workspace.yaml`, add scripts (`dev`, `build`, `lint`, `check-types`), and rely on Turbo tasks to wire dependencies (`dependsOn: ["^task"]`).

## Useful patterns

- Filtered scripts keep feedback loops fast: `pnpm dev --filter api`.
- When modifying shared packages, rebuild dependents with `pnpm build --filter <pkg>...` to leverage Turbo’s graph. 

