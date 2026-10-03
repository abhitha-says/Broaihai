import { faqIntro, faqs } from '@/content/faqs'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { FaqItem } from './FaqItem'
import styles from './Faq.module.css'

export function FaqSection() {
  const { help } = faqIntro
  return (
    <Section id="faq" className={styles.container}>
      <div className={styles.intro}>
        <SectionHeading label={faqIntro.label} title={faqIntro.title} balance={false} className={styles.heading} />
        <div className={styles.help}>
          <div className={styles.helpText}>
            <h3 className="t-h4">{help.title}</h3>
            <p className="t-body">{help.body}</p>
          </div>
          <ArrowButton href={help.cta.href} tone="white">
            {help.cta.label}
          </ArrowButton>
        </div>
      </div>
      <div className={styles.list}>
        {faqs.map((faq, i) => (
          <FaqItem key={faq.question} faq={faq} number={i + 1} />
        ))}
      </div>
    </Section>
  )
}
