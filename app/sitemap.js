import { categories, reviewIndexes, compatBrands } from '@/lib/taxonomy'
import { getLiveArticles } from '@/lib/content'
import { publishedAuthors } from '@/lib/authors'
import { absoluteUrl } from '@/lib/site'

/**
 * Dynamic sitemap, served at /sitemap.xml.
 *
 * Excluded on purpose:
 *   - any article still at `status: scaffold`
 *   - any author still flagged `placeholder`
 *
 * Both exclusions read the exact same field that drives the page's robots
 * meta tag, so the sitemap and the meta tag cannot drift apart. Listing a
 * noindex URL is a crawl-budget leak and a Search Console warning.
 */
export default function sitemap() {
  const now = new Date().toISOString().slice(0, 10)
  const live = getLiveArticles()

  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/reviews', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/brands', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/how-we-test', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/about', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/editorial-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/affiliate-disclosure', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ]

  return [
    ...staticPages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),

    ...reviewIndexes.map((i) => ({
      url: absoluteUrl(`/reviews/${i.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),

    ...categories.map((c) => ({
      url: absoluteUrl(`/${c.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),

    ...compatBrands.map((b) => ({
      url: absoluteUrl(`/brands/${b.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    })),

    ...publishedAuthors.map((a) => ({
      url: absoluteUrl(`/authors/${a.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    })),

    ...live.map((a) => ({
      url: absoluteUrl(a.href),
      lastModified: a.dateModified,
      changeFrequency: 'monthly',
      priority: a.featured ? 0.9 : 0.7,
    })),
  ]
}
