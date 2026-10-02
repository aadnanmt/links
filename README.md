# links

Personal link-in-bio, built with Astro (static, no SSR; no integration for now, might add some later)

## Commands

Package manager is **pnpm** (v11)

| Command                        | Action                                      |
| :----------------------------- | :------------------------------------------ |
| `pnpm dev`                     | Starts local dev server at `localhost:4321` |
| `pnpm build`                   | Build the production site to `./dist/`      |
| `pnpm preview`                 | Preview the build locally                   |
| `pnpm exec prettier --write .` | Format the codebase                         |

## Structure

- `src/data/config.ts`: SSoT for all site content
- `src/pages/index.astro`: the only page
- `src/components/`: `Profile`, `Socials`, `Link`
- `src/styles/global.css`: all styling (nlbs tokens, fibonacci spacing, AstroLinkHub layout metric)
- `public/sprite.svg`: icon sprite, `links[].icon` references symbol id here

## Icons

All icons in `public/sprite.svg` are fetch from [Iconify](https://iconify.design) (`api.iconify.design`), serve from open-source icon sets:

| Icon                                               | Set                                                                                                       | License            |
| :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :----------------- |
| codeberg, discord, github, kofi, spotify, telegram | [simple-icons](https://simpleicons.org)                                                                   | CC0 1.0            |
| garden                                             | [Phosphor Icons](https://phosphoricons.com) (`ph:plant`)                                                  | MIT                |
| mail                                               | [Material Symbols](https://fonts.google.com/icons) (`material-symbols:mail`)                              | Apache License 2.0 |
| nanoo                                              | Nanoo Labs brand mark from [nanoolabs/changelog](https://github.com/nanoolabs/changelog) (not on Iconify) | Nanoo Labs         |

## Acknowledgments

Thanks for:

- Original static HTML/CSS design by [ZeX](https://github.com/ddosnotification/links-portfolio), used under the MIT `LICENSE`
- UI/UX patterns inspired by [AstroLinkHub](https://github.com/MarcosKlender/AstroLinkHub) (MIT)
