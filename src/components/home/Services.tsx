import Image from 'next/image'
import type { CSSProperties } from 'react'
import { servicesIntro } from '@/content/home'
import { services } from '@/content/services'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServicesDeck } from './ServicesDeck'
import styles from './Services.module.css'

/**
 * Four full-bleed cards that stick to the top of the viewport in turn, so each
 * one slides up over the last. Tablets and phones play the same deck at their
 * own size: the card beneath sinks back as the next one climbs over it (ServicesDeck).
 */
export function Services() {
  return (
    <Section id="services" className={styles.container}>
      <SectionHeading label={servicesIntro.label} title={servicesIntro.title} align="center" className={styles.heading} />
      <ServicesDeck className={styles.stack}>
        {services.map((service, i) => (
          <li key={service.title} className={styles.slot} style={{ '--i': i } as CSSProperties}>
            <article className={styles.card}>
              <div className={styles.background}>
                <Image src={service.background.src} alt={service.background.alt} fill sizes="100vw" />
              </div>
              <div className={styles.overlay} aria-hidden />
              <div className={styles.content}>
                <h3 className={`t-h2 ${styles.title}`}>{service.title}</h3>
                <div className={styles.frame}>
                  <div className={styles.photo}>
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 1199.98px) 246px, 400px"
                      style={service.image.position ? { objectPosition: service.image.position } : undefined}
                    />
                  </div>
                </div>
                <p className={`t-h5 ${styles.description}`}>{service.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ServicesDeck>
    </Section>
  )
}
