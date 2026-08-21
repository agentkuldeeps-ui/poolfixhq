# HANDOFF

Read this and CLAUDE.md at the start of every session. Nothing else unless the
task needs it. Rewrite this file at the end of every session.

## Last commit
EQP-009 cleaner stopped moving. **EQUIPMENT CLUSTER COMPLETE — 9 of 9.**

## ⚠ DEPLOY IS BROKEN — READ FIRST
**poolfixhq.com is serving a stale build.** Last live commit is `8d27169`
(EQP-004). Everything after it — EQP-005, EQP-006 — is in `origin/main` but has
never been built by Vercel, so those URLs 404 and their homepage entries still
render as "soon".

Verified not our fault: files are in `origin/main`, and a clean
`NODE_ENV=production` build passes locally (34 pages, 606 link instances, 0
broken). An empty commit (`f7b47bf`) was pushed to re-trigger the webhook and
changed nothing, which rules out a missed hook.

Project is **vercel.com/tets2/poolfixhq**. Vercel CLI is installed at
`/tmp/vc/node_modules/.bin/vercel` but **not authenticated** — needs
`vercel login` (interactive) or a `--token`. Next step is to read the failing
deployment's build log. Suspect a missing env var: `.env.local` holds
`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_AMAZON_TAG` and never leaves the local
machine.

**Do not write more articles expecting them to appear live until this is
fixed.**

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

## Live vs scaffold — RESOLVED, and my earlier note here was WRONG
I previously wrote in this file that `status: scaffold` "does not gate public
rendering" and called it an inconsistency. That was half wrong and it should not
have stood. The truth, from `lib/seo.js:88`:

    noindex: article.status !== 'live'

A scaffold article **renders but is noindex,follow**, and is excluded from the
sitemap. That is the review gate working exactly as designed, and the code
comment says so. Rendering was never the gate; indexing is.

**Google Search Console confirms it.** "Excluded by 'noindex' tag — 13 pages" is
this mechanism, not a bug. Nothing to fix in code; the fix is setting articles
`live` as they qualify.

### Publish-readiness audit — UPDATED after source verification
Criteria: verified uncommonTip + zero banned-tier sources + at least one Tier
1/2 + two or more sources + no open [VERIFY].

**9 now live** (was 4): `pool-pump-loud-noise`, `cloudy-pool-water`,
`milky-white-pool-water`, `waterline-scum-ring`, plus the five cleared by
verification — `low-pool-flow`, `high-filter-pressure`, `air-in-pool-lines`,
`pool-heater-not-heating`, `salt-cell-errors`.

**Verification session (Firecrawl restored).** Re-pulled every source as raw
PDF/HTML rather than WebFetch summaries. Results:

- **All quotes confirmed verbatim** in EQP-005, EQP-006, EQP-007, EQP-008.
- **ONE REAL ERROR FOUND AND FIXED.** EQP-008 said the Check Salt light flashes
  "below 2,700 ppm". The AquaRite manual gives 2,700-3,400 as the *ideal band*
  and separately lists the indicator coming on **below 2,400 ppm**. Corrected,
  and the article now explains the distinction rather than repeating the common
  misquote. **This is exactly what the [VERIFY] markers existed to catch.**
- **Material additions from the raw sources**, none of which the summaries had:
  - EQP-007: Hayward's per-model minimum flow rates (20/25/30/40 GPM by model
    family, 125 GPM max) and the full purpose clause — "To preserve heat
    exchanger, set flow rates above minimum (accounting for a dirty filter)".
    Plus the real diagnostic code meanings (LO, IF, IO, AO, AC, HS).
  - EQP-006: **the pressure gauge has movable green and red arrows** and
    Hayward's start-up step is to "line up green arrow on gauge to clean
    pressure". The manufacturer built a baseline recorder into the instrument —
    which is the article's whole thesis, now with the manufacturer behind it.
    Also: never exceed 50 psi, never purge with compressed air ("can cause
    components to explode"), always stop the pump before moving the valve.
  - EQP-008: acid washing is the manual's **last** step (look → flush → scrape
    with plastic or wood, never metal → acid only in severe cases), the cell has
    a self-cleaning function, and steady Inspect Cell means output has stopped.
  - EQP-005: the extra sentence — the unit "should never be energized when the
    pool pump is OFF and water is not flowing through the unit."
