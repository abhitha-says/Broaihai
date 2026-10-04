'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { COMPACT, useMediaQuery, useReducedMotion } from '@/lib/hooks'
import { clamp01 } from '@/lib/scroll'
import styles from './ProjectCard.module.css'

/**
 * The cover's frame on tablet and phone. Two things happen as the page scrolls,
 * and only there (desktop keeps its hover and the cursor bubble):
 *
 *   --p          the reveal, scrubbed by the scroll: the frame opens from a tighter,
 *                rounder inset while the cover settles out of a zoom
 *   data-active  on while the card sits in the middle of the screen: the cover
 *                softens and zooms, the tilted copy lifts and the "see work" disc
 *                lands, which is what the hover does under a mouse
 */
export function CardMotion({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const compact = useMediaQuery(COMPACT)
  const reduced = useReducedMotion()
  const live = compact && !reduced

  useEffect(() => {
    const el = ref.current
    if (!el || !live) return
    let raf = 0
    const apply = () => {
      raf = 0
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      // 0 as the frame's top enters at the bottom edge, 1 once it has risen half a screen
      const t = clamp01((vh * 0.98 - r.top) / (vh * 0.5))
      el.style.setProperty('--p', (1 - (1 - t) ** 3).toFixed(4))
      const centre = r.top + r.height / 2
      el.toggleAttribute('data-active', centre > vh * 0.28 && centre < vh * 0.72)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      el.style.removeProperty('--p')
      el.removeAttribute('data-active')
    }
  }, [live])

  return (
    <div ref={ref} className={className} style={style} data-cursor="see-work">
      {children}
      <span className={styles.hint} aria-hidden>
        SEE
        <br />
        WORK
      </span>
    </div>
  )
}
