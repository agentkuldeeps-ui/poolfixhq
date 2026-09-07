/**
 * Frontmatter schema, validation and QC.
 *
 * TWO SEVERITIES:
 *   fail  -- throws, breaks the build. For things that are wrong regardless of
 *            how finished the page is, and for anything that would put us out
 *            of compliance.
 *   warn  -- printed, does not block. For things a human should judge.
 *
 * Craft checks are strict at `status: live` and advisory at `scaffold`, so a
 * half-written draft stays committable. Compliance checks are strict always.
 *
 * UNKNOWN KEYS FAIL THE BUILD. A typo'd field that silently does nothing is
 * the worst failure mode a content schema can have -- it looks like it worked.
 */
import {
  categories,
  contentTypes,
  priceTiers,
  badges,
  compatSlugs,
  poolTypes,
  sanitizers,
  filterTypes,
  surfaces,
  gallonBands,
  isValidSubcategory,
} from './taxonomy'
import { authorBySlug, DEFAULT_AUTHOR } from './authors'

const CATEGORY_SLUGS = categories.map((c) => c.slug)
const oneOf = (list) => list.map((x) => x.slug)

export const SCHEMA = {
  /* ------------------------------------------------------------ identity */
  title: { type: 'string', required: true, max: 70 },
  seoTitle: { type: 'string', required: false, max: 60, default: null },
  slug: { type: 'string', required: true, pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/ },
  type: { type: 'string', required: true, oneOf: contentTypes },
  category: { type: 'string', required: true, oneOf: CATEGORY_SLUGS },
  subcategory: { type: 'string', required: false, default: null },

  /* ----------------------------------------------------------------- SEO */
  primaryKeyword: { type: 'string', required: true, min: 3 },
  metaDescription: { type: 'string', required: true, min: 70, max: 155 },

  /**
   * The direct answer. Rendered as the first block after the H1, and reused
   * verbatim as the FAQ/QAPage answer.
   *
   * This is the single highest-leverage field on the page for answer engines
   * and AI overviews: it must stand alone with no preceding context, state a
   * conclusion rather than tease one, and be quotable in isolation. The
   * 40-320 char range is what actually gets lifted; longer gets truncated,
   * shorter says nothing.
   */
  answer: { type: 'string', required: true, min: 40, max: 320 },

  /* ------------------------------------------------------------- E-E-A-T */
  author: { type: 'string', required: false, default: DEFAULT_AUTHOR },
  reviewedBy: { type: 'string', required: false, default: null },
  datePublished: { type: 'date', required: true },
  dateModified: { type: 'date', required: true },

  /* ------------------------------------------------------------ lifecycle */
  status: { type: 'string', required: true, oneOf: ['scaffold', 'live'] },

  /* ------------------------------------------------------------- products */
  products: { type: 'product[]', required: false, default: [] },

  /* ------------------------------------------------- the "Your pool" tags */
  pool_type: { type: 'string', required: false, default: 'both', oneOf: oneOf(poolTypes) },
  sanitizer: { type: 'string', required: false, default: 'both', oneOf: oneOf(sanitizers) },
  filter_type: { type: 'string', required: false, default: 'any', oneOf: oneOf(filterTypes) },
  surface: { type: 'string', required: false, default: 'any', oneOf: oneOf(surfaces) },
  gallons: { type: 'string', required: false, default: 'any', oneOf: oneOf(gallonBands) },

  /* --------------------------------------------------------------- extras */
  /** Surfaces this page's top product on the homepage. */
  winner: { type: 'boolean', required: false, default: false },
  /** A mechanism nobody else mentions. If set, the body must render <TechNote>. */
  techNote: {
    type: 'string',
    required: false,
    default: null,
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
  },
  sources: { type: 'source[]', required: true, default: [] },
  faqs: { type: 'faq[]', required: false, default: [] },
  relatedSlugs: { type: 'string[]', required: false, default: [] },
  featured: { type: 'boolean', required: false, default: false },
}

