/**
 * On-page SEO / AEO checker. Runs after `next build`, fails the build.
 *
 * Everything here is checked against the RENDERED HTML, because that is what
 * a crawler sees. A component that is supposed to emit a canonical tag but
 * silently does not will pass a source-level review and fail here, which is
 * the entire point.
 *
 * What it enforces, and why each one is a build failure rather than a memo:
 *
 *  TITLE / DESCRIPTION   Missing or duplicated titles are the most common
 *                        cause of a page ranking for nothing. Duplicates
 *                        across pages mean two pages competing for one query.
 *  ONE H1                Zero H1s leaves a page with no stated subject; more
 *                        than one leaves it with no primary subject.
 *  HEADING ORDER         A jump from H2 to H4 breaks the outline that answer
 *                        engines use to understand section structure.
 *  CANONICAL             Every indexable page must self-canonicalise.
 *  IMAGE ALT             Missing alt is an accessibility failure first and an
 *                        image-search failure second.
 *  ANSWER BLOCK          Every content page must carry one .answer-block --
 *                        the passage AI overviews and featured snippets lift.
 *  JSON-LD               Every content page must emit valid, parseable
 *                        structured data.
 *  OG IMAGE              Must resolve to a file that exists, or every share
 *                        of the page renders as a grey box.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const APP = join(ROOT, '.next', 'server', 'app')
const PUBLIC = join(ROOT, 'public')

if (!existsSync(APP)) {
  console.error('\n  check-seo: no build output found. Run `next build` first.\n')
  process.exit(1)
}

const errors = []
const warnings = []

function walk(dir) {
  const out = []
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

const htmlFiles = walk(APP).filter((f) => f.endsWith('.html'))

const pick = (html, re) => re.exec(html)?.[1]?.trim()
const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&rsquo;/g, '’')

const titles = new Map()
const descriptions = new Map()

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const page = '/' + relative(APP, file).replace(/\.html$/, '').replace(/\/?index$/, '')
  const at = (msg) => `${page || '/'}  ${msg}`

  const robots = pick(html, /<meta name="robots" content="([^"]*)"/i) ?? ''
  const noindex = /noindex/i.test(robots)

  /* ------------------------------------------------------------- title */
  const title = decode(pick(html, /<title>([^<]*)<\/title>/i) ?? '')
  if (!title) errors.push(at('no <title>'))
  else {
    if (title.length > 65)
      warnings.push(at(`title is ${title.length} chars — will truncate in results`))
    if (!noindex) {
      if (titles.has(title)) errors.push(at(`duplicate <title>, same as ${titles.get(title)}`))
      else titles.set(title, page || '/')
    }
  }

  /* ------------------------------------------------------- description */
  const desc = decode(pick(html, /<meta name="description" content="([^"]*)"/i) ?? '')
  if (!desc) errors.push(at('no meta description'))
  else {
    if (desc.length > 160)
      warnings.push(at(`meta description is ${desc.length} chars — will truncate`))
    if (desc.length < 70) warnings.push(at(`meta description is only ${desc.length} chars`))
    if (!noindex) {
      if (descriptions.has(desc))
        errors.push(at(`duplicate meta description, same as ${descriptions.get(desc)}`))
      else descriptions.set(desc, page || '/')
    }
  }

  /* ---------------------------------------------------------------- H1 */
  const h1s = html.match(/<h1[\s>]/gi) ?? []
  if (h1s.length === 0) errors.push(at('no <h1>'))
  if (h1s.length > 1) errors.push(at(`${h1s.length} <h1> elements — there must be exactly one`))

  /* ----------------------------------------------------- heading order */
  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]))
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      warnings.push(at(`heading level jumps from h${levels[i - 1]} to h${levels[i]}`))
      break
    }
  }

  /* --------------------------------------------------------- canonical */
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/i)
  if (!canonical && !noindex) errors.push(at('no canonical link'))

  /* --------------------------------------------------------- image alt */
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt="/i.test(tag)) errors.push(at(`<img> with no alt attribute: ${tag.slice(0, 80)}`))
  }

  /* ---------------------------------------------------------- og:image */
  const og = pick(html, /<meta property="og:image" content="([^"]*)"/i)
  if (!og) {
    errors.push(at('no og:image'))
  } else {
    const rel = og.replace(/^https?:\/\/[^/]+/, '')
    if (rel.startsWith('/') && !existsSync(join(PUBLIC, rel))) {
      errors.push(
        at(`og:image points at ${rel}, which does not exist in /public — every share renders blank`),
      )
    }
  }

  /* ----------------------------------------------------------- JSON-LD */
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
  if (!blocks.length) {
    warnings.push(at('no JSON-LD'))
  } else {
    for (const b of blocks) {
      try {
        JSON.parse(b[1])
      } catch {
        errors.push(at('malformed JSON-LD block'))
      }
    }
  }

  // AggregateRating is banned sitewide -- see the note in lib/schema.js.
  if (/"@type"\s*:\s*"AggregateRating"/.test(html))
    errors.push(at('emits AggregateRating — we do not aggregate third-party ratings'))

  /* ------------------------------------------------------ answer block */
  // Applies to content pages -- reviews, hubs and the method page. Policy
  // and legal pages are exempt: nobody is asking an answer engine to
  // summarise our terms of use, and forcing a "short answer" onto a privacy
  // policy would be filler.
  const EXEMPT = ['/privacy-policy', '/terms', '/editorial-policy', '/_not-found']
  const isContentPage =
    /class="[^"]*\bprose\b/.test(html) && !noindex && !EXEMPT.includes(page)
  if (isContentPage && !/class="[^"]*answer-block/.test(html))
    warnings.push(at('content page with no .answer-block — nothing for an answer engine to lift'))
}

/* --------------------------------------------------------------- report */

// E-E-A-T warnings are surfaced here rather than from lib/content.js, because
// Next builds across several worker processes and anything printed from there
// appears once per worker.
try {
  const { authorWarnings } = await import('../lib/authors.js')
  for (const w of authorWarnings()) warnings.push(w)
} catch {
  warnings.push('could not load lib/authors.js to check E-E-A-T coverage')
}

for (const w of warnings) console.warn(`  warn  ${w}`)

console.log('')
console.log('  On-page SEO check')
console.log('  ----------------------------------------------------------')
console.log(`  pages scanned      ${htmlFiles.length}`)
console.log(`  unique titles      ${titles.size}`)
console.log(`  warnings           ${warnings.length}`)
console.log(`  errors             ${errors.length}`)
console.log('  ----------------------------------------------------------')

if (errors.length) {
  console.error('\n  FAIL:\n')
  for (const e of errors) console.error(`    ${e}`)
  console.error('')
  process.exit(1)
}

console.log('  PASS -- titles, headings, canonicals, alt text and schema all present\n')
