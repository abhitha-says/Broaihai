import Image from 'next/image'
import { clients } from '@/content/home'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import styles from './TrustedBy.module.css'

/**
 * Logos on a checkerboard: filled cells alternate with blank ones, so with an odd
 * column count (5 on desktop and tablet, 3 on phone) every row offsets by one.
 */
export function TrustedBy() {
  const cells = clients.logos.flatMap((logo, i) => (i === 0 ? [logo] : [null, logo]))
  return (
    <Section id="trusted-by" className={styles.container}>
      <SectionHeading label={clients.label} title={clients.title} align="center" className={styles.heading} />
      <ul className={styles.grid}>
        {cells.map((logo, i) =>
          logo ? (
            <li key={i} className={`${styles.cell} ${styles.filled}`}>
              <span className={styles.logo}>
                <Image src={logo.src} alt={logo.alt} fill sizes="150px" />
              </span>
            </li>
          ) : (
            <li key={i} className={styles.cell} aria-hidden />
          ),
        )}
      </ul>
    </Section>
  )
}
