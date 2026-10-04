'use client'

import type { StaticImageData } from 'next/image'
import { useEffect, useRef, type CSSProperties } from 'react'
import { whenLoaderDone } from '@/lib/loader'
import card1 from '@/assets/images/hero/cards/card-1.webp'
import card2 from '@/assets/images/hero/cards/card-2.webp'
import card3 from '@/assets/images/hero/cards/card-3.webp'
import card4 from '@/assets/images/hero/cards/card-4.webp'
import card5 from '@/assets/images/hero/cards/card-5.webp'
import styles from './HeroCards.module.css'

type Card = {
  src: StaticImageData
  alt: string
  /** Where the card's body (not its protruding panels) is centred in its picture, 0..1. */
  ax: number
  ay: number
}

/** In the order round the orbit. The artwork carries its own light, perspective and copy. */
const CARDS: Card[] = [
  { src: card1, alt: 'Web Experiences', ax: 0.55, ay: 0.5 },
  { src: card2, alt: 'Mobile Apps', ax: 0.5, ay: 0.5 },
  { src: card3, alt: 'AI Solutions', ax: 0.5, ay: 0.5 },
  { src: card4, alt: 'SaaS Products', ax: 0.52, ay: 0.5 },
  { src: card5, alt: 'Brand and Design', ax: 0.52, ay: 0.5 },
]

/** The card body in the supplied pictures, in pixels of the resized artwork: the unit every card is scaled by. */
const BODY = 650
/** Seconds for one full lap of the whole system. Every card derives from this single clock. */
const PERIOD = 18
/** 0 = constant speed; towards 1 each card lingers longer at the front. */
const DWELL = 0.55
/** The ellipse leans: its right side rides higher than its left. */
const TILT = -0.11
const TAU = Math.PI * 2
const DESKTOP = '(min-width: 1200px)'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3)

/** Orbit progress in cards (0..n) -> eased so each card settles at the front before moving on. */
function stepped(u: number) {
  const k = Math.floor(u)
  const f = u - k
  return k + f - (DWELL * Math.sin(TAU * f)) / TAU
}

/** Where each card first comes in from, as an angle round the orbit it travels to its place. */
const ENTRY = [0.9 * Math.PI, -0.85 * Math.PI, 0.65 * Math.PI, -1.1 * Math.PI, 1.2 * Math.PI]

/*
 * The artwork is a CSS background (see HeroCards.module.css), so a phone or tablet, where the cards
 * are not shown, never downloads it; the imports here only supply each picture's dimensions.
 */

/**
 * The orbiting service cards beside the hero copy (desktop only). One master clock turns the
 * whole system: each card sits at its own angle on a tilted ellipse, and everything about it
 * (position, size, brightness, blur, stacking, lean) is derived from that angle, so a card that
 * comes forward grows, sharpens and lights up while the one leaving recedes. The pointer shifts
 * it a few pixels and scrolling lets it sink back. Decorative, so hidden from assistive tech.
 */
