/**
 * Amazon Associates compliance checks. Runs after `next build`, fails the build.
 *
 * lib/frontmatter.js already validates MDX content as it loads. This script is
 * the second net: it scans the RENDERED HTML plus the JSX source, so a price
 * hardcoded into a component -- somewhere frontmatter validation never looks --
 * cannot ship either.
 *
 * The rules encoded here, and why each one is a build failure rather than a
 * warning:
 *
 *  1. NO PRICES. We are not pulling live pricing from Amazon's API, so any
 *     price we print is a number we typed once and will not maintain. Stale
 *     prices are the single most common Associates violation. price_tier only.
 *
 *  2. NO DISCOUNT OR STOCK CLAIMS. Same reason, and "only 3 left" ages worse
 *     than a price does.
 *
 *  3. EVERY AMAZON LINK NEEDS rel="sponsored nofollow" AND THE TAG. A link
 *     without the tag earns nothing. A link without rel is a Google problem.
 *
 *  4. NO AMAZON-HOSTED IMAGES UNTIL THE CREATORS API IS LIVE. Hotlinking
 *     m.media-amazon.com without API access is outside the agreement. The
 *     remotePatterns entry in next.config.mjs stays so the switch is a
 *     one-line change once 10 qualifying sales unlock credentials.
 *
 *  5. NO AFFILIATE LINKS IN THE FEED. RSS bodies are republished elsewhere and
 *     the agreement does not allow affiliate links to travel that way.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const warnings = []

/* ------------------------------------------------------------------ rules */

const PRICE = /(\$\s?\d[\d,]*(?:\.\d{2})?|\bUSD\s?\d|\b\d+\s?dollars\b)/i

const SALES_CLAIMS = [
  /\b\d+%\s*off\b/i,
  /\bon sale\b/i,
  /\bwas \$/i,
  /\blowest price\b/i,
  /\bonly \d+ left\b/i,
  /\bin stock\b/i,
  /\bout of stock\b/i,
  /\bprime day\b/i,
  /\bblack friday deal\b/i,
]

const AMAZON_HOST = /(?:m\.media-amazon\.com|images-na\.ssl-images-amazon\.com)/i

/** Words that legitimately contain a dollar-looking string in our own copy. */
const PRICE_ALLOWLIST = [
  // The affiliate disclosure and transparency copy talk about money in the
  // abstract ("we earn a commission"), never about a specific price.
]

function walk(dir, filter) {
  if (!existsSync(dir)) return []
  const out = []
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p, filter))
    else if (filter(name)) out.push(p)
  }
  return out
}

const rel = (p) => relative(ROOT, p)

/* ------------------------------------------------- 1 & 2: prices, claims */

const contentFiles = walk(join(ROOT, 'content'), (n) => n.endsWith('.mdx'))
const sourceFiles = [
  ...walk(join(ROOT, 'components'), (n) => n.endsWith('.jsx') || n.endsWith('.js')),
  ...walk(join(ROOT, 'app'), (n) => n.endsWith('.js') || n.endsWith('.jsx')),
]

for (const file of [...contentFiles, ...sourceFiles]) {
  const text = readFileSync(file, 'utf8')

  text.split('\n').forEach((line, i) => {
    if (PRICE_ALLOWLIST.some((a) => line.includes(a))) return

    const price = PRICE.exec(line)
    if (price)
      errors.push(
        `${rel(file)}:${i + 1}  price "${price[0].trim()}" -- prices are banned sitewide, use price_tier`,
      )

    for (const claim of SALES_CLAIMS) {
      const m = claim.exec(line)
      if (m)
        errors.push(
          `${rel(file)}:${i + 1}  discount/stock claim "${m[0].trim()}" -- these go stale and break the agreement`,
        )
    }
  })
}

/* ------------------------------------------- 3, 4 & 5: rendered HTML pass */

const APP_OUT = join(ROOT, '.next', 'server', 'app')
const htmlFiles = walk(APP_OUT, (n) => n.endsWith('.html'))

if (!htmlFiles.length) {
  warnings.push('no rendered HTML found in .next/server/app -- run `next build` first for the full check')
}

const A_TAG = /<a\b[^>]*>/gi

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const page = rel(file).replace(/^\.next\/server\/app/, '').replace(/\.html$/, '') || '/'

  for (const tag of html.match(A_TAG) ?? []) {
    const href = /href="([^"]*)"/i.exec(tag)?.[1] ?? ''
    if (!/amazon\.[a-z.]+|amzn\.to/i.test(href)) continue

    if (!/[?&]tag=[\w-]+/.test(href))
      errors.push(`${page}  Amazon link with no Associates tag: ${href.slice(0, 90)}`)

    const rels = /rel="([^"]*)"/i.exec(tag)?.[1]?.toLowerCase() ?? ''
    if (!rels.includes('sponsored') || !rels.includes('nofollow'))
      errors.push(`${page}  Amazon link missing rel="sponsored nofollow": ${href.slice(0, 90)}`)

    if (/amzn\.to|bit\.ly|tinyurl/i.test(href))
      errors.push(`${page}  shortened affiliate link -- cloaking is not allowed: ${href.slice(0, 90)}`)
  }

  const img = AMAZON_HOST.exec(html)
  if (img)
    errors.push(
      `${page}  references ${img[0]} -- Amazon-hosted images need Creators API access first ` +
        '(10 qualifying sales in a rolling 30 days). Use manufacturer press images until then.',
    )
}

/* ------------------------------------------------------- 5: the RSS feed */

const feed = join(APP_OUT, 'feed.xml.body')
if (existsSync(feed)) {
  const xml = readFileSync(feed, 'utf8')
  if (/amazon\.[a-z.]+|amzn\.to|[?&]tag=/i.test(xml))
    errors.push('feed.xml contains an affiliate link -- affiliate links are not allowed in RSS or email')
}

/* ---------------------------------------------------------------- report */

for (const w of warnings) console.warn(`  warn  ${w}`)

console.log('')
console.log('  Amazon Associates compliance')
console.log('  ----------------------------------------------------------')
console.log(`  content files      ${contentFiles.length}`)
console.log(`  source files       ${sourceFiles.length}`)
console.log(`  rendered pages     ${htmlFiles.length}`)
console.log(`  violations         ${errors.length}`)
console.log('  ----------------------------------------------------------')

if (errors.length) {
  console.error('\n  FAIL -- compliance violations:\n')
  for (const e of errors) console.error(`    ${e}`)
  console.error('')
  process.exit(1)
}

console.log('  PASS -- no prices, no stale claims, every Amazon link tagged\n')
