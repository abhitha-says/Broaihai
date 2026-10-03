'use client'

import { ArrowUp } from '@/components/ui/icons'
import { scrollToTop } from './SmoothScroll'
import styles from './Footer.module.css'

export function BackToTop({ className }: { className?: string }) {
  return (
    <button type="button" className={`${styles.back} ${className ?? ''}`} onClick={scrollToTop}>
      Back to Top
      <ArrowUp className={styles.backArrow} />
    </button>
  )
}
