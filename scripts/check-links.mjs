/**
 * Internal link checker. Runs after `next build`, fails the build.
 *
 * Scans the RENDERED HTML in .next/server/app rather than the source, because
 * most hrefs on this site are built at render time from lib/taxonomy.js and
 * frontmatter -- a source-level grep would miss exactly the links most likely
 * to break.
 *
 * Known routes are derived from the build output itself, so adding a route
 * never requires updating this script.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const APP = join(ROOT, '.next', 'server', 'app')

if (!existsSync(APP)) {
  console.error('\n  check-links: no build output found. Run `next build` first.\n')
  process.exit(1)
}

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

const files = walk(APP)
const htmlFiles = files.filter((f) => f.endsWith('.html'))

/** Every route the build actually produced. */
const routes = new Set(['/'])
for (const f of htmlFiles) {
  const route = '/' + relative(APP, f).replace(/\.html$/, '').replace(/\/?index$/, '')
  routes.add(route === '/' ? '/' : route.replace(/\/$/, ''))
}
// Route handlers (sitemap, robots, feed, llms.txt) produce .body files.
for (const f of files.filter((f) => f.endsWith('.body'))) {
  routes.add('/' + relative(APP, f).replace(/\.body$/, ''))
}
// Static assets served from /public are not in the build output.
for (const f of existsSync(join(ROOT, 'public')) ? walk(join(ROOT, 'public')) : []) {
  routes.add('/' + relative(join(ROOT, 'public'), f))
}

const HREF = /href="(\/[^"#?]*)(?:[#?][^"]*)?"/g

/**
 * Paths this check deliberately ignores.
 *
 * /_next/* is Next's own hashed build output — CSS and chunk preloads that
 * appear in every rendered page's <head>. They resolve at runtime from the
 * static asset handler, never from a route, so treating them as broken routes
 * would fail every build for no reason.
 */
const IGNORE = [/^\/_next\//, /^\/api\//]

const broken = new Map()
let instances = 0
const seen = new Set()

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const page = '/' + relative(APP, file).replace(/\.html$/, '').replace(/\/?index$/, '')

  for (const m of html.matchAll(HREF)) {
    const href = m[1].length > 1 ? m[1].replace(/\/$/, '') : m[1]
    if (IGNORE.some((re) => re.test(href))) continue
    instances += 1
    seen.add(href)
    if (routes.has(href)) continue
    if (!broken.has(href)) broken.set(href, new Set())
    broken.get(href).add(page || '/')
  }
}

console.log('')
console.log('  Internal link check')
console.log('  ----------------------------------------------------------')
console.log(`  pages scanned      ${htmlFiles.length}`)
console.log(`  known routes       ${routes.size}`)
console.log(`  unique hrefs       ${seen.size}`)
console.log(`  link instances     ${instances}`)
console.log(`  broken             ${broken.size}`)
console.log('  ----------------------------------------------------------')

if (broken.size) {
  console.error('\n  FAIL -- these hrefs have no matching route:\n')
  for (const [href, pages] of broken) {
    console.error(`    ${href}`)
    for (const p of pages) console.error(`        linked from  ${p || '/'}`)
  }
  console.error(`\n  ${broken.size} broken link${broken.size === 1 ? '' : 's'}. Fix the href or add the route.\n`)
  process.exit(1)
}

console.log('  PASS -- every internal link resolves to a real route\n')
