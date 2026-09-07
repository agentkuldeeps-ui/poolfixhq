import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { breadcrumbSchema } from '@/lib/schema'

/**
 * Shell for the standing pages: policies, about, method.
 *
 * They share a shape so the trust pages look like one coherent set rather
 * than four documents written at different times, and so every one of them
 * gets breadcrumbs and BreadcrumbList schema without anyone remembering to
 * add them.
 *
 * `updated` renders a visible last-reviewed date. On policy pages that is a
 * trust signal in its own right -- an undated policy reads as abandoned.
 */
export default function ProsePage({ title, eyebrow, description, updated, children }) {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: title, href: '#' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader eyebrow={eyebrow} title={title} description={description}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <div className="prose prose-slate mx-auto max-w-3xl prose-headings:scroll-mt-24 prose-p:text-[17px] prose-p:leading-relaxed prose-li:text-[17px]">
          {children}
        </div>

        {updated && (
          <p className="mx-auto mt-10 max-w-3xl border-t border-slate-200 pt-5 text-sm text-slate-500">
            Last reviewed <time dateTime={updated}>{updated}</time>.
          </p>
        )}
      </div>
    </>
  )
}
