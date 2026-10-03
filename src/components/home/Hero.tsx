import type { CSSProperties } from 'react'
import { hero } from '@/content/home'
import { MARK_PATH, MARK_VIEWBOX } from '@/components/ui/BrandMark'
import { HeroButton } from './HeroButton'
import { HeroField } from './HeroField'
import { Typewriter } from './Typewriter'
import styles from './Hero.module.css'

/** The four-point spark used as the AI icon. */
const SPARK = 'M12 0C12.9 6.6 17.4 11.1 24 12C17.4 12.9 12.9 17.4 12 24C11.1 17.4 6.6 12.9 0 12C6.6 11.1 11.1 6.6 12 0Z'

/** The delay (s) of a letter's rise, counted across the whole name. */
const rise = (n: number) => ({ '--d': `${(0.22 + n * 0.075).toFixed(3)}s` }) as CSSProperties

function Spark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d={SPARK} />
    </svg>
  )
}

export function Hero() {
  let n = 0
  const words = hero.name.map((word) =>
    word.split('').map((letter) => ({ letter, n: n++ })),
  )

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} aria-hidden>
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
        <span className={`${styles.blob} ${styles.blobC}`} />
        <HeroField className={styles.field} />
      </div>

      <div className={styles.content}>
        <div className={styles.lockup}>
          <span className={styles.orbit} aria-hidden />
          <div className={styles.tile} style={{ '--d': '0s' } as CSSProperties} data-hero-origin>
            <svg viewBox={MARK_VIEWBOX} className={styles.mark} aria-hidden>
              <defs>
                <linearGradient id="hero-mark-fill" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff6b22" />
                  <stop offset="0.5" stopColor="#fd5212" />
                  <stop offset="1" stopColor="#f23c0a" />
                </linearGradient>
                <linearGradient id="hero-mark-glint" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <clipPath id="hero-mark-clip">
                  <path d={MARK_PATH} />
                </clipPath>
              </defs>
              <path d={MARK_PATH} className={styles.markFill} fill="url(#hero-mark-fill)" />
              <g clipPath="url(#hero-mark-clip)">
                <g transform="rotate(20 250 347)">
                  <rect className={styles.glint} x="-330" y="-220" width="200" height="1160" fill="url(#hero-mark-glint)" />
                </g>
              </g>
              <path
                d={MARK_PATH}
                className={styles.markDraw}
                pathLength={1}
                fill="none"
                stroke="#ff531f"
                strokeWidth="12"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className={styles.name} aria-label={hero.name.join(' ')}>
          {words.map((letters, w) => {
            const isAi = w === 1
            const row = letters.map(({ letter, n }) => (
              <span key={n} className={`${styles.ch} ${isAi ? styles.chAi : ''}`} style={rise(n)} aria-hidden>
                {letter}
              </span>
            ))
            return isAi ? (
              <span key={w} className={styles.ai} style={rise(letters.at(-1)?.n ?? 0)} aria-hidden>
                <span className={styles.word}>{row}</span>
                <Spark className={`${styles.spark} ${styles.sparkBig}`} />
                <Spark className={`${styles.spark} ${styles.sparkSmall}`} />
              </span>
            ) : (
              <span key={w} className={styles.word} aria-hidden>
                {row}
              </span>
            )
          })}
        </h1>

        <Typewriter
          text={hero.tagline.text}
          accent={hero.tagline.accent}
          startDelay={1050}
          className={styles.tagline}
        />

        <ul className={styles.ctas}>
          <HeroButton variant="solid" href={hero.projects.href} label={hero.projects.label} delay={1.55} />
          <HeroButton variant="ghost" href={hero.contact.href} label={hero.contact.label} delay={1.7} />
        </ul>
      </div>
    </section>
  )
}
