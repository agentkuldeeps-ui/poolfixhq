import { getAllArticles } from '@/lib/content'
import { site, absoluteUrl } from '@/lib/site'

export const dynamic = 'force-static'

/** RSS 2.0 feed at /feed.xml. Regenerated at build time with the rest of the site. */
export function GET() {
  const articles = getAllArticles()
  const updated = articles[0]?.dateModified

  const items = articles
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${absoluteUrl(article.href)}</link>
      <guid isPermaLink="true">${absoluteUrl(article.href)}</guid>
      <description>${escapeXml(article.metaDescription)}</description>
      <category>${escapeXml(article.category)}</category>
      <pubDate>${toRfc822(article.dateModified)}</pubDate>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${updated ? `    <lastBuildDate>${toRfc822(updated)}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

function toRfc822(isoDate) {
  return new Date(`${isoDate}T12:00:00Z`).toUTCString()
}

function escapeXml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
