import { HeroCompact } from './HeroCompact'
import { HeroWide } from './HeroWide'

/**
 * The home hero. Two layouts share the anchor: from 1200px up, the brand beside the orbiting
 * service cards (HeroWide); below that, the logo, name and typed line over the dot field
 * (HeroCompact). Each hides itself outside its range, so only one is ever laid out.
 */
export function Hero() {
  return (
    <div id="hero">
      <HeroCompact />
      <HeroWide />
    </div>
  )
}
