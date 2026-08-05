import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import TeamGrid from '@/components/TeamGrid'
import { site, absoluteUrl } from '@/lib/site'
import { realTeam, teamHasPlaceholders } from '@/lib/team'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'About PoolFixHQ',
  description:
    'Who runs PoolFixHQ, how guides get researched and checked, what we refuse to advise on, and exactly how the site earns money.',
  path: '/about',
})

/** Section shell — keeps the prose column consistent without a wrapper prose class. */
function Section({ id, title, children, wide = false }) {
  return (
    <section aria-labelledby={id} className="border-t border-slate-200 py-10 first:border-0">
      <div className={wide ? '' : 'max-w-prose'}>
        <h2 id={id} className="text-2xl font-bold tracking-tight text-pool-900">
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-slate-700">{children}</div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]

  /**
   * Organization schema only. `employee` is populated exclusively from
   * realTeam — placeholder entries are never emitted as Person markup.
   */
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.publisher.name,
    url: site.url,
    description: site.description,
    logo: absoluteUrl(site.publisher.logo),
    ...(realTeam.length
      ? {
          employee: realTeam.map((m) => ({
            '@type': 'Person',
            name: m.name,
            jobTitle: m.role,
            ...(m.credential ? { hasCredential: m.credential } : {}),
            ...(m.photo ? { image: absoluteUrl(m.photo) } : {}),
          })),
        }
      : {}),
  }

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), orgSchema]} />

      <PageHeader
        title="About PoolFixHQ"
        description="Pool problems, diagnosed from the symptom rather than the sales counter."
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-4">
        <div className="mx-auto w-full max-w-4xl">
          <Section id="what" title="What this site is">
            <p>
              PoolFixHQ diagnoses pool problems from the symptom — green water, a pump that won&rsquo;t
              hold prime, chlorine that vanishes by Sunday — and walks you through fixes in order of
              what they cost. Nothing here is written to move product.
            </p>
          </Section>

          <Section id="why" title="Why this exists">
            <p className="rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-[15px] text-accent-900">
              <strong className="font-semibold">Placeholder — origin story pending.</strong> This
              section needs one real incident: what broke, roughly when, what you were told to do,
              what it cost, and what you found out later. Specifics carry it — a brand, a dollar
              figure, a season. It should be the longest section on this page. Nothing invented goes
              here.
            </p>
          </Section>

          <Section id="team" title="Who writes this" wide>
            <p className="max-w-prose">
              Names, faces, and what each person is actually qualified to say. Where someone
              reviews chemistry, their credential is listed — and only if it&rsquo;s real.
            </p>

            {teamHasPlaceholders && (
              <p className="max-w-prose rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-[15px] text-accent-900">
                <strong className="font-semibold">Placeholder team.</strong> Replace the entries in{' '}
                <code className="rounded bg-white px-1.5 py-0.5 text-sm">lib/team.js</code> with real
                names, roles, and photos. Nothing here is emitted as structured data until{' '}
                <code className="rounded bg-white px-1.5 py-0.5 text-sm">placeholder</code> is set to
                false.
              </p>
            )}

            <div className="pt-2">
              <TeamGrid />
            </div>
          </Section>

          <Section id="process" title="How a guide gets made">
            <p>
              Every guide starts from a symptom, because that&rsquo;s how you actually arrive: the
              water&rsquo;s green, the pump is screaming, the heater won&rsquo;t fire. Not &ldquo;I have a
              question about cyanuric acid.&rdquo;
            </p>
            <p>
              Then the causes get ordered by how likely they are, and the fixes by what they cost.
              Cheapest first, always. This is deliberate, and it&rsquo;s where most pool advice goes
              wrong — the pool store leads with the thing that has margin on it. A pump that
              won&rsquo;t prime is a bad lid o-ring far more often than it&rsquo;s a dead motor. One is
              eleven dollars. The other is four hundred. You should try the eleven-dollar one first,
              and if a guide here doesn&rsquo;t tell you that, it&rsquo;s a bad guide.
            </p>
            <p>
              Numbers get checked against the manufacturer&rsquo;s own service documentation —
              Pentair, Hayward, Jandy, whoever made the part. Chemistry against the CDC&rsquo;s Model
              Aquatic Health Code, the EPA, and university extension programs. If a claim can&rsquo;t
              be traced to one of those, it doesn&rsquo;t run. No &ldquo;studies show.&rdquo; Either
              there&rsquo;s a source or the sentence is cut. The full standard is in our{' '}
              <Link href="/editorial-policy" className="link-inline">
                editorial policy
              </Link>
              .
            </p>
            <p>
              Safety warnings aren&rsquo;t editorial. They&rsquo;re not softened for readability and they
              don&rsquo;t get trimmed to make a section flow better. Mixing chlorine with acid produces
              chlorine gas in a confined equipment pad, and people are hurt by this every summer.
              That warning stays.
            </p>
            <p>
              One position you won&rsquo;t like: most algaecide is a waste of money. It&rsquo;s what gets
              reached for when free chlorine has been at zero for a week, and it treats the symptom
              of a sanitizer problem you could&rsquo;ve solved with eight dollars of liquid chlorine.
              It has real uses — black algae, and pools left unwatched for a month. Routine weekly
              dosing isn&rsquo;t one of them. We&rsquo;d make more money recommending it.
            </p>
          </Section>

          <Section id="limits" title="What we don't do">
            <p>
              Anything that needs someone standing at your pool. Leak detection, gas work on
              heaters, electrical, cracks in the shell or a lifting deck, and commercial pools of
              any kind. When a job crosses that line the guide says so and stops, and points you at{' '}
              <Link href="/pool-repair" className="link-inline">
                finding a pro
              </Link>{' '}
              instead of walking you further into it. That costs us money every time — a reader who
              calls a technician isn&rsquo;t a reader who buys a part through our link.
            </p>
          </Section>

          <Section id="money" title="How we make money">
            <p>
              Two ways. Some product links pay us a commission when you buy, and we get paid when we
              connect you with a repair contractor. That&rsquo;s it — no sponsored posts, nobody pays
              to be recommended.
            </p>
            <p>
              Commission rates don&rsquo;t decide what gets recommended or what order things appear in.
              The cheap fix comes first even when the expensive one would pay us, which is most of
              the time. Details in the{' '}
              <Link href="/affiliate-disclosure" className="link-inline">
                affiliate disclosure
              </Link>{' '}
              and{' '}
              <Link href="/editorial-policy" className="link-inline">
                editorial policy
              </Link>
              .
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <p className="rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-[15px] text-accent-900">
              <strong className="font-semibold">Placeholder — needs a monitored address.</strong> Add
              the real email and an honest response window. Don&rsquo;t promise 24 hours if it&rsquo;s
              really two business days.
            </p>
            <p>
              Corrections are welcome and get acted on. If something here is wrong, say so and
              it&rsquo;ll be fixed or removed.
            </p>
          </Section>
        </div>
      </div>
    </>
  )
}
