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
npm run build        # next build + check:links. MUST pass before any commit
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
app/                      routes (App Router)
  layout.js               shell, global metadata, WebSite+Organization JSON-LD
  page.js                 homepage — H1 "What's Wrong With Your Pool?"
  {problems,equipment,chemistry,guides}/page.js       hub → <CategoryHub>
  {problems,equipment,chemistry,guides}/[slug]/page.js article → <ArticlePage>
  regional/page.js        state index grouped by region
  regional/[state]/page.js  regional article (param is [state], not [slug])
  tools/                  calculator index + shells
  pool-repair/            lead capture SHELL — not wired up
  about|editorial-policy|affiliate-disclosure|privacy-policy|terms/
  sitemap.js robots.js feed.xml/route.js
components/
  home/                   the 10 homepage sections (see "Homepage" below)
  mdx/                    the 8 components authors use inside MDX
  mdx/index.js            component map handed to MDXRemote
  ArticlePage.jsx         shared article shell (every category uses it)
  CategoryHub.jsx         shared hub shell (every category uses it)
  MdxRenderer.jsx         MDXRemote + remark/rehype config
  Header, Footer, ArticleCard, Breadcrumbs, JsonLd, PageHeader,
  ProblemCards, ProsePage
lib/
  authors.js              author + trust-strip data (CONTAINS PLACEHOLDERS)
  seasonal.js             four-season copy for the homepage "right now" block
  symptoms.js             THE SYMPTOM INDEX -- also the content roadmap
  content.js              MDX loading + FRONTMATTER SCHEMA ENFORCEMENT
  products.js             SINGLE SOURCE OF TRUTH for products
  categories.js           the 5 categories
  states.js               regional coverage list
  tools.js                calculator registry
  schema.js               JSON-LD builders
  site.js                 name, URL, tagline, OG defaults
  seo.js                  buildMetadata() — every page's <head> goes through it
