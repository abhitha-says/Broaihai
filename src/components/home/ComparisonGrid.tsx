'use client'

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react'
import { useReducedMotion } from '@/lib/hooks'
import styles from './Difference.module.css'

/*
 * One master timeline drives the whole comparison. Scroll position becomes a single
 * progress P (0 to 1) per panel, eased toward each frame so it settles like a spring,
 * and every title, pill and glow is a pure function of P. Nothing is timed on a clock,
 * so scrolling back up reverses the sequence exactly.
 *
 * Wide screens pin the grid for a short run while P plays out; phones (and tablets too
 * short to hold the stage) let each panel play against its own pass through the viewport.
 *
 * The two panels tell the story: the typical agency arrives heavy and unevenly spaced,
 * slow off the mark, its tilt settling a beat after its position; Bro AI arrives on an
 * even beat, quick and in step, with the smallest overshoot.
 */

type Beat = { dx: number; dy: number; rot: number }
type Personality = {
  title: [start: number, len: number]
  /** When each pill's window opens, and how long it lasts, in P. */
  starts: number[]
  len: number
  beats: Beat[]
  scale0: number
  blur: number
  /** The pill's position curve, 0 to 1 (may overshoot a hair past 1). */
  curve: (t: number) => number
  /** How far the tilt trails the position. */
  rotLag: number
  /** How hard each arrival shoves the pills already in place, in px. */
  shove: [near: number, far: number]
}

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n))
const outCubic = (t: number) => 1 - (1 - t) ** 3
const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const inOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const backOut = (t: number, c: number) => 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2
const bump = (t: number) => Math.sin(Math.PI * clamp(t))

const PERSONALITY: Record<'typical' | 'broAi', Personality> = {
  typical: {
    title: [0, 0.1],
    starts: [0.13, 0.3, 0.41, 0.59, 0.71],
    len: 0.24,
    beats: [
      { dx: -70, dy: -44, rot: -10 },
      { dx: 84, dy: 54, rot: 11 },
      { dx: 0, dy: -104, rot: 8 },
      { dx: -92, dy: 64, rot: -9 },
      { dx: 76, dy: 36, rot: 12 },
    ],
    scale0: 0.88,
    blur: 8,
    curve: (t) => backOut(inOutCubic(t), 0.22),
    rotLag: 0.22,
    shove: [4.5, 2],
  },
  broAi: {
    title: [0.04, 0.1],
    starts: [0.16, 0.29, 0.42, 0.55, 0.68],
    len: 0.17,
    beats: [
      { dx: -44, dy: -56, rot: -7 },
      { dx: 58, dy: 34, rot: 7 },
      { dx: 0, dy: -72, rot: -8 },
      { dx: -52, dy: 46, rot: 7 },
      { dx: 40, dy: 58, rot: -7 },
    ],
    scale0: 0.92,
    blur: 5,
    curve: (t) => backOut(inOutSine(t), 0.85),
    rotLag: 0.06,
    shove: [3, 1.5],
  },
}

/*
 * Desktop always pins. A tablet pins in landscape, where the stage has the shape for it; in
 * portrait the two panels flow side by side instead and play together on their shared pass.
 */
const STAGE_QUERY =
  '(min-width: 1200px) and (prefers-reduced-motion: no-preference), (min-width: 768px) and (min-height: 600px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)'
const PIN_TOP = 96

