import type { CSSProperties } from 'react'
import { projectsPage } from '@/content/projects'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { ProjectsArt } from './ProjectsArt'
import styles from './ProjectsHero.module.css'

export function ProjectsHero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`${styles.container} appear`} style={{ '--appear-delay': '0.3s' } as CSSProperties}>
        <div className={styles.heading}>
          <div className={styles.titleBlock}>
            <SectionLabel>{projectsPage.label}</SectionLabel>
            <h1 className={`t-display ${styles.title}`}>
              {projectsPage.title}
              <span className={styles.dot}>.</span>
            </h1>
          </div>
          <ArrowButton href={projectsPage.cta.href}>{projectsPage.cta.label}</ArrowButton>
        </div>
        <div className={styles.aside}>
          <div className={styles.photo}>
            <ProjectsArt />
          </div>
          <p className={`t-body-medium ${styles.intro}`}>{projectsPage.intro}</p>
        </div>
      </div>
    </section>
  )
}
