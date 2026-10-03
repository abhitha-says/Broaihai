'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@/components/ui/icons'
import styles from './CursorFollower.module.css'

type Kind = 'see-work' | 'visit'

/**
 * The cursor bubble. Any element marked data-cursor="see-work" (project cards)
 * or data-cursor="visit" (a project page's screen) swaps the native pointer
 * for this 80px disc, centred on the pointer with no lag. Mouse only: touch
 * screens never see it.
 */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)
  const [kind, setKind] = useState<Kind | null>(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let x = -100
    let y = -100
    const place = () => {
      if (ref.current) ref.current.style.translate = `${x - 40}px ${y - 40}px`
    }
    const update = (target: Element | null) => {
      const value = target?.closest('[data-cursor]')?.getAttribute('data-cursor')
      setKind(value === 'see-work' || value === 'visit' ? value : null)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      place()
      update(e.target as Element)
    }
    // content scrolls under a still pointer; re-check what it is over
    const onScroll = () => update(document.elementFromPoint(x, y))
    const onLeave = () => setKind(null)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={styles.cursor} data-active={kind !== null} aria-hidden>
      {kind === 'visit' ? (
        <ArrowRight className={styles.arrow} />
      ) : (
        <span className={`t-body ${styles.label}`}>
          SEE
          <br />
          WORK
        </span>
      )}
    </div>
  )
}
