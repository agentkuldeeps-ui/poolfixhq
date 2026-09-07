# CLAUDE.md — poolfixhq.com

Source of truth for how this codebase works. Read this before touching
anything. Where this file and any other instruction disagree on a technical
detail, **this file wins**.

`REVIEW_STANDARD.md` covers how a page gets written. This file covers how the
machine works.

---

## What this site is

An Amazon Associates product-review site for swimming pool equipment and
chemicals, aimed at US residential pool owners. Thirteen product categories,
four page types, no editorial/diagnostic content.

Built 2026-09-07 as a clean rebuild. The previous diagnostic site is on the
`archive/diagnostic-content` branch and at the `pre-rebuild-2026-09-07` tag.

---

## Stack

| Thing | Choice | Why |
|---|---|---|
| Framework | Next.js 14.2, App Router | Every route static or SSG; no server needed |
| Styling | Tailwind 3.4 + typography plugin | No component library, no runtime CSS-in-JS |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` | Compiled server-side; **zero client JS for article bodies** |
| Host | Vercel, auto-deploy from `main` | |
| Language | Plain JavaScript + JSX. No TypeScript. | `pageExtensions` is `['js','jsx']` |

Every route in the build output must be `○ (Static)` or `● (SSG)`. **If a
change turns a route dynamic, that is a bug** — a client component or a
request-time API crept in.

There is exactly **one client component on the site**:
`components/mdx/ComparisonTable.jsx`, which needs state for the filter bar. It
renders the full unfiltered table server-side first, so crawlers and answer
engines see every row in the initial HTML.

---

## Commands

```bash
npm run dev              # localhost:3000
npm run build            # next build + all three checks. MUST pass before any commit
npm run check            # all three checks (needs a build first)
npm run check:links      # internal links
npm run check:seo        # titles, headings, canonical, alt, schema, answer blocks
npm run check:compliance # Amazon Associates rules
```

`npm run build` fails on any check failure. That is the point — every rule
below is enforced by a script, not by memory.

---

## Directory map

```
app/
  <category>/page.js          13 category hubs, 4-line wrappers over CategoryHub
  <category>/[slug]/page.js   review / roundup / comparison pages
  reviews/                    listing hub + best-of | comparisons | all
  brands/[brand]/             shop by brand system (the compat tag)
  authors/[slug]/             author bio pages -- the E-E-A-T layer
  how-we-test/                the method page. Linked from every hub
  sitemap.js robots.js        generated, read the same status field
  feed.xml/ llms.txt/         route handlers
components/
  mdx/                        the review kit, bound in mdx/index.js
lib/
  taxonomy.js                 THE taxonomy: categories, subcategories, tags, criteria
  frontmatter.js              schema, validation, compliance failures
  content.js                  MDX loading, derived fields
  authors.js                  author entities. READ THE WARNING AT THE TOP
  schema.js                   JSON-LD builders
  seo.js                      the single buildMetadata()
  site.js                     identity, amazonTag, feature flags
