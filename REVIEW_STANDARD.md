# REVIEW_STANDARD.md — how a page gets written

Content spec. Technical rules live in `CLAUDE.md` and that file wins on any
technical disagreement.

---

## 1. The voice, and why it is the asset

Working service tech. Blunt, cheapest-fix-first, label-literal on chemicals.

The most valuable sentence type on this site is the one that costs us the
sale:

> "The expensive mistake here is buying a new cell because a light came on."

> "A cleaner this old is often not worth repairing. Saying so costs us the
> parts referral, and it is still the honest read."

Keep writing those. A review site that recommends everything is a catalog, and
catalogs do not get linked to, bookmarked or trusted. The 2026 core updates
went hardest at template-built comparison pages with no original judgment —
tracking across 600k+ pages put 71% of affiliate sites down after March 2026,
typical losses 20–35%. What survived was first-hand evidence, named authors,
and actual opinions. Judgment is the moat.

**Never:**
- invent a test we did not run or a measurement we did not take
- describe synthesised owner reports as our own testing
- copy retailer review text
- state a price, discount or stock level
- claim a chemical treats something its label does not

---

## 2. Ratings

A `rating` is our published judgment under `Review` schema, which asserts it
is our evaluation. It must be defensible. **It is never typed in by hand.**

### 2.1 The mechanism

`lib/scoring.js` publishes, per category, the dimensions a product is scored
on and the weight each carries. Weights sum to exactly 1 — enforced at module
load, so a typo throws rather than quietly reweighting the site.

Write the dimension scores into frontmatter as `scores:`, 0–10 each. The
headline `rating` is then **weighted mean ÷ 2**, and `lib/frontmatter.js`
fails the build if the declared `rating` differs from the computed one by more
than 0.05.

```yaml
scores:
  efficiency: 9
  flowControl: 9
  ...
products:
  - rating: 3.9      # must equal ratingFromScores(category, scores)
```

`<Scorecard />` renders the dimensions, the weights and the bars, and computes
the overall from the same numbers. The reader can redo the arithmetic.

### 2.2 The rules that make it honest

- **Score the dimensions first, then read off the rating.** Do not pick a
  rating and back-solve the dimensions into it.
- **Never adjust weights to rescue a number.** Weights are a category-level
  decision made before products, not a per-product dial. The IntelliFlo3 came
  out at 3.9 against a 4.2 first draft; the 3.9 shipped.
- Every dimension score must be defended somewhere in the body. A 6 with no
  paragraph explaining the 6 is an unsourced claim.
- Do not round a weak product up because 3.2 looks bad next to a competitor's
  page. If everything scores 4.5 the scale is decoration.
- A new category gets its own dimension list in `lib/scoring.js` **before** its
  first review. `DEFAULT_DIMENSIONS` exists so nothing ships unscored, not
  because it is adequate.

The build also enforces the structural half: rate every product on a page or
none. A partly-rated table invites a comparison that is not being made.

---

## 3. Page shape

Order is inverted-pyramid throughout. The conclusion goes first because both
audiences want it there — a reader standing next to their pool, and an answer
engine lifting the first self-contained passage after the H1.

### 3.1 Individual review (`type: review`, 900 words minimum)

Three levels of information priority, in this order. A reader who leaves after
level 1 must still have been served.

**Level 1 — decide in 30 seconds** (above the fold, no scrolling required)

1. `answer` — rendered automatically above the body
2. `<QuickVerdict>` — rating, best for, not ideal for, the bottom line, CTA
3. `<BeforeYouBuy>` — the checks that disqualify the product for some buyers,
   including one prominent `warning`: the single thing most likely to make
   this purchase a mistake
4. `<Scorecard />` — the breakdown behind the rating, weights visible

**Level 2 — the substance**

5. How we evaluate this category (short, links to `/how-we-test#scoring`)
6. What you actually get in the box, and what you do not
7. Model differences, where a product line has confusable variants
8. `<SpecTable>` — manufacturer figures, with provenance
9. **What those specifications mean** — every spec that decides a purchase gets
   translated into a consequence for the buyer. A spec table on its own is a
   data dump; this section is the review.
10. `<TechNote>` — the mechanism nobody else mentions
11. Performance, one H2 per scored dimension, in scorecard order
12. Compatibility, installation, common problems, long-term ownership
13. Warranty — including what shrinks it
14. Where you should buy it, and the honest answer even when it is not us

**Level 3 — the buyer nobody else writes for**

15. `<ThingsBuyersMiss>` — 5 points, from frontmatter `buyersMiss`
16. `<WhoFor variant="buy">` and `<WhoFor variant="skip">` — named buyer
    profiles with a reason each, never a generic "most people"
17. Alternatives, with `<PlannedLink>` to comparison pages not yet written
18. Is it worth the money
19. `<ProsCons>` — both columns, always
20. `<FAQ />`, `<Sources />`

