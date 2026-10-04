import type { CSSProperties } from 'react'
import { heroWide as hero } from '@/content/home'
import { site } from '@/content/site'
import { HeroButton } from './HeroButton'
import { HeroCards } from './HeroCards'
import styles from './HeroWide.module.css'

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/** Splits a headline line round its accent phrase, which is lit champagne. */
function accented(line: string) {
  return line.split(hero.accent).flatMap((part, n) =>
    n === 0
      ? [part]
      : [
          <span key={n} className={styles.accent}>
            {hero.accent}
          </span>,
          part,
        ],
  )
}

/** The hero at 1200px and wider: the brand on the left, the orbiting service cards on the right. */
export function HeroWide() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden />

      <div className={styles.content}>
        <div className={styles.copy}>
          <div className={styles.logo} style={delay(0.25)} role="img" aria-label={site.name} />

          <h1 className={styles.headline}>
            {hero.headline.map((line, i) => (
              <span key={line} className={styles.line}>
                <span className={styles.lineText} style={delay(0.4 + i * 0.1)}>
                  {accented(line)}
                </span>
              </span>
            ))}
          </h1>

          <p className={`${styles.support} ${styles.reveal}`} style={delay(0.55)}>
            {hero.support}
          </p>

          <ul className={styles.ctas}>
            <HeroButton styles={styles} variant="solid" href={hero.projects.href} label={hero.projects.label} delay={0.65} />
            <HeroButton styles={styles} variant="ghost" href={hero.services.href} label={hero.services.label} delay={0.75} />
          </ul>
        </div>

        <HeroCards />
      </div>
    </section>
  )
}
