---
name: Qcore Line Map — refined edition
description: Edition-scoped extraction from the implemented variant B refinement.
colors:
  ground: "#f2f4f6"
  paper: "#ffffff"
  ink: "#0e1622"
  ink-2: "#3d4756"
  hair: "rgba(14,22,34,.14)"
  trunk: "#087afe"
  trunk-deep: "#0062d6"
  trunk-text: "#005bc7"
  red: "#d8352a"
  green: "#14935a"
  green-deep: "#0e7a49"
  amber: "#f0a800"
  enamel-2: "#18243a"
  on-enamel-2: "#b9c6d8"
typography:
  display:
    fontFamily: "Overpass, Alexandria, system-ui, sans-serif"
    fontSize: "60px"
    fontWeight: 800
    lineHeight: 1.04
  display-ar:
    fontFamily: "Alexandria, Overpass, system-ui, sans-serif"
    fontSize: "50px"
    fontWeight: 800
    lineHeight: 1.22
  headline:
    fontFamily: "Overpass, Alexandria, system-ui, sans-serif"
    fontSize: "clamp(32px,3.5vw,48px)"
    fontWeight: 800
    lineHeight: 1.1
  body:
    fontFamily: "Overpass, Alexandria, system-ui, sans-serif"
    fontSize: "17px"
    lineHeight: 1.55
  button:
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1
rounded:
  sign: "5px"
  contact: "8px"
  panel: "12px"
  pill: "999px"
components:
  button-board:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-whatsapp:
    backgroundColor: "{colors.trunk-deep}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
---

# Design System: Qcore Line Map — refined edition

## Overview

**Creative North Star: "Line Map"**

This document describes the effective styling of `b-refined` only. It preserves variant B's transit diagram identity: delivery phases are stations and services are connected routes. It does not replace the wider brand kit or change root product context.

**Key Characteristics:**

- Cool map ground and dark enamel signs.
- Service-owned route colors and circular interchange marks.
- Equal English and Arabic editions, displayed one language at a time.
- Lighter panels, calmer weight and more space within the incumbent composition.

## Colors

The frontmatter records the source CSS values. Trunk blue identifies ERPNext delivery; red identifies custom web apps, green integrations, and amber mobile apps. Navy owns text, station outlines and enamel panels. Paper white and the cool ground separate diagram, content and signs. Deeper blue/green variants support white text; amber labels use navy text.

**The Service Ink Rule.** Preserve the existing service-to-color assignments.

## Typography

Overpass leads English; Alexandria leads Arabic. Both are locally served with OFL licenses. The frontmatter's display sizes describe the unscaled desktop stage; its visual size follows the stage scale. Mobile display type uses `clamp(32px,8.8vw,46px)`. Standard body type becomes 16px at ≤720px. Arabic retains its own line-height and tracking overrides rather than inheriting Latin tracking.

**The One Voice Rule.** Show the selected language alone, with Arabic RTL and Latin product names preserved.

## Layout

The content shell is 1240px with `clamp(22px,4vw,52px)` gutters. Section spacing uses `clamp(76px,8.3vw,120px)`. Services pair introduction and concept image; the FAQ pairs its heading with disclosures. Both become single-column at ≤720px.

At ≥1100px, the map's 1440 × 820 stage scales uniformly to the smaller of available-width/1440 and `(innerHeight - headerHeight - 12)/820`. JavaScript measures the header and recalculates after resize, language change, font readiness and header resize. At ≤1099px, `display: contents` releases the stage into the vertical mobile route. At ≤720px, branch labels enter normal flow and wrap.

**The Whole Route Rule.** Fit the complete desktop artwork to available viewport space; keep signs, stations and branches together.

## Elevation & Depth

The refined board retains a soft ambient shadow. Most station signs and secondary enamel panels remove the incumbent inset framing and heavier shadows. The maquette's photographed contact shadows belong to the image, not a new interface elevation system. Reduced motion disables transitions and keeps route content visible.

## Shapes

Small sign corners, modest panel corners and pill actions retain the wayfinding language. Circular stations and solid/dotted tracks carry meaning; the refinement does not flatten these into generic cards.

## Components

- Primary and WhatsApp actions remain pill-shaped; keyboard focus uses the blue outline.
- Station signs retain navy enamel and white text; mobile branch tags wrap beneath their labels.
- FAQ items remain native disclosure controls in the split layout.
- Service imagery is an architectural concept with an explicit caption. Its warmer material palette stays inside the image. Prompt provenance is recorded in `assets/IMAGEGEN-PROMPT.md` and the WebP; the PNG is the generation master.
- Header trip navigation and route markers track reading progress and respond to the language change event.

## Do's and Don'ts

- Do preserve service inks, station geometry and equal EN/AR support.
- Do validate the entire route at short desktop heights as well as narrow widths.
- Do keep generated imagery captioned as conceptual.
- Don't treat this edition's layout refinements as a replacement for the global brand system.
- Don't turn concept imagery into client or product evidence.
