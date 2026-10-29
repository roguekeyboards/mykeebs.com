# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [`README.md`](README.md) for what the site is and how it deploys, and
[`CONTRIBUTING.md`](CONTRIBUTING.md) for commands, workflow and conventions. GitHub issues in this
repo are the source of what's scoped; check them before assuming something is undecided.

## Commands

```sh
npm run dev       # start dev server
npm run build     # prerender the whole site to /build
npm run check     # svelte-kit sync + svelte-check (typecheck)
npm run lint      # prettier --check . && eslint .
npm run format    # prettier --write .
npm run test      # vitest run (client and server projects)
```

Run `eval "$(mise env)"` before `npm install` if `GITHUB_PACKAGES_TOKEN` isn't already in your
shell; `@rogueserenity/mykeebs-brand` comes from GitHub Packages.

## Workflow

`main` is protected by a ruleset: no direct pushes, signed commits. Every change goes on a branch
(`<type>/<topic>`) and through a PR with a Conventional Commits title, which the `PR Title` check
enforces. `Lint`, `Typecheck`, `Test` and `Build` (`.github/workflows/ci.yml`) must pass, plus
CodeQL. Merges are squash-only; put `Closes #N` in the PR body.

**Deploys** are graduated, and both deploy the same build.

- **Dev:** every merge to `main` deploys. Cloudflare Workers Builds (configured in the Cloudflare
  dashboard, not this repo) runs `npm run build` and `npx wrangler deploy`, publishing `build/` as
  the Worker `mykeebs-com-dev` at https://beta.mykeebs.com. Its only build setting is the
  `GITHUB_PACKAGES_TOKEN` secret.
- **Prod:** merging release-please's release PR publishes a GitHub Release, which runs
  `.github/workflows/deploy-prod.yml`: `npm run build` at that tag, then `wrangler versions upload`
  and `wrangler versions deploy` to `mykeebs-com-prod` on https://mykeebs.com, using the
  `CLOUDFLARE_API_TOKEN` secret (Workers Editor on that Worker only). Those commands leave the
  custom domain alone, so a change to `env.production`'s routes in `wrangler.jsonc` is deployed by
  hand with `npx wrangler deploy --env production`.

## Architecture

**A fully static site.** `adapter-static`, with `prerender = true` in the root `+layout.ts`, so
every route is HTML at build time and there's no server runtime. `fallback: '404.html'` is only the
not-found page, which `wrangler.jsonc`'s `not_found_handling: "404-page"` serves with a 404.

**It always describes prod mykeebs.** Beta and prod serve the same build, and links to the app or
API come from `src/lib/links.ts`, never env vars. The only difference between environments is the
`https://beta.mykeebs.com/*` rule in `static/_headers`, which adds `X-Robots-Tag: noindex` there.
The dev deployments of kbdb and mykeebs-web link to prod mykeebs.com, not beta.

**These pages used to live in kbdb and mykeebs-web.** The privacy policy, terms, MCP guide and AI
statement were Go templates in kbdb, and the contact page was in mykeebs-web. They cover the app,
the REST API and MCP alike, so when kbdb's processors, retention or MCP tools change, the pages
here change with them. The privacy policy names the processors and retention periods in kbdb's
`template.yaml`; it and the terms carry a visible "Last updated" date, which changes with their
wording. The MCP guide (`/help/mcp`) describes what kbdb's MCP tools can do, and always gives
prod's server address (`MCP_URL`). Long-form pages like these use the `.doc` styles in
`layout.css`; code with a copy button goes through `src/lib/components/CodeBlock.svelte`.

**Styling**: Tailwind v4 (via `@tailwindcss/vite`, no `tailwind.config.js`), with global styles in
`src/routes/layout.css`. Colour and font tokens (`--bg`, `--accent`, `--font-body`, …), the logo
and the favicons come from `@rogueserenity/mykeebs-brand`; change them in kbdb's `brand/`, not
here. Fonts are never loaded from Google Fonts, since the privacy policy doesn't list Google as a
processor.

**Fonts**: JetBrains Mono (400–700) and Inter (400–600), latin subset, are committed woff2 files in
`static/fonts/v1/`, served at `/fonts/v1/<family>-<subset>-<weight>.woff2` with their OFL licences.
kbdb's sign-in page (`/authorize`) loads them cross-origin from those exact URLs, which is why they
aren't content-hashed, and `_headers` gives `/fonts/*` CORS and a year-long immutable
`Cache-Control`. The site's own `@font-face` rules in `layout.css` use the same files. **A file
under `v1` never changes**: `src/lib/fonts.spec.ts` pins each one's SHA-256. New or updated fonts go
in a new `/fonts/v2/` (taken from the `@fontsource/<family>` npm package's `files/`, renamed to this
scheme), the site moves to it, and kbdb's consent page is updated to match. Keep `v1` until kbdb no
longer loads it.

**Security headers**: the CSP is in `vite.config.ts` (SvelteKit's `csp` option, `mode: 'hash'`),
emitted as a `<meta>` tag. `frame-ancestors`, HSTS, `nosniff` and the rest are in `static/_headers`.
The site loads nothing from other origins; adding an external host means adding it to the CSP.

**Icons**: [Lucide](https://lucide.dev), imported by name from `@lucide/svelte` and sized with a
`class` prop. Don't paste raw `<svg>` path data inline.

**Testing**: two vitest projects in `vite.config.ts`: `client` (browser mode, Playwright+Chromium)
for `*.svelte.{test,spec}.ts`, and `server` (Node) for every other `*.{test,spec}.ts`. Every change
ships with tests for its new behaviour, in the same commit.
