/**
 * Specifications, as a definition-style table.
 *
 * Two rules baked in:
 *
 *  1. SPECS COME FROM THE MANUFACTURER, NOT THE LISTING. Retailer listings
 *     are marketing copy and are routinely wrong about flow rates, filter
 *     area and BTU. `source` renders a visible provenance line so a reader
 *     can check, and so the writer has to have looked.
 *
 *  2. NO PRICES. There is no price row and there never should be. The build
 *     fails on a dollar figure anywhere in content.
 *
 * Rendered as a real <table> with row headers rather than a styled div grid,
 * because a spec table is exactly the kind of thing an answer engine wants to
 * parse, and it only can if the markup is honest.
 */
export default function SpecTable({ specs = [], title = 'Specifications', source, caption }) {
  const rows = Array.isArray(specs)
    ? specs
    : Object.entries(specs).map(([label, value]) => ({ label, value }))

  if (!rows.length) return null

  return (
    <section className="my-8">
      <h2 className="mb-3 text-xl font-bold text-pool-900">{title}</h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full border-collapse text-left text-[15px]">
          {caption && <caption className="sr-only">{caption}</caption>}
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                <th
                  scope="row"
                  className="w-2/5 border-b border-slate-100 px-4 py-3 align-top font-semibold text-pool-900"
                >
                  {row.label}
                </th>
                <td className="border-b border-slate-100 px-4 py-3 align-top text-slate-700">
                  {row.value}
                  {row.note && (
                    <span className="mt-1 block text-[13px] text-slate-500">{row.note}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {source && (
        <p className="mt-2 text-[13px] text-slate-500">
          Specifications from{' '}
          {source.url ? (
            <a href={source.url} target="_blank" rel="noopener nofollow" className="link-inline">
              {source.title}
            </a>
          ) : (
            <span className="font-medium">{source.title ?? source}</span>
          )}
          . Manufacturer figures, not retailer listing copy.
        </p>
      )}
    </section>
  )
}
