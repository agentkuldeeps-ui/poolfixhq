/**
 * Pros and cons, side by side.
 *
 * Both columns are required. A review with three pros and no cons is a
 * product description, and readers discount it accordingly -- the cons column
 * is what makes the pros column believable.
 *
 * Write cons that would actually stop someone buying, not "the manual could
 * be clearer". If the honest answer is that a product has no meaningful
 * drawback for its intended buyer, say who it IS wrong for instead.
 */
export default function ProsCons({ pros = [], cons = [], title }) {
  // See the note in BeforeYouBuy.jsx. Both columns are required by the
  // editorial standard anyway, so an empty one is always a bug.
  if (!pros.length || !cons.length) {
    throw new Error(
      `[ProsCons] needs both columns — got ${pros.length} pros and ${cons.length} cons. ` +
        'If the MDX passes both, check `blockJS` in components/MdxRenderer.jsx.',
    )
  }

  return (
    <section className="my-8">
      {title && <h2 className="mb-3 text-xl font-bold text-pool-900 sm:text-2xl">{title}</h2>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-verdict-good/20 bg-verdict-goodBg p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-verdict-good">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            What works
          </h3>
          <ul className="space-y-2.5">
            {pros.map((p) => (
              <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-verdict-good" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-verdict-bad/20 bg-verdict-badBg p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-verdict-bad">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            What doesn&rsquo;t
          </h3>
          <ul className="space-y-2.5">
            {cons.map((c) => (
              <li key={c} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-verdict-bad" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
