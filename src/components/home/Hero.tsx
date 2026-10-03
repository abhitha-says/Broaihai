import Image from 'next/image'
import type { CSSProperties } from 'react'
import { hero } from '@/content/home'
import { profiles } from '@/content/site'
import { Ticker } from '@/components/ui/Ticker'
import { ArrowRight } from '@/components/ui/icons'
import styles from './Hero.module.css'

const delay = (s: number) => ({ '--appear-delay': `${s}s` }) as CSSProperties

export function Hero() {
  const { booking } = hero
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={`${styles.heading} appear`} style={delay(0.3)}>
          <h1 className={`t-display-xl ${styles.title}`}>{hero.title}</h1>
          <div className={styles.aside}>
            <p className={`t-body-medium ${styles.intro}`}>{hero.intro}</p>
            <a href={booking.href} className={styles.booking} target="_blank" rel="noopener noreferrer">
              <span className={styles.bookingPhoto}>
                <Image
                  src={booking.portrait.src}
                  alt={booking.portrait.alt}
                  fill
                  sizes="100px"
                  priority
                  style={{ objectPosition: booking.portrait.position }}
                />
              </span>
              <span className={styles.bookingInfo}>
                <span className={styles.bookingText}>
                  <span className={`t-body-lg-medium ${styles.bookingTitle}`}>{booking.title}</span>
                  <span className="t-button">{booking.host}</span>
                </span>
                <span className={styles.bookingIcon} aria-hidden>
                  <ArrowRight className={styles.bookingArrow} />
                </span>
              </span>
            </a>
          </div>
        </div>

        <ul className={`${styles.profiles} appear`} style={delay(0.4)}>
          {profiles.map((p) => (
            <li key={p.href}>
              <a href={p.href} className={styles.roll} target="_blank" rel="noopener noreferrer">
                <span className={`t-body-medium ${styles.rollFront}`}>{p.label}</span>
                <span className={`t-body-medium ${styles.rollBack}`} aria-hidden>
                  {p.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Ticker speed={70} gap={24} className={styles.slider}>
          {hero.slides.map(([left, right], i) => (
            <div key={i} className={styles.slide}>
              <div className={`${styles.half} ${styles.halfLeft}`}>
                <Image src={left.src} alt={left.alt} fill sizes="195px" priority={i < 4} />
              </div>
              <div className={`${styles.half} ${styles.halfRight}`}>
                <Image src={right.src} alt={right.alt} fill sizes="195px" priority={i < 4} />
              </div>
            </div>
          ))}
        </Ticker>
      </div>
    </section>
  )
}
