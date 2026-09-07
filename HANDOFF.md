# HANDOFF.md — current state

Last updated: 2026-09-07, end of the Phase 1 conversion.

**What this site is now:** an Amazon Associates product-review site for pool
equipment and chemicals, organised around 13 product categories, with a
symptom-first entry point on the homepage.

**What it was until today:** a diagnostic content site with 20 articles across
5 editorial categories. All of it is preserved on the
`archive/diagnostic-content` branch. Nothing was destroyed.

Read `CLAUDE.md` for how the code works and `REVIEW_STANDARD.md` for how pages
get written. This file is only the state of play.

---

## Phase 1 — done

| | |
|---|---|
| Archive branch | `archive/diagnostic-content`, pushed |
| Articles removed from `main` | 20 (9 were live, 11 scaffold) |
| Editorial routes removed | `/problems` `/equipment` `/chemistry` `/guides` `/regional` |
| Product categories created | 13, each with a hub + `[slug]` route |
| New routes | `/product-reviews` (+3 listings), `/brands` (+7) |
| Redirects | 30 permanent, one hop, no chains |
| Build | passes, 0 broken links, 0 compliance violations |

### What changed, file by file

- **`lib/categories.js`** — rewritten. 13 categories with subcategories,
  navGroups, and the cross-cut tag vocabulary (`compat`, `pool_type`,
  `sanitizer`, `filter_type`, `gallons`). `bandForGallons()` converts a volume
  calculator result into a `gallons` band for product handoff.
- **`lib/symptoms.js`** — rewritten as a symptom → product map. Every row now
  carries a `fix` line and a category `href`. **No "soon" rows** — all 13
  categories exist, so every row is a live link.
- **`lib/frontmatter.js`** — new schema per the conversion plan. Compliance
  checks are hard failures at any status; craft checks are strict only at
  `status: live`. Two reviews of the same ASIN is a build failure.
- **`lib/seasonal.js`** — each season gained a `shop` pair of category CTAs, so
  the banner is "what to buy this month" rather than "read our guides."
- **`scripts/check-compliance.mjs`** — new. Scans MDX, JSX and rendered HTML
  for prices, discount/stock claims, untagged Amazon links, missing
  `rel="sponsored nofollow"`, shorteners, Amazon-hosted images and affiliate
  links in the feed. Wired into `npm run build`.
- **`components/mdx/UncommonTip.jsx`** → **`TechNote.jsx`**, per the plan.
- **`components/Header.jsx`** — Categories dropdown grouped by navGroup, plus
  Best Of / Comparisons / Calculators. Still CSS-only, no client JS.
- **`components/Footer.jsx`** — Categories (13) · Reviews · Site · Need a Pro.
  Amazon disclosure paragraph kept and extended with the label-literal line.
- **`components/CategoryHub.jsx`** — now renders the "Which type do you need?"
  subcategory grid whether or not reviews exist, so redirect targets are not
  bare.
- **`components/home/`** — `FeaturedGuides` → `TopPicks`, `RegionalFinder` →
  `BrandChips`. Both deleted files are on the archive branch.

### Kept deliberately, unchanged

`/tools/*` (all three calculators), `/pool-repair`, About, Editorial Policy,
Affiliate Disclosure, Privacy, Terms, `feed.xml`, `robots.txt`. The robots rule
that keeps `/pool-repair` crawlable is intact and commented — **do not add it
to `disallow`**, that mistake was made once already.

---

## Open items, in priority order

### 1. Copy that still describes a diagnostic site
`app/about/page.js` and `app/editorial-policy/page.js` still read as a repair-
guide site. About needs to become "How we evaluate pool products"; the footer
already links to Editorial Policy as "How We Evaluate". **Not yet done.**

### 2. Phase 2 components do not exist yet
The frontmatter schema accepts `products[]`, ratings, badges and the four
filter tags, and validates all of them — but nothing renders them. Still to
build: `AffiliateButton`, `SpecTable`, `ComparisonTable` with the "Your pool"
filter bar, `VerdictBox`, `CompatChips`, `AffiliateDisclosure`, and the
swappable product image component. The review/roundup/comparison layouts sit
on top of those.

Until `AffiliateDisclosure` exists, a page containing an Amazon link will fail
the build — deliberately. Build the component before the first review.

### 3. Calculator → category handoff
`bandForGallons()` is written and exported. Nothing calls it yet. Each
calculator result should render "products sized for this" pulling on the
`gallons` tag.

### 4. Named author — still the biggest E-E-A-T gap
`Article`/`Review` schema currently credits an Organization. For a site whose
positioning is "working service techs", a named `Person` with real, verifiable
credentials and a photo is worth more than any roundup. `lib/team.js` and
`lib/authors.js` are still placeholders, and `TrustStrip` is deliberately not
rendered because of it. **This needs James, not code.**

### 5. Search Console
- Resubmit the sitemap (24 URLs, was 25 — the article URLs are gone and the
  review listings are new).
- Expect a wave of 301s and dropped URLs. That is the plan working, not a fault.
- The old "Excluded by noindex" report will clear on its own as the 11
  scaffolds no longer exist.

### 6. Content
Zero product pages exist. Seeding order and the per-category minimum are in
`REVIEW_STANDARD.md` §6. Winterizing and Covers first — it is closing season.

---

## Things that will bite you

- **`primaryKeyword` must be a real search query, not a UI label.** Six of nine
  live articles on the old site got this wrong. `lib/symptoms.js` holds the
  human-readable label; frontmatter holds the query.
- **Unknown frontmatter keys fail the build.** This is intentional. A typo'd
  key that silently did nothing was the previous failure mode.
- **A price anywhere fails the build**, including inside a `products[]` entry.
  `price_tier` only.
- **Amazon-hosted images fail the build** until Creators API access is granted,
  which needs 10 qualifying sales in a rolling 30 days. PA-API v5 retired
  15 May 2026.
- **The symptom index is the differentiator.** It converts because several rows
  talk the reader out of a purchase. If it ever reads like a department menu,
  the site has lost the thing competitors do not have.
- The cloud sandbox's shell has been unreliable this session; the Mac's own
  shell via Desktop Commander is what actually ran these builds.
