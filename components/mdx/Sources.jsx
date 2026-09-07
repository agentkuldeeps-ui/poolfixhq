/**
 * The sources list, from frontmatter `sources`.
 *
 * Visible citations are an E-E-A-T signal that costs nothing and that most
 * affiliate sites skip. They also constrain the writer: a claim that has to
 * sit next to a link to the manual is a claim someone actually checked.
 *
 * Outbound rel is "noopener nofollow" -- nofollow because we cite a lot of
 * manufacturer PDFs and do not want to pass equity to a retailer's domain by
 * accident, and because these are references rather than endorsements.
 *
 * URLs are structurally validated at build time (lib/frontmatter.js) but
 * never fetched. The reasoning is documented there.
 */
export default function Sources({ sources = [], title = 'Sources' }) {
  if (!sources.length) return null

  return (
    <section className="my-10" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="mb-4 text-xl font-bold text-pool-900">
        {title}
      </h2>

      <ol className="space-y-2.5 text-[15px]">
        {sources.map((s, i) => (
          <li key={s.url} className="flex gap-3 leading-relaxed">
            <span className="shrink-0 font-mono text-xs text-slate-400">{i + 1}.</span>
            <span>
              <a
                href={s.url}
                target="_blank"
                rel="noopener nofollow"
                className="font-medium text-pool-700 underline underline-offset-2 hover:text-pool-900"
              >
                {s.title}
              </a>
              {s.publisher && <span className="text-slate-500"> &mdash; {s.publisher}</span>}
              {s.accessed && (
                <span className="text-slate-400"> (accessed {s.accessed})</span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
