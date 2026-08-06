import { site, absoluteUrl } from './site'
import { problemCards } from '@/components/ProblemCards'

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
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: site.publisher.name, url: site.url },
    publisher,
    image: [absoluteUrl(site.defaultOgImage)],
    articleSection: article.category,
  }
}

/**
 * FAQPage schema, built ONLY from the explicit `faqs` frontmatter block.
 *
 * The previous version also derived entries from question-shaped H2s. That is
 * gone: guessing which headings are questions produced entries whose "answer"
 * was whatever paragraph happened to follow.
 *
 * Worth knowing this is close to inert. Google restricted FAQ rich results to
 * government and health sites in 2023, so this will not render for us. It is
 * emitted because it is a correct description of the page, not for the
 * snippet.
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
      datePublished: article.dateModified,
    })),
  }
}

/**
 * ItemList for the homepage's four problem cards. Tells search engines what
 * the site's primary entry points are, and can surface as a sitelinks-style
 * cluster. Built from the same array the cards render from, so it cannot
 * describe links that are not on the page.
 */
export function homeItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Common pool problems',
    itemListElement: problemCards.map((card, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: card.title,
      description: card.description,
      url: absoluteUrl(card.href),
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
