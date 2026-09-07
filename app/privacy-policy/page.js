import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'What PoolFixHQ collects, what it does not, and how affiliate links work.',
  path: '/privacy-policy',
})

/**
 * Written to describe what this site ACTUALLY does today: a static site with
 * no accounts, no forms and no first-party analytics.
 *
 * If analytics, a newsletter or any form is added later, this page must be
 * updated in the same commit. A privacy policy describing data collection
 * that does not happen is almost as bad as one omitting collection that does.
 */
export default function PrivacyPolicyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy Policy"
      description="What we collect, which is very little."
      updated="2026-09-07"
    >
      <h2>The short version</h2>

      <p>
        {site.name} is a static website. We do not ask for your name, email address or any other
        personal information, we do not have accounts, and we do not run advertising networks.
      </p>

      <h2>What we collect directly</h2>

      <p>
        Nothing. There are no forms, no sign-ups and no first-party tracking cookies on this site
        at present. If that changes, this page will be updated before the change ships.
      </p>

      <h2>What our host collects</h2>

      <p>
        This site is served by a hosting provider that keeps standard server logs — IP address,
        user agent, requested URL, timestamp — for security and to keep the service running. That
        is ordinary infrastructure logging and we do not use it to build a profile of you.
      </p>

      <h2>Affiliate links</h2>

      <p>
        Links to Amazon carry a tracking identifier so Amazon can attribute a purchase to this
        site. Following one takes you to Amazon, where <strong>Amazon&rsquo;s</strong> privacy
        policy and cookies apply, not ours. We receive aggregate earnings reports; we do not
        receive your name, address or payment details, and we cannot see what any individual
        person bought.
      </p>

      <p>
        See the <Link href="/affiliate-disclosure">affiliate disclosure</Link> for how this works
        commercially.
      </p>

      <h2>Other outbound links</h2>

      <p>
        We link to manufacturer documentation and public-health sources. Those sites have their own
        privacy practices and we are not responsible for them.
      </p>

      <h2>Children</h2>

      <p>
        This site is intended for adults maintaining a swimming pool. We do not knowingly collect
        information from children.
      </p>

      <h2>Your rights</h2>

      <p>
        Depending on where you live, you may have rights to access or delete personal data a site
        holds about you. Since we do not collect any, there is generally nothing for us to return
        or erase — but if you believe otherwise, write to us and we will look into it.
      </p>

      <h2>Changes</h2>

      <p>
        Material changes will be reflected in the last-reviewed date at the bottom of this page.
      </p>

      <h2>Contact</h2>

      <p>
        <a href={`mailto:${site.publisher.email}`}>{site.publisher.email}</a>
      </p>
    </ProsePage>
  )
}
