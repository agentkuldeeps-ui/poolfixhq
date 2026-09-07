/**
 * Frontmatter schema, validation and QC checks for product reviews.
 *
 * TWO SEVERITIES, and the distinction matters:
 *
 *   fail  — throws, breaks the build. Reserved for things that are wrong
 *           regardless of how finished the page is, and for anything that
 *           would put us out of compliance with the Associates operating
 *           agreement.
 *   warn  — printed during the build, does not block. For things a human
 *           should judge.
 *
 * Most strict checks apply only at `status: live`. A half-written draft must
 * stay committable — a schema that blocks drafts pushes writers out of the
 * repo and into Google Docs, which costs more than it saves.
 *
 * COMPLIANCE RULES THAT ARE HARD FAILURES, at any status:
 *   - no dollar figures anywhere (frontmatter or body). `price_tier` only.
 *     Amazon prices change constantly and a stale price is a violation.
 *   - ASINs must look like ASINs. A malformed one produces a dead affiliate
 *     link, which earns nothing and looks broken.
 *   - no invented citations.
 */
import {
  categories,
  contentTypes,
  priceTiers,
  badges,
  compatBrands,
  poolTypes,
  sanitizers,
  filterTypes,
  gallonBands,
  isValidSubcategory,
} from './categories'

const CATEGORY_SLUGS = categories.map((c) => c.slug)
const COMPAT_SLUGS = compatBrands.map((b) => b.slug)

export const SCHEMA = {
  title: { type: 'string', required: true, max: 90 },
  seoTitle: { type: 'string', required: false, max: 60, default: null },
  slug: { type: 'string', required: true, pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/ },

  /** review | roundup | comparison — decides the template and the schema.org type. */
  type: { type: 'string', required: true, oneOf: contentTypes },

  category: { type: 'string', required: true, oneOf: CATEGORY_SLUGS },
  /** Validated against the parent category's subcategory list, below. */
  subcategory: { type: 'string', required: false, default: null },

  primaryKeyword: { type: 'string', required: true, min: 3 },
  quickAnswer: { type: 'string', required: true, min: 40 },
  metaDescription: { type: 'string', required: true, max: 155 },
  status: { type: 'string', required: true, oneOf: ['scaffold', 'live'] },

  datePublished: { type: 'date', required: true },
  dateModified: { type: 'date', required: true },
  /** Set by the weekly freshness sweep on the top 20. Falls back to dateModified. */
  updated: { type: 'date', required: false, default: null },

  /**
   * The mechanism nobody else mentions. Formerly `uncommonTip`; renamed for the
   * review format, and now optional -- a head-to-head comparison often has
   * nowhere sensible to put one, and a forced tip is a worse page.
   */
  techNote: {
    type: 'string',
    required: false,
    default: null,
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
  },

  products: { type: 'product[]', required: false, default: [] },

  /** "Your pool" filter bar. `any`/`both` mean the product does not care. */
  pool_type: { type: 'string', required: false, default: 'both', oneOf: poolTypes.map((p) => p.slug) },
  sanitizer: { type: 'string', required: false, default: 'both', oneOf: sanitizers.map((s) => s.slug) },
  filter_type: { type: 'string', required: false, default: 'any', oneOf: filterTypes.map((f) => f.slug) },
  gallons: { type: 'string', required: false, default: 'any', oneOf: gallonBands.map((g) => g.slug) },

  /** Surfaces this page's first product in the homepage Top Picks strip. */
  winner: { type: 'boolean', required: false, default: false },

  author: { type: 'string', required: false, default: 'poolfixhq-techs' },
  reviewedBy: { type: 'string', required: false, default: null },

  sources: { type: 'source[]', required: true, default: [] },
  faqs: { type: 'faq[]', required: false, default: [] },
  relatedSlugs: { type: 'string[]', required: false, default: [] },
  featured: { type: 'boolean', required: false, default: false },
}

/* ------------------------------------------------------------------ *
 * Compliance
 * ------------------------------------------------------------------ */

/**
 * Any dollar figure. Amazon's operating agreement does not allow us to state
 * prices we are not pulling live from their API, and we are not pulling live
 * from their API. `price_tier: budget | mid | premium` is the substitute.
 *
 * Matches "$12", "$1,299.99", "USD 40". Deliberately does not match a bare
 * number, so "40 lb" and "2.5 HP" pass.
 */
const PRICE_PATTERN = /(\$\s?\d|\bUSD\s?\d|\d+\s?(?:dollars|USD)\b)/i

/** Amazon ASIN: 10 chars, uppercase alphanumeric. B0... for most modern items. */
const ASIN_PATTERN = /^[A-Z0-9]{10}$/

