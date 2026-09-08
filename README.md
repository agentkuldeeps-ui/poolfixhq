# PoolFixHQ

Pool product reviews. Static Next.js, MDX content, schema-validated
frontmatter, three build-time checkers.

```bash
npm install
npm run dev      # localhost:3000
npm run build    # next build + links + SEO + Amazon compliance
```

`npm run build` fails on any check failure. That is deliberate.

## Docs

- **`CLAUDE.md`** — how the codebase works. Read first.
- **`REVIEW_STANDARD.md`** — how a page gets written, and the intake format.

## Environment

```
NEXT_PUBLIC_SITE_URL=https://poolfixhq.com
NEXT_PUBLIC_AMAZON_TAG=yourtag-20
```

`NEXT_PUBLIC_AMAZON_TAG` has a deliberately fake fallback. `scripts/check-env.mjs`
runs before every build and fails fast if a **live page declares an ASIN** while
the tag is unset, so an untagged affiliate link cannot ship. A site with no
published affiliate links still builds fine without it.

**`.env.local` is gitignored, so setting it on your machine does not set it on
Vercel.** Add both variables under Project → Settings → Environment Variables,
scoped to Production, Preview and Development, then redeploy — Next only reads
them at build time.

## Before publishing anything

1. Set `NEXT_PUBLIC_AMAZON_TAG` **in Vercel**, not just locally.
2. Add a real author to `lib/authors.js` and remove `placeholder: true`. Read
   the comment block at the top of that file first — every field must be true.

## History

Rebuilt from scratch 2026-09-07. The previous diagnostic-content site is at
the `pre-rebuild-2026-09-07` tag and on the `archive/diagnostic-content`
branch.
