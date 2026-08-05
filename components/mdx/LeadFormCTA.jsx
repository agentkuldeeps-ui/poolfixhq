import Link from 'next/link'

/**
 * LeadFormCTA -- inline lead capture handoff. Required inside the
 * "When to Call a Pro" section of every article.
 *
 * This intentionally does NOT embed a form. One form lives at /pool-repair;
 * inlining copies of it splits conversion tracking and doubles the maintenance.
 */
export default function LeadFormCTA({
  heading = 'Want a pro to handle it?',
  body = 'Tell us what the pool is doing and we will match you with licensed repair techs in your area. Free, no obligation.',
  cta = 'Get Repair Quotes',
}) {
  return (
    <div className="not-prose my-8 rounded-xl border border-pool-200 bg-gradient-to-br from-pool-50 to-white p-6 sm:p-7">
      <h3 className="text-xl font-bold text-pool-900">{heading}</h3>
      <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-slate-700">{body}</p>
      <Link href="/pool-repair" className="btn-primary mt-5">
        {cta}
      </Link>
    </div>
  )
}
