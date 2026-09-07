import Link from 'next/link'

/**
 * Table of contents, built from the H2s and H3s parsed out of the MDX at
 * build time (lib/content.js extractHeadings). Ids mirror rehype-slug, so the
 * anchors always resolve.
 *
 * Static links, no JavaScript, no scroll-spy. A scroll-spy TOC would mean
 * shipping client JS on every article for a highlight effect, which is a poor
 * trade on a site whose Core Web Vitals margin is its main technical
 * advantage.
 *
 * Jump links also give answer engines an outline of the page and give Google
 * candidate "jump to" sitelinks.
 */
export default function TableOfContents({ headings = [], title = 'On this page' }) {
  const items = headings.filter((h) => h.level === 2)
  if (items.length < 3) return null

  return (
    <nav aria-labelledby="toc-heading" className="my-6 rounded-xl border border-slate-200 bg-white p-5">
      <h2 id="toc-heading" className="mb-3 text-[11px] font-bold uppercase tracking-widest text-pool-700">
        {title}
      </h2>
      <ol className="space-y-1.5">
        {items.map((h, i) => (
          <li key={h.id} className="flex gap-3 text-[15px] leading-snug">
            <span className="shrink-0 font-mono text-xs text-slate-300">
              {String(i + 1).padStart(2, '0')}
            </span>
            <Link href={`#${h.id}`} className="text-pool-800 hover:text-accent-700 hover:underline">
              {h.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
