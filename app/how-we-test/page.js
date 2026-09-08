import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import JsonLd from '@/components/JsonLd'
import { categories } from '@/lib/taxonomy'
import { scoreDimensions, DEFAULT_DIMENSIONS } from '@/lib/scoring'
import { buildMetadata } from '@/lib/seo'
import { faqSchema } from '@/lib/schema'

const categoryTitle = (slug) => categories.find((c) => c.slug === slug)?.title ?? slug

export const metadata = buildMetadata({
  title: 'How We Evaluate Pool Products',
  description:
    'Our review method: what we read, what we score against, what we do not claim, and how we handle the fact that we earn a commission.',
  path: '/how-we-test',
})

const FAQS = [
  {
    q: 'Do you physically test every product you review?',
    a: 'No, and we say so on every page where we have not. Most reviews are documentary: manufacturer specifications, manuals and product labels, cross-referenced against documented owner-reported failure patterns. Where a page is based on hands-on use, it states that explicitly.',
  },
  {
    q: 'Where do your ratings come from?',
    a: 'Every review scores the product on a fixed list of dimensions, each out of ten, and the headline rating out of five is the weighted mean of those scores divided by two. The dimensions and their weights are published per category before any product is scored against them, and the breakdown is printed on the review page. Our build fails if a stated rating disagrees with its own breakdown. Ratings are never aggregated customer scores.',
  },
  {
    q: 'Does the affiliate commission influence your recommendations?',
    a: 'No. Commission rates do not enter the scoring, and pages routinely recommend the cheapest option or no purchase at all. The clearest evidence is the pages that talk readers out of a spend we would have earned on.',
  },
]

/**
 * THE METHOD PAGE -- the E-E-A-T centrepiece.
 *
 * This is the page that answers "why should anyone believe this site?" It is
 * linked from every category hub, every review byline area and the footer.
 *
 * It is written to be honest about the limits, not to sound impressive. A
 * method page claiming lab testing we do not do would be the single most
 * damaging page on the site if anyone checked. Stating plainly that most
 * reviews are documentary is both true and more credible than the vague
 * "extensively tested" that competitors use.
 */
