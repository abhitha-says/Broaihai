'use client'

import { useCallback, useEffect, useRef } from 'react'
import { capabilitiesIntro } from '@/content/home'
import { capabilities } from '@/content/capabilities'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { scrollToY } from '@/components/layout/SmoothScroll'
import { useReducedMotion } from '@/lib/hooks'
import { clamp01, useScrollFrame } from '@/lib/scroll'
import styles from './Capabilities.module.css'

/*
 * One master progress p (0 at the top of the track, 1 at the bottom) becomes a
 * continuous layer index `a` (0 = first service, 5 = last). Everything on screen
 * is a function of `a` alone:
 *
 *   plate i   pulled out along the screen's horizontal and turned to the accent
 *             by lift(i - a) = 1 - |i - a|, so two plates share the move mid-way
 *   copy i    fades and drifts by the same distance from `a`
 *   nav item  lit for the nearest index
 *
 * `a` rests on whole numbers for part of every step (DWELL) so each service has
 * a moment on screen, and eases between them. Scrolling back replays it exactly.
 */
const COUNT = capabilities.length
const DWELL = 0.16

const smooth = (t: number) => t * t * (3 - 2 * t)

/** Scroll progress through the track -> layer index. */
function layerAt(p: number) {
  const raw = clamp01(p) * (COUNT - 1)
  const whole = Math.min(Math.floor(raw), COUNT - 2)
  const f = clamp01((raw - whole - DWELL) / (1 - 2 * DWELL))
  return whole + smooth(f)
}

export function Capabilities() {
  const reduced = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const plates = useRef<(HTMLDivElement | null)[]>([])
  const copies = useRef<(HTMLDivElement | null)[]>([])
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const last = useRef({ a: -1, near: -1 })

  const apply = useCallback((a: number) => {
    if (Math.abs(a - last.current.a) < 0.0005) return
    last.current.a = a
    for (let i = 0; i < COUNT; i++) {
      const r = i - a
      const lift = Math.max(0, 1 - Math.abs(r))
      const plate = plates.current[i]
      if (plate) {
        plate.style.setProperty('--b', lift.toFixed(4))
        plate.style.setProperty('--act', Math.pow(lift, 0.8).toFixed(4))
      }
      const copy = copies.current[i]
      if (copy) {
        const o = smooth(clamp01(1 - Math.abs(r) * 1.7))
        copy.style.opacity = o.toFixed(3)
        copy.style.transform = `translate3d(0, ${(r * 40).toFixed(2)}px, 0)`
        copy.style.visibility = o < 0.01 ? 'hidden' : 'visible'
      }
    }
    const near = Math.round(a)
    if (near !== last.current.near) {
      last.current.near = near
      tabs.current.forEach((tab, i) => {
        if (!tab) return
        if (i === near) tab.setAttribute('aria-current', 'true')
        else tab.removeAttribute('aria-current')
      })
    }
  }, [])

  const frame = useCallback(() => {
    const el = track.current
    if (!el) return
    const range = Math.max(1, el.offsetHeight - window.innerHeight)
    apply(layerAt(-el.getBoundingClientRect().top / range))
  }, [apply])

  useScrollFrame(frame, !reduced)

  // reduced motion: no pinned track, the navigation picks the layer directly
  useEffect(() => {
    if (reduced) apply(0)
  }, [reduced, apply])

  const goTo = (index: number) => {
    const el = track.current
    if (!el) return
    if (reduced) {
      apply(index)
      return
    }
    const range = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    scrollToY(top + (index / (COUNT - 1)) * range)
  }

  return (
    <section id="capabilities" className={styles.band}>
      <div ref={track} className={styles.track} data-live={!reduced}>
        <div className={styles.stage}>
          <div className={styles.left}>
            <div className={styles.intro}>
              <p className={styles.kicker}>
                <span className={styles.square} aria-hidden />
                <span>
                  <span className={styles.bracket}>[</span> {capabilitiesIntro.label} <span className={styles.bracket}>]</span>
                </span>
              </p>
              <h2 className={styles.headline}>
                {capabilitiesIntro.lines.map((line, i) => (
                  <span key={line} className={i === capabilitiesIntro.lines.length - 1 ? styles.accent : undefined}>
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            <div className={styles.detail}>
              {capabilities.map((item, i) => (
                <div
                  key={item.name}
                  ref={(el) => {
                    copies.current[i] = el
                  }}
                  className={styles.copy}
                  style={i === 0 ? undefined : { opacity: 0, visibility: 'hidden' }}
                >
                  <p className={styles.count}>
                    <span className={styles.accentText}>{item.number}</span> / {String(COUNT).padStart(2, '0')}
                  </p>
                  <h3 className={styles.title}>{item.name}</h3>
                  <p className={styles.description}>{item.description}</p>
                  <p className={styles.metric}>
                    <span className={styles.value}>{item.metric.value}</span>
                    <span className={styles.metricLabel}>{item.metric.label}</span>
                  </p>
                  <ul className={styles.tags}>
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <span className={styles.bracket}>[</span> {tag} <span className={styles.bracket}>]</span>
                      </li>
                    ))}
                  </ul>
                  <ArrowButton href={capabilitiesIntro.cta.href} className={styles.cta}>
                    {capabilitiesIntro.cta.label}
                  </ArrowButton>
                </div>
              ))}
            </div>

            <nav className={styles.nav} aria-label="Services">
              <ul>
                {capabilities.map((item, i) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      ref={(el) => {
                        tabs.current[i] = el
                      }}
                      aria-current={i === 0 ? 'true' : undefined}
                      onClick={() => goTo(i)}
                    >
                      <span className={styles.navNumber}>{item.number}</span>
                      <span className={styles.navName}>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.scene} aria-hidden>
            <div className={styles.wrap}>
              <div className={styles.stack}>
                {capabilities.map((item, i) => (
                  <div
                    key={item.name}
                    ref={(el) => {
                      plates.current[i] = el
                    }}
                    className={styles.plate}
                    style={{ '--i': i, '--b': i === 0 ? 1 : 0, '--act': i === 0 ? 1 : 0 } as React.CSSProperties}
                  >
                    <div className={styles.faceX} />
                    <div className={styles.faceY} />
                    <div className={styles.top}>
                      <span className={styles.grid} />
                      <span className={styles.plateNumber}>{item.number}</span>
                      <span className={styles.plateName}>
                        {item.plate.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
