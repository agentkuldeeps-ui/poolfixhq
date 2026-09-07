import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { site } from '@/lib/site'
import { hasNoRealAuthors, publishedAuthors } from '@/lib/authors'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'About PoolFixHQ',
  description:
    'Who runs PoolFixHQ, what it publishes, and why a pool product review here reads differently from the ones above it in the results.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <ProsePage
      eyebrow="About"
      title="About PoolFixHQ"
      description="What this site publishes, and why."
      updated="2026-09-07"
    >
      <div className="answer-block not-prose my-6">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-pool-600">
          Short answer
        </p>
        <p>
          {site.name} reviews swimming pool equipment and chemicals for US residential pool owners.
          Reviews are built from manufacturer documentation rather than retailer listings, scored
          against criteria published before any product is judged, and funded by affiliate
          commission that is disclosed on every page.
        </p>
      </div>

      <h2>Why this site exists</h2>

      <p>
        Search for almost any pool product and the first page is near-identical: the same
        specifications lifted from the same retailer listing, the same five products in the same
        order, and a conclusion that every one of them is excellent.
      </p>

      <p>
        That is not a reviewing problem, it is a sourcing problem. A retailer listing is written to
        sell, and it is routinely wrong about the numbers that actually decide a purchase — flow
        rate at real system head, filter area against pump output, available chlorine percentage,
        what a cell is rated for versus what it is being asked to do.
      </p>

      <p>
        The manufacturer publishes those numbers. They are in the spec sheet, the installation
        manual and the product label. Reading them properly is unglamorous and it is most of what
        makes a review useful.
      </p>

      <h2>What we publish</h2>

      <ul>
        <li>
          <strong>Individual reviews</strong> — one product, in depth, with the verdict at the top.
        </li>
        <li>
          <strong>Best-of roundups</strong> — a category shortlist with the comparison table behind
          it.
        </li>
        <li>
          <strong>Head-to-head comparisons</strong> — for when it is down to two.
        </li>
      </ul>

      <p>
        Every category page publishes <Link href="/how-we-test">the criteria we judge on</Link>{' '}
        before any product is scored against them.
      </p>

      <h2>What we are not</h2>

      <p>
        We are not a lab. There is no test tank and no instrumented rig, and a site of this size
        claiming otherwise would be lying. Most reviews here are documentary, and each page says
        which it is. That is a real limitation and we would rather state it than dress it up as
        &ldquo;extensively tested&rdquo;.
      </p>

      <p>
        We are also not a pool service company, and nothing here replaces a licensed professional
        for gas, electrical or structural work.
      </p>

      <h2>Who writes it</h2>

      {hasNoRealAuthors ? (
        <p>
          Author profiles are being set up. Until a named person with verifiable credentials is
          published here, pages are credited to the editorial team and this site emits no
          personal-authorship structured data — we would rather show nothing than assert a
          credential we cannot evidence.
        </p>
      ) : (
        <ul>
          {publishedAuthors.map((a) => (
            <li key={a.slug}>
              <Link href={`/authors/${a.slug}`}>{a.name}</Link>
              {a.credential ? ` — ${a.credential}` : ''}
            </li>
          ))}
        </ul>
      )}

      <h2>How it is funded</h2>

      <p>
        Affiliate commission on qualifying purchases, disclosed on every page that carries such a
        link. No paid placements, no sponsored reviews, no manufacturer input.{' '}
        <Link href="/affiliate-disclosure">The full disclosure is here.</Link>
      </p>

      <h2>Contact</h2>

      <p>
        <a href={`mailto:${site.publisher.email}`}>{site.publisher.email}</a> — corrections
        especially welcome, and more welcome still with the document that shows the right number.
      </p>
    </ProsePage>
  )
}
