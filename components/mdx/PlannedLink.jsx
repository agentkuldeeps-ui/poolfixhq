import Link from 'next/link'
import { getLiveArticles } from '@/lib/content'

/**
 * A link to a page that may not exist yet.
 *
 * Comparison pages ("011075 vs 011076", "IntelliFlo3 vs TriStar VS") are the
 * highest-intent internal links a review can carry, and they are exactly the
 * pages written last. Two bad ways to handle that: link anyway and ship a 404
 * that fails the build, or leave the internal-linking opportunity out and
 * forget it existed.
 *
 * This resolves at BUILD time against the live article set. If the target
 * exists it renders a real link; if not it renders the same words as plain
 * text with a quiet marker. The day the comparison page lands, every existing
 * mention of it becomes a link with no edit to any other file.
 *
 * The same pattern is why scripts/check-links.mjs can stay strict: nothing
 * here can ever emit an href that has no route.
 */
export default function PlannedLink({ href, children, hideMarker = false }) {
  const exists = getLiveArticles().some((a) => a.href === href)

  if (exists) {
    return (
      <Link href={href} className="link-inline">
        {children}
      </Link>
    )
  }

  return (
    <span className="text-slate-600">
      {children}
      {!hideMarker && (
        <span className="ml-1 whitespace-nowrap rounded bg-slate-100 px-1.5 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-slate-400">
          in progress
        </span>
      )}
    </span>
  )
}