/* ------------------------------------------------------------------------ *
 * Compliance patterns
 * ------------------------------------------------------------------------ */

/**
 * Any dollar figure. We are not pulling live pricing from Amazon's API, so any
 * price we publish is one we typed once and will not maintain. Stale prices
 * are the most common Associates violation. `price_tier` is the substitute.
 *
 * Deliberately does not match bare numbers, so "40 lb", "2.5 HP" and
 * "50,000 BTU" all pass.
 */
const PRICE_PATTERN = /(\$\s?\d|\bUSD\s?\d|\b\d[\d,.]*\s?(?:dollars|USD)\b)/i

/** ASIN: exactly 10 uppercase alphanumeric characters. */
const ASIN_PATTERN = /^[A-Z0-9]{10}$/

export function fail(file, message) {
  throw new Error(`[content] ${file}: ${message}`)
}

const warnings = []
export function warn(file, message) {
  warnings.push(`[content] ${file}: ${message}`)
}
export function pushWarning(message) {
  warnings.push(message)
}
export function drainWarnings() {
  const out = [...warnings]
  warnings.length = 0
  return out
}

export function checkNoPrices(text, file, where) {
  const m = PRICE_PATTERN.exec(text)
  if (m)
    fail(
      file,
      `${where} contains what looks like a price ("${m[0].trim()}"). Prices are banned sitewide ` +
        '-- they go stale and a stale price breaks the Associates agreement. Use price_tier instead.',
    )
}

/* ------------------------------------------------------------------------ *
 * Keyword matching
 * ------------------------------------------------------------------------ */

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'for', 'to', 'in', 'on', 'at', 'is',
  'it', 'my', 'your', 'how', 'what', 'why', 'when', 'do', 'does', 'with',
  'vs', 'from', 'that', 'this', 'be', 'best',
])

function stem(w) {
  return w.replace(/(ings|ing|ed|es|s)$/, '').replace(/e$/, '')
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
 * Loose containment: 70% of the keyword's content words must be present.
 * Deliberately not exact-match -- a hard requirement makes writers jam the
 * phrase in verbatim, and jammed keywords read exactly like the SEO spam this
 * site is trying not to be.
 */
export function containsKeyword(haystack, keyword) {
  const kw = tokens(keyword)
  if (!kw.length) return true
  const hay = new Set(tokens(haystack))
  return kw.filter((w) => hay.has(w)).length / kw.length >= 0.7
}

export function firstWords(body = '', n = 100) {
  return body
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, n)
    .join(' ')
}

export function wordCount(body = '') {
  return body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
}

/* ------------------------------------------------------------------------ *
 * Field validation
 * ------------------------------------------------------------------------ */

/** Hosts that mean "I made this up". */
const PLACEHOLDER_HOSTS = new Set([
  'example.com', 'www.example.com', 'example.org', 'example.net',
  'localhost', '127.0.0.1', '0.0.0.0', 'test.com', 'domain.com',
  'yoursite.com', 'website.com', 'source.com', 'link.com',
])

