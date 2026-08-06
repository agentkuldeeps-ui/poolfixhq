'use client'

/**
 * Shared UI kit for the calculators.
 *
 * These are the only client components on the site. Everything else is server
 * rendered, so keep this file small and dependency-free — no date libraries,
 * no chart libraries, no form libraries. Plain React state and CSS.
 */

/** Labelled numeric input with a unit suffix. */
export function NumberField({ id, label, value, onChange, unit, min = 0, step = 'any', hint, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-pool-900">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-3.5 text-[15px] text-slate-900 tabular-nums placeholder:text-slate-400 focus:border-pool-600 ${
            unit ? 'pr-14' : 'pr-3.5'
          }`}
        />
        {unit && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-slate-400">
            {unit}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

/** Segmented control. Radio semantics so arrow keys and screen readers work. */
export function Segmented({ label, name, options, value, onChange, columns = 3 }) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-semibold text-pool-900">{label}</legend>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => {
          const active = opt.value === value
          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border-2 px-3 py-2.5 text-center text-sm font-semibold transition-colors ${
                active
                  ? 'border-pool-600 bg-pool-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-pool-300 hover:bg-pool-50'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={active}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * The headline result. aria-live so the number is announced as it changes —
 * without it a screen reader user gets nothing from a live-updating calculator.
 */
export function Result({ label, value, unit, sub, tone = 'pool' }) {
  const tones = {
    pool: 'from-pool-800 to-pool-900',
    warn: 'from-accent-700 to-accent-800',
  }
  return (
    <div className={`rounded-xl bg-gradient-to-br ${tones[tone]} p-6 text-center`}>
      <p className="text-xs font-bold uppercase tracking-widest text-pool-200">{label}</p>
      <p aria-live="polite" className="mt-2 flex items-baseline justify-center gap-2">
        <span className="text-4xl font-extrabold tabular-nums text-white sm:text-5xl">{value}</span>
        {unit && <span className="text-lg font-semibold text-pool-200">{unit}</span>}
      </p>
      {sub && <p className="mt-2 text-sm text-pool-100">{sub}</p>}
    </div>
  )
}

/** Secondary readouts under the headline number. */
export function Stats({ items }) {
  if (!items?.length) return null
  return (
    <dl className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
      {items.map((it) => (
        <div key={it.label} className="bg-white px-4 py-3 text-center">
          <dt className="text-xs font-bold uppercase tracking-wide text-pool-600">{it.label}</dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-pool-900">{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Inline note. `warn` for anything with a safety or chemistry consequence. */
export function Note({ variant = 'info', children }) {
  const styles = {
    info: 'border-pool-200 bg-pool-50 text-pool-900',
    warn: 'border-accent-300 bg-accent-50 text-accent-900',
    danger: 'border-red-300 bg-red-50 text-red-900',
  }
  return (
    <p className={`rounded-lg border px-4 py-3 text-[15px] leading-relaxed ${styles[variant]}`}>
      {children}
    </p>
  )
}

/** Two-column calculator frame: inputs left, results right, stacked on mobile. */
export function CalcFrame({ inputs, results }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)] lg:gap-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">{inputs}</div>
      </div>
      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">{results}</div>
    </div>
  )
}

/** Formats a number with thousands separators and sane precision. */
export function fmt(n, digits = 0) {
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}
