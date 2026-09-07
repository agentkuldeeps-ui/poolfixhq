/**
 * Our own score, out of 5, shown as a number rather than as stars.
 *
 * Numerals over stars on purpose: stars imply an aggregate of many people's
 * opinions, which this is not. This is one site's assessment against the
 * published criteria for that category (lib/taxonomy.js `buyingCriteria`),
 * and the label says so.
 *
 * The matching schema is `Review.reviewRating` and never AggregateRating --
 * see the note at the top of lib/schema.js.
 */
export default function RatingBadge({ value, size = 'md' }) {
  if (value === undefined || value === null) return null

  const n = Number(value)
  const tone =
    n >= 4.5
      ? 'bg-verdict-goodBg text-verdict-good ring-verdict-good/20'
      : n >= 3.5
        ? 'bg-pool-50 text-pool-700 ring-pool-700/20'
        : n >= 2.5
          ? 'bg-verdict-warnBg text-verdict-warn ring-verdict-warn/20'
          : 'bg-verdict-badBg text-verdict-bad ring-verdict-bad/20'

  const dims = size === 'sm' ? 'px-2.5 py-1 text-sm' : 'px-3.5 py-2 text-lg'

  return (
    <div className="shrink-0 text-right">
      <span
        className={`inline-flex items-baseline gap-1 rounded-lg font-extrabold ring-1 ${tone} ${dims}`}
      >
        {n.toFixed(1)}
        <span className="text-[0.7em] font-bold opacity-60">/5</span>
      </span>
      {size !== 'sm' && (
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Our score
        </p>
      )}
    </div>
  )
}
