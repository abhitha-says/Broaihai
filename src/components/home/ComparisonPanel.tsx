import { FloatingPill, type PillSpec } from './FloatingPill'
import styles from './Difference.module.css'

type Props = {
  title: string
  variant: 'typical' | 'broAi'
  pills: PillSpec[]
}

export function ComparisonPanel({ title, variant, pills }: Props) {
  return (
    <div className={styles.column} data-panel={variant}>
      <h3 className={`t-h3 ${styles.panelTitle}`} data-title>
        {title}
      </h3>
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
