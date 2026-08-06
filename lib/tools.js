/**
 * Interactive calculators.
 *
 * To add one: add an entry here, build the component under components/tools/,
 * register it in components/tools/registry.js, then set status to 'live'.
 * A 'planned' tool renders a placeholder shell and is noindex + excluded from
 * sitemap.xml, same gate as article `status`.
 *
 * `formula` and `faqs` are what make these pages worth indexing -- a bare
 * calculator with no explanation is a thin page. Every number quoted here is
 * derivable from the component's own math; nothing is invented.
 */
export const tools = [
  {
    slug: 'pool-volume-calculator',
    title: 'Pool Volume Calculator',
    summary: 'Gallons for rectangular, round, oval and kidney pools. Every dosing number depends on this one.',
    metaDescription:
      'Free pool volume calculator. Get your gallons for rectangular, round, oval and kidney pools, plus turnover time. No signup.',
    status: 'live',
    formula: [
      'Volume is length × width × average depth, converted to gallons. One cubic foot holds 7.48 US gallons, which the trade rounds to 7.5.',
      'Round and oval pools use a factor of 5.9 instead. That is the same 7.48 with π/4 folded in, because a circle fills about 78.5% of the square around it.',
      'Average depth is the shallow end plus the deep end divided by two. That works for a normal sloped floor. A pool with a sharp drop-off or a deep hopper will read slightly high.',
      'Kidney and freeform shapes have no exact formula. The two-width approximation used here is typically within about 10% — fine for dosing chemicals, not precise enough for sizing a heater.',
    ],
    faqs: [
      {
        q: 'Why does my pool volume matter so much?',
        a: 'Every chemical dose is calculated per gallon. Guess the volume 30% high and every dose you ever add is 30% wrong, which is why chlorine that "never holds" is sometimes just a measuring problem.',
      },
      {
        q: 'What if my pool has a spa or a tanning ledge?',
        a: 'Calculate the main body first, then add the spa or ledge as a separate small rectangle and add the two figures together.',
      },
      {
        q: 'How accurate is this?',
        a: 'For rectangular and round pools with a regular floor, within a few percent. Freeform shapes are an estimate. If you want certainty, a service tech can measure it properly.',
      },
    ],
  },
  {
    slug: 'chlorine-dosage-calculator',
    title: 'Chlorine Dosage Calculator',
    summary: 'How much liquid chlorine, cal-hypo, dichlor or trichlor to hit your target free chlorine.',
    metaDescription:
      'Work out exactly how much chlorine to add to your pool. Liquid, cal-hypo, dichlor and trichlor, adjusted for your volume and current level.',
    status: 'live',
    formula: [
      'One ppm means one milligram per litre. A US gallon of water weighs 8.34 pounds, so raising G gallons by X ppm needs (X × G × 8.34) ÷ 1,000,000 pounds of available chlorine.',
      'That figure is then converted by product. Liquid chlorine is sold on trade percent — grams of available chlorine per 100 mL — while dry products are a straight percentage by weight, so the two convert differently.',
      'A check you can run yourself: one gallon of 12.5% liquid in 10,000 gallons gives about 12.5 ppm, and one pound of 73% cal-hypo in 10,000 gallons gives about 8.75 ppm. Both match the trade rules of thumb.',
      'Stabilised products carry cyanuric acid with them. Trichlor adds roughly 0.6 ppm CYA for every 1 ppm of chlorine, dichlor roughly 0.9. CYA only leaves with water, so this is the usual route to a pool that will not hold chlorine.',
    ],
    faqs: [
      {
        q: 'Why does my chlorine disappear so fast?',
        a: 'Usually sunlight with too little stabiliser, or too much stabiliser locking the chlorine up. Check cyanuric acid before adding more chlorine — past roughly 80–100 ppm CYA you need far more chlorine for the same effect.',
      },
      {
        q: 'Liquid chlorine or tablets?',
        a: 'Liquid adds nothing but chlorine and salt. Tablets are convenient but every one adds cyanuric acid that never leaves. For routine dosing on an established pool, liquid gives you more control.',
      },
      {
        q: 'Can I swim right after adding chlorine?',
        a: 'Wait until free chlorine is back in normal range and the water has had a full turnover. After a heavy shock dose that can be several hours.',
      },
    ],
  },
  {
    slug: 'saltwater-calculator',
    title: 'Saltwater Pool Salt Calculator',
    summary: 'Pounds of salt to bring a chlorine generator back into its operating range.',
    metaDescription:
      'Calculate how many pounds of pool salt to add to reach your salt cell target range, based on current ppm and pool volume.',
    status: 'live',
    formula: [
      'Pounds of salt = (target ppm − current ppm) × gallons × 8.34 ÷ 1,000,000.',
      'Worked through: taking 10,000 gallons from zero to 3,200 ppm needs about 267 pounds, which matches the trade figure of roughly 85 pounds per 1,000 ppm per 10,000 gallons.',
      'Salt is never consumed. The cell converts it to chlorine and the chlorine reverts to salt, so the level only falls through splash-out, backwashing, rain overflow and leaks.',
      'That also means there is no additive that lowers salt. If you overshoot, the only fix is replacing part of the water, which is why this calculator shows a dilution percentage instead of pretending otherwise.',
    ],
    faqs: [
      {
        q: 'What salt level should I run?',
        a: 'Check your cell manual — most want somewhere between 2,700 and 3,400 ppm. Running low makes the cell work harder and shortens its life; running high can trip a fault.',
      },
      {
        q: 'Can I use water softener salt?',
        a: 'Use salt sold for pools. Softener pellets dissolve slowly and rock salt often carries impurities that stain. The price difference is small next to a stained plaster surface.',
      },
      {
        q: 'Why does my cell read differently from my test strip?',
        a: 'Cell readings drift as the plates age and are temperature-sensitive. When they disagree, trust an independent test and treat the cell readout as a rough guide.',
      },
    ],
  },
]

export const toolBySlug = Object.fromEntries(tools.map((t) => [t.slug, t]))