export default function HowWeTestPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      <ProsePage
        eyebrow="Our method"
        title="How We Evaluate Pool Products"
        description="What we read, what we score against, and what we deliberately do not claim."
        updated="2026-09-07"
      >
        <div className="answer-block not-prose my-6">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-pool-600">
            Short answer
          </p>
          <p>
            We evaluate products against a fixed list of criteria published for each category
            before any product is scored. Most reviews are documentary — built from manufacturer
            specifications, manuals and product labels rather than hands-on testing — and every
            page says which it is.
          </p>
        </div>

        <h2>What we actually do</h2>

        <p>
          A pool product review is mostly a documents problem. The numbers that decide a purchase —
          flow rate at head, filter area, available chlorine percentage, cell output, BTU — are
          published by the manufacturer and are frequently misstated by retailers. Reading the
          right document carefully beats a weekend of casual use for almost every one of them.
        </p>

        <p>So, in order:</p>

        <ol>
          <li>
            <strong>The manufacturer&rsquo;s own documents.</strong> Spec sheet, installation
            manual, product label or SDS. Where a retailer listing and a manual disagree, the
            manual is correct and the listing gets ignored.
          </li>
          <li>
            <strong>The category criteria.</strong> Every category on this site publishes the
            specific things it is judged on. The product gets assessed against that list and
            nothing else, so scores inside a category are comparable.
          </li>
          <li>
            <strong>Documented owner-reported failure patterns.</strong> Not star ratings, and
            never copied review text. What we look for is the same fault reported repeatedly across
            independent sources — that is a design characteristic, not an opinion.
          </li>
          <li>
            <strong>Standards and public-health guidance where it applies.</strong> Chemical dosing
            comes from the product label. Health and safety claims come from CDC, EPA, a state
            health department or a university extension service. Never from a pool blog.
          </li>
        </ol>

        <h2>What we do not claim</h2>

        <p>This list matters more than the one above.</p>

        <ul>
          <li>
            <strong>We do not lab-test.</strong> There is no test tank and no instrumented rig. A
            site claiming otherwise, at this size, is not telling the truth.
          </li>
          <li>
            <strong>We do not aggregate customer ratings</strong> or reproduce retailer review
            text, and we never emit aggregate rating markup.
          </li>
          <li>
            <strong>We do not publish prices.</strong> We have no live price feed, so any figure
            would be stale within days. Products get a budget, mid-range or premium bracket and you
            check the current price yourself.
          </li>
          <li>
            <strong>We do not give dosing that differs from a product&rsquo;s label.</strong> If
            this site and a label disagree, the label is right.
          </li>
          <li>
            <strong>We do not advise on gas, electrical or structural work</strong> beyond telling
            you that it is licensed work and to stop.
          </li>
        </ul>

        <h2 id="scoring">How ratings work</h2>

        <p>
          A rating is a single number out of five, and it is our own assessment — not an average of
          anyone else&rsquo;s. It is shown as a numeral rather than as stars precisely to avoid
          implying a crowd behind it.
        </p>

        <p>
          It is also not typed in by hand. Every review scores the product on a fixed list of
          dimensions, each out of ten, and the headline rating is the{' '}
          <strong>weighted mean of those dimension scores, divided by two</strong>. The breakdown is
          printed on the review page with the weights visible, so the arithmetic behind the number
          is arithmetic you can redo.
        </p>

        <p>
          Two rules keep that honest. The dimensions and weights are fixed for an entire category
          and published before any product in it is scored, so nobody gets a friendlier yardstick.
          And the build itself refuses to publish a page whose stated rating disagrees with its own
          breakdown — if we want a higher number we have to raise a dimension score and defend it in
          the text where you can see it.
        </p>

        <p>
          That mechanism has already cost a product. The Pentair IntelliFlo3 VSF 011075 carried a
          4.2 in an early draft, written before the breakdown existed. When the dimensions were
          scored and weighted it came out at 3.9, so the published rating is 3.9. The weights were
          not adjusted to rescue the original number.
        </p>

        <h3>What each category is scored on</h3>

        <p>
          Dimensions differ by category, because the things that decide a pump are not the things
          that decide a test kit. Weights within a category always sum to 100%.
        </p>

        {Object.entries(scoreDimensions).map(([slug, dims]) => (
          <div key={slug} className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200">
            <p className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-[15px] font-bold text-pool-900">
              {categoryTitle(slug)}
            </p>
            {/* overflow-hidden on the wrapper clips; this scrolls instead. */}
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-widest text-slate-500">
                    <th scope="col" className="px-3 py-2.5 font-bold sm:px-5">Dimension</th>
                    <th scope="col" className="w-24 px-3 py-2.5 font-bold sm:px-5">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {dims.map((d, i) => (
                    <tr key={d.key} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                      <th
                        scope="row"
                        className="px-3 py-3 align-top font-semibold text-pool-900 sm:px-5"
                      >
                        {d.label}
                        <span className="mt-0.5 block text-[13px] font-normal leading-snug text-slate-500">
                          {d.blurb}
                        </span>
                      </th>
                      <td className="whitespace-nowrap px-3 py-3 align-top font-bold text-pool-800 sm:px-5">
                        {Math.round(d.weight * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <p>
          Categories without a published list above have not had a scored review yet. Until one is
          written they fall back to a deliberately generic set —{' '}
          {DEFAULT_DIMENSIONS.map((d) => `${d.label} ${Math.round(d.weight * 100)}%`).join(', ')} —
          which exists so nothing ships unscored, not because it is good enough. A category gets its
          own dimensions before it gets its first review.
        </p>

        <h3>Where the buying criteria live</h3>

        <ul className="not-prose grid gap-2 sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}#how-we-judge`}
                className="block rounded-lg border border-slate-200 px-4 py-2.5 text-[15px] font-medium text-pool-800 hover:border-pool-400 hover:bg-pool-50"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>

        <h2>How we get paid, and what that changes</h2>

        <p>
          This site earns an affiliate commission on qualifying purchases made through its links,
          at no additional cost to you. That is the entire business model and there is no reason to
          be coy about it.
        </p>

        <p>
          What it does not do is set the recommendations. Commission rate is not one of the
          criteria, and the honest test of that claim is not a promise — it is the pages
          themselves. A site whose reviews never conclude &ldquo;clean the one you have&rdquo; or
          &ldquo;the cheap one is fine&rdquo; is a site whose recommendations are for sale. Ours
          conclude that regularly, and those conclusions cost us the referral.
        </p>

        <p>
          <Link href="/affiliate-disclosure">Full affiliate disclosure</Link> ·{' '}
          <Link href="/editorial-policy">Editorial policy</Link>
        </p>

        <h2>Corrections</h2>

        <p>
          If something here is wrong, we want to fix it and we will say that we did. Every page
          carries a visible last-updated date, and a correction that changes a conclusion gets
          noted on the page rather than quietly edited. Email{' '}
          <a href="mailto:hello@poolfixhq.com">hello@poolfixhq.com</a>.
        </p>

        <h2>Common questions</h2>

        {FAQS.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </ProsePage>
    </>
  )
}