/**
 * STRUCTURAL validation only -- no network request, deliberately.
 *
 * Fetching to prove a citation exists does not work here: cdc.gov and most
 * manufacturer PDF hosts return 403 to automated requests, so a fetch-based
 * check would reject every real citation while happily passing an invented
 * path that also 403s. Confidently wrong in both directions is worse than no
 * check. A human confirms the link resolves at review.
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
  if (!url.hostname.includes('.'))
    fail(file, `sources[${i}].url has no real host: "${raw}"`)
  if (PLACEHOLDER_HOSTS.has(url.hostname.toLowerCase()))
    fail(file, `sources[${i}].url uses a placeholder host "${url.hostname}" -- cite a real source`)
}

const PRODUCT_KEYS = new Set([
  'name', 'asin', 'brand', 'model', 'compat', 'badge', 'rating',
  'price_tier', 'bestFor', 'notFor', 'image', 'imageAlt', 'specs',
  // Per-product overrides of the page-level "Your pool" tags, for when one
  // product in a roundup fits a narrower set of pools than the page does.
  'fits',
])

function validateProduct(p, i, file) {
  if (!p || typeof p !== 'object') fail(file, `products[${i}] must be an object`)
  if (!p.name) fail(file, `products[${i}] is missing "name"`)

  const extras = Object.keys(p).filter((k) => !PRODUCT_KEYS.has(k))
  if (extras.length)
    fail(file, `products[${i}] has unknown field(s): ${extras.join(', ')}`)

  if (p.asin) {
    if (typeof p.asin !== 'string' || !ASIN_PATTERN.test(p.asin))
      fail(file, `products[${i}].asin "${p.asin}" is not a valid ASIN (10 uppercase alphanumeric)`)
  }
  if (p.price_tier && !priceTiers.includes(p.price_tier))
    fail(file, `products[${i}].price_tier must be one of: ${priceTiers.join(', ')}`)
  if (p.badge && !badges.includes(p.badge))
    fail(file, `products[${i}].badge must be one of: ${badges.join(', ')}`)
  if (p.compat && p.compat !== 'n/a' && !compatSlugs.includes(p.compat))
    fail(file, `products[${i}].compat "${p.compat}" is not a known brand system`)

  if (p.rating !== undefined && p.rating !== null) {
    const r = Number(p.rating)
    if (!Number.isFinite(r) || r < 0 || r > 5)
      fail(file, `products[${i}].rating must be a number between 0 and 5`)
    if (Math.round(r * 10) !== r * 10)
      fail(file, `products[${i}].rating must be to one decimal place, got ${p.rating}`)
  }

  if (p.image && !p.imageAlt)
    fail(file, `products[${i}] has an image but no imageAlt -- alt text is not optional`)

  // A price inside a product entry is the same violation as one in the body.
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
          if (String(f.a).length < 40)
            fail(file, `faqs[${i}].a is too short to be liftable as an answer (min 40 chars)`)
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
      `subcategory "${out.subcategory}" is not listed under category "${out.category}" in lib/taxonomy.js`,
    )

  if (!authorBySlug[out.author])
    fail(file, `author "${out.author}" is not defined in lib/authors.js`)
  if (out.reviewedBy && !authorBySlug[out.reviewedBy])
    fail(file, `reviewedBy "${out.reviewedBy}" is not defined in lib/authors.js`)
  if (out.reviewedBy && out.reviewedBy === out.author)
    fail(file, 'reviewedBy must be a different person from author -- otherwise it signals nothing')

  return out
}

/* ------------------------------------------------------------------------ *
 * Locale
 * ------------------------------------------------------------------------ */

/**
 * British spellings and idiom. US English is a hard rule -- spelling, idiom
 * and units.
 *
 * An explicit list rather than an -ise/-our regex, because "advertise",
 * "exercise", "compromise" and a dozen others are correct US spellings and a
 * pattern match produces more noise than signal.
 *
 * Warning only: a quotation or a manufacturer's own documentation can
 * legitimately carry a British spelling, and we quote manuals constantly.
 */
const BRITISH = [
  'colour', 'colours', 'coloured', 'flavour', 'behaviour', 'honour', 'labour',
  'neighbour', 'odour', 'vapour', 'centre', 'centres', 'litre', 'litres',
  'metre', 'metres', 'fibre', 'fibres', 'defence', 'grey', 'greyish',
  'aluminium', 'sulphur', 'mould', 'moulds', 'tyre', 'tyres', 'draught',
  'analyse', 'analysed', 'catalogue', 'aeroplane', 'organise', 'organised',
  'organisation', 'realise', 'realised', 'recognise', 'recognised',
  'apologise', 'oxidise', 'oxidised', 'oxidising', 'stabilise', 'stabilised',
  'stabilising', 'ioniser', 'ionisers', 'sanitise', 'sanitised', 'utilise',
  'minimise', 'maximise', 'prioritise', 'summarise', 'emphasise',
  'specialise', 'standardise', 'normalise', 'neutralise', 'neutralised',
  'sterilise', 'sterilised', 'fortnight', 'fortnightly', 'whilst',
  'amongst', 'kerb',
]
const BRITISH_PHRASES = ['straight away', 'kitted out', 'gone off', 'in hospital', 'have got']

