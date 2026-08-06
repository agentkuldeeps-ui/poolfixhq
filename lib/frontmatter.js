/**
 * Frontmatter schema, validation and QC checks.
 *
 * Split out of lib/content.js because it now carries real logic: field
 * validation, cross-file uniqueness, and the keyword checks.
 *
 * TWO SEVERITIES, and the distinction matters:
 *
 *   fail  — throws, breaks the build. Reserved for things that are wrong
 *           regardless of how finished the article is.
 *   warn  — printed during the build, does not block. For things a human
 *           should judge.
 *
 * Most strict checks apply only at `status: live`. A half-written draft must
 * stay committable — a schema that blocks drafts pushes writers out of the
 * repo and into Google Docs, which costs more than it saves.
 */
import { categories } from './categories'
import { unknownProductIds } from './products'

export const CLUSTERS = [
  'symptoms',
  'equipment',
  'brand-codes',
  'chemistry',
  'guides',
  'regional',
]

/** cluster -> the category (folder/route) it must live under. */
export const CLUSTER_TO_CATEGORY = {
  symptoms: 'problems',
  equipment: 'equipment',
  'brand-codes': 'equipment',
  chemistry: 'chemistry',
  guides: 'guides',
  regional: 'regional',
}

export const SCHEMA = {
  title: { type: 'string', required: true, max: 90 },
  seoTitle: { type: 'string', required: false, max: 60, default: null },
  slug: { type: 'string', required: true, pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/ },
  planId: { type: 'string', required: true, pattern: /^[A-Z]{3}-\d{3}$/ },
  category: { type: 'string', required: true, oneOf: categories.map((c) => c.slug) },
  cluster: { type: 'string', required: true, oneOf: CLUSTERS },
  primaryKeyword: { type: 'string', required: true, min: 3 },
  quickAnswer: { type: 'string', required: true, min: 40 },
  metaDescription: { type: 'string', required: true, max: 155 },
  status: { type: 'string', required: true, oneOf: ['scaffold', 'live'] },
  datePublished: { type: 'date', required: true },
  dateModified: { type: 'date', required: true },
  uncommonTip: { type: 'string', required: true, pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/ },
  reviewedBy: { type: 'string', required: false, default: null },
  sources: { type: 'source[]', required: true, default: [] },
  faqs: { type: 'faq[]', required: false, default: [] },
  products: { type: 'string[]', required: false, default: [] },
  relatedSlugs: { type: 'string[]', required: false, default: [] },
  featured: { type: 'boolean', required: false, default: false },
}

/* ------------------------------------------------------------------ *
 * Keyword matching
 * ------------------------------------------------------------------ */

/**
 * Stopwords for keyword normalisation. "not" is deliberately absent — it
 * carries meaning in this niche ("pump not priming" is a different query from
 * "pump priming").
 */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'for', 'to', 'in', 'on', 'at', 'is',
  'it', 'my', 'your', 'how', 'what', 'why', 'when', 'do', 'does', 'with',
  'vs', 'from', 'that', 'this', 'be',
])

/** Crude stemmer: enough to make "priming" and "prime" the same token. */
function stem(word) {
  return word.replace(/(ings|ing|ed|es|s)$/, '').replace(/e$/, '')
}

function tokens(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w))
    .map(stem)
}

/**
 * Loose keyword containment. Requires 70% of the keyword's content words to be
 * present, so "pump not priming" satisfies "pool pump not priming".
 *
 * Deliberately not exact-match: a hard exact requirement makes writers jam the
 * phrase in verbatim, and jammed keywords are the exact texture the voice spec
 * exists to avoid.
 */
export function containsKeyword(haystack, keyword) {
  const kw = tokens(keyword)
  if (!kw.length) return true
  const hay = new Set(tokens(haystack))
  const hits = kw.filter((w) => hay.has(w)).length
  return hits / kw.length >= 0.7
}

/** First N words of the body, with JSX tags and frontmatter fences stripped. */
export function firstWords(body = '', n = 100) {
  return body
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, n)
    .join(' ')
}

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */

export function fail(file, message) {
  throw new Error(`[content] ${file}: ${message}`)
}

const warnings = []
export function warn(file, message) {
  warnings.push(`[content] ${file}: ${message}`)
}
export function drainWarnings() {
  const out = [...warnings]
  warnings.length = 0
  return out
}

/**
 * Hosts that mean "I made this up".
 */
const PLACEHOLDER_HOSTS = new Set([
  'example.com', 'www.example.com', 'example.org', 'example.net',
  'localhost', '127.0.0.1', '0.0.0.0', 'test.com', 'domain.com',
  'yoursite.com', 'website.com', 'source.com', 'link.com',
])

/**
 * STRUCTURAL validation only -- deliberately no network request.
 *
 * Fetching to prove a page exists does not work here. cdc.gov returns 403 to
 * automated requests, so a fetch-based check would reject every real CDC
 * citation while happily passing an invented cdc.gov path that also 403s. It
 * would be worse than no check: confidently wrong in both directions.
 *
 * The job here is catching malformed and obviously-fake URLs. A human confirms
 * the link actually resolves at review.
 */
function validateSourceUrl(raw, i, file) {
  let url
  try {
    url = new URL(raw)
  } catch {
    fail(file, `sources[${i}].url is not a valid URL: "${raw}" -- never invent a citation`)
  }
  if (!/^https?:$/.test(url.protocol))
    fail(file, `sources[${i}].url must be http or https, got "${url.protocol}"`)
  if (!url.hostname || !url.hostname.includes('.'))
    fail(file, `sources[${i}].url has no real host: "${raw}"`)
  if (PLACEHOLDER_HOSTS.has(url.hostname.toLowerCase()))
    fail(file, `sources[${i}].url uses a placeholder host "${url.hostname}" -- cite a real source`)
}

