'use client'

import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './Ticker.module.css'

type Props = {
  children: ReactNode
  /** Pixels per second, as Framer's ticker measures speed. */
  speed: number
  direction?: 'left' | 'right'
  gap: number
  className?: string
}

/**
 * An endless marquee. The items are repeated until two widths of the viewport are
 * covered, then the whole track slides by exactly one set and loops, so the seam
 * never shows. Speed is constant in px/s whatever the content width.
 * Pauses while offscreen and stands still for reduced motion.
 */
export function Ticker({ children, speed, direction = 'left', gap, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLLIElement>(null)
  const [setWidth, setSetWidth] = useState(0)
  const [copies, setCopies] = useState(2)
  const [visible, setVisible] = useState(true)
  const items = Children.toArray(children)

  useEffect(() => {
    const root = rootRef.current
    const first = setRef.current
    if (!root || !first) return
    const measure = () => {
      // one set = its items plus the gap that follows each of them
      const width = first.getBoundingClientRect().width + gap
      setSetWidth(width)
      setCopies(Math.max(2, Math.ceil(root.clientWidth / width) + 1))
    }
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    ro.observe(first)
    const io = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true))
    io.observe(root)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [gap])

  const style = {
    '--ticker-gap': `${gap}px`,
    '--ticker-distance': `${setWidth}px`,
    '--ticker-duration': setWidth ? `${setWidth / speed}s` : '0s',
  } as CSSProperties

  return (
    <div ref={rootRef} className={`${styles.ticker} ${className ?? ''}`} style={style}>
      <ul
        className={styles.track}
        data-ticker-track
        data-direction={direction}
        data-running={setWidth > 0 && visible}
      >
        {Array.from({ length: copies }, (_, copy) => (
          <li key={copy} ref={copy === 0 ? setRef : undefined} className={styles.set} aria-hidden={copy > 0 || undefined}>
            {items}
          </li>
        ))}
      </ul>
    </div>
  )
}
