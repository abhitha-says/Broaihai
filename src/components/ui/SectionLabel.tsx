import styles from './SectionLabel.module.css'

/** The "// Label" eyebrow above every section heading. */
export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p className={`t-body-lg-medium ${styles.label} ${className ?? ''}`}>
      <span className={styles.slashes} aria-hidden>
        {'//'}
      </span>
      {children}
    </p>
  )
}
