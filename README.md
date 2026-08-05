# poolfixhq.com

Pool problem diagnosis, repair guides, and product reviews.
Next.js 14 (App Router) + Tailwind + MDX. Deploys to Vercel from `main`.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your Amazon tag
npm run dev
```

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build — must pass before committing
npm start        # serve the production build
```

## Environment

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_AMAZON_TAG` | Amazon Associates tracking tag |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash |

Set both in Vercel → Project → Settings → Environment Variables.

## Adding an article

Drop an MDX file in `content/<category>/<slug>.mdx` with valid frontmatter. The
route, sitemap entry, RSS item, and hub card generate themselves. The build
fails loudly if the frontmatter is wrong.

## Read this first

**[CLAUDE.md](./CLAUDE.md)** is the source of truth for the content schema, the
MDX components, the design system, and the conventions this repo enforces.
