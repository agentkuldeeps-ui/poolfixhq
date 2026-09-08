import Link from 'next/link'
import AffiliateButton from '@/components/mdx/AffiliateButton'
import RatingBadge from '@/components/mdx/RatingBadge'
import { categoryBySlug, priceTierLabel } from '@/lib/taxonomy'
import { ratingFromScores } from '@/lib/scoring'

/**
 * The sticky article sidebar.
 *
 * Desktop only — below `lg` it is hidden entirely and the same information
 * appears inline in the article flow. That is deliberate: a sidebar stacked
 * under 3,000 words on a phone is not a sidebar, it is dead weight at the
 * bottom of the page, and duplicating the table of contents into the DOM
 * twice would duplicate every heading anchor.
 *
 * `position: sticky` with its own scroll container, so a long contents list
 * scrolls independently instead of running off the bottom of the viewport.
 *
 * Everything here is a server component. The sidebar adds no client JS.
 */
export default function ReviewSidebar({ article }) {
  const product = article.products?.[0]
  const category = categoryBySlug[article.category]
  const rating = article.scores
    ? ratingFromScores(article.category, article.scores)
    : product?.rating

  const headings = article.headings.filter((h) => h.level === 2)
  const specs = product?.specs ? Object.entries(product.specs) : []

  return (
    <aside
      aria-label="Review summary"
      className="hidden lg:block"
    >
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] space-y-5 overflow-y-auto pb-8">
        {/* ------------------------------------------------ verdict card */}
        {product && (
          <div className="overflow-hidden rounded-xl border-2 border-pool-300 bg-white">
            <div className="border-b border-pool-200 bg-pool-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-pool-600">
                Our verdict
              </p>
              <p className="mt-1 text-[15px] font-bold leading-snug text-pool-900">
                {product.name}
              </p>
            </div>

            <div className="space-y-3 px-4 py-4">
              {rating != null && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-600">Score</span>
                  <RatingBadge value={rating} size="sm" />
                </div>
              )}

              {product.price_tier && (
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-slate-600">Bracket</span>
                  <span className="font-bold text-pool-900">
                    {priceTierLabel[product.price_tier]}
                  </span>
                </div>
              )}

              <AffiliateButton
                asin={product.asin}
                name={product.name}
                label="Check price"
                className="w-full !px-4 !py-2.5 !text-sm"
              />

              <p className="text-[11px] leading-relaxed text-slate-500">
                Affiliate link. We earn a commission at no extra cost to you.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------- quick specs */}
        {specs.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-pool-600">
              At a glance
            </p>
            <dl className="divide-y divide-slate-100 text-[13.5px]">
              {specs.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3 py-1.5">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="text-right font-semibold text-pool-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* --------------------------------------------- table of contents */}
        {headings.length >= 3 && (
          <nav aria-label="On this page" className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-pool-600">
              On this page
            </p>
            <ol className="space-y-1">
              {headings.map((h) => (
                <li key={h.id}>
                  <Link
                    href={`#${h.id}`}
                    className="block rounded px-1.5 py-1 text-[13.5px] leading-snug text-slate-600 hover:bg-pool-50 hover:text-pool-800"
                  >
                    {h.text}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* -------------------------------------------------------- links */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-pool-600">
            Keep reading
          </p>
          <ul className="space-y-1.5 text-[13.5px]">
            {category && (
              <li>
                <Link href={`/${category.slug}`} className="text-pool-700 hover:underline">
                  All {category.label.toLowerCase()}
                </Link>
              </li>
            )}
            {product?.compat && (
              <li>
                <Link href={`/brands/${product.compat}`} className="text-pool-700 hover:underline">
                  {product.brand ?? product.compat} equipment
                </Link>
              </li>
            )}
            <li>
              <Link href="/how-we-test#scoring" className="text-pool-700 hover:underline">
                How we score products
              </Link>
            </li>
            <li>
              <Link href="/reviews/best-of" className="text-pool-700 hover:underline">
                Best-of roundups
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
