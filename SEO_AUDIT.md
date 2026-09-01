# PoolFixHQ SEO Audit — 31 Aug 2026

Prompted by: indexed, getting impressions, **zero clicks since launch.**

---

## The headline: this is not a penalty

Nothing in the audit looks like an algorithmic action. What it looks like is a
site that has not yet had enough indexable surface, for long enough, to earn a
click.

The arithmetic:

| | |
|---|---|
| Articles in the repo | 20 |
| Articles indexable (`status: live`) | **9** |
| Of those, published **today** | 5 |
| Total URLs in sitemap | 25 |
| Site age | weeks |

Until this morning the site had **four** indexable articles. Impressions with
zero clicks on a four-article, few-week-old site in a competitive consumer
niche is the expected reading, not a symptom.

**Impressions do not mean you were visible.** An impression is logged when your
URL appears anywhere in a result set, including position 40 on page 4. CTR at
positions 20+ rounds to zero. Nine live articles cannot generate enough
impressions for a non-zero CTR to even be arithmetically likely.

### The one number that settles it

Before acting on anything below, pull **Average Position** in Search Console
(Performance → toggle it on, then look per-query).

- **Average position > 20** — you are ranking, nobody scrolls that far. Zero
  clicks is arithmetic. Nothing is broken. Fix #1 and #2 below and keep
  publishing.
- **Average position 5–15 with zero clicks** — *that* would be a real
  title/snippet problem worth panicking about.

Everything else in this document is worth doing regardless, but that number
tells you which story you are in.

---

## Fix now (cheap, and two of them are actively broken)

### 1. `og-default.png` and `logo.png` return 404 — sitewide

Confirmed live:

```
https://poolfixhq.com/og-default.png -> 404
https://poolfixhq.com/logo.png       -> 404
```

`lib/site.js` declares both; `public/` contains only `products/placeholder.svg`.
The consequences are wider than a missing social card:

- **Every page** emits `og:image` and `twitter:image` pointing at a 404. Any
  share to Slack, WhatsApp, Facebook, X or Reddit renders as a bare grey link.
  That kills the one traffic source available to a site too young to rank.
- **`Article` JSON-LD carries an `ImageObject` pointing at the same 404.**
  Google requires a valid, fetchable image for article rich results. A broken
  one makes the markup ineligible.
- **`Organization.logo` is a 404**, so the publisher entity is invalid too.

