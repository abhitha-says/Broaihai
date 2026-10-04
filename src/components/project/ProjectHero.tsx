'use client'

import Image, { getImageProps } from 'next/image'
import { useEffect, useRef, ViewTransition } from 'react'
import { useReducedMotion } from '@/lib/hooks'
import type { DetailedProject } from '@/content/types'
import avatarLeft from '@/assets/images/hero/avatar-a.png'
import avatarRight from '@/assets/images/hero/avatar-b.png'
import { ArrowRight } from '@/components/ui/icons'
import styles from './ProjectHero.module.css'

function Side({ side }: { side: 'left' | 'right' }) {
  const left = side === 'left'
  return (
    <div className={[styles.side, left ? styles.left : styles.right].join(' ')} data-drift={left ? 0.25 : 0.35}>
      <div className={styles.figure}>
        <Image
          src={left ? avatarLeft : avatarRight}
          alt=""
          priority
          sizes="(max-width: 767.98px) 60vw, 34vw"
          className={styles.figureImage}
        />
      </div>
    </div>
  )
}

/**
 * The opening of a project page: a staged scene driven by the project's data.
 *
 * The live-site screen sits in the middle with the project's tagline above it
 * and its name set huge behind it. Two marble avatars frame it from the edges,
 * each reaching toward the screen.
 * On load the screen settles first, then the headline, the name and the panels
 * arrive in sequence (pure CSS keyframes, no loader). Like the reference, the
 * scene then scrolls away 1:1 with the page; the content below rises into place.
 *
 * The screen opens the live site in a new tab on click, shows the "visit"
 * cursor and a "Visit Website" label on hover, and carries the project card's
 * view-transition name so the card's cover morphs into it.
 */
export function ProjectHero({ project }: { project: DetailedProject }) {
  const { title, detail, image } = project
  const sceneRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  // Size the name so it spans the scene: measure it at 100px, then scale it to a modest share of the scene width, never past 17cqw.
  useEffect(() => {
    const word = wordRef.current
    const scene = sceneRef.current
    if (!word || !scene) return
    const fit = () => {
      word.style.fontSize = '100px'
      const natural = word.getBoundingClientRect().width
      const phone = window.innerWidth < 768
      const target = (scene.clientWidth * (phone ? 0.9 : 0.8)) / natural
      const cqw = Math.min((100 * target * 100) / scene.clientWidth, phone ? 26 : 17)
      word.style.fontSize = `${cqw}cqw`
    }
    fit()
    void document.fonts.ready.then(fit)
  }, [title])


  // Measured from the reference recording: the screen and name move 1:1 with the page, the
  // left avatar rises 1.25x as fast and the right 1.35x. Only the avatars need a drift
  // (k * scrollY); it eases toward its target each frame so it settles instead of stepping.
  const reduced = useReducedMotion()
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || reduced) return
    const sides = [...scene.querySelectorAll<HTMLElement>('[data-drift]')].map((el) => ({
      el,
      k: Number(el.dataset.drift),
      y: 0,
    }))
    let raf = 0
    let live = true
    const tick = () => {
      raf = 0
      const target = Math.min(window.scrollY, scene.offsetHeight * 1.2) * (window.innerWidth < 768 ? 0.6 : 1)
      let moving = false
      for (const s of sides) {
        const goal = -target * s.k
        const diff = goal - s.y
        s.y = Math.abs(diff) < 0.05 ? goal : s.y + diff * 0.22
        if (s.y !== goal) moving = true
        s.el.style.transform = `translate3d(0, ${s.y.toFixed(2)}px, 0)`
      }
      if (moving && live) raf = requestAnimationFrame(tick)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    // start from wherever the page already is (reloads, back navigation)
    for (const s of sides) s.y = -Math.min(window.scrollY, scene.offsetHeight * 1.2) * (window.innerWidth < 768 ? 0.6 : 1) * s.k
    tick()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      live = false
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
    }
  }, [reduced])

  const facts = [
    { label: 'Client', value: detail.client },
    { label: 'Category', value: project.category },
    { label: 'Year', value: String(project.year) },
  ]

  // the poster goes through the image optimizer too: the raw master is several times heavier
  const poster = project.heroVideo ? getImageProps({ src: image.src, alt: '', width: 960, quality: 90 }).props.src : undefined

  const screen = (
    <>
      {project.heroVideo ? (
        <video
          className={styles.video}
          src={project.heroVideo}
          poster={poster}
          aria-label={image.alt}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(max-width: 767.98px) calc(100vw - 40px), 50vw"
          quality={90}
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      )}
      {detail.website && (
        <span className={styles.visit} aria-hidden>
          Visit Website
          <ArrowRight className={styles.visitArrow} />
        </span>
      )}
    </>
  )

  return (
    <section className={styles.hero} id="hero" aria-label={`${title} project`}>
      <div ref={sceneRef} className={styles.scene}>
        <div className={styles.atmosphere} aria-hidden />

        <h1 className={styles.word}>
          <span
            ref={wordRef}
            className={styles.wordText}
            style={
              project.wordColors
                ? ({ '--word-top': project.wordColors[0], '--word-bottom': project.wordColors[1] } as React.CSSProperties)
                : undefined
            }
          >{title}</span>
        </h1>

        <div className={styles.stage}>
          <div>
            <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
              {detail.website ? (
                <a
                  href={detail.website}
                  className={styles.frame}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="visit"
                  aria-label={`Visit the ${title} website (opens in a new tab)`}
                >
                  {screen}
                </a>
              ) : (
                <div className={styles.frame}>{screen}</div>
              )}
            </ViewTransition>
          </div>
        </div>

        <Side side="left" />
        <Side side="right" />
      </div>

      <dl className={styles.facts}>
        {facts.map((f) => (
          <div key={f.label} className={styles.fact}>
            <dt className={styles.factLabel}>{f.label}</dt>
            <dd className={styles.factValue}>{f.value}</dd>
          </div>
        ))}
        {detail.website && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Live site</dt>
            <dd className={styles.factValue}>
              <a href={detail.website} target="_blank" rel="noopener noreferrer" className={styles.factLink}>
                {detail.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗
              </a>
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}
