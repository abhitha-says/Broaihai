import type { ReactNode } from 'react'
import styles from './Section.module.css'

type Props = {
  id?: string
  children: ReactNode
  /** Classes for the inner container, which carries each section's own layout. */
  className?: string
  /** Classes for the outer band. */
  bandClassName?: string
}

/** A full-width band with the site's 1310px content column and 80px vertical rhythm. */
export function Section({ id, children, className, bandClassName }: Props) {
  return (
    <section id={id} className={`${styles.band} ${bandClassName ?? ''}`}>
      <div className={`${styles.container} ${className ?? ''}`}>{children}</div>
    </section>
  )
}