content/<category>/*.mdx      one file per page. Folder must match frontmatter
scripts/                      the three checkers + route scaffold
```

`scripts/scaffold.mjs` regenerates the 13 category route pairs from
`lib/taxonomy.js`. Run it after adding a category; it skips existing files
unless you pass `--force`.

---

## Content model

Four page types, set by `type`:

| `type` | What it is | Schema.org | Word floor |
|---|---|---|---|
| `review` | One product, in depth | `Product` + `Review` | 900 |
| `roundup` | Best-of for a category | `ItemList` | 1200 |
| `comparison` | Head-to-head, two products | `Product` ×2 | 900 |
| `guide` | Buying guide, no single product | `WebPage` | 800 |

**Never emit `AggregateRating`.** We do not aggregate third-party ratings and
claiming to is a structured-data violation. `check-seo.mjs` fails the build if
it appears. Our own score goes in `Review.reviewRating`.

**Never emit `offers` with a price.** We have no live price feed.

### Frontmatter

`lib/frontmatter.js` is the authority. **Unknown keys fail the build** — a
typo'd field that silently does nothing is the worst failure mode a content
schema can have, because it looks like it worked.

```yaml
title:            # <= 70 chars
seoTitle:         # optional, <= 60. Add one whenever title > 60
slug:             # must match the filename
type:             # review | roundup | comparison | guide
category:         # must match the folder
subcategory:      # optional, validated against that category's list
primaryKeyword:   # the query someone types. Not an internal label
metaDescription:  # 70-155 chars
answer:           # 40-320 chars. THE most important field -- see below
author:           # must exist in lib/authors.js
reviewedBy:       # optional, must be a DIFFERENT person from author
datePublished:
dateModified:
status:           # scaffold | live   -- scaffold is noindex,follow
techNote:         # optional slug; if set, the body MUST render <TechNote>
products:
  - name:         # required
    asin:         # optional, but must be 10 uppercase alphanumeric if present
    brand: model:
    compat:       # hayward | pentair | jandy | polaris | dolphin | intex | bestway | n/a
    badge:        # roundups: best-overall | best-budget | best-premium | also-great
    rating:       # 0-5, one decimal
    price_tier:   # budget | mid | premium   -- NEVER a dollar figure
    bestFor: notFor:
    specs: {}     # label -> value
    fits: {}      # per-product override of the pool tags
pool_type:        # inground | above-ground | both
sanitizer:        # chlorine | salt | both
filter_type:      # cartridge | sand | de | any
surface:          # plaster | vinyl | fiberglass | tile | any
gallons:          # lt10k | 10-20k | 20-35k | 35k+ | any
winner:           # true puts this on the homepage Top Picks strip
sources:          # required. Real URLs, structurally validated
faqs:             # each answer >= 40 chars
relatedSlugs: featured:
```

### The `answer` field

The single highest-leverage field on the page. It is rendered as the first
block after the H1, named in the `speakable` selector in JSON-LD, used as the
RSS summary, used as the card excerpt in every listing, and written into
`llms.txt`. One source, five consumers.

It must **state the conclusion with no preamble.** The build rejects an answer
starting "Here's what we found" or "In this review we'll look at" — that is
worthless to an answer engine and to a reader.

---

## The three checkers

### check-links.mjs
Every internal href must resolve to a route that the build actually produced.
Routes are derived from the build output, so adding a route never means
editing this script. `/_next/*` is ignored — those are hashed build assets,
not routes.

### check-seo.mjs
Against rendered HTML, because that is what a crawler sees.

**Failures:** missing or duplicate `<title>`, missing or duplicate meta
description, zero or multiple `<h1>`, missing canonical on an indexable page,
`<img>` with no `alt`, `og:image` pointing at a file that does not exist in
`/public`, malformed JSON-LD, any `AggregateRating`.

**Warnings:** title or description length, heading-level jumps, a content page
with no `.answer-block`, and every E-E-A-T gap in `lib/authors.js`.

### check-compliance.mjs
Amazon Associates rules, against both source and rendered HTML.

**All failures:**
1. **Any dollar figure**, anywhere — content, components, frontmatter. We have
   no live price feed, so a published price is one we typed once and will not
   maintain. Stale prices are the most common Associates violation. Use
   `price_tier`.
2. **Discount or stock claims** — "20% off", "in stock", "only 3 left".
3. **An Amazon link without `tag=`** (earns nothing) or without
   `rel="sponsored nofollow"`.
4. **A shortened link** — `amzn.to`, `bit.ly`. Cloaking is prohibited.
5. **Amazon-hosted images.** Hotlinking `m.media-amazon.com` requires Creators
   API access: **10 qualifying sales in a rolling 30-day window**. PA-API v5
   retired 15 May 2026. `next.config.mjs` already lists the hosts so the
   switch is one line, and `features.amazonImages` is the flag.
6. **An affiliate link in `feed.xml` or `llms.txt`.** Syndicated output gets
   republished where we do not control it.
7. **A page linking to Amazon with no visible disclosure.**

`components/mdx/AffiliateButton.jsx` is the only component permitted to emit
an Amazon link, and it makes 1, 3 and 4 structurally true.

---

## E-E-A-T

`lib/authors.js` carries a hard rule in a comment block. It is the most
important comment in the repo:

> **Every field must be true.** Do not invent a person, a certification, a job
> title, an employer, a number of years, or a number of pools serviced.

`placeholder: true` on an author means:
- their bio page is **noindex**
- **no Person schema** is emitted for them anywhere
- the build warns

The structure is complete and the site builds, but nothing is asserted about
someone who does not exist. Remove the flag only when every field under it is
verifiable.

**This is the single biggest gap on the site right now**, and it is not a code
problem — it needs a real named person.

Everything else in the layer is built: `AuthorByline` (author, reviewer, last
updated, reading time), `/authors/[slug]`, `Person` + `hasCredential` schema,
`/how-we-test`, and per-category `buyingCriteria` published *before* any
product is scored against them, which is what makes a rating auditable.

---

## AEO and GEO

- **`.answer-block`** on every content page, named in `speakable` JSON-LD.
- **`FAQPage`** built from the same `faqs` array the page renders, so visible
  text and structured data always match. 40-char floor per answer.
- **`llms.txt`** at `/llms.txt` — generated, states what we do and explicitly
  what we do **not** claim, so a model that reads it is less likely to
  attribute something false to us.
- **AI crawlers are allowed** in `robots.js`, named individually. This is a
  deliberate trade documented in that file: an engine that cannot read the
  page cannot cite it. Reverse it only as a business decision.
- Real `<table>` markup for specs, real headings, real lists. Answer engines
  parse structure; a styled `<div>` grid is invisible to them.

---

## Design system

Tailwind tokens in `tailwind.config.js`.

- **`pool`** — primary, deep blue. Structure, headers, links. `pool-700`
  (#0C4E6E) is the brand anchor.
- **`accent`** — warm orange. **CTAs and affiliate buttons only.** Never body
  text, never structure. If everything is accent, the buy button stops reading
  as the buy button.
- **`verdict`** — good/bad/warn. Used by `RatingBadge`, `ProsCons` and
  `SafetyWarning` only, so "good" and "bad" look identical everywhere.

Components in `app/globals.css`: `.container-page`, `.btn-primary`,
`.btn-secondary`, `.card`, `.eyebrow`, `.link-inline`, `.answer-block`.

---

## Adding things

**A category:** add to `lib/taxonomy.js` (with `buyingCriteria` — not
optional), run `node scripts/scaffold.mjs`, build.

**An author:** add to `lib/authors.js`. Do not remove `placeholder` until
every field is verifiable.

**A review:** see `REVIEW_STANDARD.md`. Copy
`content/pool-cleaners/template-example.mdx`, which is a working reference at
`status: scaffold` showing every block in order.

**A component that renders an Amazon link:** don't. Use `AffiliateButton`.

---

## Known gaps

1. **No real author.** Everything else in the E-E-A-T layer is waiting on it.
2. **`NEXT_PUBLIC_AMAZON_TAG` is unset.** The fallback is a deliberately fake
   value and `check-compliance.mjs` fails the build if it reaches a rendered
   link, so this cannot ship silently.
3. **No product content.** Categories are complete and hubs are useful without
   it, but nothing is published.
4. **No product images.** Blocked on Creators API access. `SpecTable` and
   `VerdictBox` already handle the no-image case.
