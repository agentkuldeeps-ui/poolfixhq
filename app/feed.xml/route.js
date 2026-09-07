import { site, absoluteUrl } from '@/lib/site'
import { getLiveArticles } from '@/lib/content'

export const dynamic = 'force-static'

const escape = (s = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

/**
 * RSS 2.0 feed.
 *
 * CRITICAL: the feed carries the `answer` summary and a link, never the full
 * body and NEVER an affiliate link. The Associates agreement does not allow
 * affiliate links to travel in RSS or email, and feed content gets
 * republished in places we do not control. scripts/check-compliance.mjs fails
 * the build if an affiliate link ever appears here.
 */
export async function GET() {
  const articles = getLiveArticles().slice(0, 50)
  const updated = articles[0]?.dateModified ?? new Date().toISOString().slice(0, 10)

  const items = articles
    .map(
      (a) => `    <item>
      <title>${escape(a.title)}</title>
      <link>${absoluteUrl(a.href)}</link>
      <guid isPermaLink="true">${absoluteUrl(a.href)}</guid>
      <pubDate>${new Date(a.datePublished).toUTCString()}</pubDate>
      <description>${escape(a.answer)}</description>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${site.url}</link>
    <description>${escape(site.description)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
