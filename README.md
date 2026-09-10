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

## :books: Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — tech stack, project layout, content & i18n, 404s.
- [CONTRIBUTING.md](CONTRIBUTING.md) — requirements, local setup, useful scripts, how to contribute.
- [AGENTS.md](AGENTS.md) — condensed guidance kept in context for AI coding agents.

## :rocket: Deployment

Deployed on [Vercel](https://vercel.com/). Each domain is attached as a custom
domain to the same project; the host-based rewrite in [`proxy.ts`](proxy.ts) does
the routing.

## :coffee: Get in touch

Say hello on [Bluesky](https://bsky.app/profile/diegocoxta.com),
[Mastodon](https://mastodon.social/@diegocoxta) or
[email](mailto:diego@diegocosta.com.br).

## :scroll: License

This repository is dual-licensed:

- **Source code** — [MIT](LICENSE.md).
- **Site content** — everything under `public/` (all three domains) is licensed
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); see
  [LICENSE-CONTENT.md](LICENSE-CONTENT.md).
