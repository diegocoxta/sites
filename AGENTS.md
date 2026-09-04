# AGENTS.md

Guidance for AI coding agents. Keep it short — this file is always in context.
`CLAUDE.md` is a symlink to this file. Human-facing detail lives in [README.md](README.md).

## Setup & commands

- Package manager: **Yarn 1.x** (not npm). Node 24 (`.nvmrc`).
- `yarn install` — dependencies.
- `yarn dev:br` / `yarn dev:me` / `yarn dev:com` — dev server for one domain
  (sets `DEV_SITE` so `proxy.ts` maps `localhost` to that domain). Port 3000.
- `yarn build` — production build (compiles all three domains).
- `yarn lint` — ESLint. `yarn stylelint` — CSS Modules. `yarn prettier` — format.
- No unit test suite. Verify changes with `yarn lint` + `yarn build`, and for
  behavior, `yarn dev:<site>` and hit the route.

## Before you finish

Run `yarn lint` and `yarn build`. Both must pass.

## Architecture

- **One Next.js app, three domains.** [`proxy.ts`](proxy.ts) reads the request
  host and rewrites `/{path}` → `/{domain}/{path}`, so each domain resolves to its
  own tree under [`app/<domain>/`](app). Per-domain settings in
  `app/<domain>/config.ts`; shared defaults in `app/config.ts`.
- **Routing:** `app/<domain>/[...page]/` is a catch-all for Markdown pages that
  calls `notFound()` when the doc is missing. `diegocoxta.com` is multi-locale
  (`pt`/`en`/`es`) and nests everything under `[locale]/`; the other two domains
  are single-locale with no `/<locale>` prefix.
- **Content:** Markdown under `public/<domain>/` (`posts/`, `pages/`), read via
  [`lib/content.ts`](lib/content.ts) (`contentFor(config)`).
- **i18n:** flat-key JSON at `public/<domain>/translations/<locale>.json`. Loader
  in [`lib/i18n/messages.ts`](lib/i18n/messages.ts) (`server-only`); edge-safe
  negotiation in [`lib/i18n/locale.ts`](lib/i18n/locale.ts) (used by `proxy.ts`).
  `getTranslations` sees every key; `getClientMessages` ships only `client.*`
  keys to Client Components — so a string used in a Client Component must be
  named `client.*`.
- **404s:** no root `app/not-found.tsx` (it would need the host, forcing every
  catch-all dynamic). Each domain has its own boundary: single-locale domains use
  `app/<domain>/not-found.tsx` (Server Component); `diegocoxta.com` uses
  `app/diegocoxta.com/[locale]/not-found.tsx` (Client Component, reads the
  translator context) so the 404 is localized. Its copy is
  `client.components.notFound.message`.

## Conventions

- TypeScript everywhere. `~/*` import alias = repo root (see `tsconfig.json`).
- CSS Modules, co-located per component folder (`components/X/index.tsx` +
  `styles.module.css`). No global CSS beyond `app/globals.css`.
- Match the style of surrounding code; keep diffs minimal.
- Don't add dependencies without a clear need.

## Gotchas

- Editing `app/<domain>/config.ts` locales or `public/<domain>/translations/`
  keys? Keep the JSON files in sync across locales — missing keys fall back to
  the default-locale dictionary, extra keys are dead weight.
- `proxy.ts` runs in the edge runtime: no `fs`, no Node-only APIs there.
- These catch-all routes are dynamic; a `notFound()` body streams in on
  hydration. That's expected — the response status is still `404`.
