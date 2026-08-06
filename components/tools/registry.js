import VolumeCalculator from './VolumeCalculator'
import ChlorineCalculator from './ChlorineCalculator'
import SaltCalculator from './SaltCalculator'

/**
 * Maps a tool slug from lib/tools.js to its component.
 *
 * To add a calculator: build the component here, register it below, add the
 * entry to lib/tools.js, and set that entry's status to 'live'. A slug with no
 * entry here renders the placeholder shell instead of crashing.
 */
export const calculators = {
  'pool-volume-calculator': VolumeCalculator,
  'chlorine-dosage-calculator': ChlorineCalculator,
  'saltwater-calculator': SaltCalculator,
}
