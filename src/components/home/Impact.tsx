import { impact } from '@/content/home'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Counter } from './Counter'
import styles from './Impact.module.css'

export function Impact() {
  return (
    <Section id="our-impact" className={styles.container}>
      <SectionHeading label={impact.label} title={impact.title} align="center" className={styles.heading} />
      <ul className={styles.stats}>
        {impact.stats.map((stat) => (
          <li key={stat.label} className={styles.card}>
            <div className={styles.body}>
              <Counter value={stat.value} prefix={stat.prefix} />
              <p className={`t-h5 ${styles.label}`}>{stat.label}</p>
            </div>
            <span className={styles.dot} aria-hidden />
          </li>
        ))}
      </ul>
    </Section>
  )
}
