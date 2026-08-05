/**
 * Standard page/hub masthead.
 *
 * `wide` swaps the default max-w-6xl container for max-w-7xl so pages using a
 * wider body shell (About) keep their masthead and content on the same left
 * and right edges. Without it the header is visibly inset from the body.
 */
export default function PageHeader({ eyebrow, title, description, children, wide = false }) {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-pool-50 to-white">
      <div
        className={`${wide ? 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8' : 'container-page'} py-10 sm:py-14`}
      >
        {children}
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-pool-600">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-pool-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{description}</p>
        )}
      </div>
    </div>
  )
}