export function checkLocale(text, file) {
  const words = new Set(text.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean))
  const hits = BRITISH.filter((w) => words.has(w))
  const lower = text.toLowerCase()
  const phrases = BRITISH_PHRASES.filter((p) => lower.includes(p))
  const all = [...new Set([...hits, ...phrases])]
  if (all.length) warn(file, `British spelling or idiom -- this is a US site: ${all.join(', ')}`)
}

/* ------------------------------------------------------------------------ *
 * Per-page QC
 * ------------------------------------------------------------------------ */

export function runChecks(fm, body, file) {
  const live = fm.status === 'live'
  const strict = live ? fail : warn

  /* ------------------------------------------------- compliance (always) */

  checkNoPrices(body, file, 'the body')
  checkNoPrices(
    `${fm.title} ${fm.answer} ${fm.metaDescription}`,
    file,
    'the title, answer or meta description',
  )

  // Amazon requires the disclosure ABOVE the first affiliate link. The
  // component renders it, but a page that links out without ever rendering
  // the component would ship non-compliant, so the absence is a failure.
  const linksToAmazon = /<AffiliateButton|amazon\.[a-z.]+|amzn\.to/i.test(body)
  if (linksToAmazon && !/<AffiliateDisclosure/.test(body))
    fail(
      file,
      'links to Amazon but never renders <AffiliateDisclosure />. The disclosure has to ' +
        'appear above the first affiliate link on the page.',
    )

  if (fm.winner && fm.products.length === 0)
    fail(file, 'winner: true but no products declared -- the homepage strip has nothing to show')

  if (fm.dateModified < fm.datePublished)
    fail(file, 'dateModified is earlier than datePublished')

  /* ------------------------------------------------------- answer engines */

  // The answer must be a standalone claim, not a pointer. "Here's what we
  // found" is useless to an answer engine and to a reader.
  if (/^(here'?s|in this (article|review|guide)|we (will|'ll) (look|cover|explain))/i.test(fm.answer.trim()))
    strict(
      file,
      'the `answer` field teases instead of answering. It gets lifted verbatim into AI ' +
        'overviews and featured snippets, so it has to state the conclusion with no preamble.',
    )

  if (live && fm.faqs.length < 2)
    warn(
      file,
      'fewer than 2 FAQs. FAQ entries are the cheapest structured answers on the page and ' +
        'the most commonly cited by answer engines.',
    )

  /* --------------------------------------------------------------- E-E-A-T */

  const author = authorBySlug[fm.author]
  if (live && author?.placeholder)
    warn(
      file,
      `published under placeholder author "${fm.author}" -- no Person schema will be emitted ` +
        'for this page, which is the weakest possible authorship signal.',
    )

  if (live && author && !author.placeholder && author.expertise?.length) {
    if (!author.expertise.includes(fm.category))
      warn(
        file,
        `author "${author.name}" does not list "${fm.category}" in their expertise. ` +
          'Either they are the wrong byline or lib/authors.js needs updating.',
      )
  }

  /* --------------------------------------------------------------- content */

  const words = wordCount(body)
  const FLOOR = { review: 900, roundup: 1200, comparison: 900, guide: 800 }[fm.type] ?? 800
  if (live && words < FLOOR)
    fail(
      file,
      `only ${words} words, floor for a ${fm.type} is ${FLOOR}. Amazon's original-content rule ` +
        'forbids spec-dump pages, and thin comparison content is exactly what the 2026 core ' +
        'updates demoted.',
    )

  if (!containsKeyword(fm.title, fm.primaryKeyword))
    strict(file, `primary keyword "${fm.primaryKeyword}" does not appear in the title`)

  if (!containsKeyword(fm.answer, fm.primaryKeyword))
    warn(file, `primary keyword "${fm.primaryKeyword}" is not in the answer block (check by eye)`)

  if (live && fm.type !== 'guide' && fm.products.length === 0)
    strict(file, `a live ${fm.type} must declare at least one product in frontmatter`)

  for (const p of fm.products) {
    if (p.name && !body.includes(p.name))
      warn(file, `product "${p.name}" is declared in frontmatter but never named in the body`)
  }

  if (fm.techNote && !/<TechNote/.test(body))
    strict(file, `declares techNote "${fm.techNote}" but the body never renders <TechNote>`)

  if (fm.type === 'comparison' && fm.products.length < 2)
    strict(file, 'a comparison needs at least two products')

  if (fm.type === 'roundup' && live) {
    const overall = fm.products.filter((p) => p.badge === 'best-overall')
    if (overall.length !== 1)
      strict(file, `a roundup needs exactly one "best-overall" product, found ${overall.length}`)
    if (fm.products.length < 3)
      strict(file, 'a roundup with fewer than three products is not a roundup')
  }

  // Ratings are our own published judgment under Review schema. If we score
  // one product in a page we score them all, or the table is not comparable.
  const rated = fm.products.filter((p) => p.rating !== undefined && p.rating !== null)
  if (rated.length && rated.length !== fm.products.length)
    strict(
      file,
      `${rated.length} of ${fm.products.length} products carry a rating. Rate all of them or ` +
        'none -- a partly-rated table invites a comparison that is not being made.',
    )

  /* ------------------------------------------------------------- sourcing */

  const category = categories.find((c) => c.slug === fm.category)
  if (category?.chemical && fm.sources.length === 0)
    strict(
      file,
      'chemical categories must cite a real source -- product label, SDS, CDC or extension. ' +
        'Dosing and health claims are the one place we never work from memory.',
    )

  if (/<SafetyWarning/.test(body) && fm.sources.length === 0)
    strict(file, 'a page carrying a safety warning must cite at least one real source')

  if (live && fm.sources.length === 0)
    warn(file, 'no sources cited')

  checkLocale(`${fm.title} ${fm.answer} ${fm.metaDescription} ${body}`, file)
}

