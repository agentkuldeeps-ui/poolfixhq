/**
 * Key takeaways -- three to five one-line conclusions.
 *
 * Written for the reader who will not read the article, which is most of
 * them, and for the answer engine that wants extractable claims. Each bullet
 * must stand alone: a machine may lift one without the others, so a bullet
 * that only makes sense after the previous bullet is a broken bullet.
 *
 * Sits directly under the answer block, above the body. Deliberately NOT at
 * the end -- a summary at the bottom is written for the author's sense of
 * completion, not the reader's need.
 */
export default function KeyTakeaways({ points = [], title = 'Key takeaways', children }) {
  const items = points.length ? points : null
  if (!items && !children) return null

  return (
    <section
      aria-label={title}
      className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-5"
    >
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-pool-700">
        {title}
      </h2>

      {items ? (
        <ul className="space-y-2.5">
          {items.map((p) => (
            <li key={p} className="flex gap-2.5 text-[16px] leading-relaxed text-slate-700">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-pool-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="prose prose-slate max-w-none prose-p:text-[16px]">{children}</div>
      )}
    </section>
  )
}
