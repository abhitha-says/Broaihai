'use client'

import { useEffect, useRef, useState } from 'react'
import { useHydrated, useReducedMotion } from '@/lib/hooks'
import styles from './Counter.module.css'

const DURATION_MS = 1600
const STAGGER_MS = 100
/** Motion's easeInOut. */
const easeInOut = (t: number) => {
  // cubic-bezier(0.42, 0, 0.58, 1), solved for x by Newton's method
  let x = t
  for (let i = 0; i < 6; i++) {
    const bx = 3 * 0.42 * x * (1 - x) ** 2 + 3 * 0.58 * x ** 2 * (1 - x) + x ** 3 - t
    const dx = 3 * 0.42 * (1 - x) ** 2 + 6 * (0.58 - 0.42) * x * (1 - x) + 3 * (1 - 0.58) * x ** 2
    if (Math.abs(dx) < 1e-6) break
    x -= bx / dx
  }
  return 3 * x ** 2 * (1 - x) + x ** 3
}

/**
 * A number whose digits roll up from 0 the first time it is half in view.
 * Each digit starts 0.1s after the one before it. The server renders the final
 * value, so it reads correctly without JS.
 */
export function Counter({ value, prefix = '' }: { value: string; prefix?: string }) {
  const targets = value.split('').map((d) => Number(d))
  const hydrated = useHydrated()
  const reduced = useReducedMotion()
  // null until the roll starts; once JS is running the digits wait at 0 until then
  const [rolled, setRolled] = useState<number[] | null>(null)
  const ref = useRef<HTMLSpanElement>(null)
  const digits = !hydrated || reduced ? targets : (rolled ?? targets.map(() => 0))

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const goal = value.split('').map((d) => Number(d))
    let frame = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const next = goal.map((g, i) => g * easeInOut(Math.min(1, Math.max(0, (now - start - i * STAGGER_MS) / DURATION_MS))))
          setRolled(next)
          if (now - start < DURATION_MS + STAGGER_MS * goal.length) frame = requestAnimationFrame(tick)
          else setRolled(goal)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, reduced])

  return (
    <span ref={ref} className={styles.counter}>
      <span className="sr-only">{prefix + value}</span>
      <span className={styles.prefix} aria-hidden>
        {prefix}
      </span>
      <span className={styles.digits} aria-hidden>
        {digits.map((v, i) => {
          const whole = Math.floor(v)
          const frac = v - whole
          return (
            <span key={i} className={styles.digit}>
              <span className={styles.face} style={{ translate: `0 ${-frac * 100}%` }}>
                {whole % 10}
              </span>
              {frac > 0 && (
                <span className={styles.face} style={{ translate: `0 ${(1 - frac) * 100}%` }}>
                  {(whole + 1) % 10}
                </span>
              )}
            </span>
          )
        })}
      </span>
    </span>
  )
}
