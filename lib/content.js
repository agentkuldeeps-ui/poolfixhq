import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { categories, categoryBySlug } from './taxonomy'
import {
  validateFields,
  runChecks,
  checkUniqueness,
  drainWarnings,
  wordCount,
  fail,
} from './frontmatter'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

/**
 * MDX loading and derived fields. The schema and QC rules live in
 * lib/frontmatter.js; this file owns the filesystem.
 *
 * Everything here runs at build time only. Article bodies are compiled on the
 * server and ship as HTML -- no client JS for content.
 */

function categoryDir(slug) {
  const category = categoryBySlug[slug]
  if (!category) throw new Error(`[content] unknown category "${slug}"`)
  return path.join(CONTENT_ROOT, category.dir)
}

function listFiles(slug) {
  const dir = categoryDir(slug)
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
  const fm = validateFields(data, rel)

  if (fm.slug !== slug)
    fail(rel, `frontmatter slug "${fm.slug}" does not match filename "${slug}"`)
  if (fm.category !== categorySlug)
    fail(rel, `frontmatter category "${fm.category}" does not match folder "${categorySlug}"`)

  runChecks(fm, content, rel)

  return {
    ...fm,
    body: content,
    href: `/${categorySlug}/${slug}`,
    headings: extractHeadings(content),
    words: wordCount(content),
    readingTime: Math.max(1, Math.round(wordCount(content) / 225)),
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

/** Only what should be indexed. Sitemap, listings and counts use this. */
export function getLiveArticles() {
  return getAllArticles().filter((a) => a.status === 'live')
}

export function getByType(type) {
  return getLiveArticles().filter((a) => a.type === type)
}

/** Slugs for generateStaticParams. */
export function getSlugs(categorySlug) {
  return listFiles(categorySlug).map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

/**
 * Resolve relatedSlugs to real articles. Slugs may be bare ("dolphin-e10") or
 * qualified ("pool-cleaners/dolphin-e10"). Unresolvable entries are dropped
 * rather than throwing, so a forward reference to an article not yet written
 * is safe and lights up on its own the day that file lands.
 */
export function getRelated(article, limit = 3) {
  const all = getLiveArticles()
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

/** Top picks for the homepage: one `winner` per category, in the given order. */
export function getWinners(categoryOrder = [], limit = 6) {
  const all = getLiveArticles()
  const order = categoryOrder.length ? categoryOrder : categories.map((c) => c.slug)
  return order
    .map((slug) => all.find((a) => a.category === slug && a.winner))
    .filter(Boolean)
    .slice(0, limit)
}

/** H2s and H3s for the table of contents. Ids mirror rehype-slug. */
export function extractHeadings(body) {
  const headings = []
  let inFence = false

  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue

    const text = match[2].replace(/[*_`]/g, '').trim()
    headings.push({ text, id: slugifyHeading(text), level: match[1].length })
  }
  return headings
}

/** Mirrors github-slugger, which is what rehype-slug uses. */
export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[‘’“”']/g, '')
    .replace(/[^a-z0-9 \-_]/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Print accumulated advisory warnings once per build.
 *
 * Author/E-E-A-T warnings are deliberately NOT reported here: Next builds
 * pages across several worker processes, each with its own module instance,
 * so anything printed from here appears once per worker. Per-article warnings
 * are worth that noise; a site-wide one is not. lib/authors.js warnings are
 * surfaced once, from scripts/check-seo.mjs.
 */
let reported = false
function reportWarnings() {
  if (reported) return
  reported = true

  const unique = [...new Set(drainWarnings())]
  if (!unique.length) return

  console.warn(`\n  Content warnings (${unique.length}) -- advisory, build continues:`)
  for (const line of unique) console.warn(`    ${line}`)
  console.warn('')
}
