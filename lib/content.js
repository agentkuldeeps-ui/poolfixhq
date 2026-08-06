import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { categories, categoryBySlug } from './categories'
import { validateFields, runChecks, checkUniqueness, drainWarnings, fail } from './frontmatter'
import { productsMissingAsin } from './products'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

/**
 * MDX loading. The frontmatter schema and QC rules live in lib/frontmatter.js;
 * this file handles the filesystem and the derived fields.
 */

function categoryDir(categorySlug) {
  const category = categoryBySlug[categorySlug]
  if (!category) throw new Error(`[content] unknown category "${categorySlug}"`)
  return path.join(CONTENT_ROOT, category.dir)
}

function listFiles(categorySlug) {
  const dir = categoryDir(categorySlug)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
}

/** Read one article, or null when the file does not exist. */
export function getArticle(categorySlug, slug) {
  const file = path.join(categoryDir(categorySlug), `${slug}.mdx`)
  if (!fs.existsSync(file)) return null

  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const rel = `content/${categorySlug}/${slug}.mdx`
  const frontmatter = validateFields(data, rel)

  if (frontmatter.slug !== slug)
    fail(rel, `frontmatter slug "${frontmatter.slug}" does not match filename "${slug}"`)
  if (frontmatter.category !== categorySlug)
    fail(rel, `frontmatter category "${frontmatter.category}" does not match folder "${categorySlug}"`)

  runChecks(frontmatter, content, rel)

  return {
    ...frontmatter,
    body: content,
    href: `/${categorySlug}/${slug}`,
    headings: extractHeadings(content),
    readingTime: readingTime(content),
  }
}

/** All articles in a category, most recently modified first. */
export function getArticles(categorySlug) {
  return listFiles(categorySlug)
    .map((f) => getArticle(categorySlug, f.replace(/\.mdx$/, '')))
    .filter(Boolean)
    .sort((a, b) => (a.dateModified < b.dateModified ? 1 : -1))
}

/** Every article across every category. Uniqueness is enforced here. */
export function getAllArticles() {
  const all = categories
    .flatMap((c) => getArticles(c.slug))
    .sort((a, b) => (a.dateModified < b.dateModified ? 1 : -1))
  checkUniqueness(all)
  reportWarnings()
  return all
}

/** Print accumulated advisory warnings once per build. */
let reported = false
function reportWarnings() {
  if (reported) return
  reported = true
  const w = drainWarnings()
  if (productsMissingAsin.length)
    w.push(
      `[products] no verified ASIN yet: ${productsMissingAsin.join(', ')} — cards render without a buy link`,
    )
  if (!w.length) return
  const unique = [...new Set(w)]
  console.warn(`\n  Content warnings (${unique.length}) — advisory, build continues:`)
  for (const line of unique) console.warn(`    ${line}`)
  console.warn('')
}

/** Slugs for generateStaticParams. */
export function getSlugs(categorySlug) {
  return listFiles(categorySlug).map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

/**
 * Resolve relatedSlugs to real articles. Slugs may be bare ("green-pool-water")
 * or qualified ("chemistry/chlorine-basics"). Falls back to same-category
 * articles so the block is never ragged.
 */
export function getRelated(article, limit = 3) {
  const all = getAllArticles()
  const bySlug = new Map(all.map((a) => [a.slug, a]))
  const byPath = new Map(all.map((a) => [`${a.category}/${a.slug}`, a]))

  const explicit = (article.relatedSlugs || [])
    .map((s) => byPath.get(s) || bySlug.get(s))
    .filter(Boolean)
    .filter((a) => a.slug !== article.slug)

  if (explicit.length >= limit) return explicit.slice(0, limit)

  const chosen = new Set(explicit.map((a) => a.slug))
  const filler = all.filter(
    (a) => a.category === article.category && a.slug !== article.slug && !chosen.has(a.slug),
  )
  return [...explicit, ...filler].slice(0, limit)
}

/** Featured articles for the homepage. */
export function getFeatured(limit = 6) {
  const all = getAllArticles()
  const featured = all.filter((a) => a.featured)
  return (featured.length ? featured : all).slice(0, limit)
}

/** H2s for the table of contents. Ids mirror rehype-slug. */
export function extractHeadings(body) {
  const headings = []
  let inFence = false

  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue

    const text = match[1].replace(/[*_`]/g, '').trim()
    headings.push({ text, id: slugifyHeading(text) })
  }
  return headings
}

/** Mirrors github-slugger, which is what rehype-slug uses. */
export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[‘’“”]/g, '')
    .replace(/[^a-z0-9 \-_]/g, '')
    .replace(/\s+/g, '-')
}

function readingTime(body) {
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 225))
}
