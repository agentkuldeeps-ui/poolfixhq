/**
 * One-shot scaffold for the product-review taxonomy.
 *
 * Every category route is identical except for its slug, so generating them
 * keeps the 13 pairs genuinely in sync rather than nominally in sync. Re-runs
 * are safe: existing files are left alone unless --force is passed.
 *
 * Delete this script once the taxonomy stops moving.
 */
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { categories, reviewIndexes } from '../lib/categories.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const force = process.argv.includes('--force')

const RETIRED = ['problems', 'equipment', 'chemistry', 'guides', 'regional']

function write(rel, body) {
  const p = join(ROOT, rel)
  if (existsSync(p) && !force) {
    console.log(`  skip   ${rel}`)
    return
  }
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, body)
  console.log(`  write  ${rel}`)
}

/* ----------------------------------------------- remove the old taxonomy */

for (const slug of RETIRED) {
  for (const rel of [`app/${slug}`, `content/${slug}`]) {
    const p = join(ROOT, rel)
    if (existsSync(p)) {
      rmSync(p, { recursive: true, force: true })
      console.log(`  remove ${rel}`)
    }
  }
}

/* --------------------------------------------------- category hub routes */

const hub = (c) => `import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['${c.slug}']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/${c.slug}',
})

export default function CategoryHubPage() {
  return <CategoryHub category={category} />
}
`

const detail = (c) => `import { notFound } from 'next/navigation'
import ArticlePage from '@/components/ArticlePage'
import { getArticle, getSlugs } from '@/lib/content'
import { articleMetadata } from '@/lib/seo'

const CATEGORY = '${c.slug}'

/** Only slugs with a matching MDX file exist. Anything else is a real 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return getSlugs(CATEGORY)
}

export function generateMetadata({ params }) {
  const article = getArticle(CATEGORY, params.slug)
  return article ? articleMetadata(article) : {}
}

export default function ReviewRoute({ params }) {
  const article = getArticle(CATEGORY, params.slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
`

for (const c of categories) {
  write(`app/${c.slug}/page.js`, hub(c))
  write(`app/${c.slug}/[slug]/page.js`, detail(c))
  mkdirSync(join(ROOT, 'content', c.dir), { recursive: true })
  const keep = join(ROOT, 'content', c.dir, '.gitkeep')
  if (!existsSync(keep)) writeFileSync(keep, '')
}

/* ------------------------------------------------ /product-reviews index */

write(
  'app/product-reviews/page.js',
  `import ReviewIndexHub from '@/components/ReviewIndexHub'
import { reviewIndexes } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Product Reviews',
  description:
    'Every pool product review, roundup and head-to-head comparison on the site, organised by what you are trying to decide.',
  path: '/product-reviews',
})

export default function ProductReviewsPage() {
  return <ReviewIndexHub indexes={reviewIndexes} />
}
`,
)

write(
  'app/product-reviews/[index]/page.js',
  `import { notFound } from 'next/navigation'
import ReviewListing from '@/components/ReviewListing'
import { reviewIndexes } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return reviewIndexes.map((i) => ({ index: i.slug }))
}

export function generateMetadata({ params }) {
  const index = reviewIndexes.find((i) => i.slug === params.index)
  if (!index) return {}
  return buildMetadata({
    title: index.title,
    description: index.description,
    path: \`/product-reviews/\${index.slug}\`,
  })
}

export default function ReviewListingRoute({ params }) {
  const index = reviewIndexes.find((i) => i.slug === params.index)
  if (!index) notFound()
  return <ReviewListing index={index} />
}
`,
)

console.log('\nscaffold complete')
