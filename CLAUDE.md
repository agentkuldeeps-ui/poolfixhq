# CLAUDE.md — poolfixhq.com

Source of truth for how this codebase works. Read this before touching anything.
Where this file and any other instruction disagree on a technical detail, **this
file wins**.

---

## Stack

| Thing | Choice | Why |
|---|---|---|
| Framework | Next.js 14.2, App Router | Static export of every route, no server needed |
| Styling | Tailwind 3.4 + `@tailwindcss/typography` | No component library, no runtime CSS-in-JS |
| Content | MDX via `next-mdx-remote@6/rsc` + `gray-matter` | Server-rendered at build time; **zero client JS for article bodies** |
| Host | Vercel, auto-deploy from `main` | |
| Language | Plain JavaScript + JSX. No TypeScript. | `pageExtensions` is `['js','jsx']` |

**Why not Contentlayer:** it is effectively unmaintained and pins peer versions
that fight Next 14+. `next-mdx-remote/rsc` does the same job with a schema
validator we control (`lib/content.js`). Do not migrate to Contentlayer.

Article bodies compile on the server and ship as HTML. Every route in the build
output is `○ (Static)` or `● (SSG)`. **If a change turns a route dynamic, that is
a bug** — it means a client component or a request-time API crept in.

---

## Commands

```bash
npm run dev          # localhost:3000
npm run build        # next build + check:links + check:compliance. MUST pass before any commit
npm run check:links  # internal link checker (needs a build first)
npm start            # serve the production build locally
```

`npm run build` runs `scripts/check-links.mjs` after `next build` and **fails
the build if any internal href has no matching route**. It scans the rendered
HTML in `.next/server/app`, not the source — most hrefs here are built at
render time (`/${category.slug}`, `article.href`), so a static scan of the JSX
would miss them. Add a broken link and the build tells you the href and which
page it came from.

Copy `.env.example` to `.env.local` before running anything.

| Env var | Purpose |
|---|---|
| `NEXT_PUBLIC_AMAZON_TAG` | Associates tag appended to every product link |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash. Drives canonicals, OG, sitemap, RSS |

---

## Directory map

```
app/
  <category>/page.js          13 category hubs, 4-line wrappers over CategoryHub
  <category>/[slug]/page.js   review / roundup / comparison pages
  product-reviews/            best-of | comparisons | individual-reviews
  brands/[brand]/             shop by brand system (compat tag)
  tools/[slug]/               calculators -- UNCHANGED by the conversion
  pool-repair/                lead-gen -- UNCHANGED by the conversion
content/<category>/*.mdx      one file per review. Folder must match frontmatter category
lib/categories.js             THE taxonomy: 13 categories, subcategories, cross-cut tags
lib/symptoms.js               symptom -> product map (homepage differentiator)
lib/frontmatter.js            schema, validation, compliance failures
scripts/check-links.mjs       every internal href must resolve
scripts/check-compliance.mjs  Associates rules, fails the build
archive/                      the retired diagnostic content standard and research
```

Full article history before the conversion lives on the
`archive/diagnostic-content` branch. Nothing was deleted, only removed from
`main`.

---

## Content model

Three page types, set by `type` in frontmatter:

| `type` | What it is | Schema.org | Lives at |
|---|---|---|---|
| `review` | One product, in depth | `Product` + `Review` | `/product-reviews/individual-reviews` |
| `roundup` | Best-of for a category or subcategory | `ItemList` | `/product-reviews/best-of` |
| `comparison` | Head-to-head, two products | `Product` ×2 | `/product-reviews/comparisons` |

**Never emit `AggregateRating`.** We do not aggregate third-party ratings, and
claiming to is a structured-data violation.

### Frontmatter schema — enforced at build time

`lib/frontmatter.js` is the authority. **Unknown keys fail the build**, so a
typo cannot silently do nothing.

