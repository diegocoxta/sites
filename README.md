# :man_technologist: @diegocoxta/sites

My personal webpages powered by Next.js, TypeScript and CSS Modules.

- https://diegocosta.com.br
- https://diegocosta.me
- https://diegocoxta.com

A single Next.js app serves all three domains. [`proxy.ts`](proxy.ts) inspects the
request host and rewrites `/{pathname}` to `/{domain}/{pathname}`, so each domain
resolves to its own route tree under [`app/`](app). Per-domain settings (title,
links, locales, theme) live in `app/<domain>/config.ts`.

## :desktop_computer: Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) with TypeScript.
- Content in Markdown via [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) + [`gray-matter`](https://github.com/jonschlinkert/gray-matter), read through [`lib/content.ts`](lib/content.ts).
- Internationalization with a small custom setup in [`lib/i18n/`](lib/i18n) — edge-safe locale negotiation (used by [`proxy.ts`](proxy.ts)) plus a `server-only` dictionary loader; JSON translations live under `public/<domain>/translations/`.
- Command bar with [`kbar`](https://kbar.vercel.app/) (`⌘K` / `Ctrl+K`).
- Dark mode with [`next-themes`](https://github.com/pacocoursey/next-themes).
- RSS feed generation with [`rss`](https://github.com/dylang/node-rss).
- "Recent activity" widgets that pull from Discogs, Letterboxd, Unsplash, Hardcover, GitHub, Last.fm, Setlist.fm and Deezer ([`lib/services/`](lib/services)).
- ESLint, Prettier, stylelint, Husky and lint-staged — and [more](package.json).

## :file_folder: Project Structure

```
app/
  <domain>/           route tree for one domain (e.g. diegocosta.com.br)
    config.ts         per-domain config (title, links, locales, theme)
    [locale]/         localized routes (multi-locale domains only)
  config.ts           shared config defaults (theme)
components/            React components (one folder each, co-located CSS Modules)
lib/
  config.ts           shared types for the per-domain config
  content.ts          Markdown reading, front-matter, locale fallback (contentFor)
  public-path.ts      helper for building public/<domain>/… paths
  i18n/
    locale.ts         locale list + Accept-Language / cookie negotiation (edge-safe)
    translator.ts     createTranslator: lookup, {param} interpolation, dates
    messages.ts       loads public/<domain>/translations/<locale>.json (server-only)
  services/            third-party integrations for the activity widgets
proxy.ts              host-based rewrite + locale negotiation (Next middleware)
public/<domain>/       Markdown content (posts/, pages/), translations/ and assets
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

Content is plain Markdown under `public/<domain>/`, split into `posts/` and
`pages/` (one folder per slug). Localized files use an `index.<locale>.md` suffix
(e.g. `index.en.md`) and fall back to the default locale, then to `index.md`.
Relative image references (`![](./img.png)`) are rewritten to servable paths at
read time.

UI strings are flat-key JSON dictionaries at
`public/<domain>/translations/<locale>.json`. A requested locale is merged over
the default-locale dictionary, so partial translations are fine. Keys prefixed
`client.` / `config.` / `components.` / `page.` go through the translator;
anything else is treated as a literal (brand and proper names). Keys prefixed
`client.` are the subset shipped to Client Components, via `getClientMessages`
in [`lib/i18n/messages.ts`](lib/i18n/messages.ts).

`diegocoxta.com` ships in `pt`, `en` and `es`; the other domains are
single-locale (and skip the `/<locale>` path prefix entirely).

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
