import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import LeadFormCTA from '@/components/mdx/LeadFormCTA'
import { calculators } from '@/components/tools/registry'
import { tools, toolBySlug } from '@/lib/tools'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { absoluteUrl, site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export function generateMetadata({ params }) {
  const tool = toolBySlug[params.slug]
  if (!tool) return {}
  return buildMetadata({
    title: tool.title,
    description: tool.metaDescription,
    path: `/tools/${tool.slug}`,
    noindex: tool.status !== 'live',
  })
}

/**
 * Calculator page.
 *
 * The interactive component is the only client-side JavaScript on the site;
 * everything around it — explanation, FAQs, schema — is server rendered, so a
 * crawler sees the full page whether or not it runs JS.
 *
 * A slug with no registered component falls back to the placeholder shell
 * rather than throwing, so a half-added tool can't take the build down.
 */
export default function ToolPage({ params }) {
  const tool = toolBySlug[params.slug]
  if (!tool) notFound()

  const Calculator = calculators[tool.slug]
  const isLive = tool.status === 'live' && Calculator

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Calculators', href: '/tools' },
    { name: tool.title, href: `/tools/${tool.slug}` },
  ]

  const appSchema = isLive
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.title,
        url: absoluteUrl(`/tools/${tool.slug}`),
        description: tool.metaDescription,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', name: site.publisher.name, url: site.url },
      }
    : null

  const faqs = tool.faqs?.map((f) => ({ question: f.q, answer: f.a })) ?? []

  return (
    <>
      <JsonLd
        data={[breadcrumbSchema(crumbs), appSchema, isLive ? faqSchema(faqs) : null].filter(Boolean)}
      />

      <PageHeader wide eyebrow="Free calculator" title={tool.title} description={tool.summary}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {isLive ? (
          <Calculator />
        ) : (
          <div className="mx-auto max-w-3xl rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-700">Calculator placeholder</p>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-500">
              Register a component in <code className="rounded bg-white px-1.5 py-0.5 text-sm">components/tools/registry.js</code>{' '}
              and set this tool&rsquo;s <code className="rounded bg-white px-1.5 py-0.5 text-sm">status</code> to{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm">live</code>.
            </p>
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {tool.formula?.length > 0 && (
            <section aria-labelledby="how" className="min-w-0">
              <h2 id="how" className="text-2xl font-bold tracking-tight text-pool-900">
                How the math works
              </h2>
              <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-slate-700">
                {tool.formula.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {tool.faqs?.length > 0 && (
            <section aria-labelledby="faq" className="min-w-0">
              <h2 id="faq" className="text-2xl font-bold tracking-tight text-pool-900">
                Common questions
              </h2>
              <dl className="mt-4 space-y-5">
                {tool.faqs.map((f) => (
                  <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-5">
                    <dt className="font-bold text-pool-900">{f.q}</dt>
                    <dd className="mt-2 text-[16px] leading-relaxed text-slate-700">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <LeadFormCTA />
        </div>
      </div>
    </>
  )
}