export function validateFields(data, file) {
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
          fail(file, `"${key}" has an invalid format: "${value}"`)
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

      case 'source[]':
        if (!Array.isArray(value)) fail(file, `"${key}" must be a list`)
        value.forEach((s, i) => {
          if (!s || typeof s !== 'object') fail(file, `sources[${i}] must be an object`)
          if (!s.title) fail(file, `sources[${i}] is missing "title"`)
          if (!s.url) fail(file, `sources[${i}] is missing "url"`)
          if (!/^https?:\/\/\S+\.\S+/.test(String(s.url)))
            fail(file, `sources[${i}].url is not a real URL: "${s.url}" — never invent a citation`)
        })
        out[key] = value
        break

      case 'faq[]':
        if (!Array.isArray(value)) fail(file, `"${key}" must be a list`)
        value.forEach((f, i) => {
          if (!f?.q) fail(file, `faqs[${i}] is missing "q"`)
          if (!f?.a) fail(file, `faqs[${i}] is missing "a"`)
        })
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

  if (CLUSTER_TO_CATEGORY[out.cluster] !== out.category)
    fail(
      file,
      `cluster "${out.cluster}" belongs under category "${CLUSTER_TO_CATEGORY[out.cluster]}", not "${out.category}"`,
    )

  return out
}

/**
 * British spellings and idiom. US English is a hard rule for this site --
 * spelling, idiom and units.
 *
 * An explicit list rather than an -ise/-our regex: "advertise", "exercise",
 * "compromise", "surprise" and a dozen others are correct US spellings, so a
 * pattern match produces more noise than signal.
 *
 * Warning only, same reasoning as the keyword check -- a quotation or a proper
 * noun can legitimately carry a British spelling.
 */
const BRITISH = [
  'colour', 'colours', 'coloured', 'flavour', 'behaviour', 'honour', 'labour',
  'neighbour', 'odour', 'vapour', 'centre', 'centres', 'litre', 'litres',
  'metre', 'metres', 'fibre', 'fibres', 'defence', 'grey', 'greyish',
  'aluminium', 'sulphur', 'mould', 'moulds', 'tyre', 'tyres', 'draught',
  'analyse', 'analysed', 'catalogue', 'aeroplane',
  'organise', 'organised', 'organisation', 'realise', 'realised',
  'recognise', 'recognised', 'apologise', 'oxidise', 'oxidised', 'oxidising',
  'stabilise', 'stabilised', 'stabilising', 'ioniser', 'ionisers',
  'sanitise', 'sanitised', 'utilise', 'minimise', 'maximise', 'prioritise',
  'summarise', 'emphasise', 'specialise', 'standardise', 'normalise',
  'neutralise', 'neutralised', 'sterilise', 'sterilised',
  'fortnight', 'fortnightly', 'whilst', 'amongst', 'kerb',
]
const BRITISH_PHRASES = ['straight away', 'kitted out', 'gone off', 'in hospital', 'have got']

export function checkLocale(body, file) {
  const words = new Set(
    body.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean),
  )
  const hits = BRITISH.filter((w) => words.has(w))
  const lower = body.toLowerCase()
  const phrases = BRITISH_PHRASES.filter((p) => lower.includes(p))
  const all = [...hits, ...phrases]
  if (all.length)
    warn(file, `British spelling or idiom -- this is a US site: ${[...new Set(all)].join(', ')}`)
}

/**
 * Per-article QC. Severity depends on status, per the agreed rules:
 * strict at `live`, advisory at `scaffold`.
 */
export function runChecks(fm, body, file) {
  const live = fm.status === 'live'
  const strict = live ? fail : warn

  if (!containsKeyword(fm.title, fm.primaryKeyword))
    strict(file, `primary keyword "${fm.primaryKeyword}" does not appear in the title`)

  // Always advisory. The natural opening to an article often doesn't contain
  // the keyword, and that is usually the better sentence.
  if (!containsKeyword(firstWords(body, 100), fm.primaryKeyword))
    warn(file, `primary keyword "${fm.primaryKeyword}" not found in the first 100 words (check by eye)`)

  const needsSources =
    fm.cluster === 'chemistry' || /<SafetyWarning/.test(body)
  if (needsSources && fm.sources.length === 0)
    strict(file, 'chemistry and safety articles must cite at least one real source')

  if (fm.dateModified < fm.datePublished)
    fail(file, 'dateModified is earlier than datePublished')

  checkLocale(`${fm.title} ${fm.quickAnswer} ${fm.metaDescription} ${body}`, file)
}

/**
 * Cross-file uniqueness.
 *
 * planId is a hard failure always — a duplicate means two people wrote the
 * same plan row, and that should stop everything.
 *
 * uncommonTip is only enforced between LIVE articles, so drafts can sit in the
 * repo while their tip is still being worked out.
 */
export function checkUniqueness(articles) {
  const byPlanId = new Map()
  for (const a of articles) {
    const seen = byPlanId.get(a.planId)
    if (seen)
      fail(
        `content/${a.category}/${a.slug}.mdx`,
        `planId "${a.planId}" is already used by content/${seen.category}/${seen.slug}.mdx`,
      )
    byPlanId.set(a.planId, a)
  }

  const byTip = new Map()
  for (const a of articles.filter((x) => x.status === 'live')) {
    const seen = byTip.get(a.uncommonTip)
    if (seen)
      fail(
        `content/${a.category}/${a.slug}.mdx`,
        `uncommonTip "${a.uncommonTip}" is already used by content/${seen.category}/${seen.slug}.mdx — every article needs its own mechanism`,
      )
    byTip.set(a.uncommonTip, a)
  }
}
