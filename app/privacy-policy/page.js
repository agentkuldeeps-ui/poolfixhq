import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'What data PoolFixHQ collects, why, and how to have it removed.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <ProsePage
      title="Privacy Policy"
      description="What we collect and what we do with it."
      path="/privacy-policy"
      updated="2026-08-05"
    >
      <p>
        <strong>
          Placeholder scaffold. This is not legal advice and is not a finished policy — have a
          lawyer produce the real thing before you collect a single lead.
        </strong>{' '}
        The headings below cover what a policy for this site needs to address.
      </p>

      <h2>Information we collect</h2>
      <p>Placeholder: form submissions, analytics, cookies, server logs.</p>

      <h2>How we use it</h2>
      <p>Placeholder: matching repair requests to professionals, site analytics, email.</p>

      <h2>Who we share it with</h2>
      <p>
        Placeholder: repair professionals receiving lead details, analytics providers, email
        provider, hosting.
      </p>

      <h2>Cookies and tracking</h2>
      <p>Placeholder: analytics cookies, affiliate attribution cookies set by Amazon.</p>

      <h2>Your rights</h2>
      <p>Placeholder: access, correction, deletion, opt-out. Address GDPR and CCPA/CPRA if in scope.</p>

      <h2>Children</h2>
      <p>Placeholder: the site is not directed to children under 13.</p>

      <h2>Contact</h2>
      <p>Placeholder: a real monitored address for privacy requests.</p>
    </ProsePage>
  )
}
