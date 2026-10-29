# links

Personal link-in-bio page. Astro 6 + Cloudflare Workers at [nant.nlbs.workers.dev](https://nant.nlbs.workers.dev).

Builds static locally. With `CF_PAGES=1`, it builds SSR on Cloudflare for live Last.fm widget.

## Commands

| Command                                           | What it does                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `pnpm dev`                                        | starts dev server on localhost:4321                                           |
| `pnpm build`                                      | static to `dist/`; `CF_PAGES=1` also SSR + `dist/server/wrangler.json`        |
| `pnpm preview`                                    | preview build                                                                 |
| `pnpm deploy`                                     | turns off observability, `wrangler deploy --config dist/server/wrangler.json` |
| `pnpm format` / `format:check` / `format:changed` | prettier (no semicolon, single quote, `prettier-plugin-astro`)                |
| `pnpm lint:css` / `lint:css:fix`                  | stylelint on `src/**/*.css`                                                   |

Package manager is pnpm v12 (`packageManager: pnpm@12.8.1`, Node >= 22.12). `pnpm format` changes files. There is no test or typecheck script. `tsconfig.json` extends `astro/tsconfigs/strict`. Run checks in this order: `pnpm format` -> `pnpm lint:css` -> `pnpm build`. Pre-commit (husky + lint-staged) formats staged files and fixes CSS.

## Deploy

```
CF_PAGES=1 SITE_URL=https://nant.nlbs.workers.dev pnpm build
pnpm deploy
```

`astro.config.ts` only loads `@astrojs/cloudflare` when `CF_PAGES` is `'1'`. Then `output` is `'server'` and `site` comes from `SITE_URL`. Local dev and local build do not use the adapter.

`404.astro` sets `export const prerender = true`, so it builds to `404.html` with `noindex`.

The adapter create `dist/server/wrangler.json` on each build. No wrangler file lives in the repo. The deploy script turns off Workers observability before shipping.

## Last.fm widget

`NowPlaying.astro` shows nothing when env or API is missing.

- Local: `LASTFM_API_KEY` + `LASTFM_USERNAME` in `.env` (template `.env.example`)
- Cloudflare: `wrangler secret put` both; `wrangler dev` reads `.dev.vars`
- `src/lib/lastfm.ts` reads via `getSecret` from `astro:env/server`. Bare `process.env` is empty inside worker. do not switch to it.

## Structure

```
src/
├── data/
│   └── config.ts      - SEO, profile, socials, buttons, IconId (SSoT)
├── layouts/
│   └── Layout.astro   - @nlbs/css before global.css, data-theme="dark"
├── pages/
│   ├── index.astro
│   └── 404.astro
├── components/
│   ├── Profile.astro
│   ├── Socials.astro
│   ├── Link.astro
│   └── NowPlaying.astro
├── lib/
│   └── lastfm.ts      - Last.fm fetch, 60s cache, stale fallback
├── styles/
│   └── global.css     - all styling (CSS custom props from @nlbs/css)
public/
└── sprite.svg       - icon sprite; socials[].icon / buttons[].icon is an IconId
```

To add an icon, 3 places must match: `<symbol id>` in `sprite.svg`, `IconId` in `config.ts`, and a ref in `socials[]` or `buttons[]`.

## Conventions

- Colors: `@nlbs/css` dark theme `--color-*` oklch only.
- Fonts: Astro 6 Fonts API (Onest + Geist Mono via Fontsource, `<Font />` in Layout).
- SEO meta comes from `siteConfig` to Layout props. Edit `config.ts`.
- `set:html` is gone. Do not put raw SVG string in `config.ts`
- LICENSE keeps two copyright lines (ZeX 2024, aadnanmt 2026).

## Icons

From Iconify: simple-icons (CC0), Phosphor (MIT), Material Symbols (Apache 2.0). Nanoo brand mark from [nanoolabs/changelog](https://github.com/nanoolabs/changelog).

## Acknowledgments

- Original static design by [ZeX (links-portfolio)](https://github.com/ddosnotification/links-portfolio), MIT LICENSE
- UI/UX patterns from [AstroLinkHub](https://github.com/MarcosKlender/AstroLinkHub), MIT
- Now playing widget ported from [root.nanoolabs.dev](https://root.nanoolabs.dev)

LICENSE carries two copyright lines (ZeX 2024, aadnanmt 2026)