`<TechnicalDetails>` accordions carry depth that would otherwise bloat a
section — the content ships in the HTML whether the accordion is open or not,
deliberately, so crawlers see all of it.

`<EvidenceNote>` labels the tier behind a claim: manufacturer, independent,
professional, owner. Use it wherever a reader might reasonably assume we tested
something we did not.

The sidebar (`components/ReviewSidebar.jsx`) renders automatically on desktop
from frontmatter — verdict, at-a-glance specs, table of contents, keep-reading
links. Nothing to write for it, but keep `specs` short enough to be scannable
there.

**The publishing test.** Before shipping, ask: can a buyer answer these from
the page alone? Will it fit my pool? Will it work with my equipment? What will
it actually cost me to own? What goes wrong with it? Who should not buy this?
What do I do if it breaks? If any answer is missing, the page is not finished.

### 3.2 Best-of roundup (`type: roundup`, 1200 words minimum)

Winner up top → `<ComparisonTable>` → 150–250 words per pick → how we picked →
FAQ. Exactly one `best-overall` badge and at least three products, both
enforced at build.

### 3.3 Head-to-head (`type: comparison`, 900 words minimum)

Answer → side-by-side specs → the criteria one at a time → who buys which →
two CTAs. Minimum two products, enforced.

### 3.4 Category hub

Mostly automatic from `lib/taxonomy.js`. Writing a good `shortAnswer` and a
real `buyingCriteria` list is the whole job — the criteria are what make every
rating in that category auditable.

---

## 4. Sourcing

Ranked. A claim rests on the highest tier available to it.

1. **Manufacturer documentation** — spec sheet, manual, label, SDS. The spine
   of a review. **A retailer listing is not a source.**
2. **Government / standards / public health** — CDC, EPA, CPSC, state health
   departments, university extension. Every health, safety or chemical claim
   must reach this tier where such a source exists.
3. **Documented owner-reported patterns** — for how things fail in service
   only, never for specifications, and always labelled.

The chemical rule, without exception: **the product label is authoritative.**
Where this site and a label disagree, the label is right.

---

## 5. Cross-linking

Chemicals are the highest-frequency repeat purchase and the lowest commission.
Robotic cleaners, variable-speed pumps, salt cells and heat pumps are the
ticket. So a chemistry page should offer the equipment that stops the problem
recurring — where that is actually true:

> Shocking every fortnight? → salt systems
> Cleaning the filter weekly? → filter sizing
> Buying stabilizer to fix stabilizer? → liquid chlorine

Do not bolt an upsell onto a page whose honest answer is "your pool is fine."

---

## 6. Product intake

Send one of these. Cowork validates, researches, writes, files.

```
PRODUCT INTAKE
type: review | roundup | comparison | guide
category: <slug from lib/taxonomy.js>
subcategory: <optional>
product(s):
  - name:
    asin:
    amazon_url:
    brand:
    model:
    compat: <hayward | pentair | jandy | polaris | dolphin | intex | bestway | n/a>
    price_tier: budget | mid | premium
    key_specs: <flow/HP, sq ft, cycle time, available Cl %, cell hours, BTU...>
    pool_type: inground | above-ground | both
    sanitizer: chlorine | salt | both
    gallons_fit: <band>
    competitors: <2-3 names, optional>
notes: <emphasise / avoid>
```

**On receipt, in order:**

1. Validate the category slug. Refuse an unknown one rather than guessing.
2. **Cannibalisation check.** Does a review of this ASIN exist? Does a live
   page already target that keyword? Both are build failures, for good reason.
3. Research: manufacturer spec sheet and manual first, then 2–3 independent
   reviews, then owner-feedback themes. **Never pull price.** Never treat a
   retailer listing as a spec source.
4. Confirm the category has a dimension list in `lib/scoring.js`. If not, write
   one and defend the weights before writing a word of the review.
5. Write per §3 in the voice from §1. Cite per §4. Score the dimensions per §2
   and let the arithmetic set the rating.
6. Save to `content/{category}/{slug}.mdx`.
7. `npm run build` must pass — links, SEO and compliance.
8. Report back: file path, and **any claim that could not be verified.** That
   last part is not optional.

---

## 7. Seeding order

By Amazon volume × ticket size. Minimum per category: 1 roundup + 3 reviews +
1 comparison.

Pool Cleaners → Pool Pumps → Chlorine & Shock → Test Kits → Pool Filters →
Salt Systems → Algaecides & Treatments → Balancers → Covers → Heaters →
Winterizing → Cleaning Tools → Above-Ground.

**Seasonal override:** Winterizing and Covers jump the queue Sept–Nov.

---

## 8. Ongoing

- Weekly: refresh `dateModified` on the top 20 by traffic, where something
  actually changed. Touching the date without changing content is a lie.
- Quarterly: dead-ASIN sweep.
- At 10 qualifying sales in a rolling 30 days: apply for Creators API, flip
  `features.amazonImages`, switch images to live data.
