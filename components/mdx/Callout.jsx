/**
 * Callout -- three variants, each with a distinct job.
 *
 *   research    a cited fact from CDC / EPA / extension / manufacturer docs
 *   warning     do this wrong and you damage equipment or the pool
 *   bottomline  the verdict, usually "the cheap fix is the right fix"
 *
 * For chemical hazards use SafetyWarning instead. This is not that.
 */
const VARIANTS = {
  research: {
    label: 'What the research says',
    className: 'border-pool-300 bg-pool-50',
    labelClass: 'text-pool-700',
    icon: (
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2l2.1 2.1m0-11.4l-2.1 2.1M8.4 15.6l-2.1 2.1" />
    ),
  },
  warning: {
    label: 'Heads up',
    className: 'border-accent-400 bg-accent-50',
    labelClass: 'text-accent-800',
    icon: <path d="M12 9v4m0 4h.01M10.3 3.9L2.4 17.5A2 2 0 004.1 20.5h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />,
  },
  bottomline: {
    label: 'Bottom line',
    className: 'border-pool-700 bg-slate-50',
    labelClass: 'text-pool-800',
    icon: <path d="M20 6L9 17l-5-5" />,
  },
}

export default function Callout({ variant = 'research', title, children }) {
  const config = VARIANTS[variant] ?? VARIANTS.research

  return (
    <div className={`not-prose my-6 rounded-xl border-l-4 p-5 ${config.className}`}>
      <p className={`mb-2 flex items-center gap-2 text-sm font-bold ${config.labelClass}`}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0"
        >
          {config.icon}
        </svg>
        {title || config.label}
      </p>
      <div className="prose prose-slate max-w-none prose-p:my-2 prose-p:text-base">
        {children}
      </div>
    </div>
  )
}
