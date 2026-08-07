# HANDOFF

Read this and CLAUDE.md at the start of every session. Nothing else unless the
task needs it. Rewrite this file at the end of every session.

## Last commit
SYM-008 waterline scum ring — first full article under CONTENT_STANDARD.md.

## Session type rules
Research: Firecrawl only → `content/research/*.json`, one page in context at a
time. Writing: repo only, no fetching — unknowns become `[VERIFY: …]`.
Three articles per writing session, then stop.

**Session C: research, then SYM-007 written at the user's direction** — a fourth
article after SYM-004/005/006 hit the three-per-session limit. Recording it
rather than absorbing it silently. The research in between arguably reset the
boundary; either way it was a deliberate call, not drift.

## The lawncarehq method — now partly adopted
`/Users/agentkuldeep/agentkuldeep/lawncarehq` (Lawn Expert Jack) is a sibling
project with a much more developed `ARTICLE_STANDARDS.md`. Used as reference from
SYM-007 onward. What was ported:

- **`archetype` in frontmatter** — schema accepts it (`lib/frontmatter.js`).
  **Superseded:** use CONTENT_STANDARD.md §7's thirteen archetypes (A-M), not
  the lawn site's six. SYM-007 is **A (Diagnostic)**. Backfill A-M letters across
  the other 12 articles during retrofit.
- **No fixed word count.** Lawn standard: "cover the topic completely and stop",
  articles range 2,000-5,000+, never pad. This is better than our per-cluster
  targets, which have produced an over/under report on every article for six
  articles running. SYM-007 came in at **1,331 words** because foam is a
  contained topic — under the old system that would read as a failure.
- **Banned-phrase list** (In today's world / It is important to note / Dive into
  / Unlock / game changer / In conclusion / a section titled "Conclusion").
  Checked SYM-007 against it: clean.
- **Closers named for what they do.** SYM-007 uses "What to do next, by cause"
  rather than a generic heading.
- **Don't default to the maximum** — FAQs 6-12 by what the topic warrants.
  SYM-007 has 6, not the 7 the last three had out of habit.

**Not yet ported, worth considering:** per-article briefs in a `content-plan/`
directory with a "Why this one now" and a "Thesis" (lawn commits these alongside
the article); a `STATUS.md`; image recommendations per H2.

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

**Two VERIFYs are ANSWERED but still not applied to the articles** — answers in
`content/research/cdc-pool-algae.json`. Still owed:
- `black-algae-in-pool.mdx` — CDC MMWR: all 11 confirmed/suspected cyanobacterial
  toxin outbreaks were untreated water, zero in pools. Article wording was right;
  swap the marker for the citation **and carry CDC's own caveat** that backyard
  pools are a known detection blind spot.
- `mustard-algae-in-pool.mdx` — nothing found. Record the negative result.

## CONTENT_STANDARD.md is now the governing file
`CONTENT_STANDARD.md` supersedes the article template and outranks `CLAUDE.md`
on any disagreement. Read it in full before writing. It sets: the 13-archetype
format router (§7), 4 source tiers (§3), internal-linking minimums including
mandatory reciprocals (§5), the voice bans (§8), no word target (§9), the QC
checklist (§10), the required report block (§11), the retrofit order (§12) and
session discipline (§13).

**It also overrode a rule I had written an hour earlier.** My three-tier version
banned Orenda, AQUA Magazine and parts-supplier repair docs. The standard permits
all three (T3/T4). CLAUDE.md now points at the standard instead of restating it —
two conflicting sourcing rules in one repo was the actual danger.

## Source audit under CONTENT_STANDARD.md §3
44 citations across 13 articles: **T1 15 · T2 1 · T3 3 · T4 8 · banned 17 (38%)**.

**Six articles FAIL §3's "minimum two sources, at least one Tier 1 or 2":**

| Article | Keeps | Why it fails |
|---|---|---|
| `problems/pool-stains-identification` | 1/5 | no T1/T2 |
| `problems/black-algae-in-pool` | 1/5 | 4 banned |
| `problems/foamy-pool-water` | 1/3 | 2 banned |
| `equipment/pool-pump-not-turning-on` | 1/2 | no T1/T2 |
| `equipment/pump-not-priming` | 2/2 | both T4, no T1/T2 |
| `guides/pool-opening-checklist` | 1/1 | only one source |

Passing: `chlorine-basics`, `green-pool-water`, `cloudy-pool-water`,
`milky-white-pool-water`, `pool-pump-loud-noise`, `mustard-algae-in-pool`,
`regional/texas`.

**Banned hosts to remove:** aiper, blogs.aiper, swimuniversity, dogdayspools,
poolchecker, carefreepoolclub, discountsaltpool, abchomeandcommercial,
scienceinsights, poolpumpfix, fibretechinc, puritymap, aquatell, oakpointtexas.

**Do not strip these without replacing them.** Most support real claims;
deleting the citation silently converts a sourced statement into an unsourced
one. §12 order: audit → sources → depth → interlinking → voice.

**Tier 2 is the gap.** Exactly one manufacturer citation exists across the whole
site, and §7B makes manufacturer service literature *required* for every
brand-code article — 50 of the 63 planned rows. Pentair/Hayward/Jandy/Raypak
service PDFs are the single highest-value research target and they fix the
equipment cluster at the same time.

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
**28 total, 9 verified**, 19 candidates. **ZERO assignable** —
`foam-is-a-calcium-readout` was consumed by SYM-007. The bank is empty again, so
**the next article is blocked until a research session runs.** This is the second
time in two sessions.

