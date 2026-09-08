/**
 * "Before you buy" — the at-a-glance table plus the one thing most likely to
 * cause regret.
 *
 * Deliberately separate from the full specification table. This one answers
 * "will this fit my situation and is there a catch", which is a different
 * question from "what are the numbers", and it belongs much higher on the page.
 *
 * `warning` is not optional in spirit. Every product has something that trips
 * buyers up; if a review cannot name it, the review is not finished.
 */
export default function BeforeYouBuy({ rows = [], warning, title = 'Before you buy' }) {
  if (!rows.length) return null

  return (
    <section className="my-8" aria-labelledby="before-you-buy">
      <h2 id="before-you-buy">{title}</h2>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full border-collapse text-left text-[15px]">
          <caption className="sr-only">Key details to check before purchasing.</caption>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                <th
                  scope="row"
                  className="w-2/5 border-b border-slate-100 px-4 py-3 align-top font-semibold text-pool-900"
                >
                  {r.label}
                </th>
                <td className="border-b border-slate-100 px-4 py-3 align-top text-slate-700">
                  {r.value}
                  {r.note && <span className="mt-1 block text-[13px] text-slate-500">{r.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {warning && (
        <div className="mt-4 flex gap-3 rounded-xl border-l-4 border-verdict-warn bg-verdict-warnBg p-4">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-verdict-warn" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          <p className="text-[15px] leading-relaxed text-slate-800">
            <strong className="font-bold">The one to watch: </strong>
            {warning}
          </p>
        </div>
      )}
    </section>
  )
}
