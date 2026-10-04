import type { CSSProperties } from 'react'
import { hero } from '@/content/home'
import Image from 'next/image'
import { site } from '@/content/site'
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
            <span className={styles.mark} style={{ '--logo': `url(${site.logo.src.src})` } as CSSProperties} aria-hidden>
              <Image src={site.logo.src} alt="" fill priority sizes="(max-width: 767.98px) 86vw, 600px" className={styles.markFill} />
            </span>
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
