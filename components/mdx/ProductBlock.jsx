import { getProduct, amazonUrl } from '@/lib/products'

/**
 * ProductBlock -- the affiliate unit. Referenced from MDX by id only:
 *
 *     <ProductBlock id="placeholder-test-kit" />
 *
 * Everything displayed comes from lib/products.js. There is deliberately no
 * prop for ASIN, URL, or image -- if you find yourself wanting one, the product
 * belongs in lib/products.js instead.
 *
 * A CTA sits at the top and the bottom because readers convert from both:
 * the skimmer who decided at the badge, and the reader who finished the bullets.
 */
function Cta({ href, label }) {
  if (!href) {
    return (
      <span className="inline-flex items-center rounded-lg bg-slate-100 px-6 py-3 text-base font-semibold text-slate-500">
        Link unavailable
      </span>
    )
  }
  return (
    <a href={href} rel="nofollow sponsored noopener" target="_blank" className="btn-primary w-full sm:w-auto">
      {label}
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </a>
  )
}

export default function ProductBlock({ id, label = 'Check Price on Amazon' }) {
  const product = getProduct(id)

  if (!product) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `<ProductBlock id="${id}" /> -- no product with that id in lib/products.js`,
      )
    }
    return null
  }

  const href = amazonUrl(product)

  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {product.badge && (
        <p className="bg-pool-700 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white">
          {product.badge}
        </p>
      )}

      <div className="p-5 sm:p-6">
        <div className="sm:flex sm:gap-6">
          <div className="mx-auto mb-4 w-40 shrink-0 sm:mx-0 sm:mb-0">
            <img
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-lg bg-slate-50 object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-pool-900">{product.title}</h3>

            <div className="mt-4">
              <Cta href={href} label={label} />
            </div>

            <ul className="mt-5 space-y-2">
              {product.features?.map((feature) => (
                <li key={feature} className="flex gap-2 text-[15px] leading-snug text-slate-700">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-3.5 w-3.5 shrink-0 text-pool-600">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {product.bestFor && (
              <p className="mt-5 rounded-lg bg-pool-50 px-4 py-3 text-[15px] text-pool-900">
                <span className="font-bold">Best for: </span>
                {product.bestFor}
              </p>
            )}

            <div className="mt-5">
              <Cta href={href} label={label} />
            </div>
          </div>
        </div>
      </div>

      <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
        Paid link. We earn a commission if you buy, at no extra cost to you.
      </p>
    </div>
  )
}
