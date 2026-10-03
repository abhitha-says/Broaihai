'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { capabilitiesIntro } from '@/content/home'
import { capabilities as services } from '@/content/capabilities'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { scrollToY } from '@/components/layout/SmoothScroll'
import { clamp01, useScrollFrame } from '@/lib/scroll'
import { ServiceDrawing } from './ServiceVisual'
import styles from './Capabilities.module.css'

/*
 * The choreography, all derived from one scroll progress p (0 at the top of the
 * track, 1 at the bottom). The track is LEAD + (N - 1) units long; unit k brings
 * card k up, spending TRANSITION of it moving and the rest holding so each card
 * gets a moment on screen. Cards already in place recede by how many cards have
 * arrived on top of them (their "depth"), so the whole stack moves as one.
 */
const COUNT = services.length
const LEAD = 0.25
const TRANSITION = 0.62
const TOTAL = LEAD + COUNT - 1
const PEEK = 22
const SHRINK = 0.04
const STAGE_QUERY = '(min-width: 810px) and (prefers-reduced-motion: no-preference)'

const smooth = (t: number) => t * t * (3 - 2 * t)

function subscribeStage(onChange: () => void) {
  const mq = matchMedia(STAGE_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/** True where the pinned, scroll-driven stage runs; elsewhere the cards stack in normal flow. */
function useStage() {
  return useSyncExternalStore(
    subscribeStage,
    () => matchMedia(STAGE_QUERY).matches,
    () => false,
  )
}

export function Capabilities() {
  const live = useStage()
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const track = useRef<HTMLDivElement>(null)
  const stack = useRef<HTMLUListElement>(null)
  const cards = useRef<(HTMLLIElement | null)[]>([])
  const fill = useRef<HTMLSpanElement>(null)
  const meter = useRef<HTMLSpanElement>(null)

  const frame = useCallback(() => {
    const trackEl = track.current
    const stackEl = stack.current
    if (!trackEl || !stackEl) return
    const vh = window.innerHeight
    const rect = trackEl.getBoundingClientRect()
    const range = Math.max(1, trackEl.offsetHeight - vh)
    const p = clamp01(-rect.top / range)
    const raw = p * TOTAL
    const travel = vh - stackEl.offsetTop

    // each card's arrival, 0 (below the stage) to 1 (in place); card 0 is there from the start
    const arrival = services.map((_, i) => (i === 0 ? 1 : smooth(clamp01((raw - LEAD - (i - 1)) / TRANSITION))))

    let front = 0
    arrival.forEach((a, i) => {
      if (a > 0.5) front = i
      const el = cards.current[i]
      if (!el) return
      let depth = 0
      for (let j = i + 1; j < COUNT; j++) depth += arrival[j] ?? 0
      const peek = PEEK * Math.min(depth, 3) + PEEK * 0.3 * Math.max(depth - 3, 0)
      const scale = (1 - SHRINK * Math.min(depth, 3) - SHRINK * 0.25 * Math.max(depth - 3, 0)) * (0.965 + 0.035 * a)
      const y = (1 - a) * travel - peek
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
      el.style.opacity = String(clamp01(5 - depth))
      el.style.setProperty('--dim', (Math.min(depth, 4) * 0.045).toFixed(3))
      el.style.visibility = a === 0 ? 'hidden' : 'visible'
    })

    if (fill.current) fill.current.style.transform = `scaleY(${p.toFixed(4)})`
    if (meter.current) meter.current.style.transform = `scaleX(${p.toFixed(4)})`
    if (front !== activeRef.current) {
      activeRef.current = front
      setActive(front)
    }
  }, [])

  useScrollFrame(frame, live)

  // leaving the stage (resize, reduced motion): hand the cards back to the CSS
  useEffect(() => {
    if (live) return
    cards.current.forEach((el) => {
      if (!el) return
      el.style.transform = ''
      el.style.opacity = ''
      el.style.visibility = ''
      el.style.removeProperty('--dim')
    })
  }, [live])

  const goTo = (index: number) => {
    const trackEl = track.current
    if (!trackEl) return
    const range = trackEl.offsetHeight - window.innerHeight
    const top = trackEl.getBoundingClientRect().top + window.scrollY
    const raw = index === 0 ? 0 : LEAD + (index - 1) + TRANSITION
    scrollToY(top + (raw / TOTAL) * range)
  }

  return (
    <Section id="capabilities" className={styles.container}>
      <div className={styles.intro}>
        <SectionHeading label={capabilitiesIntro.label} title={capabilitiesIntro.title} align="center" className={styles.heading} />
        <p className={`t-body-lg ${styles.lead}`}>{capabilitiesIntro.body}</p>
      </div>

      <div ref={track} className={styles.track} data-live={live}>
        <div className={styles.stage}>
          <nav className={styles.rail} aria-label="Capabilities">
            <div className={styles.railHead}>
              <span className={`t-small ${styles.railTitle}`}>Capabilities</span>
              <span className={`t-small ${styles.count}`}>
                {services[active]?.number} / {String(COUNT).padStart(2, '0')}
              </span>
            </div>
            <div className={styles.railBody}>
              <span className={styles.railLine} aria-hidden>
                <span ref={fill} className={styles.railFill} />
              </span>
              <ul className={styles.railList}>
                {services.map((service, i) => (
                  <li key={service.title}>
                    <button
                      type="button"
                      className={`t-h5 ${styles.railItem}`}
                      aria-current={i === active ? 'true' : undefined}
                      onClick={() => goTo(i)}
                    >
                      <span className={styles.railNumber}>{service.number}</span>
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <span className={styles.meter} aria-hidden>
              <span ref={meter} className={styles.meterFill} />
            </span>
          </nav>

          <ul ref={stack} className={styles.stack}>
            {services.map((service, i) => (
              <li
                key={service.title}
                ref={(el) => {
                  cards.current[i] = el
                }}
                className={styles.slot}
                style={{ '--i': i } as React.CSSProperties}
              >
                <article className={styles.card} data-tone={i % 2 === 0 ? 'surface' : 'white'}>
                  <div className={styles.copy}>
                    <p className={`t-body-lg-medium ${styles.number}`}>
                      <span>{service.number}</span>
                    </p>
                    <div className={styles.text}>
                      <p className={`t-body-lg-medium ${styles.tagline}`}>{service.tagline}</p>
                      <h3 className={styles.title}>{service.title}</h3>
                      <p className={`t-body-lg ${styles.description}`}>{service.description}</p>
                      <ul className={styles.tags}>
                        {service.tags.map((tag) => (
                          <li key={tag} className={`t-small ${styles.tag}`}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.panel}>
                    <ServiceDrawing name={service.visual} className={styles.art} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