**Fix:** produce a 1200×630 `og-default.png` and a square `logo.png` (≥112px,
Google's minimum for `Organization.logo`), drop both in `public/`, redeploy.
Roughly thirty minutes of work and it is the highest ratio on this list.

### 2. `cloudy-pool-water` has no `seoTitle`

It is the only live article missing one, so its 62-character editorial H1 goes
to the SERP and gets truncated:

```
Cloudy Pool Water: The Three Causes and How to Tell Them Apart | PoolFixHQ
```

`cloudy pool water` is among the highest-volume queries on the site. Add a
`seoTitle` under 60 characters.

### 3. Author is an Organization, not a person

```json
"author": {"@type": "Organization", "name": "PoolFixHQ"}
```

The site's own positioning is *"straight answers from working service techs."*
The structured data does not name one. `public/team/` is empty. For advice
content where the differentiator is hands-on expertise, a named `Person` author
with credentials, a bio page and a photo is a direct E-E-A-T signal that is
currently being left on the floor.

---

## The structural problem: 45% of internal link equity goes nowhere

Crawled all 9 live articles and resolved every internal article link:

**47 internal article links. 21 of them (45%) point at `noindex` pages.**

The worst offenders, by inbound links from live pages:

| Target | Inbound from live pages | Status |
|---|---|---|
| `equipment/pump-not-priming` | **7** | scaffold (noindex) |
| `chemistry/chlorine-basics` | 4 | scaffold |
| `problems/green-pool-water` | 4 | scaffold |
| `problems/pool-stains-identification` | 2 | scaffold |
| `equipment/pool-cleaner-not-moving` | 2 | scaffold |
| `problems/black-algae-in-pool` | 1 | scaffold |
| `problems/foamy-pool-water` | 1 | scaffold |

`pump-not-priming` is **the most-linked page on the entire site** and Google
cannot index it. `green-pool-water` is arguably the single highest-volume query
in the pool niche and it is invisible.

This is not a bug — `noindex, follow` is deliberate and correct — but it means
the internal linking architecture you have carefully built is currently
delivering nearly half its value to pages that cannot rank.

**Fix:** publish the remaining 11. Prioritise by inbound links and query volume:

1. `equipment/pump-not-priming` — 7 inbound links
2. `problems/green-pool-water` — 4 inbound, highest volume in the niche
3. `chemistry/chlorine-basics` — 4 inbound, hub page
4. `problems/pool-stains-identification`, `problems/black-algae-in-pool`,
   `problems/foamy-pool-water`, `equipment/pool-cleaner-not-moving`

Going from 9 → 20 indexable articles roughly doubles the surface **and** repairs
the link graph in the same move. This is the single biggest lever available.

---

## Zero images on a visual-diagnosis site

```
grep -c "<img" on a rendered article  →  0
public/  →  products/placeholder.svg only
```

**Not one image anywhere on the built site.**

For most niches this is a moderate issue. Here it is a strategic one, because
the core promise of several articles is visual discrimination:

- *"How to Tell Black Algae From Its Lookalikes"* — with no picture of either
- *"Pool Stains Identification"* — stain colour **is** the diagnosis
- *"Mustard Algae"* vs dead algae vs pollen — all told in prose

Consequences:

- **Zero Google Images traffic.** For "what is this stain in my pool", image
  search is a primary discovery path and you are absent from it.
- **No image thumbnail in mobile SERPs**, where a thumbnail measurably lifts CTR.
- **No `Article` rich result**, per the 404 above.
- **Competitors win on the comparison** the moment a user opens two tabs.

**Fix:** at minimum, a stain-colour comparison chart, an algae-type comparison,
and a labelled equipment-pad diagram. These can be authored as SVG/diagrams
rather than photographed, which sidesteps the sourcing problem entirely.

---

## Keyword targeting: 6 of 9 articles are written around internal labels

The `primaryKeyword` field — which drives the H1, the section headings, the
`quickAnswer` and the internal anchor text — is set to the **roadmap UI label**
rather than the query people type:

| Article | `primaryKeyword` (internal label) | What the research file actually harvested |
|---|---|---|
| `waterline-scum-ring` | scum ring at the waterline | pool scum line, waterline scum, scum ring pool, brown ring around pool, bathtub ring in pool |
| `low-pool-flow` | weak flow from the returns | low pool flow, weak return jets, pool jets not working, low water pressure pool jets |
| `air-in-pool-lines` | air bubbles in the returns | air in pool lines, bubbles from pool jets, air in pool pump |
| `high-filter-pressure` | filter pressure is high | high filter pressure, pool filter pressure high, when to backwash |
| `pool-heater-not-heating` | heater will not fire | pool heater not heating, heater won't turn on, pool heater not firing |
| `salt-cell-errors` | salt cell throwing an error | salt cell error, inspect cell light, check salt light |

Three articles target real queries correctly: `pool pump loud noise`,
`cloudy pool water`, `milky white pool water`.

**Important caveat — this is smaller than it looks.** The `seoTitle` values are
good and *do* contain the real queries, and the title tag is what Google weighs
most heavily. So this is not a ranking emergency. What it costs you is the
secondary signals: H1 wording, subheads, first-paragraph phrasing and internal
anchor text all reinforce a phrase nobody searches.

The fix is genuinely cheap because **the right keywords are already sitting in
`content/research/*.json`** — they were harvested during writing and then not
used. Update `primaryKeyword`, then adjust the H1 and one or two subheads per
article to match. No rewriting.

Worth adding a lint to `scripts/check-links.mjs`: fail the build if
`primaryKeyword` matches a `label` in `lib/symptoms.js`. That is the same class
of bug as the roadmap-slug trap that bit four times, and it has the same fix —
catch it at build time rather than by inspection.

---

## What is already right

Worth stating plainly, because the fixable list above is long and the
foundations are not the problem:

- **Canonical, robots meta and sitemap all derive from one `status` field.**
  They cannot drift apart. This is better than most production sites.
- **Structured data is comprehensive** — Article, FAQPage, BreadcrumbList,
  WebSite, WebPage, Organization all present and well-formed apart from the
  image URLs.
- **Content depth is strong** — 1,700–3,500 words, real manufacturer sourcing,
  genuine differentiation. The `<UncommonTip>` blocks are the kind of thing that
  earns links.
- **Clean heading hierarchy** — one H1, sensible H2s.
- **`robots.txt` and `sitemap.xml` both 200**, sitemap correctly excludes
  noindex URLs.
- **Editorial honesty** (declining referral revenue in-article, flagging source
  disagreements) is exactly the signal that survives helpful-content updates.

The content is not the weak link. Surface area and two 404s are.

---

## Priority order

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Check Average Position in GSC before anything else | 5 min | Diagnostic |
| 2 | Create `og-default.png` + `logo.png` | 30 min | High — unblocks rich results and all social sharing |
| 3 | Publish the 11 scaffolds, `pump-not-priming` and `green-pool-water` first | Hours | **Highest** — doubles surface, fixes the link graph |
| 4 | Add `seoTitle` to `cloudy-pool-water` | 2 min | Medium |
| 5 | Add comparison diagrams to the visual-diagnosis articles | Days | High, and compounding |
| 6 | Repoint `primaryKeyword` from research files; adjust H1s | 1–2 hrs | Medium |
| 7 | Named `Person` author with bio and credentials | Hours | Medium, E-E-A-T |
| 8 | Build lint: `primaryKeyword` must not equal a `symptoms.js` label | 30 min | Prevents recurrence |
| 9 | Run **Validate Fix** on the GSC noindex report | 2 min | Housekeeping |

---

## Expectation setting

Even with everything above done this week, do not expect clicks to arrive next
week. A new site in a commercial niche typically sits in the sandbox-ish
low-visibility period for several months while Google accumulates enough signal
to trust it. The correct read of "impressions, zero clicks" at this age is
*"Google has found us and is testing us at low positions"* — which is the
expected first stage, not a failure of it.

The lever that actually moves this is publishing volume plus time. Twenty
articles is a start; the 63-article plan is the actual target, and getting there
matters more than any single optimisation on this list.
