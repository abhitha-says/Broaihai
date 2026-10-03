import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Project } from '@/content/types'
import styles from './ProjectCard.module.css'

/**
 * On hover the cover blurs and zooms while a tilted copy of it fades in on top,
 * and the "See work" cursor follows the pointer (see CursorFollower).
 * Projects with a case study open their page, and their cover shares a
 * view-transition name with the page's hero screen so it morphs into place;
 * the template placeholders still link to their own anchor.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { image } = project
  const crop = image.position ? { objectPosition: image.position } : undefined
  const href = project.detail ? `/projects/${project.slug}` : `#${project.slug}`
  const images = (
    <div className={styles.images} data-cursor="see-work">
      <div className={styles.cover}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 809.98px) 100vw, (max-width: 1199.98px) 360px, 600px" style={crop} />
      </div>
      <div className={styles.lift} aria-hidden>
        <Image src={image.src} alt="" fill sizes="330px" style={crop} />
      </div>
    </div>
  )
  return (
    <Link href={href} id={project.slug} className={styles.card}>
      {project.detail ? (
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          {images}
        </ViewTransition>
      ) : (
        images
      )}
      <div className={styles.text}>
        <h3 className={`t-h4 ${styles.title}`}>{project.title}</h3>
        <div className={styles.meta}>
          <p className={`t-h5 ${styles.year}`}>{project.year}</p>
          <p className={`t-body-medium ${styles.category}`}>{project.category}</p>
        </div>
      </div>
    </Link>
  )
}