- **EQP-004** softened: the gauge split is confirmed verbatim, but PDF table
  extraction could not cleanly resolve which row the basket cause sits in, so
  the enumeration no longer claims an exact partition count.

**4 [VERIFY] markers remain**, none from this batch:
`pool-cleaner-not-moving` (2 — no robotic source, entrapment standards not
sourced), `black-algae-in-pool`, `mustard-algae-in-pool`, `texas`.

**11 still blocked from live**, by reason: banned-tier sources
(`black-algae-in-pool`, `pool-stains-identification`, `mustard-algae-in-pool`,
`texas`, `foamy-pool-water`, `pool-pump-not-turning-on`); no Tier 1/2
(`pump-not-priming`, `pool-pump-not-turning-on`, `pool-stains-identification`);
unverified tip (`chlorine-basics`, `green-pool-water`, `pool-opening-checklist`,
`texas`); under two sources (`pool-opening-checklist`).

### The other three GSC issues need no code change
- **Page with redirect (3)** — `http://poolfixhq.com/`, `http://www.poolfixhq.com/`,
  `https://www.poolfixhq.com/`. These are correct http→https and www→non-www
  redirects. GSC lists them informationally. **Do not "fix" these.**
- **Duplicate without user-selected canonical (1)** — `/affiliate-disclosure`.
  Checked: the page emits a correct self-canonical
  (`https://poolfixhq.com/affiliate-disclosure`), and every static and tool route
  passes an explicit `path` to `buildMetadata`. Last crawled Aug 13; likely a
  www/http variant deduped before the redirect settled. Re-inspect and request
  validation rather than changing code.
- **Crawled - currently not indexed (1)** — normal for a young site.

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

## Session E — weak flow from the returns, research only
`content/research/low-pool-flow.json`. **No article written.**

- **Archetype A (Diagnostic).** Proposing **EQP-004** — roadmap row has a slug
  (`low-pool-flow`) but no planId. Confirm before writing.
- **Cannibalisation: tightest on the site so far.** Three equipment articles
  already touch flow restriction. Boundary that makes it work: **EQP-001 owns
  the pump that will not prime; this owns the pump that IS primed and running
  but moves too little water.** Where a suction-side check duplicates EQP-001,
  link rather than re-explain. The unwritten `high-filter-pressure` spoke must
  keep the high-pressure branch — this article routes to it, does not absorb it,
  or that spoke has nothing left.
- **Two Tier 2 sources, both Pentair.** That doubles the site's manufacturer
  citations on its own (was one across 13 articles). §3's escape hatch not
  needed.
- **Mechanism: `gauge-direction-locates-the-restriction`** — verified,
  assignable. Pentair's own troubleshooting table splits low flow by gauge
  direction into six causes with no overlap; every consumer page flattens them
  into one list. One reading eliminates half the list.
- **Third branch nobody covers:** a variable-speed pump on a long low-RPM cycle
  produces deliberately lazy returns and owners diagnose a fault that isn't one.

**Sourcing caveat, recorded honestly:** Firecrawl returned
`temporarily_unavailable` mid-session, so both sources were loaded via WebFetch
instead. That returns a model-mediated extraction rather than raw page text. The
cause/remedy strings look verbatim and are usable for structure, but
**re-verify wording against the PDF before publishing any direct quote.** Logged
as the file's one open [VERIFY].

## EQP-004 written
1,857 words, archetype A. planId EQP-004 confirmed by the user.

- **Sources: 2 × Tier 2**, both Pentair. Site-wide manufacturer citations go
  from 1 to 3 — §7B needs this source type for all 50 brand-code rows, so this
  is the pattern to repeat.
- **Boundary held.** EQP-001 keeps the won't-prime procedure, EQP-002 keeps
  cavitation-as-noise, and the unwritten `high-filter-pressure` spoke keeps the
  high-pressure depth — referenced in prose with a code comment, not absorbed.
- **Reciprocals** added to both EQP-001 and EQP-002, verified in built HTML.
- **One open [VERIFY]** in the article: the OptiFlo cause lists were extracted
  via WebFetch during a Firecrawl outage, so the wording needs confirming
  against the PDF before anything is quoted verbatim. The article describes the
  table rather than quoting it, which contains the risk — but the six causes are
  the article's backbone, so this is worth clearing.
