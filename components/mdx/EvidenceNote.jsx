/**
 * Labels where a claim came from.
 *
 * The site does not physically test most products, and the honest way to
 * handle that is not to hide it — it is to make the provenance of every
 * significant claim visible and let the reader weight it themselves.
 *
 * The four tiers, in descending authority:
 *
 *   manufacturer  spec sheet, manual, product label, warranty document
 *   independent   standards bodies, public-health agencies, regulators
 *   professional  installers and technicians describing repair patterns
 *   owner         owner-reported experience, as themes and never as statistics
 *
 * The `owner` tier carries deliberately hedged language in the label itself,
 * because the failure mode with community evidence is presenting a handful of
 * forum posts as though they were a survey.
 */
const TIERS = {
  manufacturer: {
    label: 'Manufacturer documentation',
    tone: 'border-pool-300 bg-pool-50 text-pool-800',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h6" />
      </>
    ),
  },
  independent: {
    label: 'Independent / regulatory source',
    tone: 'border-slate-300 bg-slate-50 text-slate-700',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  professional: {
    label: 'Reported by trade professionals',
    tone: 'border-slate-300 bg-white text-slate-700',
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 01-5 5L4 17v3h3l5.7-5.7a4 4 0 015-5l2.6-2.6-3-3z" />
      </>
    ),
  },
  owner: {
    label: 'Owner-reported, not measured by us',
    tone: 'border-verdict-warn/30 bg-verdict-warnBg text-verdict-warn',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.9" />
      </>
    ),
  },
}

export default function EvidenceNote({ tier = 'manufacturer', source, children }) {
  const t = TIERS[tier] ?? TIERS.manufacturer

  return (
    <aside className={`my-5 rounded-lg border-l-4 px-4 py-3 ${t.tone}`}>
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {t.icon}
        </svg>
        {t.label}
      </p>
      <div className="mt-1.5 text-[15px] leading-relaxed text-slate-700">{children}</div>
      {source && (
        <p className="mt-1.5 text-[13px] text-slate-500">
          {source.url ? (
            <a href={source.url} target="_blank" rel="noopener nofollow" className="underline hover:text-pool-700">
              {source.title}
            </a>
          ) : (
            source.title ?? source
          )}
        </p>
      )}
    </aside>
  )
}
