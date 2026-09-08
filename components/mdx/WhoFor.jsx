/**
 * "Who should buy / who should not" — as concrete buyer scenarios, never as
 * "anyone who wants a good pump".
 *
 * Each entry is `{ who, why }`: the situation first, then what about the
 * product makes it right or wrong for that situation. Structuring it as a
 * definition list rather than prose means an answer engine can lift a single
 * scenario cleanly, which is exactly the query shape people use ("is X good
 * for a small above ground pool").
 *
 * `variant` decides the tone. Both blocks use the same component so the two
 * halves of the answer always look like a matched pair.
 */
const STYLES = {
  buy: {
    border: 'border-verdict-good/25',
    bg: 'bg-verdict-goodBg',
    accent: 'text-verdict-good',
    dot: 'bg-verdict-good',
    defaultTitle: 'Who should buy it',
  },
  skip: {
    border: 'border-verdict-bad/25',
    bg: 'bg-verdict-badBg',
    accent: 'text-verdict-bad',
    dot: 'bg-verdict-bad',
    defaultTitle: 'Who should not buy it',
  },
}

export default function WhoFor({ variant = 'buy', items = [], title, id }) {
  // See the note in BeforeYouBuy.jsx: an empty data prop means the JSX
  // expression was stripped, not that the author wanted an empty section.
  if (!items.length) {
    throw new Error(
      `[WhoFor variant="${variant}"] rendered with no items. If the MDX passes ` +
        'items={[...]}, check `blockJS` in components/MdxRenderer.jsx.',
    )
  }
  const s = STYLES[variant] ?? STYLES.buy
  const headingId = id ?? `who-${variant}`

  return (
    <section className="my-8" aria-labelledby={headingId}>
      <h2 id={headingId}>{title ?? s.defaultTitle}</h2>

      <dl className={`mt-4 divide-y divide-white/60 rounded-xl border ${s.border} ${s.bg} p-5`}>
        {items.map((item, i) => (
          <div key={item.who} className={i === 0 ? 'pb-4' : 'py-4 last:pb-0'}>
            <dt className={`flex items-baseline gap-2.5 font-bold ${s.accent}`}>
              <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
              <span className="text-[16px] text-slate-900">{item.who}</span>
            </dt>
            <dd className="mt-1 pl-[18px] text-[15px] leading-relaxed text-slate-700">
              {item.why}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
