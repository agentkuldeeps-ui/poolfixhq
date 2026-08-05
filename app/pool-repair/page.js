import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { states } from '@/lib/states'
import { breadcrumbSchema } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Find a Pool Repair Pro',
  description:
    'Tell us what your pool is doing and get matched with licensed pool repair techs in your area. Free, no obligation.',
  path: '/pool-repair',
  noindex: true,
})

const PROBLEM_TYPES = [
  'Green or cloudy water',
  'Pump or motor',
  'Filter',
  'Heater',
  'Salt system',
  'Leak or plumbing',
  'Structural / surface',
  'Something else',
]

/**
 * LEAD CAPTURE SHELL -- markup and validation attributes only.
 *
 * The form deliberately has no `action` and the submit control is disabled.
 * Wire it up before launch:
 *   1. Add a POST handler at app/api/leads/route.js (or point at your CRM).
 *   2. Set action + method on the <form>, drop the `disabled` on the button.
 *   3. Add spam protection (honeypot field is already in place below).
 *   4. Remove `noindex: true` from the metadata above.
 *
 * Kept as a server component -- no client JS needed until step 2.
 */
export default function PoolRepairPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Find a Pro', href: '/pool-repair' },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHeader
        eyebrow="Repair Leads"
        title="Get Matched With a Pool Repair Pro"
        description="Some jobs are not worth doing yourself. Tell us what the pool is doing and we will put you in front of licensed techs in your area."
      >
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1.5fr,1fr]">
          <div>
            <div className="mb-6 rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-sm text-accent-900">
              <strong className="font-semibold">Shell only.</strong> This form is not connected to a
              handler yet — see the setup notes in <code>app/pool-repair/page.js</code>.
            </div>

            <form className="space-y-5" noValidate>
              {/* Honeypot. Real users never fill this; bots usually do. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Your name" required>
                  <input {...inputProps} id="name" name="name" type="text" autoComplete="name" required />
                </Field>

                <Field id="zip" label="ZIP code" required hint="So we can match local techs.">
                  <input
                    {...inputProps}
                    id="zip"
                    name="zip"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    autoComplete="postal-code"
                    required
                  />
                </Field>

                <Field id="email" label="Email" required>
                  <input {...inputProps} id="email" name="email" type="email" autoComplete="email" required />
                </Field>

                <Field id="phone" label="Phone" hint="Optional, but techs respond faster to a call.">
                  <input {...inputProps} id="phone" name="phone" type="tel" autoComplete="tel" />
                </Field>
              </div>

              <Field id="state" label="State" required>
                <select {...inputProps} id="state" name="state" defaultValue="" required>
                  <option value="" disabled>
                    Select a state
                  </option>
                  {states.map((state) => (
                    <option key={state.slug} value={state.abbr}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </Field>

              <fieldset>
                <legend className="mb-2 block text-sm font-semibold text-pool-900">
                  What is going on? <span className="text-accent-700">*</span>
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {PROBLEM_TYPES.map((problem) => (
                    <label
                      key={problem}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 px-4 py-2.5 text-[15px] text-slate-700 hover:bg-pool-50"
                    >
                      <input
                        type="radio"
                        name="problemType"
                        value={problem}
                        className="h-4 w-4 accent-pool-700"
                      />
                      {problem}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field id="details" label="Details" hint="Symptoms, equipment brand, how long it has been happening.">
                <textarea {...inputProps} id="details" name="details" rows={5} />
              </Field>

              <button type="submit" className="btn-primary w-full sm:w-auto" disabled>
                Get Repair Quotes
              </button>

              <p className="text-xs leading-relaxed text-slate-500">
                By submitting, you agree we may share your details with pool professionals in your
                area so they can contact you about your request. See our{' '}
                <a href="/privacy-policy" className="link-inline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-pool-900">When calling a pro is the right move</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
              {[
                'Water loss you cannot trace — a leak search needs pressure testing gear.',
                'A pump or heater tripping the breaker. That is electrical, not plumbing.',
                'Gas heater faults. Gas work is licensed work in most states.',
                'Cracks in the shell or a lifting deck. Structural, and it gets worse.',
                'Anything still broken after you have already replaced two parts guessing.',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pool-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  )
}

const inputProps = {
  className:
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-pool-600',
}

function Field({ id, label, hint, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-pool-900">
        {label} {required && <span className="text-accent-700">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  )
}
