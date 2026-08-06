'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { NumberField, Segmented, Result, Stats, Note, CalcFrame, fmt } from './CalcUI'

/**
 * Chlorine dosage.
 *
 * Derivation, so the numbers can be checked rather than trusted:
 *   1 ppm = 1 mg/L. A US gallon of water weighs 8.34 lb, so raising G gallons
 *   by X ppm needs (X * G * 8.34) / 1,000,000 lb of AVAILABLE chlorine.
 *
 * Liquid products are sold on trade percent (g available chlorine per 100 mL),
 * dry products on percent by weight, so the two are converted differently.
 *
 * Sanity check: 1 gal of 12.5% liquid in 10,000 gal gives ~12.5 ppm, and 1 lb
 * of 73% cal-hypo in 10,000 gal gives ~8.75 ppm. Both match the trade rules
 * of thumb.
 *
 * cyaPerFc: stabilised products also add cyanuric acid. Trichlor adds roughly
 * 0.6 ppm CYA per 1 ppm FC, dichlor roughly 0.9. That is the single most
 * common way residential pools end up over-stabilised.
 */
const PRODUCTS = [
  { value: 'liquid125', label: 'Liquid 12.5%', kind: 'liquid', strength: 12.5, cyaPerFc: 0, calcium: false },
  { value: 'liquid10', label: 'Liquid 10%', kind: 'liquid', strength: 10, cyaPerFc: 0, calcium: false },
  { value: 'bleach6', label: 'Bleach 6%', kind: 'liquid', strength: 6, cyaPerFc: 0, calcium: false },
  { value: 'calhypo', label: 'Cal-hypo 73%', kind: 'dry', strength: 73, cyaPerFc: 0, calcium: true },
  { value: 'dichlor', label: 'Dichlor 56%', kind: 'dry', strength: 56, cyaPerFc: 0.9, calcium: false },
  { value: 'trichlor', label: 'Trichlor 90%', kind: 'dry', strength: 90, cyaPerFc: 0.6, calcium: false },
]

const n = (v) => {
  const x = parseFloat(v)
  return Number.isFinite(x) ? x : 0
}

export default function ChlorineCalculator() {
  const [gallons, setGallons] = useState('15000')
  const [current, setCurrent] = useState('0.5')
  const [target, setTarget] = useState('3')
  const [productId, setProductId] = useState('liquid125')

  const product = PRODUCTS.find((p) => p.value === productId)
  const rise = Math.max(0, n(target) - n(current))
  const vol = Math.max(0, n(gallons))

  const dose = useMemo(() => {
    if (!rise || !vol) return null
    const lbAvailable = (rise * vol * 8.34) / 1_000_000
    if (product.kind === 'liquid') {
      // trade % -> grams available per litre = strength * 10
      const litres = (lbAvailable * 453.592) / (product.strength * 10)
      const flOz = litres * 33.814
      return { primary: flOz, unit: 'fl oz', secondary: flOz / 128, secondaryUnit: 'gallons' }
    }
    const lbProduct = lbAvailable / (product.strength / 100)
    const oz = lbProduct * 16
    return { primary: oz, unit: 'oz', secondary: lbProduct, secondaryUnit: 'lb' }
  }, [rise, vol, product])

  const cyaAdded = product.cyaPerFc * rise

  const inputs = (
    <>
      <NumberField
        id="gallons"
        label="Pool volume"
        value={gallons}
        onChange={setGallons}
        unit="gal"
        hint="Don't know it? Use the volume calculator first — every number below depends on this one."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="current"
          label="Current free chlorine"
          value={current}
          onChange={setCurrent}
          unit="ppm"
        />
        <NumberField id="target" label="Target free chlorine" value={target} onChange={setTarget} unit="ppm" />
      </div>
      <Segmented
        label="Product"
        name="product"
        options={PRODUCTS}
        value={productId}
        onChange={setProductId}
        columns={2}
      />
    </>
  )

  const results = (
    <>
      <Result
        label={`Add this much ${product.label.toLowerCase()}`}
        value={dose ? fmt(dose.primary, dose.primary < 10 ? 1 : 0) : '—'}
        unit={dose ? dose.unit : ''}
        sub={
          dose
            ? `${fmt(dose.secondary, 2)} ${dose.secondaryUnit} · raises free chlorine ${fmt(rise, 1)} ppm`
            : rise === 0
              ? 'Target is at or below current — nothing to add'
              : 'Enter your pool volume'
        }
      />

      <Stats
        items={[
          { label: 'Rise needed', value: `${fmt(rise, 1)} ppm` },
          { label: 'Volume', value: vol ? `${fmt(vol)} gal` : '—' },
          { label: 'CYA added', value: cyaAdded ? `+${fmt(cyaAdded, 1)} ppm` : 'none' },
        ]}
      />

      <Note variant="danger">
        <strong>Never mix chemicals.</strong> Add each product to the water separately, never to
        another chemical and never to a bucket that held one. Chlorine and acid together produce
        chlorine gas. Always add chemicals to water, never water to chemicals.
      </Note>

      {product.cyaPerFc > 0 && (
        <Note variant="warn">
          {product.label} is stabilised — this dose also adds about{' '}
          <strong>{fmt(cyaAdded, 1)} ppm of cyanuric acid</strong>, and CYA doesn&rsquo;t leave except
          by draining water. Used all season it&rsquo;s the most common route to a pool that
          won&rsquo;t hold chlorine no matter how much you add.
        </Note>
      )}

      {product.calcium && (
        <Note variant="warn">
          Cal-hypo raises calcium hardness. If yours is already high, or you have hard fill water,
          liquid chlorine avoids that entirely.
        </Note>
      )}

      <Note>
        Broadcast over the deep end with the pump running, and don&rsquo;t swim until free chlorine is
        back in range. Retest after a full turnover rather than straight away.
      </Note>

      <p className="text-center text-sm text-slate-500">
        <Link href="/tools/pool-volume-calculator" className="link-inline">
          Find your volume
        </Link>{' '}
        ·{' '}
        <Link href="/chemistry" className="link-inline">
          Chemistry guides
        </Link>
      </p>
    </>
  )

  return <CalcFrame inputs={inputs} results={results} />
}
