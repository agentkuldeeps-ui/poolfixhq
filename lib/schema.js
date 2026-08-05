import { site, absoluteUrl } from './site'

const publisher = {
  '@type': 'Organization',
  name: site.publisher.name,
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(site.publisher.logo),
  },
}

/** BreadcrumbList. Takes the same items array as the visible <Breadcrumbs>. */
export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}

/** Article schema for a single content page. */
export function articleSchema(article) {
  const url = absoluteUrl(article.href)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished: article.lastUpdated,
    dateModified: article.lastUpdated,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: site.publisher.name, url: site.url },
    publisher,
    image: [absoluteUrl(site.defaultOgImage)],
    articleSection: article.category,
  }
}

/**
 * FAQPage schema. Entries come from lib/content.js: the QuickAnswer always
 * seeds the first pair, and any H2 phrased as a question contributes another.
 * Emits null when there is nothing real to mark up -- an empty FAQPage is a
 * structured data warning, not a win.
 */
export function faqSchema(faqs = []) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/** CollectionPage for a category hub. */
export function collectionPageSchema(category, articles = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.metaDescription,
    url: absoluteUrl(`/${category.slug}`),
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
    hasPart: articles.map((article) => ({
      '@type': 'Article',
      headline: article.title,
      url: absoluteUrl(article.href),
      datePublished: article.lastUpdated,
    })),
  }
}

/** WebSite + Organization, emitted once from the root layout. */
export function websiteSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      description: site.description,
      inLanguage: 'en-US',
      publisher,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.publisher.name,
      url: site.url,
      logo: absoluteUrl(site.publisher.logo),
    },
  ]
}
