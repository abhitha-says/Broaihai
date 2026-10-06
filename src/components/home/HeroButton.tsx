'use client'

import Link from 'next/link'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { ArrowRight } from '@/components/ui/icons'

type Props = {
  /** The CSS module of the hero it sits in. */
  styles: Record<string, string>
  href: string
  label: string
  /** `solid` is the primary action (navy, fills electric blue); `ghost` the secondary (white with a navy hairline, a faint blue wash on hover). */
  variant: 'solid' | 'ghost'
  /** Seconds after the loader lifts before the button rises in. */
  delay: number
  /** Whether the arrow square sits at the end of the label. Without it the button is plain text, padded evenly. */
  arrow?: boolean
}

/**
 * A hero call to action. A mouse pulls it a little toward the pointer, the label
 * rolls up to a copy of itself, and the fill grows out of the arrow square (or in from the
 * right edge when there is no arrow).
 */
export function HeroButton({ styles, href, label, variant, delay, arrow = true }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const pull = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const box = el.getBoundingClientRect()
    const dx = e.clientX - (box.left + box.width / 2)
    const dy = e.clientY - (box.top + box.height / 2)
    el.style.setProperty('--mx', `${(dx * 0.2).toFixed(1)}px`)
    el.style.setProperty('--my', `${(dy * 0.28).toFixed(1)}px`)
  }
  const release = () => {
    ref.current?.style.setProperty('--mx', '0px')
    ref.current?.style.setProperty('--my', '0px')
  }

  return (
    <li className={styles.cta} style={{ '--d': `${delay}s` } as CSSProperties}>
      <Link
        ref={ref}
        href={href}
        className={`${styles.btn} ${variant === 'solid' ? styles.solid : styles.ghost}${arrow ? '' : ` ${styles.plain}`}`}
        onPointerMove={pull}
        onPointerLeave={release}
      >
        <span className={styles.fill} aria-hidden />
        <span className={styles.label}>
          <span className={styles.front}>{label}</span>
          <span className={styles.back} aria-hidden>
            {label}
          </span>
        </span>
        {arrow && (
          <span className={styles.icon} aria-hidden>
            <ArrowRight className={styles.arrow} />
          </span>
        )}
      </Link>
    </li>
  )
}
