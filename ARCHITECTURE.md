# :triangular_ruler: Architecture

How the codebase is organized. For local setup see
[CONTRIBUTING.md](CONTRIBUTING.md); [AGENTS.md](AGENTS.md) is the condensed
version kept in context for AI coding agents.

A single Next.js app serves all three domains. [`proxy.ts`](proxy.ts) inspects the
request host and rewrites `/{pathname}` to `/{domain}/{pathname}`, so each domain
resolves to its own route tree under [`app/`](app). Per-domain settings (title,
links, locales, theme) live in `app/<domain>/config.ts`; shared defaults in
[`app/config.ts`](app/config.ts).

The three are different kinds of site: **diegocosta.com.br** is a Markdown blog
(`pt`), **diegocosta.me** a photography showcase backed by the Unsplash API
(`en`), and **diegocoxta.com** a localized link hub (`pt`/`en`/`es`).

## :desktop_computer: Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) with TypeScript.
- Markdown read and parsed in [`lib/content.ts`](lib/content.ts) with [`gray-matter`](https://github.com/jonschlinkert/gray-matter) (front matter) and [`reading-time`](https://github.com/ngryman/reading-time); rendered as MDX with [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) in [`components/Blog/components/Article`](components/Blog/components/Article).
- Internationalization with a small custom setup in [`lib/i18n/`](lib/i18n) — edge-safe locale negotiation (used by [`proxy.ts`](proxy.ts)) plus a `server-only` dictionary loader; JSON translations live under `public/<domain>/translations/`.
- Command bar with [`kbar`](https://kbar.vercel.app/) (`⌘K` / `Ctrl+K`) on diegocosta.com.br.
- Dark mode with [`next-themes`](https://github.com/pacocoursey/next-themes); the toggle is a shared [`components/ThemeSwitcher`](components/ThemeSwitcher), used on diegocosta.com.br's header and diegocoxta.com's Hub.
- The diegocosta.com.br blog feed is generated with [`rss`](https://github.com/dylang/node-rss); external feeds are parsed with [`fast-xml-parser`](https://github.com/NaturalIntelligence/fast-xml-parser).
- diegocosta.me reads its photos live from the Unsplash API — [`app/diegocosta.me/actions.ts`](app/diegocosta.me/actions.ts) is the sole controller.
- "Recent activity" cards on diegocoxta.com pull from Discogs, Letterboxd, Unsplash, Hardcover, GitHub, Last.fm, Setlist.fm and an RSS feed, with Deezer supplying artist images ([`lib/services/`](lib/services), fetched through [`lib/http.ts`](lib/http.ts)).
- ESLint, Prettier, stylelint, Husky and lint-staged — and [more](package.json).

## :file_folder: Project Structure

```
app/
  layout.tsx           root <html>: font + base theme var
  globals.css          the only global stylesheet
  icon.tsx             fallback favicon (each domain's icon.tsx overrides it)
  config.ts            shared config defaults (theme)
  diegocosta.com.br/   Markdown blog (pt)
    config.ts          per-domain config (title, links, locales, theme)
    layout.tsx  page.tsx
    blog/              index, [post]/, tag/[tag]/, feed/ (RSS route handler)
    [...page]/         catch-all for Markdown under public/<domain>/pages/
    not-found.tsx      404 boundary (Server Component)
    icon.tsx · manifest.json/ · robots.txt/ · sitemap.ts
  diegocosta.me/       photography showcase (en), photos from the Unsplash API
    config.ts  layout.tsx  page.tsx
    actions.ts         server actions — the sole Unsplash controller
    c/[id]/            one collection        p/[id]/  one photo
    @modal/            intercepted route: a photo as a lightbox modal
    [...page]/  not-found.tsx  icon.tsx · manifest.json/ · robots.txt/ · sitemap.ts
  diegocoxta.com/      localized link hub (pt/en/es)
    config.ts  layout.tsx
    page.tsx           redirects to the default locale
    [locale]/          layout, page, [...page]/, localized not-found.tsx
    icon.tsx · manifest.json/ · robots.txt/ · sitemap.ts
components/            React components, co-located CSS Modules; larger ones
                       (LinkHub/, PhotoShowcase/) nest their own components/ + hooks/
lib/
  config.ts            shared types for the per-domain config
  content.ts           Markdown reading, front-matter, locale fallback (contentFor)
  http.ts              fetch wrapper: timeout, revalidate, logging (used by services/)
  public-path.ts       helper for building public/<domain>/… paths
  i18n/
    locale.ts          locale list + Accept-Language / cookie negotiation (edge-safe)
    translator.ts      createTranslator: lookup, {param} interpolation, dates
    messages.ts        loads public/<domain>/translations/<locale>.json (server-only)
  services/            third-party integrations for the diegocoxta.com activity cards
proxy.ts               host-based rewrite + locale negotiation (Next middleware)
public/<domain>/        Markdown content (blog/, pages/), translations/ and assets
```

The `~/*` import alias maps to the repo root (see [`tsconfig.json`](tsconfig.json)).

## :globe_with_meridians: Content & i18n

Content is plain Markdown under `public/<domain>/` — only diegocosta.com.br has
any — split into `blog/` and `pages/`, one folder per slug. The `blog/` tree has
its own routes; `pages/` is served by the `[...page]` catch-all. Localized files
use an `index.<locale>.md` suffix (e.g. `index.en.md`) and fall back to the
default locale, then to `index.md`. Relative image references (`![](./img.png)`)
are rewritten to servable paths at read time.

UI strings are flat-key JSON dictionaries at
`public/<domain>/translations/<locale>.json`. A requested locale is merged over
the default-locale dictionary, so partial translations are fine. Keys prefixed
`client.` / `config.` / `components.` / `page.` go through the translator;
anything else is treated as a literal (brand and proper names). Keys prefixed
`client.` are the subset shipped to Client Components, via `getClientMessages`
in [`lib/i18n/messages.ts`](lib/i18n/messages.ts).

`diegocoxta.com` ships in `pt`, `en` and `es`; the other domains are
single-locale (and skip the `/<locale>` path prefix entirely).

### 404s

Missing content calls `notFound()` — from the catch-all `[...page]` route and,
on diegocosta.com.br, from the blog's dynamic routes too. There is no root
`app/not-found.tsx` — it would need the request host to choose a domain, forcing
every catch-all to render dynamically — so each domain carries its own boundary:

- Single-locale domains render `app/<domain>/not-found.tsx` (a Server Component).
- `diegocoxta.com` places the boundary at
  `app/diegocoxta.com/[locale]/not-found.tsx` so it renders inside the `[locale]`
  layout and can localize: a Client Component that reads the translator context.
  Its copy is stored under a `client.` key
  (`client.components.notFound.message`) so `getClientMessages` ships it.

The catch-all routes are dynamic, so the styled body streams in on hydration; the
response status is `404` either way.
