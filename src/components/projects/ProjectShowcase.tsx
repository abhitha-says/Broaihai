import type { Link, Project } from '@/content/types'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { ProjectCard } from './ProjectCard'
import styles from './ProjectShowcase.module.css'

type Props = {
  id?: string
  label: string
  title: string
  projects: Project[]
  closing: string
  cta: Link
  /** The /projects page spaces its cards further apart than the home preview. */
  spacing?: 'compact' | 'relaxed'
}

/**
 * Two staggered columns. The left one holds the first half of the projects and a
 * closing line; the right one opens with the heading, which pushes its cards down
 * and gives the grid its offset. On phones the heading column comes first.
 */
export function ProjectShowcase({ id, label, title, projects, closing, cta, spacing = 'compact' }: Props) {
  const half = Math.ceil(projects.length / 2)
  const left = projects.slice(0, half)
  const right = projects.slice(half)
  return (
    <Section id={id} className={`${styles.container} ${spacing === 'relaxed' ? styles.relaxed : ''}`}>
      <div className={`${styles.column} ${styles.left}`}>
        <div className={styles.list}>
          {left.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className={styles.closing}>
          <p className={`t-h3 ${styles.closingText}`}>{closing}</p>
          <ArrowButton href={cta.href}>{cta.label}</ArrowButton>
        </div>
      </div>
      <div className={`${styles.column} ${styles.right}`}>
        <SectionHeading label={label} title={title} balance className={styles.heading} />
        <div className={styles.list}>
          {right.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </Section>
  )
}