/* ------------------------------------------------------------------------ *
 * Cross-file uniqueness
 * ------------------------------------------------------------------------ */

export function checkUniqueness(articles) {
  const live = articles.filter((a) => a.status === 'live')

  // Two individual reviews of one product split the ranking between them.
  // This is the cannibalisation case and it is always a mistake.
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
            'Merge them, or make one a comparison.',
        )
      byAsin.set(p.asin, a)
    }
  }

  // Two pages targeting the same query do the same damage, more quietly.
  const byKeyword = new Map()
  for (const a of live) {
    const k = a.primaryKeyword.toLowerCase().trim()
    const seen = byKeyword.get(k)
    if (seen)
      fail(
        `content/${a.category}/${a.slug}.mdx`,
        `primaryKeyword "${a.primaryKeyword}" is already targeted by content/${seen.category}/${seen.slug}.mdx`,
      )
    byKeyword.set(k, a)
  }

  const byNote = new Map()
  for (const a of live) {
    if (!a.techNote) continue
    const seen = byNote.get(a.techNote)
    if (seen)
      fail(
        `content/${a.category}/${a.slug}.mdx`,
        `techNote "${a.techNote}" is already used by content/${seen.category}/${seen.slug}.mdx`,
      )
    byNote.set(a.techNote, a)
  }
}
