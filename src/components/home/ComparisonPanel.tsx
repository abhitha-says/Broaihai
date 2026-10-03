import { FloatingPill, type PillSpec } from './FloatingPill'
import styles from './Difference.module.css'

type Props = {
  title: string
  variant: 'typical' | 'broAi'
  pills: PillSpec[]
  /** Offsets the entrance so the two panels do not land together. */
  delay?: number
}

export function ComparisonPanel({ title, variant, pills, delay = 0 }: Props) {
  return (
    <div className={styles.column} style={{ '--panel-delay': `${delay}ms` } as React.CSSProperties}>
      <h3 className={`t-h3 ${styles.panelTitle}`}>{title}</h3>
      <div className={`${styles.panel} ${styles[variant]}`}>
        <div className={styles.bg} aria-hidden>
          <span className={`${styles.blob} ${styles.blobA}`} />
          <span className={`${styles.blob} ${styles.blobB}`} />
          <span className={`${styles.blob} ${styles.blobC}`} />
        </div>
        <div className={styles.pills}>
          {pills.map((pill, i) => (
            <FloatingPill key={pill.text} index={i} {...pill} />
          ))}
        </div>
      </div>
    </div>
  )
}
