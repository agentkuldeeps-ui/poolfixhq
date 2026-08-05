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
    'Who runs PoolFixHQ, how our guides get researched and checked, the advice we think the pool industry gets wrong, and exactly how the site earns money.',
  path: '/about',
})

/**
 * Section shell. Content runs the full width of the content column; individual
 * blocks opt into multi-column layouts rather than the whole page being capped
 * at a prose measure. `lead` renders the intro paragraph wider and larger.
 */
function Section({ id, title, children, lead }) {
  return (
    <section
      aria-labelledby={id}
      className="scroll-mt-24 border-t border-slate-200 py-12 first:border-0 first:pt-4"
    >
      <h2 id={id} className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-600">{lead}</p>
      )}
      <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-slate-700">{children}</div>
    </section>
  )
}

/** Long prose that splits into two columns on wide screens so the measure stays readable. */
function TwoCol({ children }) {
  return (
    <div className="gap-x-12 lg:columns-2 [&>p]:mb-4 [&>p]:break-inside-avoid">{children}</div>
  )
}

const NAV = [
  ['what', 'What this site is'],
  ['why', 'Why this exists'],
  ['wrong', 'What the industry gets wrong'],
  ['team', 'Who writes this'],
  ['process', 'How a guide gets made'],
  ['gear', 'Gear we rely on'],
  ['limits', "What we don't do"],
  ['money', 'How we make money'],
  ['contact', 'Contact'],
]

/** Amber block marking content that needs real facts. Never ships filled with invention. */
function NeedsFacts({ children }) {
  return (
    <div className="rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-[15px] leading-relaxed text-accent-900">
      {children}
    </div>
  )
}

