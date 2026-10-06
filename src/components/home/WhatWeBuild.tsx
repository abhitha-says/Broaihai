import Link from 'next/link'
import { build } from '@/content/home'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRight } from '@/components/ui/icons'
import { BuildIcon } from './BuildIcons'
import styles from './WhatWeBuild.module.css'

/** Six cards, each a link to the contact section. No motion: hover and focus only recolour the icon and arrow. */
export function WhatWeBuild() {
  return (
    <Section id="what-we-build" className={styles.container}>
      <SectionHeading label={build.label} title={build.title} align="center" className={styles.heading} />
      <ul className={styles.grid}>
        {build.items.map((item) => (
          <li key={item.title}>
            <Link href={build.cta.href} className={styles.card}>
              <span className={styles.icon}>
                <BuildIcon name={item.icon} className={styles.glyph} />
              </span>
              <div className={styles.copy}>
                <h3 className={`t-h4 ${styles.title}`}>{item.title}</h3>
                <p className={`t-body-lg ${styles.body}`}>{item.body}</p>
              </div>
              <span className={styles.arrow} aria-hidden>
                <ArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
