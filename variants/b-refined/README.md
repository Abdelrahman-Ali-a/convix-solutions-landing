# Variant B — refined copy

Open `index.html` through a local static server. This is a narrow refinement of the incumbent Line Map landing page. Original `../b/` remains untouched. Product truth remains the repository's `PRODUCT.md`; [DESIGN.md](DESIGN.md) records only this edition's effective styling.

The cool map-white/navy palette, blue ERPNext trunk, red/green/amber service routes, Overpass/Alexandria pairing, route markers and EN/AR switch remain. Each language appears alone; Arabic uses RTL. WhatsApp, email actions, project history and FAQ are retained.

Refinements: lighter type weights and enamel panels, more deliberate spacing, a split FAQ, wrapping mobile branch tags, and a generated connected-operations architectural maquette beside services. Its caption identifies it as a concept, not client evidence. Fonts are served locally from `assets/fonts/`, with Alexandria and Overpass OFL licenses alongside them.

Desktop uses a fixed 1440 × 820 map stage. JavaScript uniformly scales the whole stage by `min(available width / 1440, (innerHeight - headerHeight - 12) / 820)`, then sizes its container. Resize, language change, font readiness and header resize recalculate the fit. At widths ≤1099px the stage uses `display: contents` and the map becomes a vertical route.

The roughly 56 KB WebP carries prompt provenance; the PNG is the generation master. [assets/IMAGEGEN-PROMPT.md](assets/IMAGEGEN-PROMPT.md) records the exact built-in Imagegen prompt and generation context.

Local verification evidence is under `../../.impeccable/review/b-refined/`: `verification.json` records 14 width/language checks from 320–1600px, no horizontal overflow, broken images or page errors, working interactions and an unchanged original; `fit-verification.json` records eight desktop width/height EN/AR cases with no clipped map content. The independent local reviewer reviewed 11 refreshed captures and eight fit captures and returned **ship**, with no material findings. These are local artifact checks, not a deployment claim.
