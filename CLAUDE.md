# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a single-file React report (`JEP-informe-2meses.jsx`) — an interactive 2-month progress report created by Syncra for client JEP Mobiliari, covering Feb–Apr 2026. It is a self-contained component designed to be rendered as a Claude artifact or dropped into a React app with no external dependencies beyond React itself.

## Architecture

The file exports a single default component `JEPReport` and defines all sub-components and utilities inline:

- **`useOnScreen(ref, threshold)`** — IntersectionObserver hook that fires once when an element enters the viewport.
- **`Reveal`** — Wrapper that fades/slides children in on scroll using `useOnScreen`. Supports `direction` (`up`, `left`, `right`, `scale`) and `delay`.
- **`AnimNum`** — Animated counter that counts up to a `target` value when it enters the viewport.
- **`Accordion`** — Collapsible section with a colored left-border indicator.
- **`JEPReport`** — Root component. Tracks scroll position on its own container `ref` to drive a sticky header blur/opacity effect.

## Design system

All colors and typography are defined as module-level constants at the top of the file (lines 58–72). The palette uses: orange (`OR`/`OR2`), cyan (`CY`), green (`GR`), red/crimson (`CR`), yellow (`YL`), and a dark zinc background stack (`BG`/`BG2`/`BG3`). Fonts are `Sora` (SANS) and `JetBrains Mono` (MONO), loaded via a Google Fonts `@import` inside the component's `<style>` tag.

All styles are inline — there is no CSS file or Tailwind. To change the visual design, edit the constants or the inline `style` props directly.

## Content structure

The report is divided into 5 numbered sections plus a summary, each wrapped in `<section>` tags separated by `.divider` elements:

1. **01 — Nueva Plataforma Digital** — Web migration from WordPress to Next.js + headless. Includes a before/after mockup and a change table inside an `Accordion`.
2. **02 — Contenido RAW** — 100+ GB audiovisual asset bank.
3. **03 — Sphere Funnel** — 4-pillar simultaneous ad strategy; pillar data in `spherePillars` array.
4. **04 — Estrategia Sector Educativo** — B2B education segment strategy.
5. **05 — Ecosistema Meta** — Meta Business Manager restructuring; checklist items in `bm` array.

Summary sections: **Antes vs Ahora**, **En números** (animated counters from `summaryNums`), **Próximos pasos**, and a footer.

## Editing content

All report data is declared as arrays/objects near the top of `JEPReport` (lines 85–122):
- `spherePillars` — Sphere Funnel pillars (title, concept, goal, color)
- `webChange` — Before/after table rows for the web platform section
- `rawContent` — Content type cards for the RAW section
- `bm` — Business Manager checklist items
- `summaryNums` — Animated metric cards in the summary grid
