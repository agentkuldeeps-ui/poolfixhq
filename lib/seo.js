import { site, absoluteUrl } from './site'

/**
 * Single place that builds Next.js Metadata. Every page goes through this so
 * canonical, Open Graph, and Twitter tags cannot be forgotten on one route and
 * present on another.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  image = site.defaultOgImage,
  noindex = false,
} = {}) {
  const url = absoluteUrl(path)
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`
  const imageUrl = absoluteUrl(image)

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      site: site.twitter,
      creator: site.twitter,
    },
  }
}

/** Metadata for an article, derived entirely from its frontmatter. */
export function articleMetadata(article) {
  return buildMetadata({
    title: article.title,
    description: article.metaDescription,
    path: article.href,
    type: 'article',
    publishedTime: article.lastUpdated,
    modifiedTime: article.lastUpdated,
  })
}
