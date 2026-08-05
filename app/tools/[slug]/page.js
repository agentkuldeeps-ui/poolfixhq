import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import LeadFormCTA from '@/components/mdx/LeadFormCTA'
import { tools, toolBySlug } from '@/lib/tools'
import { breadcrumbSchema } from '@/lib/schema'
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
    noindex: tool.status === 'planned',
  })
}

/**
 * Calculator shell. Each tool's interactive component gets mounted where the
 * placeholder sits -- add it under components/tools/ and swap the placeholder
 * for it. Pages stay noindex while status is 'planned' so empty shells never
 * get crawled.
 */
export default function ToolPage({ params }) {
  const tool = toolBySlug[params.slug]
  if (!tool) notFound()

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Calculators', href: '/tools' },
    { name: tool.title, href: `/tools/${tool.slug}` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader eyebrow="Calculator" title={tool.title} description={tool.summary}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-700">Calculator placeholder</p>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-500">
              Mount the interactive component here. Flip this tool&rsquo;s{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm">status</code> in{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm">lib/tools.js</code> to{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm">live</code> to make the page
              indexable.
            </p>
          </div>

          <LeadFormCTA />
        </div>
      </div>
    </>
  )
}