const QUICK_FACTS = [
  ['What we cover', 'Residential pools. Water problems, equipment repair, chemistry, seasonal routines.'],
  ['Where', 'US-focused, with state guides because climate changes the answer more than anything else.'],
  ['What we source from', 'Manufacturer service documentation, CDC, EPA, university extension programs.'],
  ['What we refuse', 'Gas, electrical, structural, leak detection, commercial pools.'],
  ['How we earn', 'Amazon commissions and repair referrals. No sponsored posts.'],
]

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.publisher.name,
    url: site.url,
    description: site.description,
    logo: absoluteUrl(site.publisher.logo),
    knowsAbout: [
      'Swimming pool maintenance',
      'Pool water chemistry',
      'Pool equipment repair',
      'Algae treatment',
    ],
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

      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[15rem,minmax(0,1fr)] lg:gap-14">
          <nav
            aria-label="On this page"
            className="sticky top-24 hidden self-start lg:block"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-pool-700">
              On this page
            </p>
            <ul className="space-y-1.5 border-l border-slate-200">
              {NAV.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-[15px] leading-snug text-slate-600 hover:border-accent-600 hover:text-pool-800"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
          <Section id="what" title="What this site is">
            <p>
              We diagnose pool problems from the symptom — green water, a pump that won&rsquo;t hold
              prime, chlorine that&rsquo;s gone by Sunday — and walk you through the fixes in order of
              what they cost. Cheapest first. Every time.
            </p>
            <p>
              Nothing here is written to move product. That sounds like a small thing. It isn&rsquo;t,
              and the rest of this page is mostly about why.
            </p>

            <dl className="not-prose mt-8 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {QUICK_FACTS.map(([k, v]) => (
                <div key={k} className="flex flex-col bg-white p-5">
                  <dt className="text-xs font-bold uppercase tracking-widest text-pool-600">{k}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-slate-700">{v}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="why" title="Why this exists">
            <TwoCol>
            <p>
              Almost everyone who gives you pool advice is also selling you something. That&rsquo;s not
              a conspiracy, it&rsquo;s just the business model. The pool store tests your water for
              free because the test is a sales funnel. The result is never &ldquo;your water&rsquo;s
              fine, go swim.&rdquo; It&rsquo;s a printout with four things flagged and a basket at the
              end of the aisle.
            </p>
            <p>
              And most of the time, the water was fine. Or it needed one cheap thing, not four
              expensive ones. We&rsquo;ve watched people carry out two hundred dollars of clarifier,
              phosphate remover, algaecide and stabilizer to solve a problem that was a dirty filter
              and a pump running four hours a day instead of eight.
            </p>
            <p>
              The internet didn&rsquo;t fix this. It made it worse. Most of the top pool results are
              affiliate pages assembled by people who&rsquo;ve never opened a pump pot, recycling each
              other&rsquo;s wrong answers. You can find ten articles saying to shock weekly. None of
              them explain why, because there isn&rsquo;t a why for most residential pools.
            </p>
            <p>
              So we built the site we wanted when something broke: symptom in, likely cause out,
              fixes ordered by what they cost, and a clear line where you should stop and call
              somebody.
            </p>
            </TwoCol>
            <NeedsFacts>
              <strong className="font-semibold">Origin story pending.</strong> This is where the one
              real incident goes — what broke, when, what you were told to do, what it cost, what
              you found out later. A brand, a dollar figure, a season. It should run longer than
              everything above it, and it can&rsquo;t be invented, so it&rsquo;s waiting on you.
            </NeedsFacts>
          </Section>

          <Section
            id="wrong"
            title="What the industry gets wrong"
            lead="A few positions we hold that you won't hear at the counter. These are ours, stated plainly, and you're free to disagree."
          >
            <div className="not-prose grid gap-5 sm:grid-cols-2">
            <p className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
              <strong className="block text-pool-900">Most algaecide is a waste of money.</strong> It&rsquo;s
              what gets reached for when free chlorine has been at zero for a week, and it treats
              the symptom of a sanitizer problem you could&rsquo;ve solved with eight dollars of liquid
              chlorine. It has real uses — black algae, and pools left unwatched for a month.
              Routine weekly dosing isn&rsquo;t one of them. We&rsquo;d make more money recommending it.
            </p>
            <p className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
              <strong className="block text-pool-900">Test strips are fine.</strong> For a routine check —
              is there chlorine in this pool, is the pH sane — a strip answers the question in ten
              seconds and you&rsquo;ll actually do it. A drop kit is genuinely better when you&rsquo;re
              troubleshooting something, and worth owning. But the purists have oversold the gap,
              and a strip you use twice a week beats a drop kit you use twice a summer.
            </p>
            <p className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
              <strong className="block text-pool-900">Weekly shocking isn&rsquo;t a rule.</strong> It&rsquo;s a
              response to a condition. If your free chlorine is holding and the water is clear,
              dumping shock in every Saturday is burning money and driving your stabilizer up.
              Shock when something&rsquo;s wrong — after heavy use, after a storm, when combined
              chlorine climbs.
            </p>
            <p className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
              <strong className="block text-pool-900">Run time beats chemistry more often than people think.</strong> A surprising share of &ldquo;chemistry problems&rdquo; are circulation
              problems. Water that isn&rsquo;t moving isn&rsquo;t being filtered or sanitized, no matter
              what you pour in.
            </p>
            </div>
          </Section>

          <Section
            id="team"
            title="Who writes this"
            lead="Names, faces, and what each person is actually qualified to say. Where someone reviews chemistry, their credential is listed — and only if it's real."
          >

            {teamHasPlaceholders && (
              <div className="max-w-3xl">
                <NeedsFacts>
                  <strong className="font-semibold">Placeholder team.</strong> Replace the entries in{' '}
                  <code className="rounded bg-white px-1.5 py-0.5 text-sm">lib/team.js</code> with real
                  names, roles and photos. Nothing becomes structured data until{' '}
                  <code className="rounded bg-white px-1.5 py-0.5 text-sm">placeholder</code> is set to
                  false.
                </NeedsFacts>
              </div>
            )}

            <div className="pt-2">
              <TeamGrid />
            </div>

            <p className="max-w-3xl pt-4">
              Being straight about the limits: no one here is a licensed electrician, a gas fitter
              or a structural engineer, and we don&rsquo;t write as though we are. Chemistry content is
              currently checked against CDC guidance, EPA documentation and university extension
              publications rather than signed off by a certified operator. We&rsquo;re adding that
              review, and when it exists this page will say who it is. Until then we&rsquo;d rather
              understate it than imply a credential we don&rsquo;t have.
            </p>
          </Section>

          <Section id="process" title="How a guide gets made">
            <TwoCol>
            <p>
              Every guide starts from a symptom, because that&rsquo;s how you actually arrive: the
              water&rsquo;s green, the pump is screaming, the heater won&rsquo;t fire. Not &ldquo;I have a
              question about cyanuric acid.&rdquo;
            </p>
            <p>
              Then the causes get ordered by how likely they are, and the fixes by what they cost.
              This is deliberate, and it&rsquo;s where most pool advice goes wrong — the store leads
              with the thing that has margin on it. A pump that won&rsquo;t prime is a bad lid o-ring
              far more often than it&rsquo;s a dead motor. One is eleven dollars. The other is four
              hundred. You should try the eleven-dollar one first, and if a guide here doesn&rsquo;t
              tell you that, it&rsquo;s a bad guide.
            </p>
            <p>
              Numbers get checked against the manufacturer&rsquo;s own service documentation — Pentair,
              Hayward, Jandy, whoever made the part. Chemistry against the CDC&rsquo;s Model Aquatic
              Health Code, the EPA, and land-grant university extension programs. If a claim
              can&rsquo;t be traced to one of those, it doesn&rsquo;t run. No &ldquo;studies show.&rdquo;
              Either there&rsquo;s a source or the sentence is cut. The full standard is in our{' '}
              <Link href="/editorial-policy" className="link-inline">
                editorial policy
              </Link>
              .
            </p>
            <p>
              Where the research is genuinely mixed, or the answer changes by region, we say so
              instead of picking one and sounding certain. Phoenix and Minneapolis are not the same
              pool.
            </p>
            <p>
              Safety warnings aren&rsquo;t editorial. They&rsquo;re not softened for readability and they
              don&rsquo;t get trimmed to make a section flow better. Mixing chlorine with acid produces
              chlorine gas in a confined equipment pad, and people are hurt by this every summer.
              That warning stays.
            </p>
            </TwoCol>
          </Section>

          <Section
            id="gear"
            title="The gear we don't work without"
            lead={'Not a shopping list — a short answer to "what actually earns its place."'}
          >
            <ul className="not-prose grid gap-4 sm:grid-cols-2">
              <li className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
                <strong className="block text-pool-900">A drop-based test kit</strong> that reads free and
                combined chlorine separately. The gap between those two numbers explains more
                problems than any other measurement.
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
                <strong className="block text-pool-900">A spare pump lid o-ring and silicone lubricant.</strong> Costs about as much as lunch and prevents the most common
                service call there is.
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
                <strong className="block text-pool-900">A real telescoping pole.</strong> The flimsy ones
                flex so much you can&rsquo;t brush properly, and brushing is most of the job.
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
                <strong className="block text-pool-900">A pressure gauge you trust.</strong> Filter
                pressure is the cheapest diagnostic on the pad, and half of them are dead.
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-5 text-[16px] leading-relaxed text-slate-700">
                <strong className="block text-pool-900">A notebook.</strong> Unglamorous. Readings over
                time tell you things a single test never will.
              </li>
            </ul>
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
            <TwoCol>
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
            </TwoCol>
          </Section>

          <Section id="contact" title="Contact">
            <p>
              If a guide didn&rsquo;t answer your question, that&rsquo;s useful to us — it usually means
              the guide is wrong or incomplete. We read every message.
            </p>
            <NeedsFacts>
              <strong className="font-semibold">Needs a monitored address.</strong> Add the real
              email and an honest response window. Don&rsquo;t promise 24 hours if it&rsquo;s really two
              business days.
            </NeedsFacts>
            <p>
              Corrections get acted on. If something here is wrong, tell us and it&rsquo;ll be fixed or
              pulled.
            </p>
          </Section>
          </div>
        </div>
      </div>
    </>
  )
}
