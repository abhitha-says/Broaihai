'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/lib/hooks'
import styles from './Difference.module.css'

/**
 * Wraps the two panels. Pills render in place on the server; once hydrated they
 * wait off-stage until the grid is 25% in view, then drop in. While the grid is
 * on screen, scroll progress is written to --p (0 to 1) for the parallax drift.
 */
export function ComparisonGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<'ssr' | 'armed' | 'in'>('ssr')

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const arm = setTimeout(() => setPhase((p) => (p === 'ssr' ? 'armed' : p)), 0)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPhase('in')
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => {
      clearTimeout(arm)
      io.disconnect()
    }
  }, [reduced])

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    let frame = 0
    let visible = false
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const p = (innerHeight - r.top) / (innerHeight + r.height)
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([entry]) => {
      const now = !!entry?.isIntersecting
      if (now === visible) return
      visible = now
      if (now) {
        update()
        addEventListener('scroll', onScroll, { passive: true })
      } else removeEventListener('scroll', onScroll)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  return (
    <div ref={ref} className={styles.grid} data-phase={phase}>
      {children}
    </div>
  )
}
