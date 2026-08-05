/**
 * SafetyWarning -- MANDATORY on any article mentioning muriatic acid, chlorine,
 * shock, or chemical mixing. High visibility on purpose. Never-mix warnings are
 * non-negotiable; do not soften the copy and do not restyle this quieter.
 *
 * role="alert" is deliberate: screen readers announce it rather than letting a
 * user scroll past a chemical hazard.
 */
export default function SafetyWarning({ title = 'Safety Warning', children }) {
  return (
    <div
      role="alert"
      className="not-prose my-8 overflow-hidden rounded-xl border-2 border-red-600 bg-red-50 shadow-sm"
    >
      <p className="flex items-center gap-2 bg-red-600 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0"
        >
          <path d="M10.3 3.9L2.4 17.5A2 2 0 004.1 20.5h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
          <path d="M12 9v4m0 4h.01" />
        </svg>
        {title}
      </p>
      <div className="prose prose-slate max-w-none px-5 py-4 prose-p:my-2 prose-strong:text-red-800 prose-li:my-1">
        {children}
      </div>
    </div>
  )
}
