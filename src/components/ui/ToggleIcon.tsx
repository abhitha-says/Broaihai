import styles from './ToggleIcon.module.css'

/** Two bars that cross into an orange X when open. Used by the menu and the FAQ. */
export function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span className={styles.icon} data-open={open} aria-hidden>
      <span className={`${styles.bar} ${styles.top}`} />
      <span className={`${styles.bar} ${styles.bottom}`} />
    </span>
  )
}
