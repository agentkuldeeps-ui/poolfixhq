/**
 * Sources — the citation list, rendered from the `sources` frontmatter block.
 *
 * URLs are validated at build time: anything that isn't a real absolute URL
 * fails the build. Chemistry articles and anything carrying a SafetyWarning
 * must cite at least one source before they can go live.
 *
 * Links are followed, not nofollowed. These point at CDC, EPA, extension
 * programmes and manufacturer documentation — linking out to them is the
 * point, not something to hedge.
 */
export default function Sources({ sources = [], heading = 'Sources' }) {
  if (!sources.length) return null

  return (
    <section aria-labelledby="sources-heading" className="not-prose my-10 border-t border-slate-200 pt-6">
      <h2 id="sources-heading" className="mb-3 text-lg font-bold text-pool-900">
        {heading}
      </h2>
      <ol className="space-y-2 text-[15px] leading-relaxed">
        {sources.map((s, i) => (
          <li key={s.url} className="flex gap-3 text-slate-600">
            <span aria-hidden="true" className="shrink-0 font-semibold tabular-nums text-pool-400">
              {i + 1}.
            </span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener"
              className="text-pool-700 underline decoration-pool-300 underline-offset-2 hover:decoration-pool-700"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
