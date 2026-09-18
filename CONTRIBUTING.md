# :triangular_ruler: Contribution Guide

Before starting, you may need to know how to contribute in a good way. You can follow the rules here:

## :clipboard: Requirements

- [Node.js 24](https://nodejs.org/en/) (see [`.nvmrc`](.nvmrc))
- [Yarn 1.x](https://classic.yarnpkg.com/) as the package manager

## :keyboard: Developing

1. [Clone this repo](https://help.github.com/en/articles/cloning-a-repository) with git.
2. Run `yarn install` inside the project directory.
3. Copy the env file: `cp .env.example .env`. Every key is optional — without a
   given token the matching activity widget just renders empty. `SITE_ACCENT_COLOR`
   and `SITE_TEXT_COLOR` control the theme colors.
4. Start the dev server:
   - `yarn dev` &rarr; serves all three domains at once. Open
     [`http://localhost:3000`](http://localhost:3000) and pick the domain via a
     path prefix, e.g. [`localhost:3000/diegocosta.me`](http://localhost:3000/diegocosta.me)
     or [`localhost:3000/diegocoxta.com`](http://localhost:3000/diegocoxta.com).
   - Or pin it to a single domain instead:
     - `yarn dev:diegocosta.com.br`
     - `yarn dev:diegocosta.me`
     - `yarn dev:diegocoxta.com`

     These set the `DEV_SITE` env var, which tells [`proxy.ts`](proxy.ts) to map
     plain `localhost` to that domain, so no path prefix is needed.

See [AGENTS.md](AGENTS.md) for how the codebase is organized.

### Useful scripts

| Script                | Description                    |
| --------------------- | ------------------------------ |
| `yarn build`          | Production build               |
| `yarn start`          | Serve the production build     |
| `yarn lint`           | Run ESLint                     |
| `yarn prettier`       | Format the codebase            |
| `yarn stylelint`      | Lint & fix CSS Modules         |
| `yarn upgrade-latest` | Interactive dependency upgrade |

## Issues

If you encounter an issue with the project, you are welcome to submit a [bug report](https://github.com/diegocoxta/sites/issues/new). Before that, please search for similar issues. It's possible somebody has already encountered this issue.

## Pull Requests

If you want to contribute to the repository, follow these steps:

- Fork the repo and develop.
- Check that your code follows the linter rules: `yarn prettier && yarn lint && yarn stylelint`
- Test your code changes manually and make sure the project builds (`yarn build`).
- Commit your changes.
- Push to your fork and submit a pull request.
