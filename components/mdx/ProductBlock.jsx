import { getProduct } from '@/lib/products'

/**
 * ProductBlock — a named recommendation, referenced from MDX by id:
 *
 *     <ProductBlock id="drop-test-kit" />
 *
 * Products currently carry identity only — no ASIN, no price, no image — so
 * this renders as a recommendation without a buy link. That is deliberate:
 * a guessed ASIN sends a reader to an unrelated product and earns nothing,
 * which is worse than no link at all.
 *
 * `constraint` renders prominently rather than as fine print. "Not for vinyl
 * or fiberglass" is a wrecked liner if someone skims past it.
 */
export default function ProductBlock({ id, note }) {
  const product = getProduct(id)

  if (!product) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`<ProductBlock id="${id}" /> — no product with that id in lib/products.js`)
    }
    return null
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-slate-100 bg-slate-50 px-5 py-2.5">
        <span className="text-xs font-bold uppercase tracking-widest text-pool-600">
          What to use
        </span>
        {product.category && (
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {product.category.replace('-', ' ')}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-pool-900">{product.title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">{product.summary}</p>

        {product.constraint && (
          <p className="mt-3 flex gap-2 rounded-lg border border-accent-200 bg-accent-50 px-3.5 py-2.5 text-[15px] leading-snug text-accent-900">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-4 w-4 shrink-0"
            >
              <path d="M10.3 3.9L2.4 17.5A2 2 0 004.1 20.5h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
              <path d="M12 9v4m0 4h.01" />
            </svg>
            <span>{product.constraint}</span>
          </p>
        )}

        {note && <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{note}</p>}
      </div>
    </div>
  )
}
