'use client'

import { useCallback, useRef } from 'react'
import { process } from '@/content/home'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReducedMotion } from '@/lib/hooks'
import { clamp01, useScrollFrame } from '@/lib/scroll'
import styles from './Process.module.css'

const LAST = process.steps.length - 1

/*
 * One progress p (0 as the list's top reaches 80% of the viewport, 1 half a
 * viewport later, or the list's own height on a phone where it runs downward)
 * becomes a position `a` along the steps, 0 to LAST. Connector i fills by
 * a - i; step i lights once `a` reaches it. Scrolling back replays it exactly.
 * Without motion (or JS) every step renders lit.
 */
export function Process() {
  const reduced = useReducedMotion()
  const list = useRef<HTMLOListElement>(null)
  const last = useRef(-1)

  const frame = useCallback((_: number, vh: number) => {
    const el = list.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const a = clamp01((vh * 0.8 - r.top) / Math.max(vh * 0.5, r.height * 0.9)) * LAST
    if (Math.abs(a - last.current) < 0.001) return
    last.current = a
    el.dataset.live = 'true'
    Array.from(el.children).forEach((step, i) => {
      const s = step as HTMLElement
      s.style.setProperty('--fill', clamp01(a - i).toFixed(4))
      s.dataset.lit = String(a >= i - 0.02)
    })
  }, [])

  useScrollFrame(frame, !reduced)

  return (
    <Section id="how-we-work" className={styles.container}>
      <SectionHeading label={process.label} title={process.title} align="center" className={styles.heading} />
      <ol ref={list} className={styles.steps}>
        {process.steps.map((step, i) => (
          <li key={step.number} className={styles.step}>
            <span className={styles.node} aria-hidden>
              {step.number}
            </span>
            {i < LAST && <span className={styles.rail} aria-hidden />}
            <div className={styles.copy}>
              <h3 className={`t-h4 ${styles.title}`}>{step.title}</h3>
              <p className={`t-body-lg ${styles.body}`}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