export function HeroCards({ className = '' }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const dishRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current
    const dish = dishRef.current
    const ring = ringRef.current
    if (!stage || !dish || !ring) return
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c)
    const dots = dotRefs.current.filter((d): d is HTMLSpanElement => !!d)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const mq = matchMedia(DESKTOP)
    const n = cards.length

    let teardown: (() => void) | undefined

    const boot = () => {
      let W = stage.clientWidth
      let k = 1
      let rx = 0
      let ry = 0
      const size = () => {
        W = stage.clientWidth
        k = (W * 0.43) / BODY
        rx = W * 0.385
        ry = W * 0.115
        cards.forEach((el, i) => {
          const c = CARDS[i]
          if (!c) return
          const w = c.src.width * k
          const h = c.src.height * k
          el.style.width = `${w}px`
          el.style.height = `${h}px`
          el.style.marginLeft = `${-w * c.ax}px`
          el.style.marginTop = `${-h * c.ay}px`
        })
        ring.style.setProperty('--rrx', `${rx * 1.3}px`)
        ring.style.setProperty('--rry', `${ry * 2.5}px`)
      }
      size()
      const ro = new ResizeObserver(size)
      ro.observe(stage)

      let started = reduced
      let t0 = 0
      let last = 0
      let orbit = 0 // cards travelled so far
      let visible = true
      let raf = 0
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
      const cosT = Math.cos(TILT)
      const sinT = Math.sin(TILT)

      const draw = (te: number) => {
        const u = stepped(((orbit % n) + n) % n)
        cards.forEach((el, i) => {
          // each card arrives on its own schedule: it swings in from its own point on the orbit
          const e = reduced ? 1 : easeOut(clamp01((te - 0.35 - i * 0.14) / 1.6))
          const phi = (TAU * (i - u)) / n + (1 - e) * (ENTRY[i] ?? 0)
          const sin = Math.sin(phi)
          const cos = Math.cos(phi)
          const t = (cos + 1) / 2 // 1 at the front, 0 at the back
          const scale = (0.44 + 0.56 * Math.pow(t, 2.3)) * (0.88 + 0.12 * e)
          const gx = rx * sin
          const gy = ry * cos
          const x = gx * cosT - gy * sinT + pointer.x * (2 + 6 * t)
          const y = gx * sinT + gy * cosT + pointer.y * (1 + 4 * t)
          const rotY = -sin * 7
          const rotZ = sin * 1.6
          el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`
          el.style.zIndex = String(Math.round(cos * 100) + 100)
          el.style.opacity = ((0.55 + 0.45 * Math.pow(t, 0.8)) * clamp01(e * 1.4)).toFixed(3)
          el.style.filter = `blur(${(Math.pow(1 - t, 2) * 2).toFixed(2)}px) brightness(${(0.74 + 0.26 * t).toFixed(3)})`
          el.style.setProperty('--hi', (t * t).toFixed(3))
        })
        // two lights run the ring, tied to the same clock
        const a = -(orbit / n) * TAU + 0.9
        dots.forEach((d, i) => {
          const ang = a + i * Math.PI
          d.style.transform = `translate3d(${(rx * 1.3 * Math.cos(ang)).toFixed(1)}px, ${(ry * 2.5 * Math.sin(ang)).toFixed(1)}px, 0)`
        })
      }

      const scrollEase = () => {
        const s = clamp01(window.scrollY / (window.innerHeight * 0.75))
        dish.style.transform = `translate3d(${(pointer.x * 0.6).toFixed(2)}px, ${(pointer.y * 0.6 - s * 30).toFixed(2)}px, 0) scale(${(1 - s * 0.12).toFixed(4)})`
        dish.style.opacity = String(1 - s * 0.6)
      }

      const frame = (now: number) => {
        raf = 0
        if (!started || !visible || document.hidden) return
        // the entrance clock starts on the first frame drawn, in step with the page's own entrance
        // animations (a tab opened in the background draws nothing until it is shown)
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
    }

    // the cards exist only on the desktop layout; resizing across the breakpoint starts or stops them
    const sync = () => {
      teardown?.()
      teardown = mq.matches ? boot() : undefined
    }
    sync()
    mq.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      teardown?.()
    }
  }, [])

  return (
    <div ref={stageRef} className={`${styles.stage} ${className}`} aria-hidden>
      <div ref={dishRef} className={styles.dish}>
        <span className={styles.glow} />
        <div ref={ringRef} className={styles.ring}>
          <span className={styles.arc} />
          <span className={`${styles.arc} ${styles.arcInner}`} />
          {[0, 1].map((i) => (
            <span
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el
              }}
              className={styles.dot}
            />
          ))}
        </div>
        {CARDS.map((c, i) => (
          <div
            key={c.alt}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className={styles.card}
            style={{ '--i': i } as CSSProperties}
          >
            <span className={`${styles.art} ${styles[`art${i + 1}`]}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
