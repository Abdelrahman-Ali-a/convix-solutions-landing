# Removing AI slop, dark mode

_Started 2026-09-08 14:57 UTC_

---

## User

Continuing from "Convix Solutions landing page".

## Assistant

We've been building a complete landing page for Convix Solutions — a software implementation partner (ERPNext, custom web apps, integrations, APIs). You wanted a modern SaaS look using Archivo + IBM Plex Mono type, positioned as a full software partner with process/method as proof.

We went through three major iterations. Round 1 explored three directions (hero variants and an interactive module explorer); round 2 tested four typeface pairs; you chose Archivo + Plex Mono (2b), and we applied it across the page with refined sizing. Round 3 built the complete page (3a) with all sections: announcement bar, hero with rendered ERPNext dashboard screenshot, method strip (four steps), capability cards, clickable module explorer with live HTML mockups (accounting, P&L, stock, kanban, payroll, custom app, mobile), work samples, rollout timeline, engagement models, FAQ, contact form, and footer.

The module explorer screens are all rendered as plausible fake data within the page (not external images) so you can drop in your own real ERPNext screenshots later without breaking anything offline. Last fix was viewport/sizing — bumped hero to 470px, panels to 360px, added min-height tracks, and locked KPI values to single lines.

Current state: full page complete and responsive, ready for content swaps (your logo, real client screenshots, actual testimonials if you add them back).

Next: drop in your real ERPNext screenshots or client work into the existing frames, tweak copy or section order if needed.

Files: Convix Landing.dc.html, support.js, _mock_hero.txt

## User

ok i want to remove any AI slop in this and make sure it has dark mode and it is mobile friendly

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Rebuilt as **Convix Landing v2.dc.html** (v1 kept untouched).

What changed:
- **Slop removed** — the announcement bar, the fabricated ERPNext dashboards (invented ₹-crore KPIs, fake invoice tables, fake deltas), and the invented case-study metrics ("−38% WIP", "12 weeks to go-live") are gone. Work cards and the hero now carry drop-in image slots for your real screenshots; the module screen is an honest labelled placeholder. Copy tightened, eyebrow labels cut back, FAQ trimmed to four real questions.
- **Dark mode** — full token-based theme with a toggle in the header; defaults to the visitor's system setting (tweakable to always Light/Dark).
- **Mobile** — no more fixed 1240px canvas: fluid column, `clamp()` type and padding, auto-fitting card grids, nav collapses, hero and contact stack, the module list becomes a horizontal scroller, all tap targets ≥44px.

Tweaks panel: theme default, accent colour, show/hide engagement models.

## User

Found issues — fixing…

## User

Found issues — fixing…

## User

add the screenshots

## Assistant

_[tool: list_files]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Rendered ERPNext screens now fill the hero frame and the module explorer — a real list view per module (sidebar with the active module highlighted, doctype title, filter pills, table rows), themed so they repaint in dark mode.

Kept them structural rather than statistical: document ids, names, dates, statuses — no invented revenue or performance figures. The three work cards still hold drop-in slots, since those want your actual project photos.

