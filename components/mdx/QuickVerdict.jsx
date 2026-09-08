import AffiliateButton from './AffiliateButton'
import AffiliateDisclosure from './AffiliateDisclosure'
import RatingBadge from './RatingBadge'
import { priceTierLabel } from '@/lib/taxonomy'
import { ratingFromScores } from '@/lib/scoring'

/**
 * The quick verdict, directly under the H1.
 *
 * Everything a buyer needs to decide, above the fold, before any reasoning.
 * The long-form analysis below exists so they can check our working, not so
 * they have to earn the conclusion.
 *
 * `bestFor` and `notFor` both render, and both are required in practice: a
 * review that only names who a product suits is a sales page. Naming who
 * should NOT buy it is what makes the rest credible.
 *
 * The rating is read from the score breakdown rather than passed in, so this
 * box cannot disagree with the scorecard further down the page.
 */
export default function QuickVerdict({ article, children, categoryLabel }) {
  const product = article?.products?.[0]
  if (!product) return null

  const rating = article.scores ? ratingFromScores(article.category, article.scores) : product.rating

  return (
    <section
      aria-label="Quick verdict"
      className="my-6 overflow-hidden rounded-xl border-2 border-pool-300 bg-white"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-pool-200 bg-pool-50 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-pool-600">
            Our rating
          </p>
          <p className="mt-1 text-xl font-bold leading-snug text-pool-900">{product.name}</p>
          <p className="mt-0.5 text-sm text-slate-500">
            {[product.brand, categoryLabel, product.price_tier ? priceTierLabel[product.price_tier] : null]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
        {rating != null && <RatingBadge value={rating} />}
      </div>

      <div className="space-y-4 px-5 py-5 sm:px-6">
        <dl className="grid gap-3 sm:grid-cols-2">
          {product.bestFor && (
            <div className="rounded-lg bg-verdict-goodBg p-4">
              <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-verdict-good">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Best for
              </dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed text-slate-700">{product.bestFor}</dd>
            </div>
          )}
          {product.notFor && (
            <div className="rounded-lg bg-verdict-badBg p-4">
              <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-verdict-bad">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Not ideal for
              </dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed text-slate-700">{product.notFor}</dd>
            </div>
          )}
        </dl>

        {children && (
          <div className="prose prose-slate max-w-none prose-p:text-[16px] prose-p:leading-relaxed">
            {children}
          </div>
        )}

        <AffiliateDisclosure compact />
        <AffiliateButton asin={product.asin} name={product.name} className="w-full sm:w-auto" />
      </div>
    </section>
  )
}
