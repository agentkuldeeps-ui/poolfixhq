import { site, absoluteUrl } from './site'
import { authorBySlug } from './authors'
import { categoryBySlug } from './taxonomy'

/**
 * JSON-LD builders.
 *
 * Structured data is how a machine reads this site, and answer engines lean on
 * it harder than classic search ever did. Rules kept throughout:
 *
 *  - NEVER emit AggregateRating. We do not aggregate third-party ratings, and
 *    claiming to is a structured-data violation with a real manual-action risk.
 *    Our own single rating goes in `Review.reviewRating` where it belongs.
 *
 *  - NEVER emit `offers` with a price. We have no live price feed, so any
 *    price would be stale within days, and stale prices in schema are worse
 *    than no schema.
 *
 *  - NEVER emit Person schema for a placeholder author. An unverifiable
 *    author entity is a liability, not a signal. See lib/authors.js.
 *
 *  - Everything that names an entity gives it an `@id`, so Google can resolve
 *    the same organisation, person or product across pages instead of seeing
 *    a new one each time.
 */

const ORG_ID = `${site.url}/#organization`
const SITE_ID = `${site.url}/#website`

export const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.publisher.name,
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(site.publisher.logo),
    width: site.publisher.logoWidth,
    height: site.publisher.logoHeight,
  },
  description: site.description,
  foundingDate: site.publisher.foundingDate,
})

/** Emitted once, from the root layout. */
export function websiteSchema() {
  return [
    {
      '@context': 'https://schema.org',
      ...organizationSchema(),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: site.name,
      url: site.url,
      description: site.description,
      inLanguage: site.language,
      publisher: { '@id': ORG_ID },
    },
  ]
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}

/**
 * Person schema for an author.
 *
 * Returns null for a placeholder. That is the whole point: the structure is
 * ready, but nothing is asserted about a person who does not exist yet.
 */
export function personSchema(slug) {
  const a = authorBySlug[slug]
  if (!a || a.placeholder) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/authors/${a.slug}#person`,
    name: a.name,
    url: absoluteUrl(`/authors/${a.slug}`),
    ...(a.jobTitle ? { jobTitle: a.jobTitle } : {}),
    ...(a.credential ? { description: a.credential } : {}),
    ...(a.image ? { image: absoluteUrl(a.image) } : {}),
    ...(a.sameAs?.length ? { sameAs: a.sameAs } : {}),
    ...(a.worksFor ? { worksFor: { '@id': ORG_ID } } : {}),
    ...(a.certifications?.length
      ? {
          hasCredential: a.certifications.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.name,
            ...(c.issuedBy ? { recognizedBy: { '@type': 'Organization', name: c.issuedBy } } : {}),
            ...(c.url ? { url: c.url } : {}),
          })),
        }
      : {}),
  }
}

/** Author reference for an article: a real Person if we have one, else the org. */
function authorRef(slug) {
  const a = authorBySlug[slug]
  if (!a || a.placeholder) return { '@id': ORG_ID }
  return { '@id': `${site.url}/authors/${a.slug}#person` }
}

/**
 * Product + Review for an individual review page.
 *
 * `reviewRating` is our own assessment and is asserted as such. It is only
 * emitted when the product actually carries a rating -- an unrated product
 * gets Product schema and no Review, which is the honest shape.
 */
export function productReviewSchema(article, product) {
  const url = absoluteUrl(article.href)
  const productId = `${url}#product`

  const productNode = {
    '@type': 'Product',
    '@id': productId,
    name: product.name,
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    ...(product.model ? { model: product.model } : {}),
    ...(product.asin ? { sku: product.asin, gtin: undefined } : {}),
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
    ...(article.answer ? { description: article.answer } : {}),
    category: categoryBySlug[article.category]?.title ?? article.category,
  }

  const nodes = [{ '@context': 'https://schema.org', ...productNode }]

  if (product.rating !== undefined && product.rating !== null) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': `${url}#review`,
      itemReviewed: { '@id': productId },
      url,
      name: article.title,
      reviewBody: article.answer,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: authorRef(article.author),
      publisher: { '@id': ORG_ID },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.rating,
        bestRating: 5,
        worstRating: 0,
      },
    })
  }

  return nodes
}

/** ItemList for a roundup. Position order is the ranking. */
export function itemListSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(article.href)}#itemlist`,
    name: article.title,
    numberOfItems: article.products.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: article.products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        ...(p.brand ? { brand: { '@type': 'Brand', name: p.brand } } : {}),
        ...(p.image ? { image: absoluteUrl(p.image) } : {}),
      },
    })),
  }
}

/**
 * FAQPage from frontmatter `faqs`.
 *
 * This is the highest-yield block on the page for answer engines: each Q/A is
 * a self-contained, machine-readable answer. Which is also why every `a` has
 * a 40-character floor in the schema -- a one-word answer is not liftable.
 */
export function faqSchema(faqs = []) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * The page's own direct answer, as a QAPage-style node.
 *
 * Separate from FAQPage on purpose: this is THE answer to the query the page
 * targets, not one of several related questions.
 */
export function directAnswerSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(article.href)}#webpage`,
    url: absoluteUrl(article.href),
    name: article.seoTitle || article.title,
    description: article.metaDescription,
    inLanguage: site.language,
    isPartOf: { '@id': SITE_ID },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: authorRef(article.author),
    ...(article.reviewedBy ? { reviewedBy: authorRef(article.reviewedBy) } : {}),
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(site.defaultOgImage) },
    // Names the block a machine should read first.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.answer-block'],
    },
  }
}

/** CollectionPage for a category hub. */
export function collectionSchema(category, articles) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(`/${category.slug}`)}#collection`,
    name: category.title,
    description: category.metaDescription,
    url: absoluteUrl(`/${category.slug}`),
    isPartOf: { '@id': SITE_ID },
    inLanguage: site.language,
    ...(articles.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: articles.length,
            itemListElement: articles.map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(a.href),
              name: a.title,
            })),
          },
        }
      : {}),
  }
}

/**
 * Everything a content page emits, assembled in one call so a route cannot
 * forget half of it.
 */
export function articleSchema(article, crumbs) {
  const nodes = [breadcrumbSchema(crumbs), directAnswerSchema(article)]

  if (article.type === 'roundup' && article.products.length) {
    nodes.push(itemListSchema(article))
  } else if (article.products.length) {
    nodes.push(...productReviewSchema(article, article.products[0]))
  }

  const faq = faqSchema(article.faqs)
  if (faq) nodes.push(faq)

  const person = personSchema(article.author)
  if (person) nodes.push(person)

  return nodes
}
