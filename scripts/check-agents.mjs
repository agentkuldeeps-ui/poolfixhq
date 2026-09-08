/**
 * Sanity check on the review team in .claude/agents/.
 *
 * These are prompt files, so nothing here can verify that an agent gives good
 * advice. What it can verify is the structural stuff that silently breaks
 * routing or safety:
 *
 *   NAME MATCHES FILE   An agent whose frontmatter name differs from its
 *                       filename cannot be invoked reliably.
 *   NAMES UNIQUE        Two agents with one name is ambiguous dispatch.
 *   DESCRIPTION PRESENT The description is what decides when an agent gets
 *                       picked. A thin one means it never fires, or fires
 *                       for the wrong task.
 *   EDITORS READ-ONLY   The five *-editor agents must never hold Write or
 *                       Edit. Five agents editing one MDX concurrently is
 *                       how content gets clobbered, and a reviewer that can
 *                       fix its own findings stops being an independent
 *                       check. This is the assertion worth having.
 *   REFERENCES RESOLVE  An agent that cites lib/scoring.js by name should
 *                       not still cite it after someone renames the file.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const DIR = '.claude/agents'

if (!fs.existsSync(DIR)) {
  console.log('\n  check-agents: no .claude/agents directory, nothing to check.\n')
  process.exit(0)
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && f !== 'README.md')
const names = new Map()
const errors = []
const rows = []

const ALLOWED_TOOLS = new Set([
  'Read','Grep','Glob','Write','Edit','Bash','WebSearch','WebFetch','NotebookEdit','Agent',
])

for (const f of files) {
  const raw = fs.readFileSync(path.join(DIR, f), 'utf8')
  let data
  try { ({ data } = matter(raw)) } catch (e) { errors.push(`${f}: frontmatter will not parse — ${e.message}`); continue }

  const slug = f.replace(/\.md$/, '')
  if (!data.name) errors.push(`${f}: no name`)
  else if (data.name !== slug) errors.push(`${f}: name "${data.name}" does not match filename`)
  else if (names.has(data.name)) errors.push(`${f}: duplicate name, also in ${names.get(data.name)}`)
  else names.set(data.name, f)

  if (!data.description) errors.push(`${f}: no description`)
  else if (data.description.length < 40) errors.push(`${f}: description too thin to route on`)

  const tools = String(data.tools || '').split(',').map((s) => s.trim()).filter(Boolean)
  if (!tools.length) errors.push(`${f}: no tools declared`)
  for (const t of tools) if (!ALLOWED_TOOLS.has(t)) errors.push(`${f}: unknown tool "${t}"`)

  const isEditor = slug.endsWith('-editor')
  const writes = tools.some((t) => t === 'Write' || t === 'Edit')
  if (isEditor && writes) errors.push(`${f}: EDITOR HAS WRITE ACCESS — editors must be read-only`)

  // every repo path mentioned in the body must exist
  const body = raw.slice(raw.indexOf('---', 3) + 3)
  const refs = [...body.matchAll(/`((?:lib|scripts|components|content|app)\/[A-Za-z0-9_./-]+|[A-Z_]+\.md)`/g)]
    .map((m) => m[1])
  const missing = [...new Set(refs)].filter(
    (p) => !p.includes('<') && !fs.existsSync(p) && !p.includes('*'),
  )
  for (const m of missing) errors.push(`${f}: references ${m}, which does not exist`)

  rows.push({ name: data.name, model: data.model || '(default)', writes: writes ? 'yes' : 'no', tools: tools.length })
}

console.log(`\n  ${files.length} agents\n`)
console.log('  name                  model    can write  tools')
console.log('  ' + '-'.repeat(52))
for (const r of rows.sort((a, b) => a.name.localeCompare(b.name))) {
  console.log(`  ${r.name.padEnd(22)}${r.model.padEnd(9)}${r.writes.padEnd(11)}${r.tools}`)
}
console.log()
if (errors.length) { console.log('  PROBLEMS:'); for (const e of errors) console.log('   ! ' + e); process.exit(1) }
console.log('  PASS -- names unique and matching filenames, descriptions present,')
console.log('          tools valid, all five editors read-only, every referenced file exists\n')
