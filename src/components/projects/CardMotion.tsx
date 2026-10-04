'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { COMPACT, useMediaQuery, useReducedMotion } from '@/lib/hooks'
import { clamp01 } from '@/lib/scroll'

/**
 * The cover's frame on tablet and phone. As the page scrolls, `--p` scrubs the
 * reveal: the frame opens from a tighter, rounder inset while the cover settles
 * out of a zoom. That is all the motion there is below the desktop width: the
 * hover (blurred cover, phone card, cursor bubble) belongs to the desktop layout
 * and is switched off here, so a narrowed desktop window reads like a phone.
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
    }
  }, [live])

  return (
    <div ref={ref} className={className} style={style} data-cursor={compact ? undefined : 'see-work'}>
      {children}
    </div>
  )
}
