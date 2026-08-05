import ProsePage from '@/components/ProsePage'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Affiliate Disclosure',
  description:
    'How PoolFixHQ earns money from affiliate links and repair referrals, and what that does and does not influence.',
  path: '/affiliate-disclosure',
})

export default function AffiliateDisclosurePage() {
  return (
    <ProsePage
      title="Affiliate Disclosure"
      description="Plain English, as required by the FTC."
      path="/affiliate-disclosure"
      updated="2026-08-05"
    >
      <p>
        <strong>Placeholder copy — have this reviewed before launch.</strong>
      </p>

      <h2>Amazon Associates</h2>
      <p>
        {site.name} is a participant in the Amazon Services LLC Associates Program, an affiliate
        advertising program designed to provide a means for sites to earn advertising fees by
        advertising and linking to Amazon.com. As an Amazon Associate we earn from qualifying
        purchases.
      </p>

      <h2>What that means for you</h2>
      <p>
        If you buy something through a link on this site, we may earn a commission. It costs you
        nothing extra. Product links are marked, and every product block on the site carries a paid
        link notice.
      </p>

      <h2>Repair referrals</h2>
      <p>
        Placeholder. Describe the lead referral arrangement: what is shared, with whom, and whether
        a fee is earned per lead or per job.
      </p>

      <h2>What it does not affect</h2>
      <p>
        Commission rates do not decide what we recommend or the order products appear in. See the{' '}
        <a href="/editorial-policy">editorial policy</a>.
      </p>
    </ProsePage>
  )
}
