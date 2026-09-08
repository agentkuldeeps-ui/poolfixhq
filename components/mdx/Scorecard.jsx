import Link from 'next/link'
import { dimensionsFor, ratingFromScores, weightedScore, scoreBand } from '@/lib/scoring'

const BAND_COLOR = {
  excellent: 'bg-verdict-good',
  good: 'bg-pool-500',
  adequate: 'bg-pool-300',
  weak: 'bg-verdict-warn',
  poor: 'bg-verdict-bad',
}

/**
 * The score breakdown.
 *
 * Renders the dimensions AND their published weights, because a weight you
 * cannot see is a thumb on the scale you cannot see. The headline rating
 * underneath is computed here from the same numbers rather than passed in, so
 * what the reader sees is arithmetic they can redo.
 *
 * lib/frontmatter.js separately fails the build if the product's declared
 * rating disagrees with this calculation.
 */
export default function Scorecard({ article, notes = {}, title = 'Our score' }) {
  const scores = article?.scores
  if (!scores) return null

  const dims = dimensionsFor(article.category)
  const overall = weightedScore(article.category, scores)
  const rating = ratingFromScores(article.category, scores)

  return (
    <section className="my-8" aria-labelledby="scorecard">
      <h2 id="scorecard">{title}</h2>

      <div className="mt-4 overflow-hidden rounded-xl border-2 border-pool-200">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pool-100 bg-pool-50 px-5 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-pool-600">
              Weighted overall
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Computed from the breakdown below, not asserted separately.
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-pool-900">{rating.toFixed(1)}</span>
            <span className="text-lg font-bold text-slate-400">/5</span>
            <p className="text-xs font-semibold text-slate-500">
              {overall.toFixed(1)}/10 weighted
            </p>
          </div>
        </div>

        <table className="w-full border-collapse text-left text-[15px]">
          <caption className="sr-only">
            Score breakdown by dimension, with the weight each dimension carries.
          </caption>
          <thead>
            <tr className="border-b border-slate-200 bg-white text-[11px] uppercase tracking-widest text-slate-500">
              <th scope="col" className="px-5 py-2.5 font-bold">Dimension</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Weight</th>
              <th scope="col" className="px-5 py-2.5 font-bold">Score</th>
            </tr>
          </thead>
          <tbody>
            {dims.map((d, i) => {
              const v = Number(scores[d.key])
              const band = scoreBand(v)
              return (
                <tr key={d.key} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                  <th scope="row" className="px-5 py-3 align-top font-semibold text-pool-900">
                    {d.label}
                    <span className="mt-0.5 block text-[13px] font-normal leading-snug text-slate-500">
                      {notes[d.key] ?? d.blurb}
                    </span>
                  </th>
                  <td className="whitespace-nowrap px-3 py-3 align-top text-sm text-slate-500">
                    {Math.round(d.weight * 100)}%
                  </td>
                  <td className="px-5 py-3 align-top">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 shrink-0 font-bold text-pool-900">
                        {v.toFixed(0)}
                        <span className="text-xs font-semibold text-slate-400">/10</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-2 w-24 shrink-0 overflow-hidden rounded-full bg-slate-200"
                      >
                        <span
                          className={`block h-full rounded-full ${BAND_COLOR[band]}`}
                          style={{ width: `${v * 10}%` }}
                        />
                      </span>
                      <span className="text-[13px] capitalize text-slate-500">{band}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[13.5px] leading-relaxed text-slate-500">
        Dimensions and weights are fixed for every product in this category and are published
        before anything is scored against them.{' '}
        <Link href="/how-we-test#scoring" className="link-inline">
          How we evaluate
        </Link>
        .
      </p>
    </section>
  )
}
