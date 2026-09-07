import Link from 'next/link'
import { compatBrands } from '@/lib/categories'
import { getAllArticles } from '@/lib/content'

/**
 * "Shop by brand system" -- replaces the old regional-state chips.
 *
 * The reasoning is the same one that made state chips work: pool owners do not
 * shop the whole market, they shop inside a constraint. For regional guides
 * that constraint was climate. For parts it is the brand already bolted to the
 * equipment pad -- a Hayward owner buying a replacement cell is choosing
 * between Hayward cells, not between brands.
 *
 * Brands with no reviews yet render as muted text rather than links, the same
 * pattern the old symptom index used, so this can show the finished shape
 * without shipping a 404.
 */
export default function BrandChips() {
  const all = getAllArticles()

  const counts = Object.fromEntries(
    compatBrands.map((b) => [
      b.slug,
      all.filter((a) => (a.products ?? []).some((p) => p.compat === b.slug)).length,
    ]),
  )

  return (
    <section aria-labelledby="brands-heading" className="bg-slate-50">
      <div className="container-page py-12 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="brands-heading"
            className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl"
          >
            Shop by brand system
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Replacement cells, cartridges and parts mostly have to match what is already on your
            equipment pad. Start from the badge on the housing.
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {compatBrands.map((brand) => {
            const count = counts[brand.slug]

            return (
              <li key={brand.slug}>
                {count ? (
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-pool-100 bg-white px-4 py-2.5 text-[15px] font-semibold text-pool-800 transition-colors hover:border-pool-400 hover:bg-pool-50"
                  >
                    {brand.label}
                    <span className="text-xs font-bold text-slate-400">{count}</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-100 bg-white px-4 py-2.5 text-[15px] font-semibold text-slate-400">
                    {brand.label}
                    <span className="text-xs uppercase tracking-wide">soon</span>
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
