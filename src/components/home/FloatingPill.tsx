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
  /** How far the pill drifts with scroll, in px; larger reads as nearer. */
  depth: number
}

type Props = PillSpec & { index: number }

export function FloatingPill({ text, tone, x, y, rotate, depth, index }: Props) {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    '--rot': `${rotate}deg`,
    '--depth': depth,
    '--delay': `${index * 90}ms`,
    zIndex: index + 1,
  } as CSSProperties
  return (
    <span className={styles.slot} style={style}>
      <span className={styles.drop}>
        <span className={styles.drift}>
          <span className={`${styles.pill} ${styles[tone]}`}>{text}</span>
        </span>
      </span>
    </span>
  )
}