- Tip bank back to **zero assignable**.

## Session F — air bubbles in the returns, research only
`content/research/air-in-pool-lines.json`. **No article written.**

- **§2 cannibalisation check triggered a genuine stop.** EQP-001 pump-not-priming
  has 38 air-leak mentions and its whole five-step procedure IS suction-side
  leak diagnosis. Escalated to the user rather than writing a competing page;
  **narrow angle approved.**
- **Agreed boundary:** EQP-001 owns the pump that won't prime and the entire
  leak-finding procedure. EQP-005 owns the pump that primes and runs fine and
  still pushes bubbles — its job is deciding whether it's a leak at all, then
  routing. **Hard rule: EQP-005 must not reproduce the five-step procedure.**
  If the draft starts explaining how to test the lid o-ring, the boundary failed.
- **Proposing EQP-005.** Confirm before writing.
- **Two Tier 2 sources** (Pentair IntelliChlor, Hayward AquaRite). Manufacturer
  citations would go 3 → 5.
- **The finding inverts the consensus.** Every ranking page and most forums say
  'salt system, bubbles are normal, ignore it.' I checked both manuals directly:
  **neither documents visible bubbling as a normal operating condition.** What
  they do document is a hazard — Pentair warns that running the cell without
  proper flow causes 'a build-up of flammable gases'. Since bubbles often
  accompany poor flow, the reassurance points away from the exact thing the
  manufacturer warns about. Logged as
  `salt-cell-bubbles-are-not-automatically-fine`, assignable.
- **Two open [VERIFY]s** recorded: confirm the Pentair WARNING strings verbatim
  against the PDF, and note the negative finding rests on two manuals.

## EQP-005 written
1,580 words, archetype A, planId EQP-005.

- **Boundary held.** The article forks in its first section: pump won't hold
  prime → routed entirely to EQP-001, "ignore the rest of this page". It does
  not reproduce the five-step procedure.
- **Two Tier 2 sources.** Manufacturer citations now 5 site-wide.
- **Reciprocals** added to EQP-001, EQP-004 and EQP-002. All verified live.
- **QC caught two fails before commit:** primary keyword absent from every H2,
  and — worse — **no `<UncommonTip>` block at all.** The frontmatter named a tip
  but the body never rendered one, so §6 was silently unmet and the build does
  not catch it. Both fixed.

**ADD A BUILD CHECK:** `uncommonTip` in frontmatter with no `<UncommonTip>` in
the body should fail the build. It passed cleanly here while violating §6, and
that is the second class of silent failure after the roadmap-slug trap. The
rendered-HTML grep caught it only because I was looking.

## EQP-006 written
1,300 words, archetype A, planId EQP-006. The spoke EQP-004 reserved.

- **Boundary closed properly.** EQP-004's placeholder code comment has been
  replaced with a real link, and the reciprocal added. That pattern works —
  reserve with a comment, redeem when the spoke lands.
- **Two Tier 2 sources**, both Hayward. Manufacturer citations now **7**.
- **A real conflict written as a conflict:** Hayward's support site says
  backwash at 8-10 psi over clean; Hayward's own S200 manual says 6-8 psi. Same
  manufacturer, two documents. The article states both, refuses to pick, and
  redirects to the point both share — the threshold is measured from YOUR clean
  baseline, which is the thing nobody records.
- **Mechanism:** high pressure can be a pump/filter sizing mismatch, so cleaning
  never fixes it. Mirrors EQP-004's "a bigger pump won't fix weak flow" — same
  wrong purchase behind two opposite symptoms.
- **Safety block is Tier 2 verbatim** — "violent separation of pump and/or
  filter components". Not boilerplate; high pressure is exactly when people open
  a filter.
- **QC caught three before commit:** keyword absent from every H2, an unused
  product left in frontmatter, and in-body links at the bare minimum. All fixed.

## EQP-007 written
1,313 words, archetype A, planId EQP-007. **This is the PILLAR for the heater
brand-code rows (§7B)** — it owns the general prerequisite sequence and
deliberately does NOT decode the fault codes. Each code gets its own article.

- **Two Tier 2 sources** (Hayward UHS Quick Reference Guide, Raypak start-up
  points). Manufacturer citations now **9**.
