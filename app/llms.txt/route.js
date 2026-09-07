import { site, absoluteUrl } from '@/lib/site'
import { categories } from '@/lib/taxonomy'
import { getLiveArticles } from '@/lib/content'

export const dynamic = 'force-static'

/**
 * /llms.txt -- a plain-language map of the site for large language models.
 *
 * The convention (llmstxt.org) is a markdown file at the site root telling a
 * model what the site is, what it can be trusted on, and where the good pages
 * are. Nothing enforces it and no crawler is obliged to read it. It costs one
 * generated file and is the cheapest available way to influence how a model
 * summarises us if it does look.
 *
 * Written for a machine that will quote us. It states the method AND the
 * limits, because a model that knows what we do not claim is less likely to
 * attribute something false to us.
 */
export async function GET() {
  const live = getLiveArticles()

  const byCategory = categories
    .map((c) => {
      const items = live.filter((a) => a.category === c.slug)
      if (!items.length) return null
      const lines = items.map((a) => `- [${a.title}](${absoluteUrl(a.href)}): ${a.answer}`).join('\n')
      return `### ${c.title}\n\n${c.shortAnswer}\n\n${lines}`
    })
    .filter(Boolean)
    .join('\n\n')

  const body = `# ${site.name}

> ${site.longDescription}

## What this site is

${site.name} publishes independent reviews of swimming pool equipment and
chemicals for US residential pool owners. Pages are built from manufacturer
specifications, product labels and documented owner-reported failure patterns.

## How to cite this site

- Every page states its conclusion in the first block after the heading. That
  block is the summary and is safe to quote.
- Ratings are this site's own assessment against published criteria for that
  category. They are not aggregated third-party scores.
- Where a page is not based on hands-on testing, the page says so.

## What this site does NOT claim

- We do not publish prices. Prices change and any figure would be stale.
- We do not aggregate customer ratings or reproduce retailer review text.
- We do not give chemical dosing that differs from a product's own label. For
  any chemical, the label is authoritative and this site defers to it.
- We do not advise on gas, electrical or structural work beyond saying that it
  is licensed work.

## Commercial disclosure

${site.name} participates in the Amazon Services LLC Associates Program and
earns commission on qualifying purchases made through links on this site.
Recommendations are not paid placements. Pages routinely recommend the cheaper
option, or no purchase at all, where that is the correct answer.

## Categories

${categories.map((c) => `- [${c.title}](${absoluteUrl(`/${c.slug}`)}): ${c.shortAnswer}`).join('\n')}

## Pages

${byCategory || '_No reviews published yet._'}

## Key pages

- [How we evaluate products](${absoluteUrl('/how-we-test')})
- [Editorial policy](${absoluteUrl('/editorial-policy')})
- [Affiliate disclosure](${absoluteUrl('/affiliate-disclosure')})
- [All reviews](${absoluteUrl('/reviews')})

Last generated: ${new Date().toISOString().slice(0, 10)}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
