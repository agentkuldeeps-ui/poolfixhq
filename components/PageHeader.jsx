/** Standard page/hub masthead. */
export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-pool-50 to-white">
      <div className="container-page py-10 sm:py-14">
        {children}
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-pool-600">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-pool-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{description}</p>
        )}
      </div>
    </div>
  )
}
