import { categories } from '@/lib/categories'
import { getAllArticles } from '@/lib/content'
import { tools } from '@/lib/tools'
import { absoluteUrl } from '@/lib/site'

/**
 * Dynamic sitemap. Next serves this at /sitemap.xml.
 *
 * Excluded on purpose: any article still marked `status: scaffold`, and any
 * tool still marked `planned` (empty shell). If it is not indexable, it does
 * not belong in the sitemap -- listing a noindex URL is a crawl-budget leak
 * and a Search Console warning.
 *
 * Both exclusions read the same status field that drives the page's robots
 * meta tag, so the sitemap and the meta tag cannot drift apart.
 */
export default function sitemap() {
  const now = new Date().toISOString().slice(0, 10)

  const staticPages = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/pool-repair', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/editorial-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/affiliate-disclosure', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ]

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    ...categories.map((category) => ({
      url: absoluteUrl(`/${category.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),

    ...getAllArticles()
      .filter((article) => article.status === 'live')
      .map((article) => ({
      url: absoluteUrl(article.href),
        lastModified: article.dateModified,
        changeFrequency: 'monthly',
        priority: article.featured ? 0.9 : 0.7,
      })),

    ...tools
      .filter((tool) => tool.status !== 'planned')
      .map((tool) => ({
        url: absoluteUrl(`/tools/${tool.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })),
  ]
}
