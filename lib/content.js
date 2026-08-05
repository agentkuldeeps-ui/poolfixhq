import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { categories, categoryBySlug } from './categories'
import { unknownProductIds } from './products'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

/**
 * FRONTMATTER SCHEMA -- enforced at build time. A file that violates this
 * throws and fails `npm run build` on purpose. Silent bad data is worse than
 * a red build.
 */
const SCHEMA = {
  title: { type: 'string', required: true, max: 70 },
  slug: { type: 'string', required: true, pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/ },
  category: { type: 'string', required: true, oneOf: categories.map((c) => c.slug) },
  quickAnswer: { type: 'string', required: true, min: 40 },
  metaDescription: { type: 'string', required: true, max: 155 },
  lastUpdated: { type: 'date', required: true },
  /**
   * Publication gate. 'scaffold' = placeholder or draft: the page still builds
   * and is reachable, but it is noindex,follow and excluded from sitemap.xml.
   * 'live' = real, sourced content: indexable and listed.
   *
   * Required on purpose -- an author must make a deliberate choice rather than
   * inherit a default. Flipping this one field is the entire publish step.
   */
  status: { type: 'string', required: true, oneOf: ['scaffold', 'live'] },
  products: { type: 'string[]', required: false, default: [] },
  relatedSlugs: { type: 'string[]', required: false, default: [] },
  featured: { type: 'boolean', required: false, default: false },
}

function fail(file, message) {
  throw new Error(`[content] ${file}: ${message}`)
}

function validate(data, file) {
  const out = {}

  for (const [key, rule] of Object.entries(SCHEMA)) {
    const value = data[key]

    if (value === undefined || value === null || value === '') {
      if (rule.required) fail(file, `missing required frontmatter field "${key}"`)
      out[key] = structuredClone(rule.default)
      continue
    }

    switch (rule.type) {
      case 'string':
        if (typeof value !== 'string') fail(file, `"${key}" must be a string`)
        if (rule.max && value.length > rule.max)
          fail(file, `"${key}" is ${value.length} chars, max is ${rule.max}`)
        if (rule.min && value.length < rule.min)
          fail(file, `"${key}" is ${value.length} chars, min is ${rule.min}`)
        if (rule.oneOf && !rule.oneOf.includes(value))
          fail(file, `"${key}" is "${value}", must be one of: ${rule.oneOf.join(', ')}`)
        if (rule.pattern && !rule.pattern.test(value))
          fail(file, `"${key}" must be lowercase kebab-case, got "${value}"`)
        out[key] = value
        break

      case 'date': {
        const d = value instanceof Date ? value : new Date(value)
        if (Number.isNaN(d.getTime())) fail(file, `"${key}" is not a valid date (use YYYY-MM-DD)`)
        out[key] = d.toISOString().slice(0, 10)
        break
      }

      case 'string[]':
        if (!Array.isArray(value)) fail(file, `"${key}" must be a list`)
        if (value.some((v) => typeof v !== 'string'))
          fail(file, `"${key}" must contain only strings`)
        out[key] = value
        break

      case 'boolean':
        if (typeof value !== 'boolean') fail(file, `"${key}" must be true or false`)
        out[key] = value
        break

      default:
        out[key] = value
    }
  }

  const extras = Object.keys(data).filter((k) => !(k in SCHEMA))
  if (extras.length) fail(file, `unknown frontmatter field(s): ${extras.join(', ')}`)

  const missingProducts = unknownProductIds(out.products)
  if (missingProducts.length)
    fail(file, `references product id(s) not in lib/products.js: ${missingProducts.join(', ')}`)

  return out
}

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

/**
 * Read one article. Returns { ...frontmatter, body, readingTime, headings }
 * or null when the file does not exist.
 */
export function getArticle(categorySlug, slug) {
  const file = path.join(categoryDir(categorySlug), `${slug}.mdx`)
  if (!fs.existsSync(file)) return null

  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const rel = `content/${categorySlug}/${slug}.mdx`
  const frontmatter = validate(data, rel)

  if (frontmatter.slug !== slug)
    fail(rel, `frontmatter slug "${frontmatter.slug}" does not match filename "${slug}"`)
  if (frontmatter.category !== categorySlug)
    fail(rel, `frontmatter category "${frontmatter.category}" does not match folder "${categorySlug}"`)

  return {
    ...frontmatter,
    body: content,
    href: `/${categorySlug}/${slug}`,
    headings: extractHeadings(content),
    faqs: extractFaqs(content, frontmatter),
    readingTime: readingTime(content),
  }
}

/** All articles in a category, newest lastUpdated first. */
export function getArticles(categorySlug) {
  return listFiles(categorySlug)
    .map((f) => getArticle(categorySlug, f.replace(/\.mdx$/, '')))
    .filter(Boolean)
    .sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1))
}

/** Every article across every category. */
export function getAllArticles() {
  return categories
    .flatMap((c) => getArticles(c.slug))
    .sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1))
}

/** Slugs for generateStaticParams. */
export function getSlugs(categorySlug) {
  return listFiles(categorySlug).map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

/**
 * Resolve relatedSlugs to real articles. Slugs may be bare ("green-pool-water",
 * searched across all categories) or qualified ("chemistry/free-chlorine").
 * Falls back to same-category articles so the block is never empty on a live page.
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

/**
 * Pull H2s out of the raw MDX for the table of contents. Matches rehype-slug's
 * id generation so the anchors line up. Skips fenced code blocks.
 */
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

/**
 * Build FAQPage entries. The title + quickAnswer pair always seeds the list,
 * then any H2 phrased as a question contributes its first following paragraph
 * as the answer. Nothing here is invented -- if an H2 question has no prose
 * under it, it is skipped rather than answered with filler.
 */
export function extractFaqs(body, frontmatter) {
  const faqs = []

  if (frontmatter?.title && frontmatter?.quickAnswer) {
    faqs.push({ question: frontmatter.title, answer: frontmatter.quickAnswer })
  }

  const lines = body.split('\n')
  let inFence = false

  for (let i = 0; i < lines.length; i += 1) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^##\s+(.+?)\s*#*\s*$/.exec(lines[i])
    if (!match) continue

    const question = match[1].replace(/[*_`]/g, '').trim()
    if (!question.endsWith('?')) continue

    const answer = firstParagraphAfter(lines, i)
    if (answer) faqs.push({ question, answer })
  }

  return faqs
}

/** First plain prose paragraph after line `start`. Skips JSX blocks and blanks. */
function firstParagraphAfter(lines, start) {
  const collected = []

  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i].trim()
    if (!line) {
      if (collected.length) break
      continue
    }
    if (line.startsWith('#')) break
    if (line.startsWith('<')) {
      if (collected.length) break
      continue
    }
    collected.push(line)
  }

  return collected.join(' ').replace(/\s+/g, ' ').trim() || null
}

function readingTime(body) {
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 225))
}