content/{problems,equipment,chemistry,guides,regional}/*.mdx
```

---

## Content model

Articles are MDX at `content/<category>/<slug>.mdx`. **Filename must equal the
`slug` frontmatter, and folder must equal the `category` frontmatter.** The build
fails otherwise — that check is in `lib/content.js` and is deliberate.

### Frontmatter schema — enforced at build time

```yaml
---
title: "Green Pool Water: How to Clear It Fast"   # required, ≤ 70 chars
slug: green-pool-water                            # required, kebab-case, == filename
category: problems                                # required, one of the 5 category slugs
quickAnswer: "Green water is almost always algae…" # required, ≥ 40 chars
metaDescription: "Clear a green pool in 24 hours…" # required, ≤ 155 chars
lastUpdated: 2026-08-05                           # required, YYYY-MM-DD
status: scaffold                                  # required, 'scaffold' | 'live'
products:                                         # optional, ids from lib/products.js
  - taylor-k2006
relatedSlugs:                                     # optional, "slug" or "category/slug"
  - chemistry/chlorine-basics
featured: false                                   # optional, bool — homepage "Start Here"
---
```

Validation is strict on purpose. `npm run build` fails on: a missing required
field, a length violation, a bad date, a slug/filename mismatch, an **unknown
frontmatter key**, or a `products` id that does not exist in `lib/products.js`.
Silent bad data is worse than a red build.

To add a field, add it to `SCHEMA` in `lib/content.js`. Nowhere else.

### Publishing an article: the `status` field

`status: scaffold` — placeholder or draft. The page builds and is reachable,
but it is `noindex, follow` and excluded from `sitemap.xml`.

`status: live` — real, sourced content. Indexable and listed in the sitemap.

**Flipping that one field is the entire publish step.** The robots meta tag
(`articleMetadata()` in `lib/seo.js`) and sitemap inclusion (`app/sitemap.js`)
both read it, so they can never disagree. It is `required`, so a new article
must make a deliberate choice — a missing or misspelled value fails the build.

Do not set `status: live` on an article that still contains placeholder copy or
uncited claims.

### Required article structure

Every article, in this order:

1. `<QuickAnswer />` — first, right after the H1. Snippet target.
2. `<TableOfContents />` — auto-built from H2s.
3. Intro with the target keyword in the **first 100 words**, plus one
   first-person tech anecdote.
4. Fixes ordered **easiest → hardest**, each with a "why this works" line.
5. One uncommon tip most sites miss.
6. `## When to Call a Pro` containing `<LeadFormCTA />`.

Also non-negotiable: 8th-grade reading level, 1,400–1,800 words, target keyword
in the title, and the veteran-tech voice — direct, practical, says out loud when
the cheap fix beats the expensive one.

### Sourcing

Cite CDC, EPA, university extension programs, or manufacturer documentation.
**Never invent a statistic, study, or citation.** If a claim cannot be verified,
leave it out.

### Safety

`<SafetyWarning>` is **mandatory** on any article mentioning muriatic acid,
chlorine, shock, or chemical mixing. Never-mix warnings are non-negotiable — do
not soften the copy and do not restyle the component quieter.

---

## Products and affiliate links

`lib/products.js` is the single source of truth.

```js
{ id, asin, title, image, features: [], bestFor, category, badge }
```

MDX references products **by id only**:

```mdx
<ProductBlock id="taylor-k2006" />
<ComparisonTable ids="taylor-k2006, hth-6-way-strips" />
```

Note the comma-separated **string**, not an array literal — see "No JS
expressions in MDX" below.

**Never put an ASIN, an amazon.com URL, or a product image URL in a content
file.** Links are built by `amazonUrl()` from the ASIN plus
`NEXT_PUBLIC_AMAZON_TAG`, so the tag is never hardcoded in source or content.
Outbound product links carry `rel="nofollow sponsored noopener"`. Product ids are
stable keys — never reuse or repurpose one.

Product images use a plain `<img>` with explicit `width`/`height`, not
`next/image`. Deliberate: Amazon image dimensions vary and SVG placeholders would
need `dangerouslyAllowSVG`. Explicit dimensions already prevent layout shift.

---

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
- **FAQPage** entries are derived, never hand-written: title + `quickAnswer`
  seeds the list, then any H2 phrased as a question contributes the first
  paragraph under it. An H2 question with no prose under it is skipped rather
  than answered with filler.
- **Breadcrumbs**: `<Breadcrumbs items>` and `breadcrumbSchema(items)` take the
  same array. Always pass both the same variable so they cannot drift.
- **sitemap.xml** excludes `/pool-repair` and any tool with
  `status: 'planned'`. If it is not indexable, it is not in the sitemap.
- **/feed.xml** is RSS 2.0, `force-static`, built from all articles.

---

## Homepage

`app/page.js` composes ten server components from `components/home/`. **Section
order is the argument** -- it is documented in a comment at the top of
`app/page.js`; read that before reordering anything.

Three things about it are load-bearing:

**The symptom index is the differentiator.** `lib/symptoms.js` lists ~24
symptoms in the reader's own words. Entries whose article does not exist render
as muted text with a "soon" tag, not links -- so the homepage can show the
finished shape of the site without a single 404, and each entry becomes a link
automatically the day its MDX lands. **That file doubles as the content
roadmap**: add the symptom there first, write the article second. Same
published-or-muted pattern in `RegionalFinder`.

**The homepage revalidates daily** (`export const revalidate = 86400`) so
`<SeasonalBlock>` stays current without a redeploy. This is ISR -- still static
HTML, still `○` in the build output. `currentSeason()` resolves on the server;
never move it to the client, or the server and browser clocks disagree and
React throws a hydration error.

**Unwired sections are flag-gated, not commented out.** `features.emailCapture`
in `lib/site.js` is `false`, so `<EmailCapture>` renders nothing. A form that
silently eats addresses costs more trust than no form. Flip the flag only once
a provider and a POST handler exist.

Placeholders that must not ship: `lib/authors.js` is entirely fabricated. The
trust strip renders a loud `UNVERIFIED` tag next to any point with
`verified: false`, deliberately -- an unsubstantiated credibility claim on a
site giving chemical-handling advice should be impossible to ship by accident.

---

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

## Working rules

- **Always run `npm run build` and confirm it passes before committing.**
- Never commit or push on a failed build. Report the error instead.
- If a build error survives three attempts, stop and report. Do not start
  rewriting unrelated files.
- Ask before structural decisions: new routes, new dependencies, changes to the
  frontmatter schema.
