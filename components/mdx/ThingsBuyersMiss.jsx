/**
 * "Things buyers often miss" — a recurring PoolFixHQ block.
 *
 * This is the section that has to justify the page existing. Every competing
 * review restates the same specification sheet; this block is where a page
 * says the thing the others do not know.
 *
 * The rule for what belongs here: it must be **checkable and consequential**.
 * A detail that only surprises someone who did not read the manual is not a
 * finding. A detail that changes what you buy, what it costs you, or whether
 * it works with what you already own, is.
 *
 * Reads from frontmatter `buyersMiss` so the points also travel into the
 * page's structured summary rather than being buried in prose.
 */
export default function ThingsBuyersMiss({
  article,
  points,
  title,
  children,
}) {
  const items = points ?? article?.buyersMiss ?? []
  if (!items.length && !children) return null

  const heading = title ?? `${items.length} things buyers often miss`

  return (
    <section className="my-8" aria-labelledby="buyers-miss">
      <h2 id="buyers-miss">{heading}</h2>

      {items.length > 0 && (
        <ol className="mt-5 space-y-3">
          {items.map((point, i) => (
            <li
              key={point}
              className="flex gap-4 rounded-xl border border-pool-200 bg-pool-50 p-4 sm:p-5"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pool-700 text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <span className="text-[16px] leading-relaxed text-slate-800">{point}</span>
            </li>
          ))}
        </ol>
      )}

      {children && (
        <div className="prose prose-slate mt-5 max-w-none prose-p:text-[16px]">{children}</div>
      )}
    </section>
  )
}
