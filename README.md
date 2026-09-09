# Corvix Solutions — landing page

Static site (no build step): plain HTML/CSS/JS implementing the
`Corvix Landing v2` design from Claude Design.

```
index.html
css/style.css
js/main.js
img/               ← logo + favicons, generated from the source artwork in the repo root
build.sh           ← assembles dist/ (the only thing that gets published)
_headers           ← security + cache headers
wrangler.jsonc     ← Cloudflare Workers config
design-source/     ← original .dc.html design bundle + chat transcripts (reference only)
```

## Deploy

Live at **https://corvix-solutions.com** (and `www.`), served by a Cloudflare
Worker with static assets on the free plan.

```sh
./build.sh && npx wrangler deploy
```

`build.sh` copies an explicit list of paths into `dist/`, and `wrangler.jsonc`
publishes only that directory. This is deliberate: pointing the deploy at the
repo root would publish `design-source/` (the design bundle and chat
transcripts) and this README at public URLs. **If you add a new top-level
folder to the site, add it to the `cp` line in `build.sh` or it won't ship.**

`workers_dev` and `preview_urls` are both `false`, so the site answers only on
the custom domain — there are no `*.workers.dev` addresses serving it.

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
