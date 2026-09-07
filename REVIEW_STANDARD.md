# REVIEW_STANDARD.md — how a PoolFixHQ product page gets written

Governing content spec for the product-review site. Technical rules (schema,
build failures, compliance enforcement) live in **CLAUDE.md** and that file wins
on any technical disagreement. This file covers what goes on the page.

The retired diagnostic content standard is at `archive/CONTENT_STANDARD.md`.
Its sourcing discipline still applies; its article shapes do not.

---

## 1. The voice, and why it is the asset

Working service tech. Blunt, cheapest-fix-first, label-literal on chemicals.

The single most valuable sentence type on this site is the one that costs us
the sale:

> "The expensive mistake on this page is buying a cell because a light came on."

> "A cleaner is often not worth repairing. Saying so costs us the parts
> referral, and it's still the honest read."

Keep writing those. A review site that recommends everything is a catalog, and
catalogs do not get linked to, bookmarked, or trusted. The 2026 core updates
went hardest at template-built comparison pages with no original judgment —
71% of tracked affiliate sites lost ranking. Judgment is the moat.

**Never:**
- invent a test we did not run, or a measurement we did not take
- describe owner-reported themes as our own testing
- copy Amazon review text
- state a price, a discount, or stock
- claim a chemical treats something its label does not

---

## 2. Ratings

A `rating` is our own scored judgment, published under `Review` schema, which
asserts it is our evaluation. It must be defensible.

Score against the criteria named in that category's "How to choose" section —
the same criteria for every product in the category, so the numbers compare.
Where a score rests on manufacturer specification and synthesised owner
feedback rather than hands-on testing, the page says so plainly. Do not round a
weak product up to 4.0 because a 3.2 looks bad next to competitors' pages.

---

## 3. Page templates

### 3.1 Category page (`CategoryHub`, mostly automatic)

1. Breadcrumb, H1, two-paragraph intro
2. **"Which type do you need?"** decision box → subcategories
3. Top three picks: Best Overall / Best Budget / Best Premium
4. Subcategory blocks: definition + roundup link + three review links
5. **How to choose (300–500 words)** — the 4–6 specs that actually decide it
6. Comparison table, filtered by the "Your pool" bar
7. FAQ (`FAQPage` schema)
8. Related categories

The "How to choose" section is the E-E-A-T load-bearing wall. Examples of the
specs that matter:

| Category | The specs that decide it |
|---|---|
| Pumps | Flow curve vs filter area, VS vs single-speed, union sizing |
| Cleaners | Pool floor type and shape, cord vs cordless, waterline climbing |
| Shock | Available chlorine %, CYA impact, dissolve behavior |
| Filters | Filter area vs pump flow, backwash requirement, media cost per season |
| Salt | Cell output vs pool volume, expected cell life, flow switch design |

### 3.2 Individual review (`type: review`)

Verdict box (rating, one-line verdict, best for / not for, **Check Price on
Amazon**, disclosure) → spec table → who it is for → performance by criterion →
pros and cons → versus the alternatives → what owners report (synthesised, and
labelled as such) → verdict and CTA → FAQ.

Schema: `Product` + `Review`. **Never `AggregateRating`.**

### 3.3 Best-of roundup (`type: roundup`)

Winner strip → comparison table → 150–250 words per pick → how we picked → FAQ.
Schema: `ItemList`. Exactly one `best-overall` badge, enforced at build.

### 3.4 Head-to-head (`type: comparison`)

Quick answer → side-by-side specs → five rounds → who buys which → CTA pair.
Minimum two products, enforced at build.

---

## 4. Cross-linking rules

Chemicals are the highest-frequency repeat purchase and the lowest commission.
Robotic cleaners, variable-speed pumps, salt cells and heat pumps are the
ticket. So every chemistry page should offer the equipment that prevents the
problem recurring:

> Tired of shocking every fortnight? → salt systems
> Cleaning the filter weekly? → filter sizing
> Buying stabilizer to fix stabilizer? → liquid chlorine

Do this where it is true. Do not bolt an upsell onto a page where the honest
answer is "your pool is fine."

Every symptom row in `lib/symptoms.js` that a new product now answers gets
re-pointed when that product publishes.

---

## 5. Product intake

James sends one of these. Cowork validates, researches, writes, files.

```
PRODUCT INTAKE
type: review | roundup | comparison
category: <slug from lib/categories.js>
subcategory: <optional>
product(s):
  - name:
    asin:
    amazon_url:
    brand:
    compat: <hayward | pentair | jandy | polaris | dolphin | intex | bestway | n/a>
    price_tier: budget | mid | premium
    key_specs: <HP/flow, sq ft filter area, cleaning cycle, available Cl %,
                cell lifespan, BTU, etc.>
    pool_type: inground | above-ground | both
    sanitizer: chlorine | salt | both
    gallons_fit: <band>
    competitors: <2-3 names, optional>
notes: <emphasise / avoid>
```

**On receipt, in order:**

1. Validate the category slug against `lib/categories.js`. Refuse unknowns
   rather than guessing.
2. Cannibalisation check: does an individual review of this ASIN already exist?
   Does a roundup in this category already cover it? Two reviews of one product
   is a build failure, and for good reason.
3. Research — manufacturer spec sheet and manual first, then 2–3 independent
   reviews, then owner-feedback themes. **Never pull price.** Never treat the
   Amazon listing as a spec source.
4. Write per §3 in the voice from §1. Cite CDC or extension for any chemistry
   or health claim.
5. Save to `content/{category}/{slug}.mdx` with the CLAUDE.md frontmatter
   schema. Add a row to `TRACKER.csv`.
6. Update the category comparison table. If `winner: true`, it appears in
   homepage Top Picks automatically. Re-point any `lib/symptoms.js` row this
   product now answers.
7. `npm run build` must pass — links and compliance both.
8. Report back: file path, links added, and **any claim you could not verify.**
   That last one is not optional.

---

## 6. Seeding order

By Amazon volume × ticket size, minimum 1 roundup + 3 reviews + 1 comparison
per category:

Pool Cleaners → Pool Pumps → Chlorine & Shock → Test Kits → Pool Filters →
Salt Systems → Algaecides & Treatments → Balancers → Covers → Heaters →
Winterizing → Cleaning Tools → Above-Ground.

**Seasonal override:** Winterizing and Covers jump the queue during closing
season (Sep–Nov), then drop back to normal order.

---

## 7. Ongoing

- Monthly: rotate the seasonal block in `lib/seasonal.js`
- Quarterly: dead-ASIN sweep
- Weekly: `updated:` on the top 20 by traffic
- At 10 qualifying sales in a rolling 30 days: apply for Creators API, then
  switch images and availability to live data
