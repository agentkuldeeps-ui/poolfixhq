import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import JsonLd from '@/components/JsonLd'
import AuthorCard from '@/components/AuthorCard'
import { publishedAuthors } from '@/lib/authors'
import { buildMetadata } from '@/lib/seo'
import { faqSchema } from '@/lib/schema'

export const metadata = buildMetadata({
  title: 'Who Writes These Reviews',
  description:
    'Who writes PoolFixHQ reviews, the roles every review passes through before publishing, and exactly where AI is used and where a human is accountable.',
  path: '/team',
})

const FAQS = [
  {
    q: 'Who writes PoolFixHQ reviews?',
    a: 'Reviews are published under a named byline and that person is accountable for what the page says. Every review page carries an "about the author" block naming who is responsible for it.',
  },
  {
    q: 'Do you use AI to write reviews?',
    a: 'Yes, for research and drafting, under a documented process with defined roles and independent checking. We say so under every review rather than leaving it implied. What AI is not allowed to do is invent a fact: every specification, warranty term and claim has to trace to a cited source, and the build refuses to publish a page whose rating disagrees with its own published score breakdown.',
  },
  {
    q: 'Do you physically test the products you review?',
    a: 'No, and every review says so on the page itself. There is no test tank here and no instrumented rig. Reviews are documentary: manufacturer manuals, specification sheets, warranty documents and product labels, cross-referenced against failure patterns owners and trade professionals report publicly. Where a page describes real-world behaviour it labels it as reported rather than measured.',
  },
  {
    q: 'How do I know a review has not been written to sell me something?',
    a: 'Commission rate is not one of the scoring criteria, and the test of that is not a promise but the pages themselves. Our pool pump review tells readers the warranty shrinks from three years to one when they buy through the link on that page. A site whose reviews never conclude "buy the cheaper one" or "keep what you have" is a site whose recommendations are for sale.',
  },
]

/** The roles a review passes through. Each maps to a real agent in .claude/agents. */
const BUILD_ROLES = [
  {
    name: 'Research',
    does: 'Finds the manufacturer manual, specification sheet, warranty document and product label, and records what could not be verified. Retailer listings are not treated as a source.',
  },
  {
    name: 'Specification analysis',
    does: 'Turns each number into what it means for a buyer — who it suits, who it rules out, and what people commonly get wrong about it.',
  },
  {
    name: 'Scoring',
    does: 'Scores the product against the criteria published for its category before any product is judged. The rating is computed from that breakdown, never chosen first.',
  },
  {
    name: 'Drafting',
    does: 'Writes the page to a fixed structure, in a fixed voice, and may not introduce a fact that is not in the research.',
  },
  {
    name: 'Comparisons',
    does: 'Writes the alternatives — including the cheaper option and, where it is the honest answer, keeping the equipment you already own.',
  },
]

const CHECK_ROLES = [
  {
    name: 'Fact check',
    does: 'Reads every factual claim against the source cited for it. A claim stated more strongly than its source allows is stopped here, and so is any figure nobody could actually know.',
  },
  {
    name: 'Compliance check',
    does: 'Affiliate disclosure, the Amazon Associates rules we operate under, and anything safety-critical. Chemical dosing that differs from the product label is stopped outright.',
  },
  {
    name: 'Search and structure check',
    does: 'Whether the page answers the question it is written for, whether its structured data matches what is on the page, and whether two of our own pages are competing for one query.',
  },
  {
    name: 'Editorial check',
    does: 'Whether a buyer can finish the page and actually decide. Padding, hedging and verdicts that refuse to land are sent back.',
  },
  {
    name: 'Scoring check',
    does: 'Re-scores the product independently and compares. A score with no passage defending it does not publish, and neither does a rating whose arithmetic does not hold.',
  },
]

/**
 * THE TEAM PAGE.
 *
 * Written to answer the question Google's own guidance asks of review
 * content -- "who is responsible for this, and how was it made?" -- rather
 * than to look impressive.
 *
 * It is deliberately explicit that reviews are AI-assisted and not
 * hands-on tested. Both facts are true, both are discoverable by any reader
 * paying attention, and a site that states them plainly is in a far stronger
 * position than one that implies otherwise and is later found out. The
 * process is also genuinely unusual: publishing the score weights, computing
 * the rating from them, and failing our own build when the two disagree is
 * more accountability than most sites with a wall of headshots offer.
 */
