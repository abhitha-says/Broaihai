import { difference } from '@/content/home'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ComparisonGrid } from './ComparisonGrid'
import { ComparisonPanel } from './ComparisonPanel'
import type { PillSpec, PillTone } from './FloatingPill'
import styles from './Difference.module.css'

/** Where each row's pill sits in its panel; the two panels read row for row. */
const LAYOUT = [
  { y: 27 },
  { y: 40 },
  { y: 53 },
  { y: 66 },
  { y: 79 },
]
const TYPICAL = [
  { x: 56, rotate: 7, tone: 'glassDark' },
  { x: 40, rotate: -10, tone: 'glassLight' },
  { x: 60, rotate: 9, tone: 'glassDark' },
  { x: 38, rotate: -8, tone: 'glassLight' },
  { x: 58, rotate: 12, tone: 'glassDark' },
] satisfies { x: number; rotate: number; tone: PillTone }[]
const BRO_AI = [
  { x: 54, rotate: -6, tone: 'accent' },
  { x: 60, rotate: 7, tone: 'ink' },
  { x: 40, rotate: -9, tone: 'glassLight' },
  { x: 58, rotate: 8, tone: 'accent' },
  { x: 48, rotate: -7, tone: 'ink' },
] satisfies { x: number; rotate: number; tone: PillTone }[]

const typicalPills: PillSpec[] = difference.rows.map((row, i) => ({ text: row.typical, ...LAYOUT[i]!, ...TYPICAL[i]! }))
const broAiPills: PillSpec[] = difference.rows.map((row, i) => ({ text: row.broAi, ...LAYOUT[i]!, ...BRO_AI[i]! }))

export function Difference() {
  return (
    <Section className={styles.container}>
      <div className={styles.head}>
        <SectionHeading label={difference.label} title={difference.title} align="center" />
        <p className={`t-h5 ${styles.body}`}>{difference.body}</p>
      </div>
      <ComparisonGrid>
        <ComparisonPanel title={difference.typical} variant="typical" pills={typicalPills} />
        <ComparisonPanel title={difference.broAi} variant="broAi" pills={broAiPills} />
      </ComparisonGrid>
    </Section>
  )
}