function subscribeStage(onChange: () => void) {
  const mq = matchMedia(STAGE_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function apply(panel: HTMLElement, p: number, k: number, tilt: number) {
  const key = panel.dataset.panel as 'typical' | 'broAi'
  const m = PERSONALITY[key]
  const pills = panel.querySelectorAll<HTMLElement>('[data-pill]')
  const t = Array.from(pills, (_, i) => clamp((p - m.starts[i]!) / m.len))

  const title = panel.querySelector<HTMLElement>('[data-title]')
  if (title) {
    const tt = outCubic(clamp((p - m.title[0]) / m.title[1]))
    title.style.clipPath = `inset(0 0 ${((1 - tt) * 115).toFixed(1)}% 0)`
    title.style.translate = `0 ${((1 - tt) * 16).toFixed(2)}px`
    title.style.opacity = tt.toFixed(3)
  }

  let pulse = 0
  pills.forEach((el, i) => {
    const drop = el.firstElementChild as HTMLElement
    const ti = t[i]!
    const beat = m.beats[i]!
    const pos = m.curve(ti)
    const rpos = m.curve(clamp((ti - m.rotLag) / (1 - m.rotLag)))

    // the next two arrivals shove this pill away from where they come from, then it eases home
    let nx = 0
    let ny = 0
    for (let j = i + 1; j <= i + 2 && j < pills.length; j++) {
      const bj = m.beats[j]!
      const amp = m.shove[j - i - 1]! * bump(t[j]!)
      ny += -Math.sign(bj.dy) * amp
      nx += -Math.sign(bj.dx) * amp * 0.5
    }
    if (el.dataset.tone === 'accent' || key === 'typical') pulse += bump(ti) * (i === pills.length - 1 ? 1 : 0.55)

    if (ti >= 1 && nx === 0 && ny === 0) {
      drop.style.transform = ''
      drop.style.opacity = ''
      drop.style.filter = ''
      return
    }
    const x = beat.dx * (1 - pos) * k + nx * k
    const y = beat.dy * (1 - pos) * k + ny * k
    const r = beat.rot * (1 - rpos) * tilt
    const s = m.scale0 + (1 - m.scale0) * pos
    const o = outCubic(clamp(ti / 0.5))
    const blur = (1 - clamp(ti / 0.7)) ** 2 * m.blur
    drop.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`
    drop.style.opacity = o.toFixed(3)
    drop.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : ''
  })
  panel.style.setProperty('--pulse', clamp(pulse).toFixed(3))
  panel.style.setProperty('--p', p.toFixed(4))
  panel.toggleAttribute('data-done', p >= 0.97)
}

function reset(panel: HTMLElement) {
  panel.querySelectorAll<HTMLElement>('[data-pill]').forEach((el) => {
    const drop = el.firstElementChild as HTMLElement
    drop.style.transform = drop.style.opacity = drop.style.filter = ''
  })
  const title = panel.querySelector<HTMLElement>('[data-title]')
  if (title) title.style.clipPath = title.style.translate = title.style.opacity = ''
  panel.style.removeProperty('--pulse')
  panel.style.removeProperty('--p')
  panel.removeAttribute('data-done')
}

export function ComparisonGrid({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const pinned = useSyncExternalStore(
    subscribeStage,
    () => matchMedia(STAGE_QUERY).matches,
    () => false,
  )
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const trackEl = track.current
    const stageEl = stage.current
    if (!trackEl || !stageEl) return
    const panels = Array.from(stageEl.querySelectorAll<HTMLElement>('[data-panel]'))
    if (reduced) {
      panels.forEach(reset)
      return
    }
    let raf = 0
    let visible = false

    const frame = () => {
      raf = 0
      const vh = window.innerHeight
      const rect = trackEl.getBoundingClientRect()
      const runLen = Math.max(1, trackEl.offsetHeight - stageEl.offsetHeight)
      const pre = vh * 0.4
      const shared = clamp((PIN_TOP - rect.top + pre) / (runLen + pre))
      let moving = false
      panels.forEach((panel) => {
        let target = shared
        if (!pinned) {
          const r = panel.getBoundingClientRect()
          target = clamp((vh * 0.92 - r.top) / (r.height * 0.9 + vh * 0.25))
        }
        // the first frame lands where the scroll already is, so a reload mid-page doesn't replay
        const prev = panel.dataset.sp === undefined ? target : Number(panel.dataset.sp)
        // then ease toward the scroll position so the motion settles instead of tracking it step for step
        const next = Math.abs(target - prev) < 0.0006 ? target : prev + (target - prev) * 0.16
        if (next !== target) moving = true
        panel.dataset.sp = String(next)
        const width = panel.clientWidth
        const k = pinned ? clamp(width / 760, 0.5, 1) : clamp(width / 760, 0.35, 0.7)
        apply(panel, next, k, pinned ? 1 : 0.6)
      })
      if (moving) raf = requestAnimationFrame(frame)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const now = !!entry?.isIntersecting
        if (now === visible) return
        visible = now
        if (now) {
          schedule()
          addEventListener('scroll', schedule, { passive: true })
          addEventListener('resize', schedule)
        } else {
          removeEventListener('scroll', schedule)
          removeEventListener('resize', schedule)
        }
      },
      { rootMargin: '25% 0px 25% 0px' },
    )
    io.observe(trackEl)
    schedule()
    return () => {
      io.disconnect()
      removeEventListener('scroll', schedule)
      removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
      panels.forEach((panel) => {
        delete panel.dataset.sp
        reset(panel)
      })
    }
  }, [reduced, pinned])

  return (
    <div ref={track} className={styles.track} data-mode={reduced ? 'static' : pinned ? 'pin' : 'flow'}>
      <div ref={stage} className={styles.grid}>
        {children}
      </div>
    </div>
  )
}
