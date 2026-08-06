# HANDOFF

Read this and CLAUDE.md at the start of every session. Nothing else unless the
task needs it. Rewrite this file at the end of every session.

## Last commit
`228da9c` — SYM-004 black algae / black spots identification pillar.

## Session type rules
Research: Firecrawl only → `content/research/*.json`, one page in context at a
time. Writing: repo only, no fetching — unknowns become `[VERIFY: …]`.
Three articles per writing session, then stop.

## State
- **B1: 10 of 63 written** — SYM-001, SYM-002, SYM-003, SYM-004, EQP-001,
  EQP-002, EQP-003, CHM-001, GDE-001, REG-001.
- Everything is `status: scaffold` — nothing goes live until a review batch.
- Link checker: 27 pages, 448 internal link instances, 0 broken.

## Word counts vs target (per-cluster policy in CLAUDE.md)
- SYM-003 **2,774** / 2,400 — pillar exception, over target and not padded.
  Carries the calcium-saturation explanation for the whole site; later
  articles link here rather than re-explain it.
- SYM-004 2,103 / 2,200 — pillar exception, 97 short. Everything in the brief
  is covered; not padded to close the gap. No depth pass owed.
- EQP-001 **1,933** / 1,900 — hit
- SYM-002 1,370 / 1,800 · CHM-001 1,185 / 1,600 · **GDE-001 1,045 / 2,000** —
  depth passes still owed, GDE-001 is the priority
- REG-001 1,154 / 1,800 — under by design, one honest gap

## Open [VERIFY]
- `content/regional/texas.mdx` — swim-season length or water temperature
  normals by TX region, from a citable climate or extension source.
- `content/problems/black-algae-in-pool.mdx` — whether CDC or a comparable
  authority says anything specific about cyanobacteria in **chlorinated
  residential pools**. Most cyanotoxin evidence is lake and pond blooms. The
  section deliberately does not import that warning; it says sanitation has
  failed and stops there. Do not assert a health risk we cannot source.

## Convergence watch
- EQP-003 (silent, won't start) vs **EQP-021** (hums, won't start) — both touch
  the start capacitor. EQP-003 owns the full power path from a silent pump and
  already routes humming away in its triage table. EQP-021 must own the humming
  diagnosis and the capacitor discharge procedure in depth, or be cut.
- **SYM-003 vs SYM-002** — resolved and worth keeping resolved. SYM-002 is the
  three-cause triage, SYM-003 is the calcium deep dive. They link to each other
  in both directions. Any future article touching calcium or LSI links to
  SYM-003 instead of re-explaining saturation.
- **SYM-004 vs SYM-012** (`/problems/black-spots-not-algae`, unwritten) —
  SYM-004 owns the identification, which is the entry query and cannot be sent
  elsewhere, plus black algae treatment completely. It identifies cobalt,
  manganese and hydraulic blistering only well enough for a reader to know what
  they have. SYM-012 must own the **treatment** of each or be cut. The handoff
  is written as prose without a link; add the link when SYM-012 lands.
- **SYM-004 → pool-stains-identification** — already in SYM-004's relatedSlugs
  though the article does not exist. Safe: `getRelated` drops unresolved slugs
  and backfills same-category, so the card activates itself on landing. Body
  prose links only to live routes. Same trick is available for other forward
  references; do not put an unresolved slug in body prose.

## tips.json
**25 total, 6 verified**, 19 candidates. Verified: `carbonate-clouding`,
`suction-side-never-drips`, `bearings-die-of-seal-leaks`,
`thermal-overload-resets-itself`, `hottest-water-precipitates-first`,
`surface-material-decides-diagnosis`. Still assigned but unsourced:
`dead-algae-turns-gray`, `total-only-strips-hide-zero-free`,
`open-below-60-degrees`, `texas-hardness-inverts`. Candidates are writable at
`scaffold`; they gate `live`. **Ten articles finished, none publishable** —
this stack only grows.

## Schema note
`title` caps at 90 chars and the build enforces it. SYM-004's briefed title was
102 and had to be cut to 80. Check title length when writing the brief, not
when the build fails.

## Next action
**Dedicated research session, before B1 continues.** Tip sourcing has now
slipped six sessions. Clear the four assigned-but-unsourced tips first, then
build toward 60 verified. **Manufacturer service bulletins first** — the least
picked-over vein in the niche and the differentiator for the 50 brand-code
articles.

Then B1, three articles per writing session. For every equipment and brand-code
article, ask whether it explains how to do the job **correctly**, not only how
to diagnose it going wrong.
