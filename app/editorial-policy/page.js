import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Editorial Policy',
  description:
    'How PoolFixHQ researches, sources, reviews, and updates its pool repair and chemistry guides.',
  path: '/editorial-policy',
})

export default function EditorialPolicyPage() {
  return (
    <ProsePage
      title="Editorial Policy"
      description="What we will and will not publish, and how to hold us to it."
      path="/editorial-policy"
      updated="2026-08-05"
    >
      <p>
        <strong>Placeholder copy — review and expand before launch.</strong> The commitments below
        reflect how the site is actually built; keep them accurate as the process changes.
      </p>

      <h2>Sourcing</h2>
      <p>
        We cite primary sources: the CDC, the EPA, university extension programs, and manufacturer
        documentation. We do not invent statistics, studies, or citations. When a claim cannot be
        verified against a real source, it does not get published.
      </p>

      <h2>Who writes and reviews</h2>
      <p>
        Placeholder. Describe the author and reviewer roles, the credentials behind them, and how a
        draft moves from written to published.
      </p>

      <h2>Safety</h2>
      <p>
        Any article touching muriatic acid, chlorine, shock, or chemical mixing carries a safety
        warning. Never-mix guidance is non-negotiable and is never softened for readability.
      </p>

      <h2>Product recommendations</h2>
      <p>
        Recommendations are made on the merits. Commission rates play no part in what gets
        recommended or in the order products appear. See our{' '}
        <a href="/affiliate-disclosure">affiliate disclosure</a>. Where a cheap fix beats an
        expensive product, we say so, even when saying so earns us nothing.
      </p>

      <h2>Corrections and updates</h2>
      <p>
        Every article shows a last-updated date. Placeholder: describe the review cadence and how
        readers report an error.
      </p>

      <h2>What we are not</h2>
      <p>
        General guidance, not a substitute for a licensed professional inspecting your pool. Gas,
        electrical, and structural work is licensed work in most states.
      </p>
    </ProsePage>
  )
}
