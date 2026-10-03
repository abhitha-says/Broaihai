import { SectionLabel } from './SectionLabel'
import styles from './SectionHeading.module.css'

type Props = {
  label: string
  title: string
  align?: 'start' | 'center'
  /** Framer balances most headings so the lines come out even. */
  balance?: boolean
  className?: string
  as?: 'h1' | 'h2'
}

/** The "// Label" eyebrow over a section heading, 6px apart. */
export function SectionHeading({ label, title, align = 'start', balance = true, className, as: Tag = 'h2' }: Props) {
  return (
    <div className={`${styles.heading} ${align === 'center' ? styles.center : ''} ${className ?? ''}`}>
      <SectionLabel>{label}</SectionLabel>
      <Tag className={`t-h2 ${styles.title} ${balance ? styles.balance : ''}`}>{title}</Tag>
    </div>
  )
}
