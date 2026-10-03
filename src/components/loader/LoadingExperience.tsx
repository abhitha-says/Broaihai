'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { site } from '@/content/site'
import { useReducedMotion } from '@/lib/hooks'
import styles from './LoadingExperience.module.css'

/**
 * Opening sequence, played once per full page load (the root layout never
 * remounts on client navigation, so page transitions don't replay it).
 *
 * A line-drawn laptop on a pedestal is sketched in, its screen switches on,
 * the camera dives into the screen, then five columns lift away to reveal the
 * page. Phases are cumulative classes so each CSS transition keeps its end
 * state while later phases layer on.
 *
 *   INITIAL → LAPTOP_ENTER → LAPTOP_SETTLE → SCREEN_LOAD → HERO_REVEAL → COMPLETE
 */
type Phase = 'initial' | 'enter' | 'settle' | 'screen' | 'reveal' | 'complete'

const ORDER: Phase[] = ['initial', 'enter', 'settle', 'screen', 'reveal', 'complete']

// ms from mount at which each phase begins
const AT = { settle: 1000, screen: 2500, reveal: 5000, complete: 6700, release: 7400 }

const PATHS = [
  'M142 18 L378 36 L348 239 L115 217 Z', // lid
  'M153 31 L366 47 L338 227 L128 208 Z', // screen bezel
  'M115 217 L348 239 L287 279 L53 251 Z', // keyboard deck
  'M53 251 L53 261 L287 289 L287 279 M287 289 L348 249 L348 239', // deck edge
  'M2 285 A198 40 0 0 0 398 285 M2 285 A198 40 0 0 1 52 258 M348 258 A198 40 0 0 1 398 285', // cap top
  'M2 285 L2 305 M398 285 L398 305 M2 305 A198 40 0 0 0 398 305', // cap edge
  'M42 329 L42 640 M358 329 L358 640 M42 640 A158 36 0 0 0 358 640', // column
  'M2 668 L2 688 M398 668 L398 688 M2 668 A198 40 0 0 0 398 668 M2 688 A198 40 0 0 0 398 688 M2 668 A198 40 0 0 1 42 644 M358 644 A198 40 0 0 1 398 668', // base
]
const SCREEN = 'M153 31 L366 47 L338 227 L128 208 Z'

const LABELS = {
  left: ['A CREATIVE STUDIO FOR', 'UNFORGETTABLE EXPERIENCES'],
  right: ['STRATEGY AND DESIGN', 'CRAFTED WITH TECHNOLOGY'],
}

const vars = (v: Record<string, number>) => v as unknown as CSSProperties

export function LoadingExperience() {
  const reducedMotion = useReducedMotion()
  // the loader only loads the home hero; every other page opens straight in
  const pathname = usePathname()
  // and only on a full load that lands on the home page, never when navigating back to it
  const [landedOn] = useState(pathname)
  const reduced = reducedMotion || pathname !== '/' || landedOn !== '/'
  const [phase, setPhase] = useState<Phase>('initial')
  const rootRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<SVGPathElement>(null)
  const rigRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const html = document.documentElement
    const finish = () => html.classList.remove('is-loading', 'is-revealing')

    if (reduced) {
      finish()
      return
    }

    const timers: number[] = []
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))

    // Aim the dive: put the screen's centre at the viewport centre and scale
    // until its bezel covers the viewport.
    const aim = () => {
      const root = rootRef.current
      const screen = screenRef.current
      const rig = rigRef.current
      if (!root || !screen || !rig) return
      const s = screen.getBoundingClientRect()
      const r = rig.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const cx = s.left + s.width / 2
      const cy = s.top + s.height / 2
      const scale = Math.max(vw / (s.width * 0.8), vh / (s.height * 0.8)) * 1.08
      root.style.setProperty('--ox', `${cx - r.left}px`)
      root.style.setProperty('--oy', `${cy - r.top}px`)
      root.style.setProperty('--dx', `${vw / 2 - cx}px`)
      root.style.setProperty('--dy', `${vh / 2 - cy}px`)
      root.style.setProperty('--s', String(scale))
    }

    // Dev-only: ?loader=hold:<phase> freezes the sequence at that phase.
    const hold =
      process.env.NODE_ENV !== 'production'
        ? new URLSearchParams(window.location.search).get('loader')?.replace('hold:', '')
        : null
    const clear = () => timers.forEach(clearTimeout)
    if (hold && rootRef.current) rootRef.current.style.animation = 'none'

    at(0, () => setPhase('enter'))
    if (hold === 'enter') return clear
    at(AT.settle, () => setPhase('settle'))
    if (hold === 'settle') return clear
    at(AT.screen - 50, aim)
    at(AT.screen, () => setPhase('screen'))
    if (hold === 'screen') return clear
    at(AT.reveal, () => {
      setPhase('reveal')
      html.classList.remove('is-loading')
      html.classList.add('is-revealing')
    })
    at(AT.complete, () => setPhase('complete'))
    at(AT.release, finish)

    return () => {
      clear()
      finish()
    }
  }, [reduced])

  if (reduced || phase === 'complete') return null

  const reached = ORDER.indexOf(phase)
  const cls = [styles.loader, ...ORDER.slice(1, reached + 1).map((p) => styles[p])].join(' ')

  return (
    <div ref={rootRef} className={cls} aria-hidden="true">
      <div className={styles.cols}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.col} style={vars({ '--c': i })}>
            <div className={styles.fill} />
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} style={vars({ '--g': i })} />
        ))}
      </div>

      <div className={styles.stage}>
        <div ref={rigRef} className={styles.rig}>
          <svg viewBox="0 0 400 740" fill="none" className={styles.svg}>
            <g className={styles.ghost}>
              {PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <path d={SCREEN} className={styles.screenFill} />
            <path ref={screenRef} d={SCREEN} fill="none" stroke="none" />
            <g className={styles.ink}>
              {PATHS.map((d, i) => (
                <path key={d} d={d} pathLength={1} style={vars({ '--i': i })} />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`${styles.label} ${side === 'left' ? styles.labelL : styles.labelR}`}>
          {LABELS[side].map((t, i) => (
            <span key={t} style={vars({ '--n': t.length, '--l': i })}>
              {t}
            </span>
          ))}
        </div>
      ))}

      <div className={styles.progress} />

      <div className={styles.brand}>
        <span className={styles.mark}>
          <Image src={site.logo.src} alt="" height={44} className={styles.markImage} />
        </span>
        <Image src={site.wordmark.src} alt="" height={44} className={styles.wordmark} />
      </div>
    </div>
  )
}
