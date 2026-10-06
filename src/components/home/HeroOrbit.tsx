'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import type { HeroCard } from '@/content/types'
import { whenLoaderDone } from '@/lib/loader'
import styles from './HeroOrbit.module.css'

/** Seconds for one full lap. Everything on screen derives from this one clock. */
const PERIOD = 18
/** 0 = constant speed; towards 1 each card lingers longer at the front. */
const DWELL = 0.55
/** The ellipse leans a little: its right side rides higher than its left. */
const TILT = -0.07
const TAU = Math.PI * 2
/** The ring (and the blue point on it) is a wider ellipse than the one the cards' centres follow. */
const RING_X = 1.2
const RING_Y = 2.6

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3)

/** Orbit progress in cards (0..n) -> eased, so each card settles at the front before the next comes round. */
function stepped(u: number) {
  const k = Math.floor(u)
  const f = u - k
  return k + f - (DWELL * Math.sin(TAU * f)) / TAU
}

/** Where each card first comes in from: an angle round the orbit that it travels to reach its place. */
const ENTRY = [0.9 * Math.PI, -0.85 * Math.PI, 0.65 * Math.PI, -1.1 * Math.PI, 1.2 * Math.PI]

/** The little line drawing in each card's corner: rounded, monoline, one blue accent each. */
function Glyph({ id }: { id: HeroCard['glyph'] }) {
  const common = { viewBox: '0 0 48 48', fill: 'none', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', className: styles.glyph } as const
  switch (id) {
    case 'product':
      return (
        <svg {...common}>
          <rect x="8" y="8" width="14" height="14" rx="4" />
          <rect x="26" y="8" width="14" height="14" rx="4" />
          <rect x="8" y="26" width="14" height="14" rx="4" />
          <rect x="26" y="26" width="14" height="14" rx="4" className={styles.fill} />
        </svg>
      )
    case 'ai':
      return (
        <svg {...common}>
          <path d="M24 24 10 12M24 24l14-12M24 24v16" />
          <circle cx="10" cy="12" r="3.4" />
          <circle cx="38" cy="12" r="3.4" />
          <circle cx="24" cy="40" r="3.4" />
          <circle cx="24" cy="24" r="5.6" className={styles.fill} />
        </svg>
      )
    case 'web':
      return (
        <svg {...common}>
          <rect x="6" y="9" width="36" height="30" rx="6" />
          <path d="M6 18h36M13 27h14M13 33h22" />
          <circle cx="12" cy="13.5" r="1.4" className={styles.fill} />
          <circle cx="17" cy="13.5" r="1.4" />
          <circle cx="22" cy="13.5" r="1.4" />
        </svg>
      )
    case 'mobile':
      return (
        <svg {...common}>
          <rect x="14" y="6" width="20" height="36" rx="6" />
          <path d="M21 10.5h6M19 20h10M19 25h6" />
          <circle cx="24" cy="36" r="2" className={styles.fill} />
        </svg>
      )
    case 'automation':
      return (
        <svg {...common}>
          <path d="M10 22A14 14 0 0 1 36 16M36 9v7h-7M38 26A14 14 0 0 1 12 32M12 39v-7h7" />
          <circle cx="24" cy="24" r="3.2" className={styles.fill} />
        </svg>
      )
  }
}

/**
 * The cards that circle beside the hero copy. One master clock turns the whole system: each card
 * sits at its own angle on a tilted ellipse, and everything about it (position, size, opacity,
 * blur, stacking, lean, how brightly its blue edge burns) is derived from that angle, so the card
 * coming forward grows, sharpens and lights up while the one leaving recedes. A blue point runs
 * the ring on the same clock and a row of ticks says which card is in front. The pointer shifts
 * the system a few pixels and scrolling lets it sink. Decorative, so hidden from assistive tech.
 */
export function HeroOrbit({ cards, className = '' }: { cards: HeroCard[]; className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const dishRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRef = useRef<HTMLSpanElement>(null)
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current
    const dish = dishRef.current
    const dot = dotRef.current
    if (!stage || !dish || !dot) return
    const els = cardRefs.current.filter((c): c is HTMLDivElement => !!c)
    const ticks = tickRefs.current.filter((t): t is HTMLSpanElement => !!t)
    const n = els.length
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    let rx = 0
    let ry = 0
    const size = () => {
      const W = stage.clientWidth
      const narrow = W < 520
      const cw = narrow ? W * 0.68 : Math.min(W * 0.585, 450)
      rx = narrow ? W * 0.2 : W * 0.3
      ry = narrow ? W * 0.07 : W * 0.085
      stage.style.setProperty('--cw', `${cw.toFixed(1)}px`)
      stage.style.setProperty('--ch', `${(cw * (narrow ? 0.66 : 0.63)).toFixed(1)}px`)
      stage.style.setProperty('--rx', `${(rx * RING_X).toFixed(1)}px`)
      stage.style.setProperty('--ry', `${(ry * RING_Y).toFixed(1)}px`)
    }
    size()
    const ro = new ResizeObserver(() => {
      size()
      if (!raf) draw(started ? 99 : 0)
    })
    ro.observe(stage)

    let started = reduced
    let t0 = 0
    let last = 0
    let orbit = 0 // cards travelled so far
    let visible = true
    let raf = 0
    let front = -1
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const cosT = Math.cos(TILT)
    const sinT = Math.sin(TILT)

    const place = (phi: number, kx = 1, ky = 1) => {
      const gx = rx * kx * Math.sin(phi)
      const gy = ry * ky * Math.cos(phi)
      return { x: gx * cosT - gy * sinT, y: gx * sinT + gy * cosT }
    }

    const draw = (te: number) => {
      const u = stepped(((orbit % n) + n) % n)
      els.forEach((el, i) => {
        // each card arrives on its own schedule, swinging in from its own point on the orbit
        const e = reduced ? 1 : easeOut(clamp01((te - 0.3 - i * 0.13) / 1.5))
        const phi = (TAU * (i - u)) / n + (1 - e) * (ENTRY[i % ENTRY.length] ?? 0)
        const sin = Math.sin(phi)
        const cos = Math.cos(phi)
        const t = (cos + 1) / 2 // 1 at the front, 0 at the back
        const scale = (0.5 + 0.5 * Math.pow(t, 2.2)) * (0.9 + 0.1 * e)
        const p = place(phi)
        const x = p.x + pointer.x * (1 + 5 * t)
        const y = p.y + pointer.y * (1 + 3 * t)
        const blur = Math.pow(1 - t, 2) * 3
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) perspective(1400px) rotateY(${(-sin * 16).toFixed(2)}deg) scale(${scale.toFixed(4)})`
        el.style.zIndex = String(Math.round(cos * 100) + 100)
        // cards stay opaque (so one never shows through another); depth is a wash of white laid over the far ones
        el.style.opacity = clamp01(e * 1.4).toFixed(3)
        el.style.setProperty('--fog', (Math.pow(1 - t, 1.15) * 0.62).toFixed(3))
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
        el.style.setProperty('--hi', (t * t).toFixed(3))
      })
      // the blue point rides the ring on the same clock, halfway between one card and the next
      const phiDot = (TAU * (0.5 - u)) / n
      const d = place(phiDot, RING_X, RING_Y)
      dot.style.transform = `translate3d(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px, 0)`
      dot.style.zIndex = String(Math.round(Math.cos(phiDot) * 100) + 96)
      // which card is in front
      const now = Math.round(u) % n
      if (now !== front) {
        front = now
        ticks.forEach((tick, i) => (i === now ? tick.setAttribute('data-on', '') : tick.removeAttribute('data-on')))
      }
    }

    const scrollEase = () => {
      const s = clamp01(window.scrollY / (window.innerHeight * 0.75))
      dish.style.transform = `translate3d(${(pointer.x * 0.5).toFixed(2)}px, ${(pointer.y * 0.5 - s * 28).toFixed(2)}px, 0) scale(${(1 - s * 0.1).toFixed(4)})`
      dish.style.opacity = String(1 - s * 0.6)
    }

    const frame = (now: number) => {
      raf = 0
      if (!started || !visible || document.hidden) return
      // the entrance clock starts on the first frame drawn, in step with the page's own entrance
      // (a tab opened in the background draws nothing until it is shown)
      if (!t0) t0 = now
      if (!last) last = now
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const te = (now - t0) / 1000
      // the clock gathers speed from rest as the system comes online
      const ramp = easeOut(clamp01((te - 1.2) / 2.2))
      orbit += (dt / PERIOD) * n * ramp
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      draw(te)
      scrollEase()
      raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      if (!raf && started && visible && !document.hidden && !reduced) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2 * 8
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2 * 5
    }
    const onScroll = () => {
      if (reduced || !raf) scrollEase()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      if (visible) kick()
    })
    io.observe(stage)

    const cancelWait = whenLoaderDone(() => {
      started = true
      if (reduced) {
        draw(10)
        scrollEase()
      } else kick()
    })
    if (reduced) draw(10)

    document.addEventListener('visibilitychange', kick)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelWait()
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', kick)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div ref={stageRef} className={`${styles.stage} ${className}`} aria-hidden>
      <div ref={dishRef} className={styles.dish}>
        <span className={styles.glow} />
        <span className={styles.ring} />
        <span ref={dotRef} className={styles.dot} />
        {cards.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className={styles.card}
            style={{ '--i': i } as CSSProperties}
          >
            <div className={styles.top}>
              <span className={styles.number}>{card.number}</span>
              <Glyph id={card.glyph} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.line}>{card.line}</p>
            </div>
          </div>
        ))}
        <div className={styles.progress}>
          {cards.map((card, i) => (
            <span
              key={card.title}
              ref={(el) => {
                tickRefs.current[i] = el
              }}
              className={styles.tick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
