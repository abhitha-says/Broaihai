import type { Link, Project } from '@/content/types'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { ProjectCard } from '@/components/projects/ProjectCard'
import styles from './NextProject.module.css'

type Props = {
  next: Project
  closing: string
  cta: Link
}

/** The next case study, then the invitation to start one. */
export function NextProject({ next, closing, cta }: Props) {
  return (
    <Section id="next-project" className={styles.container}>
      <div className={styles.head}>
        <SectionHeading label="Next Project" title={next.title} className={styles.heading} />
      </div>
      <div className={styles.card}>
        <ProjectCard project={next} />
      </div>
      <div className={styles.closing}>
        <p className={`t-h3 ${styles.closingText}`}>{closing}</p>
        <ArrowButton href={cta.href}>{cta.label}</ArrowButton>
      </div>
    </Section>
  )
}
