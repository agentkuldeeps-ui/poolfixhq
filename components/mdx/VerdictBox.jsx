import AffiliateButton from './AffiliateButton'
import AffiliateDisclosure from './AffiliateDisclosure'
import RatingBadge from './RatingBadge'
import { priceTierLabel } from '@/lib/taxonomy'

/**
 * The verdict box: the conclusion, at the top, before the reasoning.
 *
 * Deliberately inverted-pyramid. A reader who reads only this box should have
 * the answer, and an answer engine that lifts only this box should quote us
 * correctly. The long-form reasoning below exists for the reader who wants to
 * check our working, not to make them earn the conclusion.
 *
 * "Not for" is not padding. A review that only lists who a product suits is a
 * sales page; naming who should NOT buy it is the sentence that makes the
 * rest credible, and it is the one competitors omit.
 *
 * The disclosure renders INSIDE this box, above the button, because this box
 * is usually the first affiliate link on the page.
 */
export default function VerdictBox({
  product,
  verdict,
  bestFor,
  notFor,
  rating,
  priceTier,
  children,
}) {
  if (!product) return null

  const score = rating ?? product.rating
  const tier = priceTier ?? product.price_tier

  return (
    <section
      aria-label={`Verdict on ${product.name}`}
      className="my-8 overflow-hidden rounded-xl border-2 border-pool-200 bg-white"
    >
      <div className="border-b border-pool-100 bg-pool-50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-pool-600">
              Our verdict
            </p>
            <p className="mt-1 text-xl font-bold leading-snug text-pool-900">{product.name}</p>
            {product.brand && (
              <p className="mt-0.5 text-sm text-slate-500">
                {product.brand}
                {product.model ? ` · ${product.model}` : ''}
              </p>
            )}
          </div>
          {score !== undefined && score !== null && <RatingBadge value={score} />}
        </div>
      </div>

      <div className="space-y-4 px-5 py-5 sm:px-6">
        {(verdict || children) && (
          <div className="text-[17px] leading-relaxed text-slate-700">
            {verdict ? <p>{verdict}</p> : children}
          </div>
        )}

        <dl className="grid gap-3 sm:grid-cols-2">
          {(bestFor ?? product.bestFor) && (
            <div className="rounded-lg bg-verdict-goodBg p-4">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-verdict-good">
                Best for
              </dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-slate-700">
                {bestFor ?? product.bestFor}
              </dd>
            </div>
          )}
          {(notFor ?? product.notFor) && (
            <div className="rounded-lg bg-verdict-badBg p-4">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-verdict-bad">
                Not for
              </dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-slate-700">
                {notFor ?? product.notFor}
              </dd>
            </div>
          )}
        </dl>

        {tier && (
          <p className="text-sm text-slate-500">
            Price bracket: <strong className="font-semibold text-slate-700">{priceTierLabel[tier]}</strong>
            <span className="text-slate-400"> — we don&rsquo;t publish figures; check current pricing on Amazon.</span>
          </p>
        )}

        <AffiliateDisclosure compact />

        <AffiliateButton asin={product.asin} name={product.name} className="w-full sm:w-auto" />
      </div>
    </section>
  )
}
