'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { NumberField, Segmented, Result, Stats, Note, CalcFrame, fmt } from './CalcUI'

/**
 * Pool volume.
 *
 * Standard trade formulas. 1 cubic foot = 7.48 US gallons; the round and oval
 * factors fold in pi/4 (0.7854 x 7.48 = 5.87, rounded to 5.9 as the industry
 * does). Kidney uses the common two-width approximation, which is an estimate
 * and is labelled as one.
 *
 *   rectangle  L x W x avg depth x 7.5
 *   round      D^2 x avg depth x 5.9
 *   oval       L x W x avg depth x 5.9
 *   kidney     (A + B) x L x avg depth x 3.38
 */
const SHAPES = [
  { value: 'rect', label: 'Rectangle' },
  { value: 'round', label: 'Round' },
  { value: 'oval', label: 'Oval' },
  { value: 'kidney', label: 'Kidney' },
]

const n = (v) => {
  const x = parseFloat(v)
  return Number.isFinite(x) && x > 0 ? x : 0
}

export default function VolumeCalculator() {
  const [shape, setShape] = useState('rect')
  const [length, setLength] = useState('32')
  const [width, setWidth] = useState('16')
  const [diameter, setDiameter] = useState('24')
  const [widthB, setWidthB] = useState('10')
  const [shallow, setShallow] = useState('3')
  const [deep, setDeep] = useState('8')
  const [flow, setFlow] = useState('50')

  const avgDepth = useMemo(() => {
    const s = n(shallow)
    const d = n(deep)
    if (!s && !d) return 0
    if (!d) return s
    if (!s) return d
    return (s + d) / 2
  }, [shallow, deep])

  const gallons = useMemo(() => {
    if (!avgDepth) return 0
    if (shape === 'rect') return n(length) * n(width) * avgDepth * 7.5
    if (shape === 'round') return n(diameter) ** 2 * avgDepth * 5.9
    if (shape === 'oval') return n(length) * n(width) * avgDepth * 5.9
    return (n(width) + n(widthB)) * n(length) * avgDepth * 3.38
  }, [shape, length, width, diameter, widthB, avgDepth])

  const litres = gallons * 3.78541
  const turnoverHrs = n(flow) > 0 && gallons > 0 ? gallons / (n(flow) * 60) : 0

  const inputs = (
    <>
      <Segmented
        label="Pool shape"
        name="shape"
        options={SHAPES}
        value={shape}
        onChange={setShape}
        columns={2}
      />

      {shape === 'round' ? (
        <NumberField id="diameter" label="Diameter" value={diameter} onChange={setDiameter} unit="ft" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="length" label="Length" value={length} onChange={setLength} unit="ft" />
          <NumberField
            id="width"
            label={shape === 'kidney' ? 'Width at widest' : 'Width'}
            value={width}
            onChange={setWidth}
            unit="ft"
          />
        </div>
      )}

      {shape === 'kidney' && (
        <NumberField
          id="widthB"
          label="Width at narrowest"
          value={widthB}
          onChange={setWidthB}
          unit="ft"
          hint="Kidney and freeform shapes are an estimate. Measure the two widths at right angles to the length."
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="shallow"
          label="Shallow end depth"
          value={shallow}
          onChange={setShallow}
          unit="ft"
        />
        <NumberField
          id="deep"
          label="Deep end depth"
          value={deep}
          onChange={setDeep}
          unit="ft"
          hint="Same as shallow if the floor is flat."
        />
      </div>

      <div className="border-t border-slate-200 pt-5">
        <NumberField
          id="flow"
          label="Pump flow rate (optional)"
          value={flow}
          onChange={setFlow}
          unit="GPM"
          hint="On the pump label or its curve. Used for turnover time."
        />
      </div>
    </>
  )

  const results = (
    <>
      <Result
        label="Pool volume"
        value={gallons ? fmt(gallons) : '—'}
        unit="gallons"
        sub={gallons ? `${fmt(litres)} litres · average depth ${fmt(avgDepth, 1)} ft` : 'Enter your dimensions'}
      />

      <Stats
        items={[
          { label: 'Avg depth', value: avgDepth ? `${fmt(avgDepth, 1)} ft` : '—' },
          { label: 'Litres', value: gallons ? fmt(litres) : '—' },
          { label: 'Turnover', value: turnoverHrs ? `${fmt(turnoverHrs, 1)} hr` : '—' },
        ]}
      />

      {shape === 'kidney' && (
        <Note variant="warn">
          Freeform shapes don&rsquo;t have a clean formula. Treat this as within about 10% — fine for
          dosing chlorine, not precise enough for sizing a heater.
        </Note>
      )}

      <Note>
        Write this number down somewhere you&rsquo;ll find it. Every dose you ever calculate depends
        on it, and re-measuring in a hurry is how people end up guessing.
      </Note>

      {turnoverHrs > 0 && (
        <Note variant={turnoverHrs > 10 ? 'warn' : 'info'}>
          At {fmt(n(flow))} GPM your pump moves one full pool volume every{' '}
          <strong>{fmt(turnoverHrs, 1)} hours</strong>.{' '}
          {turnoverHrs > 10
            ? 'That is slow. Check for a dirty filter or a clogged impeller before assuming you need a bigger pump.'
            : 'One turnover a day is the usual minimum; two in heavy season.'}
        </Note>
      )}

      <p className="text-center text-sm text-slate-500">
        Need to dose it?{' '}
        <Link href="/tools/chlorine-dosage-calculator" className="link-inline">
          Chlorine calculator
        </Link>{' '}
        ·{' '}
        <Link href="/tools/saltwater-calculator" className="link-inline">
          Salt calculator
        </Link>
      </p>
    </>
  )

  return <CalcFrame inputs={inputs} results={results} />
}
