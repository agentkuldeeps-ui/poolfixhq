# HANDOFF

Read this and CLAUDE.md at the start of every session. Nothing else unless the
task needs it. Rewrite this file at the end of every session.

## Last commit
`(this one)` — REG-001 written. **All six scaffolds are now real articles.**

## Session type rules
Research: Firecrawl only → `content/research/*.json`, one page in context at a
time. Writing: repo only, no fetching — unknowns become `[VERIFY: …]`.
Three articles per writing session, then stop.

## State
- Scaffold replacements: **complete**.
- **B1: 8 of 63 written** — SYM-001, SYM-002, EQP-001, EQP-002, EQP-003,
  CHM-001, GDE-001, REG-001.
- Article pages now use a full-width shell with a sticky TOC rail in the left
  gutter (`ArticlePage.jsx`); the inline `<TableOfContents />` is mobile-only.
- Everything is `status: scaffold` — nothing goes live until a review batch.

## Word counts vs target (per-cluster policy now in CLAUDE.md)
- EQP-001 **1,933** / 1,900 — hit, after the procedure was added
- SYM-002 1,370 / 1,800 · CHM-001 1,185 / 1,600 · GDE-001 1,045 / 2,000 —
  **depth passes still owed**
- REG-001 **1,154** / 1,800 — under by design. One split (hardness inverts
  across the state), one honest gap (season length). Padding it would mean
  inventing the thing that isn't sourced.

## Open [VERIFY]
- `content/regional/texas.mdx` — swim-season length or water temperature
  normals by TX region, from a citable climate or extension source.

## Convergence watch
EQP-003 (not turning on) and EQP-021 (hums, won't start) both touch the start
capacitor. Kept distinct: EQP-003 owns the full power path from a **silent**
pump; EQP-021 should own the **humming** case and the mechanical seized-shaft
diagnosis. EQP-003 already routes the humming symptom away in its triage table.
Watch this when EQP-021 comes up — if it can't hold its own ground, cut it.

## tips.json
21 total, **2 verified**, 19 candidates, 0 assignable. Five assigned tips
unsourced: `dead-algae-turns-gray`, `total-only-strips-hide-zero-free`,
`open-below-60-degrees`, `carbonate-clouding`✓, `suction-side-never-drips`✓,
`texas-hardness-inverts`. Candidates are writable at `scaffold`; they gate
`live`. **Six articles are now finished but cannot publish** — this stack only
grows.

## Next action
**Dedicated research session, before B1 opens.** Tip sourcing has slipped four
sessions. Clear the assigned candidates first, then build toward 60 verified.
**Manufacturer service bulletins first** — that vein is the differentiator for
the 50 brand-code articles and the least picked-over source in the niche.

Then B1, three articles per writing session. For every equipment and brand-code
article, ask whether it explains how to do the job **correctly**, not only how
to diagnose it going wrong. That gap is likely sitting in most of the 94
equipment-cluster articles as a planned structure.
