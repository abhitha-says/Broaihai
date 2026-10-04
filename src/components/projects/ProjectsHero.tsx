import Image from 'next/image'
import type { CSSProperties } from 'react'
import { projectsPage } from '@/content/projects'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ArrowButton } from '@/components/ui/ArrowButton'
import styles from './ProjectsHero.module.css'

export function ProjectsHero() {
  const { image } = projectsPage
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
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 767.98px) 100vw, (max-width: 1199.98px) 750px, 300px"
              quality={90}
              style={{ objectPosition: image.position }}
            />
          </div>
          <p className={`t-body-medium ${styles.intro}`}>{projectsPage.intro}</p>
        </div>
      </div>
    </section>
  )
}
