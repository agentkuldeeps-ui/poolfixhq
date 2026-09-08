/**
 * Environment preflight. Runs BEFORE `next build`.
 *
 * Why this exists: the Associates compliance check correctly refuses to ship a
 * review whose affiliate link carries the placeholder tag. But it runs after a
 * full build, so a missing environment variable costs ~20 seconds of build
 * time on every push before telling you. This fails in about one second, with
 * the fix in the message.
 *
 * The rule is conditional on purpose. A missing NEXT_PUBLIC_AMAZON_TAG only
 * blocks the build when a LIVE page actually declares an ASIN and would
 * therefore render a real affiliate link. A site with no published affiliate
 * links deploys fine without the tag, which is what lets you stand up the
 * structure before the Associates account is configured.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = join(ROOT, 'content')

/**
 * Load .env files the same way Next does, with the same precedence.
 *
 * This script runs as a plain node process BEFORE `next build`, so nothing has
 * populated process.env from .env.local yet. Without this it would report a
 * missing tag on a machine where the tag is correctly configured -- a false
 * failure, which is worse than no check.
 *
 * @next/env ships as a Next dependency, so this adds nothing to the tree. The
 * manual fallback exists so the check still works if that ever changes.
 */
async function loadEnv() {
  try {
    const { loadEnvConfig } = await import('@next/env')
    loadEnvConfig(ROOT, true, { info: () => {}, error: () => {} })
    return
  } catch {
    // Minimal fallback: KEY=VALUE, ignoring comments and blank lines.
    for (const f of ['.env.local', '.env']) {
      const p = join(ROOT, f)
      if (!existsSync(p)) continue
      for (const line of readFileSync(p, 'utf8').split('\n')) {
        const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line)
        if (!m) continue
        const value = m[2].replace(/^["']|["']$/g, '')
        if (process.env[m[1]] === undefined) process.env[m[1]] = value
      }
    }
  }
}

await loadEnv()

const errors = []
const notes = []

function walk(dir) {
  if (!existsSync(dir)) return []
  const out = []
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (n.endsWith('.mdx')) out.push(p)
  }
  return out
}

/* ------------------------------------------------ who needs an affiliate tag */

const liveWithAsin = []
for (const file of walk(CONTENT)) {
  const raw = readFileSync(file, 'utf8')
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? ''
  if (!/^status:\s*live\s*$/m.test(fm)) continue
  if (/^\s*asin:\s*\S/m.test(fm)) liveWithAsin.push(relative(ROOT, file))
}

/* --------------------------------------------------------------- the checks */

const tag = process.env.NEXT_PUBLIC_AMAZON_TAG
const tagMissing = !tag || /TAG-NOT-SET/.test(tag)

if (tagMissing && liveWithAsin.length) {
  errors.push(
    [
      'NEXT_PUBLIC_AMAZON_TAG is not set in this environment, and these live pages would ship',
      'an affiliate link with no Associates tag (which earns nothing):',
      '',
      ...liveWithAsin.map((f) => `      ${f}`),
      '',
      '  To fix on Vercel:',
      '    Project -> Settings -> Environment Variables -> Add',
      '    Key:    NEXT_PUBLIC_AMAZON_TAG',
      '    Value:  your Associates tag, e.g. yourtag-20',
      '    Scope:  Production, Preview and Development',
      '    Then redeploy. Environment variables are only read at build time.',
      '',
      '  To fix locally: add it to .env.local (see .env.example).',
      '',
      '  Note that .env.local is gitignored, so a tag that works on your machine',
      '  is NOT automatically present on Vercel. That is the usual cause of this.',
    ].join('\n  '),
  )
} else if (tagMissing) {
  notes.push(
    'NEXT_PUBLIC_AMAZON_TAG is not set, but no live page declares an ASIN yet, so nothing is blocked.',
  )
}

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  notes.push(
    'NEXT_PUBLIC_SITE_URL is not set — falling back to https://poolfixhq.com for canonicals, sitemap and RSS.',
  )
}

/* ---------------------------------------------------------------- report */

console.log('')
console.log('  Environment preflight')
console.log('  ----------------------------------------------------------')
console.log(`  live pages with an ASIN   ${liveWithAsin.length}`)
console.log(`  NEXT_PUBLIC_AMAZON_TAG    ${tagMissing ? 'NOT SET' : 'set'}`)
console.log(`  NEXT_PUBLIC_SITE_URL      ${process.env.NEXT_PUBLIC_SITE_URL ? 'set' : 'default'}`)
console.log('  ----------------------------------------------------------')

for (const n of notes) console.warn(`  note  ${n}`)

if (errors.length) {
  console.error('\n  FAIL:\n')
  for (const e of errors) console.error(`    ${e}`)
  console.error('')
  process.exit(1)
}

console.log('  PASS\n')
