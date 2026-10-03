import { testimonialsIntro } from '@/content/home'
import { testimonials } from '@/content/testimonials'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TestimonialSwitcher } from './TestimonialSwitcher'
import styles from './Testimonials.module.css'

export function Testimonials() {
  return (
    <Section id="testimonial" className={styles.container}>
      <TestimonialSwitcher
        testimonials={testimonials}
        intro={
          <div key="intro" className={styles.intro}>
            <SectionHeading label={testimonialsIntro.label} title={testimonialsIntro.title} className={styles.heading} />
          </div>
        }
      />
    </Section>
  )
}
