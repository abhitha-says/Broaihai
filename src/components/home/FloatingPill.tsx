import type { CSSProperties } from 'react'
import styles from './Difference.module.css'

export type PillTone = 'glassDark' | 'glassLight' | 'accent' | 'ink'

export type PillSpec = {
  text: string
  tone: PillTone
  /** Centre of the pill as a percentage of the panel. */
  x: number
  y: number
  /** Resting rotation in degrees. */
  rotate: number
}

type Props = PillSpec & { index: number }

/**
 * Four nested layers, each with one job: `slot` places the pill, `drop` carries the
 * scroll-driven entrance (written by ComparisonGrid), `bob` is the idle drift once the
 * composition has settled, and `pill` holds the resting tilt and the hover.
 */
export function FloatingPill({ text, tone, x, y, rotate, index }: Props) {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    '--rot': `${rotate}deg`,
    '--bob': `${5.2 + ((index * 7) % 5) * 0.7}s`,
    '--bob-delay': `${-index * 1.3}s`,
    zIndex: index + 1,
  } as CSSProperties
  return (
    <span className={styles.slot} style={style} data-pill data-tone={tone}>
      <span className={styles.drop}>
        <span className={styles.bob}>
          <span className={`${styles.pill} ${styles[tone]}`}>{text}</span>
        </span>
      </span>
    </span>
  )
}
