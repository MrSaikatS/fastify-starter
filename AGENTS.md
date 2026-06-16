# fastify-starter — AGENTS.md

## Package manager

Uses **Bun** (v1.3+). Lockfile is `bun.lock`. Install with `bun install`, not npm.

## Dev commands

| Command | What it does |
|---------|-------------|
| `bun run dev` | Builds TS, then watches both `tsc --watch` and `node --watch build/index.js` concurrently |
| `bun run build` | `tsc -p tsconfig.json` — outputs to `build/` |
| `bun run start` | `node build/index.js` (production start, no watch) |

These are the **only** scripts in `package.json` — no lint, format, test, or typecheck commands exist.

## Architecture

- **Entrypoint:** `src/index.ts` — creates Fastify instance, registers autoload for `plugins/` then `routes/`.
- **Plugins** (`src/plugins/`): Auto-loaded. Use `fastify-plugin` wrapper to share decorators across scope. Module-augment `FastifyInstance` for decorator types (see `support.ts`).
- **Routes** (`src/routes/`): Auto-loaded. Subdirectories with `index.ts` become route modules. Files export a Fastify plugin as default. Currently only `root.ts` (GET `/`).
- **Type patterns:** Routes use either `FastifyPluginAsyncTypebox` (from `@fastify/type-provider-typebox`) or plain `FastifyPluginAsync`. TypeBox is available for schema validation.
- **Logger:** `NODE_ENV=production` uses plain JSON logger; otherwise uses `pino-pretty` (dev-friendly).
- **Default port:** `3000` (hardcoded in `src/index.ts:39`; no env var override configured).

## Important

- ESM only (`"type": "module"`). Uses `import.meta.url` + `fileURLToPath` for `__dirname`.
- `build/` and `.env*` are gitignored.
- TypeScript config: `strict: true`, `target: ES2023`, `module: ESNext`, `moduleResolution: bundler`, `skipLibCheck: true`, `resolveJsonModule: true`.
- Adding a new `.ts` file to `src/plugins/` or `src/routes/` auto-registers it — no manual import needed.
- `README.md` is a stub (single title line) — not useful as documentation.
