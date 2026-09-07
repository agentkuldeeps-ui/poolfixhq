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

`NEXT_PUBLIC_AMAZON_TAG` has a deliberately fake fallback. The compliance
checker fails the build if that fallback reaches a rendered link, so an
untagged affiliate link cannot ship.

## Before publishing anything

1. Set `NEXT_PUBLIC_AMAZON_TAG`.
2. Add a real author to `lib/authors.js` and remove `placeholder: true`. Read
   the comment block at the top of that file first — every field must be true.

## History

Rebuilt from scratch 2026-09-07. The previous diagnostic-content site is at
the `pre-rebuild-2026-09-07` tag and on the `archive/diagnostic-content`
branch.