- **Mechanism:** the heater's flow prerequisite makes it a filter symptom.
  Hayward's commissioning instruction is to set flow above minimum "accounting
  for a dirty filter" — so thin headroom passes clean and fails as the filter
  loads, producing the intermittent pattern owners misread as a flaky heater.
  Connects EQP-006 → EQP-004 → EQP-007 into one causal chain.
- **Model families named** (H150FD…H500FD) per §7B.
- **Safety block is the strictest yet** and draws the owner/technician line
  explicitly: check flow, filter, valves, thermostat, gas shutoff position —
  never open the gas train, never bypass a switch.
- **Reciprocals** to EQP-006, EQP-004, SYM-006. All verified in built HTML.
- **QC caught two:** links one short of the 6 minimum, keyword absent from every
  H2. Both fixed pre-commit.
- **Raypak's own troubleshooting page is cookie-gated** and could not be read.
  A fuller Raypak source is still worth adding — logged in the research file.

## EQP-008 written
1,321 words, archetype A, planId EQP-008. **PILLAR for salt-system brand codes.**

- **Boundary held vs EQP-005**, which has 24 salt-cell mentions but all about
  bubbles and gas. EQP-008 owns the indicators; EQP-005 keeps the gas hazard.
  Shared component (flow switch) split: EQP-008 owns "No Flow" as an error
  state, EQP-005 owns the consequence.
- **Two Tier 2 sources**, both Hayward. Manufacturer citations now **11**.
- **Mechanism:** "Inspect Cell" carries two unrelated messages on one light —
  Hayward's manual says it means *either* reduced efficiency *or* the 500-hour
  reminder. Owners read it as a death sentence and buy the most expensive
  consumable on the pool. The light says look; it doesn't say what you'll find.
- **Second nothing-is-wrong branch:** stops generating below 50°F by design.
  Same shape as EQP-004's variable-speed branch — worth watching that this
  doesn't become a formula.
- **Safety block** covers muriatic acid cell cleaning: 4:1 water to acid, ALWAYS
  ADD ACID TO WATER, gloves and eye protection.
- **QC caught two:** in-body links at 4 vs the 6 minimum, and salt dosing
  discussed without routing to the volume calculator (§10 violation). Both fixed.
- **Equipment cluster is now 8 of 9** — only "Cleaner stopped moving" remains.

## EQP-009 written — equipment cluster finished
1,470 words, archetype A, planId EQP-009.

- **The gap is demonstrable rather than asserted.** Hayward's suction-side fault
  list and Polaris's pressure-side list for the same complaint share **zero**
  causes. Both are printed side by side; the reader sees immediately why generic
  advice fails.
- **Mechanism deliberately NOT flow.** "It's really a flow problem" had carried
  EQP-004, EQP-006 and EQP-007 and was becoming a formula (§12). Chose the
  surface-specific shoes instead — standard/slotted for plaster and Pebble-Tec,
  cork for vinyl and fiberglass, ceramic for tile.
- **Surface material is now a site motif, not a formula** — four instances with
  four different mechanisms: black algae holdfasts (SYM-004), abrasives on
  gelcoat (SYM-008), brush choice, and now cleaner traction. Worth keeping
  deliberate.
- **Two Tier 2 sources.** Manufacturer citations now **13**.
- **New product:** `cleaner-shoes`.
- **QC caught three:** in-body links at 3 against the 6 minimum, keyword absent
  from every H2, and — third time — **a product declared in frontmatter with no
  block in the body.** That mismatch has now occurred in EQP-005, EQP-006 and
  EQP-009. The build check proposed below is overdue.
- **Two open [VERIFY]s, both honest gaps:** no Tier 2 source loaded for robotic
  cleaners (section says so and stops), and entrapment/drain-cover standards not
  sourced to Tier 1, so the safety block states the precaution without inventing
  specifics.

## BUILD CHECK STILL NEEDED (raised 3× now)
Fail the build when frontmatter declares something the body never renders —
`uncommonTip` with no `<UncommonTip>`, or a `products` entry with no matching
`<ProductBlock>`. Both have shipped silently past a green build. Same file that
already validates frontmatter. Pair it with the roadmap-slug check.

## Next action
**Research session** — §13 forbids research and writing in the same session, and
two things block writing anyway:

1. **Tip bank: one assignable** (`gauge-direction-locates-the-restriction`) —
   enough for the weak-flow article and nothing beyond it.
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
