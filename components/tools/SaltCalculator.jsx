'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { NumberField, Result, Stats, Note, CalcFrame, fmt } from './CalcUI'

/**
 * Salt for a chlorine generator.
 *
 *   lb of salt = (target ppm - current ppm) x gallons x 8.34 / 1,000,000
 *
 * Sanity check: 10,000 gallons from 0 to 3,200 ppm = 267 lb, which matches the
 * trade figure of roughly 85 lb per 1,000 ppm per 10,000 gallons.
 *
 * Salt is never consumed -- it leaves only with water. So when current exceeds
 * target the only fix is dilution, and we show how much water to replace
 * rather than pretending there's an additive answer.
 */
const n = (v) => {
  const x = parseFloat(v)
  return Number.isFinite(x) ? x : 0
}

export default function SaltCalculator() {
  const [gallons, setGallons] = useState('15000')
  const [current, setCurrent] = useState('2400')
  const [target, setTarget] = useState('3200')

  const vol = Math.max(0, n(gallons))
  const diff = n(target) - n(current)

  const { pounds, bags40, drainPct, drainGal } = useMemo(() => {
    if (!vol) return { pounds: 0, bags40: 0, drainPct: 0, drainGal: 0 }
    if (diff > 0) {
      const lb = (diff * vol * 8.34) / 1_000_000
      return { pounds: lb, bags40: lb / 40, drainPct: 0, drainGal: 0 }
    }
    if (diff < 0 && n(current) > 0) {
      const pct = 1 - n(target) / n(current)
      return { pounds: 0, bags40: 0, drainPct: pct * 100, drainGal: pct * vol }
    }
    return { pounds: 0, bags40: 0, drainPct: 0, drainGal: 0 }
  }, [vol, diff, current, target])

  const overSalted = diff < 0

  const inputs = (
    <>
      <NumberField
        id="gallons"
        label="Pool volume"
        value={gallons}
        onChange={setGallons}
        unit="gal"
        hint="Not sure? Run the volume calculator first."
      />
      <NumberField
        id="current"
        label="Current salt level"
        value={current}
        onChange={setCurrent}
        unit="ppm"
        hint="From a salt test strip or your cell's own readout. The cell's reading drifts as it ages — trust a strip if they disagree."
      />
      <NumberField
        id="target"
        label="Target salt level"
        value={target}
        onChange={setTarget}
        unit="ppm"
        hint="Check your cell's manual. Most want 2,700–3,400 ppm; 3,200 is a common midpoint."
      />
    </>
  )

  const results = (
    <>
      <Result
        tone={overSalted ? 'warn' : 'pool'}
        label={overSalted ? 'Too much salt — dilute' : 'Salt to add'}
        value={overSalted ? `${fmt(drainPct, 0)}%` : pounds ? fmt(pounds, 0) : '—'}
        unit={overSalted ? 'of the water' : 'lb'}
        sub={
          overSalted
            ? `Replace about ${fmt(drainGal)} gallons with fresh water`
            : pounds
              ? `${fmt(bags40, 1)} × 40 lb bags · raises salt ${fmt(diff)} ppm`
              : 'Already at target — nothing to add'
        }
      />

      <Stats
        items={[
          { label: 'Change needed', value: diff ? `${diff > 0 ? '+' : ''}${fmt(diff)} ppm` : 'none' },
          { label: 'Volume', value: vol ? `${fmt(vol)} gal` : '—' },
          { label: '40 lb bags', value: pounds ? fmt(bags40, 1) : '—' },
        ]}
      />

      {overSalted && (
        <Note variant="warn">
          Salt doesn&rsquo;t evaporate and the cell doesn&rsquo;t consume it — it only leaves with water.
          There is no additive that lowers salt, so partial drain and refill is the only route.
          Well above range, most cells throttle back or fault out to protect themselves.
        </Note>
      )}

      {!overSalted && pounds > 0 && (
        <Note>
          Use pool salt, not water-softener pellets or rock salt. Broadcast it into the shallow end
          with the pump running, brush it around so it doesn&rsquo;t pile on the floor, and give it a
          full turnover before you trust a reading. Leave the cell off for 24 hours while it
          dissolves.
        </Note>
      )}

      <Note variant="warn">
        Salt is easy to add and hard to remove. If you&rsquo;re unsure of your current reading, add
        three quarters of this and retest — you can always add the rest.
      </Note>

      <p className="text-center text-sm text-slate-500">
        <Link href="/tools/pool-volume-calculator" className="link-inline">
          Find your volume
        </Link>{' '}
        ·{' '}
        <Link href="/equipment" className="link-inline">
          Salt cell guides
        </Link>
      </p>
    </>
  )

  return <CalcFrame inputs={inputs} results={results} />
}
