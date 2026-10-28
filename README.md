# Qcore Solutions — landing page

Static site (no build step): plain HTML/CSS/JS implementing the
`Qcore Landing v2` design from Claude Design.

```
index.html
css/style.css
js/main.js
img/               ← logo + favicons, generated from the source artwork in the repo root
build.sh           ← assembles dist/ for the older Worker setup
build-pages.sh     ← assembles pages-dist/ from variants/b-refined/ (the live site)
_headers           ← security + cache headers
wrangler.jsonc     ← Cloudflare Workers config (no routes; the domain is on Pages)
design-source/     ← original .dc.html design bundle + chat transcripts (reference only)
```

## Deploy

The public site is `variants/b-refined/`, served by the Cloudflare Pages
project **qcore-solutions** (free plan) at https://qcore-solutions.pages.dev,
with `qcore-solutions.com` and `www.` attached as custom domains.

```sh
sh build-pages.sh
# then, from a folder with no wrangler.jsonc above it:
npx wrangler pages deploy <path-to>/pages-dist --project-name qcore-solutions --branch main
```

`build-pages.sh` assembles `pages-dist/`: it copies the variant plus the logo,
favicons, client logos and language script it links to outside its folder,
rewrites those links, and leaves working files (DESIGN.md, README, the image
prompt and the PNG master) out of the public upload.

**Run the Pages deploy outside this folder.** Wrangler walks up to
`wrangler.jsonc`, a Worker config, and acts on it instead: run here, it once
created a stray Worker that served the old `dist/` site.

The older Worker setup (`./build.sh && npx wrangler deploy`, publishing
`dist/`) no longer claims any domain; `wrangler.jsonc` declares no routes.

First-time setup on a new machine needs `npx wrangler login`.

## Notes on what's implemented

- **Theme** — light/dark tokens matching the design, defaults to the
  visitor's OS setting, toggle in the header persists via `localStorage`.
- **Module explorer** (`#modules`) — click-driven in `js/main.js`; the
  module list, blurb, chips and the mock ERPNext screen (nav, columns,
  rows) all come from the same `MODULES`/`SCREENS` data as the prototype.
  All screen data is structural placeholder content (ids, names, statuses)
  — no invented revenue or performance figures, matching the "no AI slop"
  direction from the design chat.
- **Contact form** (`#contact`) — no backend. Submitting builds a `mailto:`
  link (prefilled subject/body from the fields) and opens the visitor's email
  client. The destination address is deliberately not shown as visible text on
  the page, but note it is still present in the HTML/JS source and therefore
  harvestable — hiding it properly requires a real endpoint. Swap one in by
  replacing the `submit` handler in `js/main.js`; that would also fix the case
  where a visitor on webmail has no mail client configured and the button
  appears to do nothing.
- **"Selected work" images** — the prototype left these as empty
  drop-in slots. Real stock photos couldn't be fetched from the sandboxed
  build session (outbound access to unsplash.com was blocked there), so
  each card ships a small on-brand SVG illustration instead, with an
  "Add your project photo" tag. Swap each `<svg>…</svg>` in `index.html`
  for an `<img>` whenever you have real project photos or screenshots.
- **Fonts** — Archivo + IBM Plex Mono via Google Fonts (`<link>` tags in
  `<head>`), matching the typeface direction chosen in the design chat.

`design-source/` carries the original Claude Design handoff (the
`.dc.html` prototype, its chat transcripts, and its own README) for
reference — it isn't used by the deployed site.
