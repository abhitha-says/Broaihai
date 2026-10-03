'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { clamp01 } from '@/lib/scroll'

/**
 * Scroll-linked focus pull, after the reference's copy below the hero: as the
 * block rises through the lower half of the viewport it goes from soft, faint
 * and low to sharp, solid and in place. Transform, opacity and filter only.
 * Without motion (or JS) it simply renders at rest.
 */
export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const apply = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 while the block's top is at 98% of the viewport, 1 once it reaches 62%
      const p = clamp01((vh * 0.98 - r.top) / (vh * 0.36))
      el.style.opacity = (0.12 + 0.88 * p).toFixed(3)
      el.style.filter = p >= 1 ? '' : `blur(${((1 - p) * 12).toFixed(1)}px)`
      el.style.translate = p >= 1 ? '' : `0 ${((1 - p) * 36).toFixed(1)}px`
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
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
