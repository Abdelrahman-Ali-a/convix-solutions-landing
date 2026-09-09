# Convix Solutions — landing page

Static site (no build step): plain HTML/CSS/JS implementing the
`Convix Landing v2` design from Claude Design.

```
index.html
css/style.css
js/main.js
design-source/     ← original .dc.html design bundle + chat transcripts (reference only)
```

## Deploy to Cloudflare Pages (free plan)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick this repo.
2. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (repo root)
3. Deploy. Cloudflare gives you a `*.pages.dev` URL immediately.
4. To use your connected domain: Pages project → **Custom domains** →
   **Set up a custom domain** → enter the domain/subdomain. Since it's
   already on Cloudflare, the DNS record is added for you — no manual
   CNAME needed.

Every push to the connected branch redeploys automatically.

## Notes on what's implemented

- **Theme** — light/dark tokens matching the design, defaults to the
  visitor's OS setting, toggle in the header persists via `localStorage`.
- **Module explorer** (`#modules`) — click-driven in `js/main.js`; the
  module list, blurb, chips and the mock ERPNext screen (nav, columns,
  rows) all come from the same `MODULES`/`SCREENS` data as the prototype.
  All screen data is structural placeholder content (ids, names, statuses)
  — no invented revenue or performance figures, matching the "no AI slop"
  direction from the design chat.
- **Contact form** (`#contact`) — no backend. Submitting builds a
  `mailto:hello@convixsolutions.com` link (prefilled subject/body from the
  fields) and opens the visitor's email client. Swap in a real endpoint
  later by replacing the `submit` handler in `js/main.js`.
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
