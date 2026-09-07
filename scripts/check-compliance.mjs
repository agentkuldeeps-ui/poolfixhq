/**
 * Amazon Associates compliance checker. Runs after `next build`, fails it.
 *
 * lib/frontmatter.js validates MDX as it loads. This is the second net: it
 * scans rendered HTML plus JSX source, so a price hardcoded into a component
 * -- somewhere frontmatter validation never looks -- cannot ship either.
 *
 * Each rule is a build failure rather than a warning because each one is a
 * term of the operating agreement, not a style preference:
 *
 *  1. NO PRICES. We have no live price feed, so any price is one we typed
 *     once and will not maintain. Stale prices are the single most common
 *     Associates violation. price_tier instead.
 *  2. NO DISCOUNT OR STOCK CLAIMS. Same reason and they age faster.
 *  3. EVERY AMAZON LINK NEEDS tag= AND rel="sponsored nofollow". Untagged
 *     earns nothing; unmarked is a Google problem.
 *  4. NO SHORTENERS. Cloaking is prohibited and hides the destination.
 *  5. NO AMAZON-HOSTED IMAGES until Creators API access is granted -- 10
 *     qualifying sales in a rolling 30 days (PA-API v5 retired 15 May 2026).
 *  6. NO AFFILIATE LINKS IN THE FEED. RSS gets republished elsewhere.
 *  7. DISCLOSURE ON ANY PAGE THAT LINKS TO AMAZON.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const APP = join(ROOT, '.next', 'server', 'app')

const errors = []
const warnings = []
const rel = (p) => relative(ROOT, p)

const PRICE = /(\$\s?\d[\d,]*(?:\.\d{2})?|\bUSD\s?\d|\b\d[\d,.]*\s?dollars\b)/i

const CLAIMS = [
  [/\b\d+%\s*off\b/i, 'discount claim'],
  [/\bon sale\b/i, 'sale claim'],
  [/\bwas \$/i, 'was-price claim'],
  [/\blowest price\b/i, 'price claim'],
  [/\bcheapest price\b/i, 'price claim'],
  [/\bonly \d+ left\b/i, 'stock claim'],
  [/\bin stock\b/i, 'stock claim'],
  [/\bout of stock\b/i, 'stock claim'],
  [/\bprime day\b/i, 'time-limited promo'],
  [/\bblack friday deal\b/i, 'time-limited promo'],
]

const AMAZON_IMG = /(?:m\.media-amazon\.com|images-na\.ssl-images-amazon\.com)/i

function walk(dir, filter = () => true) {
  if (!existsSync(dir)) return []
  const out = []
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules' || n.startsWith('.')) continue
    const p = join(dir, n)
    if (statSync(p).isDirectory()) out.push(...walk(p, filter))
    else if (filter(n)) out.push(p)
  }
  return out
}

/* ------------------------------------------------- source scan: 1 and 2 */

const contentFiles = walk(join(ROOT, 'content'), (n) => n.endsWith('.mdx'))
const sourceFiles = [
  ...walk(join(ROOT, 'components'), (n) => /\.(jsx?|mjs)$/.test(n)),
  ...walk(join(ROOT, 'app'), (n) => /\.(jsx?|mjs)$/.test(n)),
  ...walk(join(ROOT, 'lib'), (n) => /\.(jsx?|mjs)$/.test(n)),
]

for (const file of [...contentFiles, ...sourceFiles]) {
  const lines = readFileSync(file, 'utf8').split('\n')

  lines.forEach((line, i) => {
    // The checkers themselves contain these patterns by necessity.
    if (file.includes(`${'scripts'}/check-`)) return

    const price = PRICE.exec(line)
    if (price)
      errors.push(`${rel(file)}:${i + 1}  price "${price[0].trim()}" — banned sitewide, use price_tier`)

    for (const [re, label] of CLAIMS) {
      const m = re.exec(line)
      if (m) errors.push(`${rel(file)}:${i + 1}  ${label} "${m[0].trim()}" — goes stale, breaks the agreement`)
    }
  })
}

/* -------------------------------------- rendered HTML scan: 3, 4, 5, 7 */

const htmlFiles = walk(APP, (n) => n.endsWith('.html'))
if (!htmlFiles.length)
  warnings.push('no rendered HTML found — run `next build` first for the full check')

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const page = '/' + relative(APP, file).replace(/\.html$/, '').replace(/\/?index$/, '')
  const at = (m) => `${page || '/'}  ${m}`

  let linksToAmazon = false

  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = /href="([^"]*)"/i.exec(tag)?.[1] ?? ''
    if (!/amazon\.[a-z.]+|amzn\.to/i.test(href)) continue
    linksToAmazon = true

    if (!/[?&]tag=[\w-]+/.test(href)) errors.push(at(`Amazon link with no Associates tag: ${href.slice(0, 80)}`))
    if (/TAG-NOT-SET/.test(href))
      errors.push(at('Amazon link carries the placeholder tag — set NEXT_PUBLIC_AMAZON_TAG'))

    const rels = (/rel="([^"]*)"/i.exec(tag)?.[1] ?? '').toLowerCase()
    if (!rels.includes('sponsored') || !rels.includes('nofollow'))
      errors.push(at(`Amazon link missing rel="sponsored nofollow": ${href.slice(0, 80)}`))

    if (/amzn\.to|bit\.ly|tinyurl/i.test(href))
      errors.push(at(`shortened affiliate link — cloaking is not allowed: ${href.slice(0, 80)}`))
  }

  if (linksToAmazon && !/Disclosure:|affiliate link/i.test(html))
    errors.push(at('links to Amazon but renders no visible affiliate disclosure'))

  const img = AMAZON_IMG.exec(html)
  if (img)
    errors.push(
      at(
        `references ${img[0]} — Amazon-hosted images require Creators API access (10 qualifying sales in a rolling 30 days). Use manufacturer press images until then.`,
      ),
    )
}

/* ------------------------------------------------------------ 6: feeds */

for (const f of ['feed.xml.body', 'llms.txt.body']) {
  const p = join(APP, f)
  if (!existsSync(p)) continue
  const text = readFileSync(p, 'utf8')
  if (/amazon\.[a-z.]+|amzn\.to|[?&]tag=/i.test(text))
    errors.push(`${f} contains an affiliate link — not allowed in RSS or syndicated output`)
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
  console.error('\n  FAIL:\n')
  for (const e of errors) console.error(`    ${e}`)
  console.error('')
  process.exit(1)
}

console.log('  PASS -- no prices, no stale claims, every Amazon link tagged and marked\n')
