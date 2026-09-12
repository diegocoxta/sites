# AGENTS.md

Guidance for AI coding agents. Keep it short — this file is always in context.
`CLAUDE.md` is a symlink to this file. Human-facing detail lives in
[README.md](README.md), [ARCHITECTURE.md](ARCHITECTURE.md) (the long form of the
Architecture section below) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Setup & commands

- Package manager: **Yarn 1.x** (not npm). Node 24 (`.nvmrc`).
- `yarn install` — dependencies.
- `yarn dev:br` / `yarn dev:me` / `yarn dev:com` — dev server for one domain
  (sets `DEV_SITE` so `proxy.ts` maps `localhost` to that domain). Port 3000.
- `yarn build` — production build (compiles all three domains).
- `yarn lint` — ESLint. `yarn stylelint` — CSS Modules. `yarn prettier` — format.
- `yarn cv` — regenerates `public/diegocosta.com.br/pages/cv/cv.pdf` from that
  page's own Markdown via `md-to-pdf`; run after editing the CV content.
- No unit test suite. Verify changes with `yarn lint` + `yarn build`, and for
  behavior, `yarn dev:<site>` and hit the route.

## Before you finish

Run `yarn lint` and `yarn build`. Both must pass.

## Code style

- Only comment corner cases that would otherwise be hard to understand from reading the code alone. Omit comments that just restate basic/obvious behavior or purely stylistic/static choices.

## Architecture

- **One Next.js app, three domains**, each a different kind of site:
  diegocosta.com.br a Markdown blog (`pt`), diegocosta.me a photography showcase
  reading the Unsplash API (`en`), diegocoxta.com a localized link hub
  (`pt`/`en`/`es`). [`proxy.ts`](proxy.ts) reads the request host and rewrites
  `/{path}` → `/{domain}/{path}`, so each domain resolves to its own tree under
  [`app/<domain>/`](app). Per-domain settings in `app/<domain>/config.ts`; shared
  defaults in `app/config.ts`.
- **Routing:** `app/<domain>/[...page]/` is a catch-all for `pages/` Markdown that
  calls `notFound()` when the doc is missing. diegocosta.com.br's blog is its own
  `blog/` route tree; diegocosta.me is dynamic off the Unsplash API
  (`app/diegocosta.me/actions.ts` is the only controller — routes `/`, `/c/<id>`,
  `/p/<id>`, and `@modal` for the lightbox). `diegocoxta.com` is multi-locale
  (`pt`/`en`/`es`) and nests everything under `[locale]/`; the other two domains
  are single-locale with no `/<locale>` prefix.
- **Content:** Markdown under `public/<domain>/` (`blog/`, `pages/`; only
  diegocosta.com.br has any), read via [`lib/content.ts`](lib/content.ts)
  (`contentFor(config)`).
- **i18n:** flat-key JSON at `public/<domain>/translations/<locale>.json`. Loader
  in [`lib/i18n/messages.ts`](lib/i18n/messages.ts) (`server-only`); edge-safe
  negotiation in [`lib/i18n/locale.ts`](lib/i18n/locale.ts) (used by `proxy.ts`).
  `getTranslations` sees every key; `getClientMessages` ships only `client.*`
  keys to Client Components — so a string used in a Client Component must be
  named `client.*`. JSON keys are **all lowercase**; `t()` lower-cases the
  lookup, so call sites may mirror component names
  (`t('components.photoShowcase.LoadMore.label')`) and still resolve. A key that
  isn't found is returned unchanged (brand/proper names pass straight through).
- **OG images, icons & JSON-LD:** favicons and per-page social preview images
  render at request time with `next/og` + `sharp` in
  [`lib/app-image.tsx`](lib/app-image.tsx) (`renderAppIcon`, `renderOgImage`),
  used by each domain's `icon.tsx` and `og/` route handlers
  (e.g. `app/diegocosta.com.br/blog/[post]/og/`, `app/diegocosta.me/og/[...slug]/`).
  Structured data (`Person`, `WebSite`, `BlogPosting`, `BreadcrumbList`,
  `ImageObject`) is built with `schema-dts` in [`lib/schema.ts`](lib/schema.ts)
  and rendered via `components/JsonLd`.
- **Activity widgets (diegocoxta.com):** [`lib/services/`](lib/services) fetch
  Discogs, Letterboxd, Unsplash, Hardcover, GitHub, Last.fm, Setlist.fm, an RSS
  feed, and Deezer (artist images) through [`lib/http.ts`](lib/http.ts), which
  adds a timeout + `revalidate` + logging and returns `null` on failure instead
  of throwing. Each widget in `components/LinkHub/components/Widgets/` is
  wrapped in `WidgetBoundary` (error boundary + `Suspense` skeleton), so a
  missing API token or failed fetch renders that one widget empty rather than
  breaking the page (see `.env.example`).
- **Dark mode:** `next-themes`, toggled by the shared
  [`components/ThemeSwitcher`](components/ThemeSwitcher) — imported directly by
  diegocosta.com.br's layout and diegocoxta.com's
  `components/LinkHub/components/Hub`. Keep theme-toggle UI here rather than
  duplicating it per domain.
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
- **Git commits:** [Conventional Commits](https://www.conventionalcommits.org/)
  (`type(scope): subject`), with scope chosen as follows:
  - Change lives entirely (or mostly) under `app/<domain>`, or spans
    `app/<domain>` plus other files that are exclusive to that domain (e.g. a
    component or lib only that domain uses) → scope is `<domain>`.
  - Change is only in `components/`: a global component → scope is the
    component name; a component inside a namespace (`Blog`, `PhotoShowcase`,
    `LinkHub`, etc.) → scope is `namespace.component`, e.g.
    `feat(photoshowcase.lightbox.actionbutton)`, `fix(blog.article)`.
  - Anything else (libs, other standalone files) → scope is the file name,
    e.g. `fix(htmllang)`.
  - Never add a `Co-Authored-By` trailer (or any other AI attribution) to
    commit messages.

## Gotchas

- Editing `app/<domain>/config.ts` locales or `public/<domain>/translations/`
  keys? Keep the JSON files in sync across locales — missing keys fall back to
  the default-locale dictionary, extra keys are dead weight.
- `proxy.ts` runs in the edge runtime: no `fs`, no Node-only APIs there.
- These catch-all routes are dynamic; a `notFound()` body streams in on
  hydration. That's expected — the response status is still `404`.
