import Link from 'next/link'
import { tools } from '@/lib/tools'

/**
 * Calculator promo.
 *
 * Tools still marked `status: 'planned'` in lib/tools.js are empty shells, so
 * they are labelled honestly rather than promoted as working. Once a tool
 * ships, flip its status and the badge disappears on its own.
 */
export default function ToolsStrip() {
  if (!tools.length) return null

  return (
    <section aria-labelledby="tools-heading" className="border-y border-slate-200 bg-white">
      <div className="container-page py-12 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="tools-heading"
            className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl"
          >
            Get the number before you pour anything in
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Every dosing decision starts with volume, and most people are guessing at theirs.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const planned = tool.status === 'planned'
            return (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-pool-300 hover:bg-pool-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-pool-900 group-hover:underline">
                      {tool.title}
                    </h3>
                    {planned && (
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{tool.summary}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
