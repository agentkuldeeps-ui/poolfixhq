import { site, absoluteUrl } from './site'

/**
 * ONE place that builds Next.js Metadata. Every route goes through this, so
 * canonical, Open Graph and Twitter tags cannot be present on one page and
 * forgotten on another.
 *
 * Title composition lives in exactly one place: the `title.template` in
 * app/layout.js (`%s | PoolFixHQ`). This function returns a BARE string so
 * that template appends the site name once. Do not add a suffix here -- doing
 * so produces "Thing | PoolFixHQ | PoolFixHQ" on every inner page, which is a
 * mistake that is surprisingly easy to make and surprisingly hard to notice.
 *
 * Open Graph and Twitter do NOT run through Next's template, so they get the
 * composed string built explicitly.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  image = site.defaultOgImage,
  imageAlt,
  noindex = false,
  nofollow = false,
} = {}) {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)
  const isHome = path === '/'
  const socialTitle = isHome ? title : `${title} | ${site.name}`

  return {
    title: isHome ? { absolute: title } : title,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },

    robots: {
      index: !noindex,
      follow: !nofollow,
      // max-image-preview:large is what makes a thumbnail eligible in mobile
      // results, and max-snippet:-1 lets answer engines quote enough of the
      // page to be useful. Both are pointless on a noindex page.
      ...(noindex
        ? {}
        : {
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          }),
    },

    openGraph: {
      type,
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt || title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
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
 * Metadata for a content page, derived entirely from frontmatter.
 *
 * A `status: scaffold` page is noindex,follow -- it builds and is reachable so
 * it can be reviewed, crawlers still follow its outbound links, but it will
 * not be indexed and app/sitemap.js excludes it from the same status field.
 * The sitemap and the robots meta tag therefore cannot disagree.
 */
export function articleMetadata(article) {
  return buildMetadata({
    // seoTitle exists so a long editorial H1 can keep its wording on the page
    // while the SERP gets a version that is not truncated.
    title: article.seoTitle || article.title,
    description: article.metaDescription,
    path: article.href,
    type: 'article',
    noindex: article.status !== 'live',
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
  })
}
