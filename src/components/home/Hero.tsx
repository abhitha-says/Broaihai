import Image from 'next/image'
import { hero } from '@/content/home'
import { site } from '@/content/site'
import heroVisual from '@/assets/images/hero/hero-visual.png'
import { HeroButton } from './HeroButton'
import { Typewriter } from './Typewriter'
import styles from './Hero.module.css'

/**
 * The home hero. Left: the BroAiHai logo as supplied, the headline typed out letter by letter, one
 * supporting line and the two actions. Right: a still picture of the product (no motion). Under
 * 1200px the picture sits beneath the copy.
 */
export function Hero() {
  return (
    <div id="hero">
      <section className={styles.hero}>
        <div className={styles.atmosphere} aria-hidden />

        <div className={styles.wrap}>
          <div className={styles.copy}>
            <Image
              src={site.logoFull.src}
              alt={site.logoFull.alt}
              priority
              sizes="(max-width: 767.98px) 56vw, (max-width: 1199.98px) 34vw, 360px"
              className={styles.logo}
            />

            <Typewriter as="h1" text={hero.headline} accent={hero.accent} startDelay={900} className={styles.headline} />

            <p className={styles.support}>{hero.support}</p>

            <ul className={styles.ctas}>
              <HeroButton styles={styles} variant="solid" href={hero.book.href} label={hero.book.label} delay={1.4} />
              <HeroButton styles={styles} variant="ghost" href={hero.tell.href} label={hero.tell.label} delay={1.55} arrow={false} />
            </ul>
          </div>

          <figure className={styles.visual}>
            <Image
              src={heroVisual}
              alt="A BroAi dashboard on a laptop and phone: projects delivered, time saved, cost reduced, recent projects and business impact, with AI agents, web apps, mobile apps and custom tools."
              priority
              quality={90}
              sizes="(max-width: 1199.98px) 92vw, 760px"
              className={styles.visualImage}
            />
          </figure>
        </div>
      </section>
    </div>
  )
}
