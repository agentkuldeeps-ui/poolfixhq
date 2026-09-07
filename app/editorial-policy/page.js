import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Editorial Policy',
  description:
    'Sourcing standards, corrections, use of AI, and the rules that decide what gets published on PoolFixHQ.',
  path: '/editorial-policy',
})

export default function EditorialPolicyPage() {
  return (
    <ProsePage
      eyebrow="Policy"
      title="Editorial Policy"
      description="The rules that decide what gets published here, and what does not."
      updated="2026-09-07"
    >
      <h2>Sourcing</h2>

      <p>Sources are ranked, and a claim may only rest on the highest tier available to it.</p>

      <ol>
        <li>
          <strong>Manufacturer documentation.</strong> Spec sheets, installation and service
          manuals, product labels, safety data sheets. This is the spine of a product review.
          Retailer listings are marketing copy and are not a source.
        </li>
        <li>
          <strong>Government, standards and public-health bodies.</strong> CDC, EPA, CPSC, state
          health departments, university extension services. Every health, safety or chemical
          claim must reach this tier where such a source exists.
        </li>
        <li>
          <strong>Documented owner-reported patterns.</strong> Used only for how things fail in
          service, never for specifications, and always described as what it is.
        </li>
      </ol>

      <p>
        Citations are visible on the page. If a claim cannot be attached to a source, it is either
        cut or clearly marked as our own judgment.
      </p>

      <h2>Chemicals and safety</h2>

      <ul>
        <li>
          <strong>The product label is authoritative.</strong> Where this site and a label
          disagree, the label is right and we are wrong. We do not publish dosing that departs from
          it.
        </li>
        <li>We do not claim a chemical treats a condition its label does not name.</li>
        <li>
          Gas, electrical and structural work is licensed work. We say so and stop, rather than
          writing a procedure someone might follow.
        </li>
        <li>
          Anything involving entrapment, drowning risk or chemical handling carries a safety
          notice, and a page carrying one cannot be published without a real source.
        </li>
      </ul>

      <h2>Independence</h2>

      <p>
        No manufacturer, retailer or PR agency has any input into what is published here. Nobody
        pays for placement, and nobody previews a review. Products are selected on what readers are
        actually deciding between, not on commission rate.
      </p>

      <p>
        We earn affiliate commission — see the{' '}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link> — and that fact is disclosed
        on every page carrying such a link.
      </p>

      <h2>Use of AI</h2>

      <p>
        We use AI tooling in research and drafting. We are saying so because the alternative is
        pretending otherwise, which is both common and dishonest.
      </p>

      <p>What that does not change:</p>

      <ul>
        <li>Every specification is checked against the manufacturer&rsquo;s own document by a person.</li>
        <li>Every citation is a real, resolvable URL. Invented sources are the fastest way to lose a reader permanently.</li>
        <li>Nothing publishes without a named human reviewing it.</li>
        <li>No page is generated at scale from a template. Pages that say nothing are not worth having.</li>
      </ul>

      <h2>Corrections</h2>

      <p>
        Every page shows when it was last updated. When a correction changes a conclusion, we note
        the change on the page rather than editing it away quietly — the record of having been
        wrong is more useful to a reader than the appearance of never having been.
      </p>

      <p>
        Report an error: <a href={`mailto:${site.publisher.email}`}>{site.publisher.email}</a>.
        Please include the page and, where you can, the document that shows the correct figure.
      </p>

      <h2>Updates</h2>

      <p>
        Product content decays. Models are discontinued, specifications are revised, and a
        recommendation that was right two years ago can be actively bad now. Reviews are re-checked
        on a schedule, and a page that can no longer be stood behind is corrected or withdrawn
        rather than left up.
      </p>

      <p>
        <Link href="/how-we-test">How we evaluate products</Link>
      </p>
    </ProsePage>
  )
}
