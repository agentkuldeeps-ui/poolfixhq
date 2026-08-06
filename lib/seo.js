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
  nofollow = false,
} = {}) {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)
  const isHome = path === '/'

  /**
   * Title composition lives in exactly ONE place: the `title.template` in
   * app/layout.js (`%s | PoolFixHQ`). Returning a bare string here lets that
   * template append the site name once.
   *
   * Previously this function ALSO appended `| ${site.name}`, so the template
   * ran on an already-suffixed string and every inner page rendered
   * "Pool Problems | PoolFixHQ | PoolFixHQ". Do not re-add a suffix here.
   *
   * The homepage uses `absolute` to opt out of the template entirely, since
   * its title already contains the brand and tagline.
   *
   * Open Graph and Twitter do NOT go through Next's template, so they need the
   * composed string built explicitly.
   */
  const socialTitle = isHome ? title : `${title} | ${site.name}`

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: {
      index: !noindex,
      follow: !nofollow,
      ...(noindex ? {} : { 'max-image-preview': 'large', 'max-snippet': -1 }),
    },
    openGraph: {
      type,
      title: socialTitle,
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
      title: socialTitle,
      description,
      images: [imageUrl],
      site: site.twitter,
      creator: site.twitter,
    },
  }
}

/**
 * Metadata for an article, derived entirely from its frontmatter.
 *
 * A `status: scaffold` article is noindex,follow -- it still builds and is
 * reachable, and crawlers still follow its outbound links, but it will not be
 * indexed. Set `status: live` in the frontmatter to publish it; nothing else
 * needs to change. Sitemap inclusion is driven from the same field in
 * app/sitemap.js, so the two can never disagree.
 */
export function articleMetadata(article) {
  return buildMetadata({
    // seoTitle (<=60 chars) exists so a long editorial H1 can keep its full
    // wording on the page while the SERP gets a version that isn't truncated.
    title: article.seoTitle || article.title,
    description: article.metaDescription,
    path: article.href,
    type: 'article',
    noindex: article.status !== 'live',
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
  })
}