```yaml
title:            # <= 90 chars
seoTitle:         # optional, <= 60. Add one whenever title > 60
slug:             # must match the filename
type:             # review | roundup | comparison
category:         # must match the folder, must exist in lib/categories.js
subcategory:      # optional, validated against that category's list
primaryKeyword:   # the query someone types, NOT an internal label
quickAnswer:      # >= 40 chars
metaDescription:  # <= 155 chars
status:           # scaffold | live   -- scaffold is noindex,follow
datePublished:
dateModified:
updated:          # optional, set by the freshness sweep
techNote:         # optional slug; if set, the body MUST render <TechNote>
products:
  - name:         # required
    asin:         # optional, but must be 10 uppercase alphanumeric if present
    brand:
    compat:       # hayward | pentair | jandy | polaris | dolphin | intex | bestway | n/a
    badge:        # roundups: best-overall | best-budget | best-premium | also-great
    rating:       # 0-5
    price_tier:   # budget | mid | premium   -- NEVER a dollar figure
pool_type:        # inground | above-ground | both
sanitizer:        # chlorine | salt | both
filter_type:      # cartridge | sand | de | any
gallons:          # lt10k | 10-20k | 20-35k | 35k+ | any
winner:           # true puts this on the homepage Top Picks strip
sources:          # required. Real URLs only, structurally validated
faqs:
relatedSlugs:
featured:
```

The four filter tags (`pool_type`, `sanitizer`, `filter_type`, `gallons`) drive
the "Your pool" filter bar on comparison tables. `gallons` bands match the
volume calculator's output exactly, so the calculator can hand off to
"products sized for this."

### Build-time QC — two severities

`fail` throws and breaks the build. `warn` prints and continues.

**Always a failure, at any status** — these are compliance, not craft:

- any dollar figure, in frontmatter or body (`price_tier` instead)
- a malformed ASIN
- `winner: true` with no products
- an invented or placeholder citation URL

**Failure at `status: live`, warning at `scaffold`:**