export function checkNoPrices(text, file, where) {
  const match = PRICE_PATTERN.exec(text)
  if (match)
    fail(
      file,
      `${where} contains what looks like a price ("${match[0].trim()}"). ` +
        `Prices are banned sitewide -- they go stale and a stale price breaks the ` +
        `Associates agreement. Use price_tier: budget | mid | premium instead.`,
    )
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

/** Hosts that mean "I made this up". */
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
 */
function validateSourceUrl(raw, i, file) {
  let url
  try {
    url = new URL(raw)
  } catch {
    fail(file, `sources[${i}].url is not a valid URL: "${raw}" -- never invent a citation`)
    return
  }
  if (!/^https?:$/.test(url.protocol))
    fail(file, `sources[${i}].url must be http or https, got "${url.protocol}"`)
  if (!url.hostname || !url.hostname.includes('.'))
    fail(file, `sources[${i}].url has no real host: "${raw}"`)
  if (PLACEHOLDER_HOSTS.has(url.hostname.toLowerCase()))
    fail(file, `sources[${i}].url uses a placeholder host "${url.hostname}" -- cite a real source`)
}

/**
 * One product entry. `asin` is optional so a review can be drafted before the
 * ASIN is confirmed, but a malformed one is always a failure -- it produces a
 * dead affiliate link that earns nothing and looks broken.
 */
function validateProduct(p, i, file) {
  if (!p || typeof p !== 'object') fail(file, `products[${i}] must be an object`)
  if (!p.name) fail(file, `products[${i}] is missing "name"`)

  if (p.asin !== undefined && p.asin !== null && p.asin !== '') {
    if (typeof p.asin !== 'string' || !ASIN_PATTERN.test(p.asin))
      fail(
        file,
        `products[${i}].asin "${p.asin}" is not a valid ASIN (10 uppercase alphanumeric chars)`,
      )
  }

  if (p.price_tier !== undefined && p.price_tier !== null) {
    if (!priceTiers.includes(p.price_tier))
      fail(file, `products[${i}].price_tier must be one of: ${priceTiers.join(', ')}`)
  }

  if (p.badge !== undefined && p.badge !== null) {
    if (!badges.includes(p.badge))
      fail(file, `products[${i}].badge must be one of: ${badges.join(', ')}`)
  }

  if (p.compat !== undefined && p.compat !== null && p.compat !== 'n/a') {
    if (!COMPAT_SLUGS.includes(p.compat))
      fail(file, `products[${i}].compat "${p.compat}" is not a known brand system`)
  }

  if (p.rating !== undefined && p.rating !== null) {
    const r = Number(p.rating)
    if (!Number.isFinite(r) || r < 0 || r > 5)
      fail(file, `products[${i}].rating must be a number between 0 and 5`)
  }

  // A price anywhere inside a product entry is the same violation as a price
  // in the body.
  checkNoPrices(JSON.stringify(p), file, `products[${i}]`)
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

      case 'product[]':
        if (!Array.isArray(value)) fail(file, `"${key}" must be a list`)
        value.forEach((p, i) => validateProduct(p, i, file))
        out[key] = value
        break

      case 'source[]':
        if (!Array.isArray(value)) fail(file, `"${key}" must be a list`)
        value.forEach((s, i) => {
          if (!s || typeof s !== 'object') fail(file, `sources[${i}] must be an object`)
          if (!s.title) fail(file, `sources[${i}] is missing "title"`)
          if (!s.url) fail(file, `sources[${i}] is missing "url"`)
          validateSourceUrl(String(s.url), i, file)
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

  if (out.subcategory && !isValidSubcategory(out.category, out.subcategory))
    fail(
      file,
      `subcategory "${out.subcategory}" is not listed under category "${out.category}" in lib/categories.js`,
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
 * Warning only -- a quotation or a proper noun can legitimately carry a
 * British spelling, and manufacturer documentation often does.
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
 * Per-page QC. Severity depends on status: strict at `live`, advisory at
 * `scaffold` -- except the compliance checks, which are strict always.
 */
export function runChecks(fm, body, file) {
  const live = fm.status === 'live'
  const strict = live ? fail : warn

  /* -------------------------------------------------- compliance (always) */

  checkNoPrices(body, file, 'the body')
  checkNoPrices(
    `${fm.title} ${fm.quickAnswer} ${fm.metaDescription}`,
    file,
    'the title, quick answer or meta description',
  )

  // Every affiliate link needs a disclosure ABOVE it on the page. The
  // component renders it, but a page that links out without ever rendering
  // the component would ship non-compliant.
  const hasAffiliateLink = /<AffiliateButton|amazon\.com|amzn\.to/i.test(body)
  if (hasAffiliateLink && !/<AffiliateDisclosure/.test(body))
    strict(
      file,
      'links to Amazon but never renders <AffiliateDisclosure />. ' +
        'The disclosure has to appear above the first affiliate link on the page.',
    )

  // Amazon's original-content rule: a page that is only a spec dump is not
  // allowed, and would not rank anyway.
  const wordCount = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  if (live && wordCount < 600)
    fail(
      file,
      `only ${wordCount} words. A review needs original commentary and analysis, ` +
        'not a spec table -- both under the Associates original-content rule and to rank at all.',
    )

  /* ------------------------------------------------------------- content */

  if (!containsKeyword(fm.title, fm.primaryKeyword))
    strict(file, `primary keyword "${fm.primaryKeyword}" does not appear in the title`)

  // Always advisory. The natural opening often doesn't contain the keyword,
  // and that is usually the better sentence.
  if (!containsKeyword(firstWords(body, 100), fm.primaryKeyword))
    warn(file, `primary keyword "${fm.primaryKeyword}" not found in the first 100 words (check by eye)`)

  if (live && fm.products.length === 0 && fm.type !== 'roundup')
    strict(file, 'a live review or comparison must declare at least one product in frontmatter')

  // Every product declared must actually appear in the body, or the
  // frontmatter is lying to the comparison tables and the filter bar.
  for (const p of fm.products) {
    if (p.name && !body.includes(p.name)) {
      warn(file, `product "${p.name}" is declared in frontmatter but its name never appears in the body`)
    }
  }

  if (fm.techNote && !/<TechNote/.test(body))
    strict(file, `declares techNote "${fm.techNote}" but the body never renders <TechNote>`)

  if (fm.type === 'comparison' && fm.products.length < 2)
    strict(file, 'a head-to-head comparison needs at least two products')

  if (fm.type === 'roundup' && live) {
    const winners = fm.products.filter((p) => p.badge === 'best-overall')
    if (winners.length !== 1)
      strict(file, `a roundup needs exactly one product badged "best-overall", found ${winners.length}`)
  }

  if (fm.winner && fm.products.length === 0)
    fail(file, 'winner: true but no products declared -- the homepage Top Picks strip needs one')

  // Chemicals: dosing is label-literal, and a health claim needs a real source.
  const category = categories.find((c) => c.slug === fm.category)
  if (category?.chemical && fm.sources.length === 0)
    strict(file, 'chemical categories must cite at least one real source (label, SDS, CDC or extension)')

  if (/<SafetyWarning/.test(body) && fm.sources.length === 0)
    strict(file, 'a page carrying a safety warning must cite at least one real source')

  if (fm.dateModified < fm.datePublished)
    fail(file, 'dateModified is earlier than datePublished')
  if (fm.updated && fm.updated < fm.datePublished)
    fail(file, 'updated is earlier than datePublished')

  checkLocale(`${fm.title} ${fm.quickAnswer} ${fm.metaDescription} ${body}`, file)
}

/**
 * Cross-file uniqueness.
 *
 * ASINs are the important one now: two pages both claiming to be the review of
 * the same product is the cannibalisation case the plan calls out, and it
 * splits the ranking between them.
 *
 * techNote uniqueness is only enforced between LIVE pages, so drafts can sit
 * in the repo while their note is still being worked out.
 */
export function checkUniqueness(articles) {
  const live = articles.filter((a) => a.status === 'live')

  const byAsin = new Map()
  for (const a of live) {
    if (a.type !== 'review') continue
    for (const p of a.products ?? []) {
      if (!p.asin) continue
      const seen = byAsin.get(p.asin)
      if (seen)
        fail(
          `content/${a.category}/${a.slug}.mdx`,
          `ASIN ${p.asin} already has an individual review at content/${seen.category}/${seen.slug}.mdx. ` +
            'Two reviews of one product split the ranking between them -- merge, or make one a comparison.',
        )
      byAsin.set(p.asin, a)
    }
  }

  const bySlug = new Map()
  for (const a of articles) {
    const seen = bySlug.get(a.slug)
    if (seen && seen.category !== a.category)
      warn(
        `content/${a.category}/${a.slug}.mdx`,
        `slug "${a.slug}" is also used by content/${seen.category}/${seen.slug}.mdx`,
      )
    bySlug.set(a.slug, a)
  }

  const byNote = new Map()
  for (const a of live) {
    if (!a.techNote) continue
    const seen = byNote.get(a.techNote)
    if (seen)
      fail(
        `content/${a.category}/${a.slug}.mdx`,
        `techNote "${a.techNote}" is already used by content/${seen.category}/${seen.slug}.mdx — every page needs its own mechanism`,
      )
    byNote.set(a.techNote, a)
  }
}
