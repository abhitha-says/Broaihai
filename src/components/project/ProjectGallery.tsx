'use client'

import Image from 'next/image'
import { useEffect, useRef, type ReactNode } from 'react'
import type { DetailedProject, Picture } from '@/content/types'
import { useReducedMotion } from '@/lib/hooks'
import { clamp01 } from '@/lib/scroll'
import styles from './ProjectGallery.module.css'

/**
 * An editorial frame whose reveal is scrubbed by the scroll, not timed: as it
 * rises through the viewport the picture opens like a window (an inset mask
 * easing out to the full frame) while the screen inside settles from 1.16x to
 * 1x and sharpens, and the hairline rule fades in last. Because it follows the
 * scroll it reverses on the way back up and never plays out of sight. `lag`
 * (in viewport heights) holds the later frames back so a row opens in sequence.
 * The eased progress is written to `--p`; with no JS or reduced motion it
 * stays at 1 and the frame simply sits at rest.
 */
function Frame({ className, lag = 0, children }: { className?: string; lag?: number; children: ReactNode }) {
  const frameRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = frameRef.current
    if (!el || reduced) return
    let raf = 0
    const apply = () => {
      raf = 0
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top
      // 0 as the frame's top enters at the bottom edge, 1 once it has risen ~58% of the viewport
      const t = clamp01((vh * 0.98 - top) / (vh * 0.58) - lag)
      const p = 1 - Math.pow(1 - t, 3)
      el.style.setProperty('--p', p.toFixed(4))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      el.style.removeProperty('--p')
    }
  }, [reduced, lag])

  return (
    <figure ref={frameRef} className={`${styles.frame} ${className ?? ''}`}>
      <div className={styles.mask}>
        <div className={styles.media}>
          <div className={styles.settle}>{children}</div>
        </div>
      </div>
    </figure>
  )
}

const style = (p: Picture) => (p.position ? { objectPosition: p.position } : undefined)

/** One wide screen over two half screens. The halves open a beat apart. */
export function ProjectGallery({ project }: { project: DetailedProject }) {
  const [wide, a, b] = project.detail.gallery
  return (
    <section className={styles.section} id="visuals">
      <div className={styles.grid}>
        <Frame className={styles.wide}>
          <Image src={wide.src} alt={wide.alt} fill sizes="(max-width: 809.98px) calc(100vw - 40px), (max-width: 1309.98px) calc(100vw - 60px), 1250px" style={style(wide)} />
        </Frame>
        <Frame className={styles.half} lag={0.06}>
          <Image src={a.src} alt={a.alt} fill sizes="(max-width: 809.98px) calc(100vw - 40px), (max-width: 1309.98px) calc(50vw - 45px), 610px" style={style(a)} />
        </Frame>
        <Frame className={styles.half} lag={0.14}>
          <Image src={b.src} alt={b.alt} fill sizes="(max-width: 809.98px) calc(100vw - 40px), (max-width: 1309.98px) calc(50vw - 45px), 610px" style={style(b)} />
        </Frame>
      </div>
    </section>
  )
}