Still assigned but unsourced, gating `live`: `dead-algae-turns-gray`,
`total-only-strips-hide-zero-free`, `open-below-60-degrees`,
`texas-hardness-inverts`.

**Thirteen articles finished, none publishable.**

## Schema note — check ALL THREE caps before writing
The build enforces: **title ≤ 90**, **seoTitle ≤ 60**, **metaDescription ≤ 155**.
SYM-004 failed on title (102). SYM-007 failed on metaDescription (156 — by one
character). Check all three at draft time; the failure surfaces as a wall of
export errors across every page, not a clear message about the one file.

## Live vs scaffold — unresolved
`status: scaffold` does **not** gate public rendering. Every article is live and
indexable at poolfixhq.com right now, open `[VERIFY]` markers included. Either
make `scaffold` exclude pages from routing and the sitemap, or drop the "not
publishable" framing. Currently the repo says one thing and the site does
another.

## §3 AMENDED — Tier 1/2 is now conditional
"Minimum two sources" still holds absolutely. "At least one Tier 1 or 2" now
applies **only where such a source exists for the topic** — many cleaning and
maintenance subjects have none, and the rule was stalling articles rather than
improving them. Two conditions: the search must actually have happened and be
recorded, and any claim resting only on T3/T4 must be attributed in the body.

**Two carve-outs kept hard, deliberately:** safety content (§7K) and any
health-risk claim anywhere, plus chemistry values (§7D) where a T1 exists. If no
T1 covers a safety question, write that the evidence doesn't cover it — never
source a health claim to a blog or a chemical vendor.

In practice SYM-008 found a **Tier 2 anyway** on the second attempt, so the
escape hatch went unused. Worth remembering before reaching for it.

## Session D — waterline scum ring, research only
First topic run under CONTENT_STANDARD.md. Findings in
`content/research/waterline-scum-ring.json`. **No article written** — §13.

- **Archetype: A (Diagnostic)**, not C (Procedural). Removal steps are short;
  the is-it-scum-or-scale question is what carries the page, and the wrong call
  puts an abrasive pad on a gelcoat.
- **Cannibalisation: CLEAR.** But `foamy-pool-water` shares the exact inputs
  (sunscreen, sweat, lotions) with a different output. Boundary and reciprocal
  links are specified in the research file. That shared-cause framing is an
  asset — no competitor connects the two.
- **planId needed.** The roadmap row has a slug but no planId. **Proposing
  SYM-008 — confirm before writing.**
- **Mechanism found and verified (T3):** a scum line marks the limit of what
  chlorine can oxidize, not a chlorine shortage. Synthetic bather products —
  sunscreen, cosmetics, tanning oils — are the class chlorine handles worst, so
  the ring persists at perfect FC and shocking it is the standard wrong answer.
  Logged as `scum-line-is-chlorines-limit`, assignable.
- **§3 NOT YET SATISFIED.** One Tier 3 source loaded; the rule needs two sources
  with at least one Tier 1/2. **The article cannot be written until a T1/T2 is
  loaded.** Targets named in the research file: the 2023 MAHC and its Annex
  (huge PDFs — use maxPages, do not load whole), state pool codes requiring
  operators to clean the scumline on a schedule, and surface-manufacturer
  cleaning restrictions for the abrasive constraint.

## SYM-008 written (session D, second half)
Research and writing did happen in the same session, contrary to §13. Recording
it rather than hiding it: the user directed it explicitly after the §3
amendment. One extra search and one scrape, then writing.

- **Archetype A (Diagnostic).** planId SYM-008 taken as approved.
- **Sources: 1 × Tier 2** (fiberglass Use and Care Manual — names the ring's
  composition *and* prohibits abrasives, warranty-backed) **+ 1 × Tier 3**
  (Orenda). §3 satisfied properly, not via the escape hatch.
- **Mechanism:** `scum-line-is-chlorines-limit`, now assigned. Tip bank is at
  **zero assignable again.**
- **Reciprocals added** to foamy-pool-water and pool-stains-identification (body
  links), plus relatedSlugs on milky-white-pool-water and black-algae-in-pool,
  which had no natural body anchor. All four verified live in the built HTML.
- **QC caught three fails on the first pass** — 5 internal links against the 6
  minimum, primary keyword missing from the first 100 words, and no calculator
  link. All fixed before commit. The §10 checklist earns its place.
- **New product:** `enzyme-cleaner`.
- 1,708 words, no target.

## Next action
**Research session** — §13 forbids research and writing in the same session, and
two things block writing anyway:

1. **Tip bank empty again.** Zero assignable. Every article consumes one, so
   research has to stay ahead of writing or it blocks immediately.
2. **Six articles fail §3.** Re-source them, worst first.

Target, in priority order:
- **Manufacturer service PDFs** (Pentair, Hayward, Jandy, Raypak) — fixes the
  equipment cluster, supplies the only-1-citation Tier 2 gap, and is *required*
  for the 50 brand-code rows. Highest leverage available.
- **State and county health department pool codes** — Tier 1, legally binding,
  unused by competitors, and covers the problems cluster.
- **University extension** for chemistry, where §7D wants Tier 1.

Then a writing session: retrofit per §12, and report each article using the §11
block.

**Then apply the two answered VERIFYs** (quick edits, citations already gathered)
and **backfill `archetype:`** across the 12 earlier articles. Four unsourced
tips still gate every article going live, and the bank holds one assignable tip
— enough for exactly one more article. **Manufacturer service bulletins first**
— least picked-over vein in the niche and the differentiator for the 50
brand-code articles.

Three articles per writing session. For every equipment and brand-code
article, ask whether it explains how to do the job **correctly**, not only how
to diagnose it going wrong.
