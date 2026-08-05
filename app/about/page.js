import ProsePage from '@/components/ProsePage'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'About PoolFixHQ',
  description:
    'Who writes PoolFixHQ, how we test, and why our advice usually costs you less than the guy at the pool store.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <ProsePage
      title="About PoolFixHQ"
      description={site.tagline}
      path="/about"
    >
      <p>
        <strong>Placeholder copy — replace before launch.</strong>
      </p>
      <h2>Why this site exists</h2>
      <p>
        Placeholder. State the problem: pool advice online is written by people who have never
        pulled a pump apart, and pool stores sell chemicals for a living.
      </p>
      <h2>Who writes this</h2>
      <p>
        Placeholder. Name the techs, years in the field, certifications, and service area. Real
        names and real credentials — this is the page Google and readers both use to decide whether
        to trust the rest of the site.
      </p>
      <h2>How we make money</h2>
      <p>
        Placeholder. Summarize affiliate commissions and repair lead referrals, then link to the{' '}
        <a href="/affiliate-disclosure">affiliate disclosure</a> and{' '}
        <a href="/editorial-policy">editorial policy</a>.
      </p>
      <h2>Contact</h2>
      <p>Placeholder. Add a real monitored email address.</p>
    </ProsePage>
  )
}
