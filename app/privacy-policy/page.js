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
 * no accounts and no forms, running Google Analytics 4 and nothing else.
 *
 * THE RULE THIS PAGE LIVES BY: if a newsletter, a form, an ad network or a
 * second analytics tool is added later, this page is updated in the SAME
 * commit. A privacy policy describing collection that does not happen is
 * almost as bad as one omitting collection that does, and both are trivially
 * checkable by anyone who opens dev tools.
 *
 * GA4 was added on 2026-09-09; the "no first-party tracking" wording that
 * stood here before it went out with the same commit that added the tag.
 */
export default function PrivacyPolicyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy Policy"
      description="What we collect, which is very little."
      updated="2026-09-09"
    >
      <h2>The short version</h2>

      <p>
        {site.name} is a static website. We do not ask for your name, email address or any other
        personal information, we do not have accounts, and we do not run advertising networks. We
        use Google Analytics to count visits, which sets cookies — that is the only tracking on
        the site, and the section below says exactly what it does.
      </p>

      <h2>What we collect directly</h2>

      <p>
        Nothing you type. There are no forms, no sign-ups and no logins. The only information
        gathered is the anonymous usage measurement described next.
      </p>

      <h2>Analytics</h2>

      <p>
        We use <strong>Google Analytics 4</strong> to see which pages get read and which do not.
        It sets cookies in your browser and reports to Google: the pages you view on this site,
        roughly where in the world you are, your device and browser type, and how you arrived
        here. Google receives your IP address to work out approximate location; GA4 does not store
        it.
      </p>

      <p>
        We use it to decide what to write next — nothing more. We do not run advertising, we do
        not build profiles of individual readers, and we cannot identify you from it. The reports
        we see are counts and averages.
      </p>

      <p>
        <strong>If you would rather not be counted</strong>, any of these work: a browser set to
        block third-party or analytics cookies, most ad blockers or privacy extensions, or
        Google&rsquo;s own{' '}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener nofollow"
        >
          Analytics opt-out browser add-on
        </a>
        . Nothing on this site behaves differently if you do — there is no wall and no nag.
        Google&rsquo;s handling of this data is covered by{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener nofollow"
        >
          Google&rsquo;s privacy policy
        </a>
        .
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
        holds about you. We hold no account, contact or payment data, so in most cases there is
        nothing for us to return or erase. The exception is the analytics data described above,
        which sits in Google Analytics rather than with us — we can delete what is attributable to
        you there on request, and the browser-level opt-outs listed in that section stop it being
        collected in the first place.
      </p>

      <p>
        We do not sell or share personal information, in the sense those terms carry under
        California law or any other.
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
