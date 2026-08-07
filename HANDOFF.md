# HANDOFF

Read this and CLAUDE.md at the start of every session. Nothing else unless the
task needs it. Rewrite this file at the end of every session.

## Last commit
Research session C — foam sourced, CDC pool-vs-lake algae question resolved.

## Session type rules
Research: Firecrawl only → `content/research/*.json`, one page in context at a
time. Writing: repo only, no fetching — unknowns become `[VERIFY: …]`.
Three articles per writing session, then stop.

**Session C was a RESEARCH session** (writing limit of three was already hit by
SYM-004/005/006). No article text was written or changed. Next session can write.

## State
- **B1: 12 of 63 written** — SYM-001 … SYM-006, EQP-001, EQP-002, EQP-003,
  CHM-001, GDE-001, REG-001.
- Everything is `status: scaffold` — nothing goes live until a review batch.
- Link checker: 29 pages, 494 internal link instances, 0 broken.
- Homepage symptom index: 10 of 25 entries now link; 15 still `soon`.

## Word counts vs target (per-cluster policy in CLAUDE.md)
- SYM-003 **2,774** / 2,400 — pillar exception, carries calcium saturation for
  the whole site.
- SYM-005 **2,145** / 1,900 — over by 13%, not a pillar and not padded. If
  these need to land closer to target, section 2's texture-conflict passage is
  the honest place to tighten.
- SYM-004 2,103 / 2,200 · SYM-006 1,960 / 2,100 — both slightly under with
  everything in the brief covered. No depth pass owed.
- EQP-001 **1,933** / 1,900 — hit
- SYM-002 1,370 / 1,800 · CHM-001 1,185 / 1,600 · **GDE-001 1,045 / 2,000** —
  depth passes still owed, GDE-001 is the priority
- REG-001 1,154 / 1,800 — under by design, one honest gap

## Open [VERIFY]
- `content/regional/texas.mdx` — swim-season length or water temperature
  normals by TX region. **Still open.** Try NOAA or Texas A&M AgriLife.

**Two VERIFYs are now ANSWERED but not yet applied to the articles** — the
answers live in `content/research/cdc-pool-algae.json`. Applying them is a
writing task, deliberately not done in a research session:

- `black-algae-in-pool.mdx` — CDC MMWR 2009-2010 surveillance shows **all 11
  confirmed-or-suspected cyanobacterial toxin outbreaks were in untreated water
  (lakes); zero in treated venues (pools/hot tubs).** The article's existing
  position was correct. Swap the [VERIFY] block for the citation — *and carry
  the caveat*: CDC names residential backyard pools as a known barrier to
  outbreak detection, so zero reported is not proof of safe. Do not upgrade
  this into "CDC says pool black algae is harmless."
- `mustard-algae-in-pool.mdx` — searched, **nothing found**. No CDC statement
  on swimming with visible algae in a pool. Record the negative result and drop
  the marker so it is not re-searched every session.

## Convergence watch
- EQP-003 (silent, won't start) vs **EQP-021** (hums, won't start) — EQP-003
  owns the full power path and routes humming away. EQP-021 must own the
  humming diagnosis and capacitor discharge in depth, or be cut.
- **SYM-003 vs SYM-002** — resolved. SYM-002 is the triage, SYM-003 the calcium
  deep dive. Anything touching calcium or LSI links to SYM-003.
- **SYM-004 vs SYM-012** (`black-spots-not-algae`, unwritten) — SYM-004 owns
  identification (the entry query) and black algae treatment completely. It
  identifies cobalt, manganese and blistering only well enough to recognize
  them. SYM-012 must own the **treatment** of each or be cut.
- **SYM-006 is a pillar with four unwritten spokes** — SYM-013 (removal without
  draining), SYM-014 (ascorbic acid), SYM-015 (copper), SYM-016 (rust). SYM-006
  deliberately keeps treatment short and says depth lives elsewhere. Each spoke
  must go deeper than SYM-006 does or it has no reason to exist. Add each to
  SYM-006's relatedSlugs as it lands.

## The roadmap-slug trap — read before writing any article
`lib/symptoms.js` is the content roadmap AND the homepage index. Entries light
up only when `category` + `slug` exactly match a real file. The slug is guessed
when the row is planned, before the article has a title, and **nothing
reconciles them afterward** — a near-miss renders the finished article as muted
"soon" text and it is invisible on the homepage.

This has now happened four times: `black-algae`→`black-algae-in-pool`,
`loud-pool-pump`→`pool-pump-loud-noise`, `mustard-algae`→`mustard-algae-in-pool`,
`pool-stains`→`pool-stains-identification`. EQP-003 had no entry at all.

**Check `lib/symptoms.js` against the real slug as part of writing every
article.** Better: add a build-time check to `scripts/check-links.mjs`, which
already walks both sides — flag roadmap entries matching no file, and live
articles no entry points at. Not yet done.

Forward references are safe in `relatedSlugs` — `getRelated` drops unresolved
slugs and backfills same-category, so the card activates itself when the article
lands (SYM-004's stains slug did exactly this). Body prose must link only to
live routes.

## tips.json
**28 total, 9 verified**, 19 candidates. **One assignable:
`foam-is-a-calcium-readout`** (verified, unassigned) — the foam article's tip is
ready. Newly verified this session: that one.

Still assigned but unsourced — these gate `live` and were NOT touched this
session: `dead-algae-turns-gray`, `total-only-strips-hide-zero-free`,
`open-below-60-degrees`, `texas-hardness-inverts`. **Highest priority for the
next research session.**

**Twelve articles finished, none publishable.** The bank hit zero assignable
tips before SYM-007 could start, which is what forced this research session.
Do not let it reach zero again — one article written is one tip consumed.

## Schema note
`title` caps at 90 chars and the build enforces it. Check title length when
writing the brief, not when the build fails.

## Live vs scaffold — unresolved
`status: scaffold` does **not** gate public rendering. Every article is live and
indexable at poolfixhq.com right now, open `[VERIFY]` markers included. Either
make `scaffold` exclude pages from routing and the sitemap, or drop the "not
publishable" framing. Currently the repo says one thing and the site does
another.

## Next action
**The foam article is unblocked and can be written now** — research is in
`content/research/foam.json`, tip is `foam-is-a-calcium-readout`, roadmap slug
is `foamy-pool-water` (match it or fix the roadmap in the same commit).
`foam.json` records a real conflict between the two sources about whether
phosphates or organics are the primary cause; write it as a conflict, house
style, the way SYM-005 handled the texture disagreement.

While writing, also apply the two resolved VERIFYs above — they are quick edits
with the citation already gathered.

**Then another research session before B1 goes much further.** Four unsourced
tips still gate every article going live, and the bank holds one assignable tip
— enough for exactly one more article. **Manufacturer service bulletins first**
— least picked-over vein in the niche and the differentiator for the 50
brand-code articles.

Three articles per writing session. For every equipment and brand-code
article, ask whether it explains how to do the job **correctly**, not only how
to diagnose it going wrong.
