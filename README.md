# links

Personal link-in-bio, Astro, on Cloudflare Workers (`https://nant.nlbs.workers.dev`). Static locally; `CF_PAGES=1` flips production to SSR for the live Last.fm widget.

## Commands

Package manager is **pnpm** (v12).

| Command               | Action                                                                |
| :-------------------- | :-------------------------------------------------------------------- |
| `pnpm dev`            | Dev server at `localhost:4321`                                        |
| `pnpm build`          | Production build to `./dist/`                                         |
| `pnpm preview`        | Preview the build                                                     |
| `pnpm deploy`         | Disable observability on the generated config, then `wrangler deploy` |
| `pnpm format`         | Format the codebase                                                   |
| `pnpm format:check`   | Check formatting (cached)                                             |
| `pnpm format:changed` | Format files changed compared to `HEAD`                               |

## Last.fm

`NowPlaying` render to nothing when env or API is missing.

- Local: `LASTFM_API_KEY` + `LASTFM_USERNAME` in `.env` (template in `.env.example`). Cloudflare: `wrangler secret put` both keys, `wrangler dev` reads `.dev.vars`
- `astro.config.ts` imports `@astrojs/cloudflare` and switches `output` to `server` only when `CF_PAGES=1`

## Deploy

`CF_PAGES=1 SITE_URL=https://nant.nlbs.workers.dev pnpm build`, then `pnpm deploy`. Adapter generates `dist/server/wrangler.json` per build (no wrangler file live in repo); deploy script disables Workers observability there before shipping. Worker name comes from `package.json` name. `index.astro` renders on demand in production; `404.astro` is prerender and noindex.

## Structure

`src/data/config.ts` is the SSoT for all site content. Pages: `index.astro` (on-demand in prod), `404.astro`. Components: `Profile`, `Socials`, `Link`, `NowPlaying`. Last.fm fetch live in `src/lib/lastfm.ts` (60s module cache, stale fallback). All styling in `src/styles/global.css`. Icons: `public/sprite.svg`, reference by `links[].icon` in `config.ts`.

## Icons

Fetched from [Iconify](https://iconify.design): simple-icons (CC0), Phosphor (MIT), Material Symbols (Apache 2.0).`Nanoo` brand mark come from [nanoolabs/changelog](https://github.com/nanoolabs/changelog).

## Acknowledgments

- Original static design by [ZeX](https://github.com/ddosnotification/links-portfolio), MIT `LICENSE`
- UI/UX patterns from [AstroLinkHub](https://github.com/MarcosKlender/AstroLinkHub) (MIT)
- Now playing widget ported from [root.nanoolabs.dev](https://github.com/aadnanmt/root.nanoolabs.dev)
