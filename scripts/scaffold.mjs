/**
 * Generates the per-category route pair. Every category route is identical
 * except for its slug, so generating them keeps 13 pairs genuinely in sync
 * rather than nominally in sync.
 *
 * Safe to re-run: existing files are skipped unless --force is passed.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { categories } from '../lib/taxonomy.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const force = process.argv.includes('--force')

function write(rel, body) {
  const p = join(ROOT, rel)
  if (existsSync(p) && !force) return console.log(`  skip   ${rel}`)
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, body)
  console.log(`  write  ${rel}`)
}

const hub = (c) => `import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/taxonomy'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['${c.slug}']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/${c.slug}',
})

export default function Page() {
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

export default function Page({ params }) {
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

console.log('\nscaffold complete')