- fewer than 600 words (Amazon's original-content rule, and it will not rank)
- a review or comparison with no products declared
- `techNote` declared but `<TechNote>` never rendered
- an Amazon link with no `<AffiliateDisclosure />` above it
- a comparison with fewer than two products
- a roundup without exactly one `best-overall`
- a chemical category, or any `<SafetyWarning>`, with no source
- primary keyword missing from the title

**Cross-file, live pages only:** two individual reviews of the same ASIN is a
hard failure. That is the cannibalisation case — it splits the ranking.

### primaryKeyword must be a real query

The single most expensive mistake made on the previous version of this site:
six of nine live articles targeted an internal UI label ("filter pressure is
high") instead of the query people type ("high pool filter pressure"). The
label belongs in `lib/symptoms.js`, where a human reads it. The keyword belongs
in frontmatter, where Google reads it. They are rarely the same string.

### Sourcing

Manufacturer documentation is the spine of a review: the spec sheet and the
manual, not the Amazon listing. Amazon copy is marketing and is frequently
wrong about specifications.

- **Chemical claims** — dosing, concentrations, what a product treats — come
  from the product label or SDS. Never state that a chemical treats a condition
  beyond its label.
- **Health claims** need CDC, EPA, a state health department or a university
  extension service. Not a pool blog.
- **Never copy Amazon reviews.** Synthesise owner-reported themes in your own
  words and say that is what they are.
- Hazmat shipping limits (cal-hypo, muriatic acid) are described as "check
  availability in your state" — never as a stock or price claim.

### Safety

Gas, electrical and structural work is licensed work. Say so and stop.
`<SafetyWarning>` requires a real source.

---

## Products and affiliate links

**Amazon Associates. The rules below are hard constraints, enforced by
`scripts/check-compliance.mjs`, which fails the build.**

1. **No prices, ever.** Not in frontmatter, not in prose, not in a component.
   We are not pulling live pricing from Amazon's API, so any price we print is
   one we typed once and will not maintain. Stale prices are the most common
   Associates violation. Use `price_tier: budget | mid | premium`.
2. **No discount, sale or stock claims.** Same reason, and they age faster.
3. **Disclosure above the first affiliate link on every page**, plus the
   standing paragraph in the footer.
4. **Every Amazon link carries `tag=`, `rel="sponsored nofollow"`, and opens in
   a new tab.** No shorteners, no cloaking — the check rejects `amzn.to`.
5. **No affiliate links in RSS or email.** The feed is checked.
6. **No Amazon-hosted images yet.** Hotlinking `m.media-amazon.com` needs
   Creators API access, which requires **10 qualifying sales in a rolling
   30-day window** (PA-API v5 was retired 15 May 2026). Until then: manufacturer
   press images, own photos, or the illustrated placeholder. The
   `remotePatterns` entry in `next.config.mjs` stays so the switch is one line.
7. **Link the variant you actually recommend.** Onsite commission applies only
   to the exact ASIN linked — the 50 lb pail, not the 5 lb tub.
8. **Original commentary on every page.** A spec dump is not allowed under the
   agreement and would not rank anyway. The 600-word floor enforces the shape
   of this, not the substance; the substance is your job.

## MDX components

Available inside any MDX file with no import. Bound in `components/mdx/index.js`.

| Component | Notes |
|---|---|
| `<QuickAnswer />` | Falls back to the `quickAnswer` frontmatter. Pass children to override. |
| `<Callout variant="research\|warning\|bottomline">` | `research` = cited fact, `warning` = damage risk, `bottomline` = the verdict. |
| `<SafetyWarning>` | Chemical hazards only. `role="alert"`. Mandatory — see above. |
| `<TableOfContents />` | Auto from H2s. Renders nothing under 3 headings. |
| `<ProductBlock id="…" />` | CTA at top **and** bottom, by design. |
| `<ComparisonTable ids="a, b" />` | Comma-separated string, **not** an array. Horizontal scroll on mobile; scroll region is focusable and labelled. |
| `<UncommonTip>` | The one mechanism per article. Prose as children; the `uncommonTip` frontmatter id enforces no-reuse. |
| `<FAQ />` | Renders the `faqs` frontmatter block. Same data drives FAQPage schema, so they can't drift. |
| `<Sources />` | Renders the `sources` frontmatter block. Links are followed, not nofollowed. |
| `<LeadFormCTA />` | Links to `/pool-repair`. Never inline a second form. |
| `<RelatedPosts />` | 3-card grid. Auto-appended at the end of every article unless the MDX already places it. |

`QuickAnswer`, `TableOfContents`, and `RelatedPosts` get article context injected
by `mdxComponents()` so authors write them bare. Props written in MDX still win.

### No JS expressions in MDX

`next-mdx-remote` v6 strips JavaScript expressions from MDX by default
(`blockDangerousJS`). That is the fix for the RCE advisory against v5, and we
leave it **on**: content files have no business executing JavaScript, and this
site's MDX is increasingly written by agents.

Practical consequence: `{expression}` and array/object props like
`ids={[...]}` silently evaluate to nothing — **no error, just a missing
component**. Any component that needs a list takes a comma-separated string
instead (see `parseIds` in `ComparisonTable.jsx`). Follow that pattern for new
components. Do not "fix" this by setting `blockDangerousJS: false`.

Heading ids come from `rehype-slug`; `slugifyHeading()` in `lib/content.js`
mirrors its algorithm so TOC anchors always resolve. **Change one, change both.**

---

## SEO

- **Metadata**: every page goes through `buildMetadata()` in `lib/seo.js` —
  canonical, Open Graph, Twitter card, robots. Do not hand-roll a `metadata`
  export on a new page; call the helper.
- **Title composition happens in ONE place**: `title.template` in
  `app/layout.js` (`%s | PoolFixHQ`). `buildMetadata()` returns a bare title and
  lets the template append the brand. **Never append `| PoolFixHQ` in
  `buildMetadata()`** — doing so double-suffixes every inner page
  (`Pool Problems | PoolFixHQ | PoolFixHQ`). The homepage passes
  `{ absolute: title }` to opt out. OG/Twitter bypass the template, so they use
  an explicitly composed `socialTitle`.
- **Never add a page to `robots.txt` `disallow` to keep it out of the index.**
  A blocked page can't be crawled, so its robots meta tag is never read.
  Control indexability per page via `noindex` / `nofollow` on `buildMetadata()`.
- **JSON-LD**: builders in `lib/schema.js`, rendered by `<JsonLd>`.
  - Every article: `Article` + `BreadcrumbList` + `FAQPage`
  - Hubs: `CollectionPage` + `BreadcrumbList`
  - Root layout: `WebSite` + `Organization`
- **FAQPage** comes only from the explicit `faqs` frontmatter block. Deriving
  it from question-shaped H2s is gone — guessing which headings were questions
  produced entries whose "answer" was whatever paragraph happened to follow.
  Worth knowing this is close to inert: Google restricted FAQ rich results to
  government and health sites in 2023. It's emitted because it correctly
  describes the page, not because it will render.
- **Breadcrumbs**: `<Breadcrumbs items>` and `breadcrumbSchema(items)` take the
  same array. Always pass both the same variable so they cannot drift.
- **sitemap.xml** excludes `/pool-repair` and any tool with
  `status: 'planned'`. If it is not indexable, it is not in the sitemap.
- **/feed.xml** is RSS 2.0, `force-static`, built from all articles.

---

## Homepage

Section order is the argument. A visitor arrives mid-problem, on a phone, next
to a green pool.

1. `Hero` — "What's Wrong With Your Pool? Here's What Fixes It." + 4 cards
2. `SymptomIndex` — the long tail: symptom -> the product that fixes it
3. `TopPicks` — #1 pick per high-volume category, from `winner: true`
4. `SeasonalBlock` — what to buy this month, from `lib/seasonal.js`
5. `ToolsStrip` — calculators, which feed sized recommendations
6. `BrandChips` — shop by the brand already on the equipment pad
7. `EmailCapture` — flag-gated until wired
8. `RepairCTA` — monetize what DIY did not solve
9. `TransparencyNote` — how we get paid, before the footer

`TrustStrip` is deliberately NOT rendered: every stat in it was an unverified
placeholder, and an unsubstantiated credibility claim is worse than none. Fill
`lib/authors.js` with real credentials first.

`TopPicks` renders nothing until a page carries `winner: true`, so the homepage
degrades cleanly while the catalog fills.

**The symptom index is the differentiator. Do not turn it into a department
menu.** Several rows deliberately talk the reader out of a purchase ("clean it
before you replace it", "not more shock"). That is the reason symptom traffic
converts here and not on a catalog. Keep it.

Every homepage section is a server component. The page ships no client JS of
its own. Check the build output before adding anything.

## Design system

Strict two colors plus neutrals. Defined in `tailwind.config.js`.

- `pool-*` — deep pool blue. **Primary.** Structure, headings, links, trust.
- `accent-*` — warm orange. **CTAs only.** Never body text, never structure.
- `slate-*` — neutrals.

Do not add a third hue. Use `.btn-primary` (accent) and `.btn-secondary` (pool
outline) from `globals.css` rather than restyling buttons per page.

⚠️ **Dark backgrounds need an explicit heading colour.** The base layer in
`globals.css` paints every `h1`–`h4` `text-pool-900`. On a `pool-800` section
that renders navy-on-navy — invisible, and it still passes a build and any
markup-level check. Any heading on a dark background must set `text-white`
itself. This shipped once already; check dark sections in a real screenshot,
not just in the HTML.

Mobile-first. The header nav is a CSS-only `<details>` menu — **no client
components in the shell**, which is why First Load JS is ~87 kB shared and the
site should beat WordPress competitors on Core Web Vitals. Keep it that way:
before adding `'use client'` anywhere, check whether CSS can do it.

Accessibility is not optional: visible `:focus-visible` rings globally, a skip
link, `prefers-reduced-motion` honored, labelled scroll regions on tables.

---

## Adding things

**A new article** → create `content/<category>/<slug>.mdx` with valid
frontmatter. The route, sitemap entry, RSS item, and hub card all appear
automatically. Nothing else to register.

**A new product** → add an entry to `lib/products.js`, reference it by id.

**A new state** → add to `lib/states.js`, then add
`content/regional/<slug>.mdx`. Listed-but-unwritten states render as "Coming
soon"; the page only exists once the MDX does.

**A new calculator** → add to `lib/tools.js`, build the component under
`components/tools/`, mount it in `app/tools/[slug]/page.js` in place of the
placeholder, and flip `status` off `'planned'` to make it indexable.

**A new category** → this is a schema change. Ask first. It touches
`lib/categories.js`, a `content/` folder, and an `app/` directory.

---

## Known TODOs

- `/pool-repair` is a **shell**: no `action`, submit disabled, page `noindex`.
  Setup steps are in the file header. A honeypot field is already in place.
- `/tools/*` are shells, all `status: 'planned'` and therefore `noindex`.
- `content/**` files are placeholder scaffolds that exercise every component.
  Replace them; do not ship them.
- `lib/products.js` holds 3 placeholder entries with fake ASINs.
- `lib/authors.js` is entirely placeholder. Homepage trust strip renders
  `UNVERIFIED` tags until each point is substantiated and flipped to
  `verified: true`.
- `features.emailCapture` is off; `<EmailCapture>` needs a provider and a POST
  handler before it renders.
- ~20 of the 24 symptoms in `lib/symptoms.js` have no article yet and render
  as muted "soon" text.
- `/privacy-policy` and `/terms` are outlines, not legal documents. Get counsel
  before collecting a single lead.
- Missing assets referenced by metadata: `/public/og-default.png` (1200×630) and
  `/public/logo.png`.

---

## Session discipline

**Never research and write in the same session.** Firecrawl and article writing
compete for the same budget, and the writing loses.

- **Research sessions** — Firecrawl only. Scrape, extract the mechanism, append
  to `content/research/*.json`, move on. Never hold more than one scraped page
  in context. Target 8–12 verified tips, then push and stop.
- **Writing sessions** — repo only. No web fetching. A fact you don't have
  becomes `[VERIFY: what's needed]` and you continue; verification is a research
  session's job. **Three articles per session**, then build, update HANDOFF.md,
  push, stop. If you're running low mid-article, finish that article properly —
  never start a fourth to fill space.

**`HANDOFF.md` is the session boundary.** Read it and this file at the start of
every session; read nothing else unless the task needs it. Rewrite it at the
end. Under 40 lines.

**`content/research/tips.json` is the tip bank's source of truth**, not the
spreadsheet. A tip is `candidate` until confirmed against a readable source with
the URL logged.

**A candidate tip may be assigned and written against while the article is
`status: scaffold`. Verification gates `live`, not writing.** Otherwise every
writing session blocks on a research session, which is the interleaving that
caused the context problem in the first place. Sourcing a candidate is a
research-session job; it must be done before the article flips to `live`, and
not before.

The candidate/verified split exists to stop *invented* mechanisms that sound
plausible — not to re-litigate standard practice. Judge accordingly.

## Working rules

- **Always run `npm run build` and confirm it passes before committing.**
- Never commit or push on a failed build. Report the error instead.
- If a build error survives three attempts, stop and report. Do not start
  rewriting unrelated files.
- Ask before structural decisions: new routes, new dependencies, changes to the
  frontmatter schema.