export default function TeamPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      <ProsePage
        eyebrow="Who we are"
        title="Who Writes These Reviews"
        description="The people behind the bylines, the roles every review passes through, and where AI is used."
        updated="2026-09-08"
      >
        <div className="answer-block not-prose my-6">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-pool-600">
            Short answer
          </p>
          <p>
            Every review is published under a named byline and that person is accountable for
            what the page says. Research and drafting are AI-assisted under a documented process
            with ten defined roles — five that build the review and five that independently try
            to break it — and nothing publishes until the checks pass.
          </p>
        </div>

        <h2 id="people">The people</h2>

        {publishedAuthors.length > 0 ? (
          <div className="not-prose space-y-5">
            {publishedAuthors.map((a) => (
              <AuthorCard key={a.slug} slug={a.slug} />
            ))}
          </div>
        ) : (
          <p>
            No named author is configured yet, so reviews currently publish under the site name
            rather than a person. We would rather say that than put a name on a page we cannot
            stand behind.
          </p>
        )}

        <h2 id="process">How a review gets made</h2>

        <p>
          A pool product review is mostly a documents problem. The numbers that decide a purchase
          — flow rate at head, filter area, available chlorine percentage, cell output, BTU — are
          published by the manufacturer and are frequently misstated by retailers. Reading the
          right document carefully beats a weekend of casual use for almost every one of them.
        </p>

        <p>So the work is split into roles, and each one does one job on every review.</p>

        <h3>Five roles build it</h3>

        <ol className="not-prose space-y-3">
          {BUILD_ROLES.map((r, i) => (
            <li key={r.name} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pool-700 text-[13px] font-extrabold text-white">
                {i + 1}
              </span>
              <span>
                <span className="block font-bold text-pool-900">{r.name}</span>
                <span className="mt-0.5 block text-[15px] leading-relaxed text-slate-600">
                  {r.does}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <h3>Five roles try to break it</h3>

        <p>
          These run independently of the people who wrote the page, and they cannot edit it. They
          report what is wrong and it goes back. A reviewer who can quietly fix their own findings
          has stopped being a check.
        </p>

        <ul className="not-prose space-y-3">
          {CHECK_ROLES.map((r) => (
            <li key={r.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="block font-bold text-pool-900">{r.name}</span>
              <span className="mt-0.5 block text-[15px] leading-relaxed text-slate-600">
                {r.does}
              </span>
            </li>
          ))}
        </ul>

        <h2 id="ai">Where AI is used, and where it is not allowed</h2>

        <p>
          Research and drafting are AI-assisted. We think saying so plainly is better than the
          alternative, and the honest version is more reassuring than the vague one, because the
          constraints are specific and you can check them on any page.
        </p>

        <ul>
          <li>
            <strong>It may not invent a fact.</strong> Every specification, warranty term and
            compatibility claim has to trace to a cited source. A gap gets published as a gap.
          </li>
          <li>
            <strong>It may not choose the rating.</strong> Products are scored against{' '}
            <Link href="/how-we-test#scoring">criteria published in advance</Link>, and the rating
            is the arithmetic on those scores. Our build fails if a page&rsquo;s stated rating
            disagrees with its own breakdown — which has already forced a published rating down
            rather than up.
          </li>
          <li>
            <strong>It may not claim we tested something.</strong> Nothing here is bench-tested,
            and every page says so.
          </li>
          <li>
            <strong>It may not write a chemical claim beyond the label.</strong> Where this site
            and a product label disagree, the label is right.
          </li>
        </ul>

        <p>
          The checks that enforce this are not aspirational. Several of them run automatically and
          fail the deployment: a page carrying a price, an untagged affiliate link, a missing
          disclosure, a duplicate title, a broken internal link, or a rating that does not match
          its scores will not go live.
        </p>

        <h2 id="pay">How we get paid</h2>

        <p>
          This site earns an affiliate commission on qualifying purchases made through its links,
          at no additional cost to you. That is the entire business model and there is no reason
          to be coy about it. Commission rate is not one of the scoring criteria.
        </p>

        <p>
          The honest test of that is not a promise, it is the pages. Our Pentair pump review tells
          readers that buying through the link on that page cuts the warranty from three years
          parts and labour to one year parts only. That paragraph costs us referrals and it stays,
          because a review that omits it is not a review.
        </p>

        <p>
          <Link href="/how-we-test">Our full method</Link> ·{' '}
          <Link href="/editorial-policy">Editorial policy</Link> ·{' '}
          <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
        </p>

        <h2 id="corrections">Corrections</h2>

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
