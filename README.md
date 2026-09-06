# :man_technologist: @diegocoxta/sites

My personal webpages powered by Next.js, TypeScript and CSS Modules.

- https://diegocosta.com.br
- https://diegocosta.me
- https://diegocoxta.com

A single Next.js app serves all three domains. [`proxy.ts`](proxy.ts) inspects the
request host and rewrites `/{pathname}` to `/{domain}/{pathname}`, so each domain
resolves to its own route tree under [`app/`](app). Per-domain settings (title,
links, locales, theme) live in `app/<domain>/config.ts`.

The three are different kinds of site: **diegocosta.com.br** is a Markdown blog
(`pt`), **diegocosta.me** a photography showcase backed by the Unsplash API
(`en`), and **diegocoxta.com** a localized link hub (`pt`/`en`/`es`).

## :desktop_computer: Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) with TypeScript.
- Markdown read and parsed in [`lib/content.ts`](lib/content.ts) with [`gray-matter`](https://github.com/jonschlinkert/gray-matter) (front matter) and [`reading-time`](https://github.com/ngryman/reading-time); rendered as MDX with [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) in [`components/Article`](components/Article).
- Internationalization with a small custom setup in [`lib/i18n/`](lib/i18n) — edge-safe locale negotiation (used by [`proxy.ts`](proxy.ts)) plus a `server-only` dictionary loader; JSON translations live under `public/<domain>/translations/`.
- Command bar with [`kbar`](https://kbar.vercel.app/) (`⌘K` / `Ctrl+K`) on diegocosta.com.br.
- Dark mode with [`next-themes`](https://github.com/pacocoursey/next-themes).
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

## :clipboard: Requirements

- [Node.js 24](https://nodejs.org/en/) (see [`.nvmrc`](.nvmrc))
- [Yarn 1.x](https://classic.yarnpkg.com/) as the package manager

## :keyboard: Developing

1. [Clone this repo](https://help.github.com/en/articles/cloning-a-repository) with git.
2. Run `yarn install` inside the project directory.
3. Copy the env file: `cp .env.example .env`. Every key is optional — without a
   given token the matching activity widget just renders empty. `SITE_ACCENT_COLOR`
   and `SITE_TEXT_COLOR` control the theme colors.
4. Start the dev server for one domain:
   - `yarn dev:br` &rarr; diegocosta.com.br
   - `yarn dev:me` &rarr; diegocosta.me
   - `yarn dev:com` &rarr; diegocoxta.com

   (or the full form, e.g. `yarn dev:diegocosta.com.br`)

5. Open [`http://localhost:3000`](http://localhost:3000). The `DEV_SITE` env var
   set by these scripts tells [`proxy.ts`](proxy.ts) which domain `localhost` maps to.

### Useful scripts

| Script                | Description                    |
| --------------------- | ------------------------------ |
| `yarn build`          | Production build               |
| `yarn start`          | Serve the production build     |
| `yarn lint`           | Run ESLint                     |
| `yarn prettier`       | Format the codebase            |
| `yarn stylelint`      | Lint & fix CSS Modules         |
| `yarn upgrade-latest` | Interactive dependency upgrade |

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

## :rocket: Deployment

Deployed on [Vercel](https://vercel.com/). Each domain is attached as a custom
domain to the same project; the host-based rewrite in [`proxy.ts`](proxy.ts) does
the routing.

## :triangular_ruler: Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## :coffee: Get in touch

Say hello on [Bluesky](https://bsky.app/profile/diegocoxta.com),
[Mastodon](https://mastodon.social/@diegocoxta) or
[email](mailto:diego@diegocosta.com.br).

## :scroll: License

Source code is [MIT](LICENSE.md). The publications under `public/**` are
&copy; Diego Costa, all rights reserved.
