import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Affiliate Disclosure',
  description:
    'How PoolFixHQ makes money, what that changes about our recommendations, and what it costs you (nothing).',
  path: '/affiliate-disclosure',
})

export default function AffiliateDisclosurePage() {
  return (
    <ProsePage
      eyebrow="Disclosure"
      title="Affiliate Disclosure"
      description="How this site makes money, stated plainly."
      updated="2026-09-07"
    >
      <div className="answer-block not-prose my-6">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-pool-600">
          Short answer
        </p>
        <p>
          {site.name} earns a commission when you buy through our links, at no extra cost to you.
          Commission rates play no part in what we recommend, and we regularly recommend the
          cheaper product or no purchase at all.
        </p>
      </div>

      <h2>The Amazon Associates Program</h2>

      <p>
        {site.name} is a participant in the Amazon Services LLC Associates Program, an affiliate
        advertising program designed to provide a means for sites to earn advertising fees by
        advertising and linking to Amazon.com. As an Amazon Associate we earn from qualifying
        purchases.
      </p>

      <p>
        In plain terms: some links on this site carry a tracking code. If you click one and buy
        something, Amazon pays us a small percentage. <strong>You pay the same price</strong> you
        would have paid arriving at Amazon any other way.
      </p>

      <h2>What we do to keep this honest</h2>

      <ul>
        <li>
          <strong>Every page with an affiliate link says so, above the link</strong> — not only
          here, and not only in the footer.
        </li>
        <li>
          <strong>We never publish prices.</strong> We have no live price feed, so any figure would
          go stale. Products get a budget, mid-range or premium bracket instead.
        </li>
        <li>
          <strong>Commission rate is not a scoring criterion.</strong> The criteria for every
          category are published on that category&rsquo;s page, before any product is scored.
        </li>
        <li>
          <strong>We recommend against purchases regularly.</strong> Cleaning a part rather than
          replacing it, or buying the cheaper option, are common conclusions here. Those cost us
          the referral.
        </li>
        <li>
          <strong>No paid placements, ever.</strong> No manufacturer has paid for, previewed, or
          influenced a recommendation on this site. If that ever changes, it will be labelled on
          the page, not disclosed quietly here.
        </li>
      </ul>

      <h2>What we do not do</h2>

      <ul>
        <li>We do not use link shorteners or cloaked redirects. You can always see where a link goes.</li>
        <li>We do not put affiliate links in our RSS feed or in email.</li>
        <li>We do not reproduce retailer customer reviews or aggregate their star ratings.</li>
      </ul>

      <h2>Why you should still check us</h2>

      <p>
        Everyone in this business writes a disclosure page saying their recommendations are
        independent. A disclosure page is not evidence. The evidence is whether the reviews
        actually behave that way — whether a site ever concludes that the expensive option is
        unnecessary, and whether it explains its reasoning well enough for you to disagree with it.
      </p>

      <p>
        That is what <Link href="/how-we-test">our method page</Link> is for, and it is a fairer
        test of this claim than anything on this page.
      </p>

      <h2>Questions</h2>

      <p>
        Email <a href={`mailto:${site.publisher.email}`}>{site.publisher.email}</a>.
      </p>
    </ProsePage>
  )
}
