# mykeebs.com

The static home of [mykeebs](https://mykeebs.info), the mechanical keyboard collection tracker:
everything that isn't the app itself. The app is [mykeebs-web](https://github.com/roguekeyboards/mykeebs-web)
and the API and MCP server behind it is [mykeebs-api](https://github.com/roguekeyboards/mykeebs-api).

Built with SvelteKit, every route prerendered to static HTML, and served by Cloudflare Workers
static assets.

## Prerequisites

- [mise](https://mise.jdx.dev/), which installs the pinned Node version from `mise.toml`
- [gh CLI](https://cli.github.com/), authenticated, with the `read:packages` scope (needed to
  install `@roguekeyboards/mykeebs-brand` from GitHub Packages):

  ```sh
  gh auth refresh -h github.com -s read:packages
  mise set GITHUB_PACKAGES_TOKEN=$(gh auth token) --file mise.local.toml
  ```

## Setup

```sh
mise install
eval "$(mise env)"
npm install
```

## Developing

```sh
npm run dev
# or: npm run dev -- --open
```

## Building and deploying

```sh
npm run build
```

Produces the static site in `/build` (adapter-static). Preview it with `npm run preview`. There's
one build for both environments: the site describes prod mykeebs (mykeebs.info,
`api.mykeebs.info`) wherever it's served.

Every merge to `main` deploys to https://beta.mykeebs.com: Cloudflare Workers Builds runs the build
and `wrangler deploy`, serving `build/` as the static-assets Worker `mykeebs-com-dev`
(`wrangler.jsonc`). Beta sends `X-Robots-Tag: noindex`. `mise run deploy-dev` deploys the current
branch there by hand, until the next merge replaces it.

Prod at https://mykeebs.com deploys on a release. release-please keeps a release PR open; merging
it publishes a GitHub Release, and the `Deploy prod` workflow builds that tag and deploys the
`mykeebs-com-prod` Worker. Run `Deploy prod` by hand with an older tag to roll back.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the day-to-day workflow (branches and PRs, lint,
typecheck, tests).
