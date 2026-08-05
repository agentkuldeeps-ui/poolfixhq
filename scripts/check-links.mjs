#!/usr/bin/env node
/**
 * Internal link checker -- the guardrail against dead internal links.
 *
 * Runs against the BUILT output, not the source. That is deliberate: most
 * hrefs in this codebase are constructed at render time
 * (`/${category.slug}`, `article.href`, `/tools/${tool.slug}`), so a static
 * scan of the JSX would miss the majority of real links and give false
 * confidence. The rendered HTML in .next/server/app is ground truth.
 *
 * Route inventory is assembled from three sources:
 *   1. every prerendered *.html in .next/server/app  -> page routes
 *   2. route handlers in app/ (route.js, sitemap.js, robots.js)
 *   3. static files under public/
 *
 * Exits non-zero if any internal href has no matching route, so a broken link
 * fails `npm run build` instead of reaching production.
 *
 * Usage:  node scripts/check-links.mjs   (or: npm run check:links)
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const BUILD_DIR = join(process.cwd(), '.next', 'server', 'app')
const APP_DIR = join(process.cwd(), 'app')
const PUBLIC_DIR = join(process.cwd(), 'public')

/** Hrefs we never validate: framework internals and non-page assets. */
const IGNORE_PREFIXES = ['/_next/', '/api/']

function walk(dir, test) {
  if (!existsSync(dir)) return []
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full, test))
    else if (test(entry)) out.push(full)
  }
  return out
}

/** "/index" -> "/", strip trailing slash, normalise separators. */
function normalise(route) {
  let r = route.split(sep).join('/')
  if (!r.startsWith('/')) r = `/${r}`
  if (r.endsWith('/index')) r = r.slice(0, -'/index'.length) || '/'
  if (r.length > 1 && r.endsWith('/')) r = r.slice(0, -1)
  return r || '/'
}

function buildRouteInventory() {
  const routes = new Set(['/'])

  // 1. Prerendered pages.
  for (const file of walk(BUILD_DIR, (f) => f.endsWith('.html'))) {
    routes.add(normalise(relative(BUILD_DIR, file).replace(/\.html$/, '')))
  }

  // 2. Route handlers and metadata files in the app directory.
  for (const file of walk(APP_DIR, (f) => /^(route|sitemap|robots)\.(js|jsx)$/.test(f))) {
    const rel = relative(APP_DIR, file)
    const base = rel.split(sep).pop()
    const dir = rel.split(sep).slice(0, -1).join('/')
    if (base.startsWith('route.')) routes.add(normalise(`/${dir}`))
    if (base.startsWith('sitemap.')) routes.add('/sitemap.xml')
    if (base.startsWith('robots.')) routes.add('/robots.txt')
  }

  // 3. Static assets.
  for (const file of walk(PUBLIC_DIR, () => true)) {
    routes.add(normalise(`/${relative(PUBLIC_DIR, file)}`))
  }

  return routes
}

function collectLinks() {
  const found = new Map() // href -> Set(source pages)

  for (const file of walk(BUILD_DIR, (f) => f.endsWith('.html'))) {
    const source = normalise(relative(BUILD_DIR, file).replace(/\.html$/, ''))
    const html = readFileSync(file, 'utf8')

    for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
      const raw = match[1]
      if (IGNORE_PREFIXES.some((p) => raw.startsWith(p))) continue
      const href = normalise(raw.split('#')[0].split('?')[0])
      if (!found.has(href)) found.set(href, new Set())
      found.get(href).add(source)
    }
  }

  return found
}

function main() {
  if (!existsSync(BUILD_DIR)) {
    console.error('\n  check:links -- no build output found at .next/server/app')
    console.error('  Run `next build` first.\n')
    process.exit(1)
  }

  const routes = buildRouteInventory()
  const links = collectLinks()

  const broken = [...links.entries()]
    .filter(([href]) => !routes.has(href))
    .sort(([a], [b]) => a.localeCompare(b))

  const pages = new Set([...links.values()].flatMap((s) => [...s]))
  const instances = [...links.values()].reduce((n, s) => n + s.size, 0)

  console.log('\n  Internal link check')
  console.log('  ' + '-'.repeat(58))
  console.log(`  pages scanned      ${pages.size}`)
  console.log(`  known routes       ${routes.size}`)
  console.log(`  unique hrefs       ${links.size}`)
  console.log(`  link instances     ${instances}`)

  if (!broken.length) {
    console.log(`  broken             0`)
    console.log('  ' + '-'.repeat(58))
    console.log('  PASS -- every internal link resolves to a real route\n')
    return
  }

  console.log(`  broken             ${broken.length}`)
  console.log('  ' + '-'.repeat(58))
  console.log('\n  FAIL -- these hrefs have no matching route:\n')
  for (const [href, sources] of broken) {
    console.log(`    ${href}`)
    for (const s of [...sources].sort()) console.log(`        linked from  ${s}`)
  }
  console.log(`\n  ${broken.length} broken link${broken.length === 1 ? '' : 's'}. Fix the href or add the route.\n`)
  process.exit(1)
}

main()
