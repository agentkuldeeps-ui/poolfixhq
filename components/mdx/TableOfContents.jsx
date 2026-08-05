/**
 * TableOfContents -- auto-generated from the article's H2s.
 *
 * Headings are parsed out of the raw MDX in lib/content.js and bound into this
 * component by MdxRenderer, so authors just drop <TableOfContents /> after the
 * QuickAnswer and never maintain a list by hand. Ids come from rehype-slug.
 *
 * Renders nothing when an article has fewer than three H2s -- a two-item TOC is
 * noise.
 */
export default function TableOfContents({ headings = [], minHeadings = 3 }) {
  if (!headings || headings.length < minHeadings) return null

  return (
    <nav
      aria-labelledby="toc-heading"
      className="not-prose my-6 rounded-xl border border-slate-200 bg-slate-50 p-5"
    >
      <p id="toc-heading" className="mb-3 text-sm font-bold uppercase tracking-widest text-pool-800">
        Jump to Section
      </p>
      <ol className="space-y-2">
        {headings.map((heading, index) => (
          <li key={heading.id} className="flex gap-3 text-[15px] leading-snug">
            <span aria-hidden="true" className="font-semibold text-pool-400 tabular-nums">
              {index + 1}.
            </span>
            <a
              href={`#${heading.id}`}
              className="text-pool-700 underline decoration-pool-200 underline-offset-2 hover:decoration-pool-700"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
