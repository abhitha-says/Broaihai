import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Project } from '@/content/types'
import { CardMotion } from './CardMotion'
import styles from './ProjectCard.module.css'

/** The widths of a card in the two-column grid; a card shown wider must pass its own `sizes`. */
const GRID_SIZES = '(max-width: 767.98px) 100vw, (max-width: 1199.98px) 360px, 600px'

/**
 * The card takes its cover's own proportions, so the picture is shown whole and
 * never cropped. On hover the cover blurs and zooms while a tilted copy of it fades in on top,
 * and the "See work" cursor follows the pointer (see CursorFollower). Tablets and phones
 * get the same state as the card scrolls into the middle of the screen (see CardMotion).
 * Projects with a case study open their page, and their cover shares a
 * view-transition name with the page's hero screen so it morphs into place;
 * the template placeholders still link to their own anchor.
 */
export function ProjectCard({ project, sizes = GRID_SIZES }: { project: Project; sizes?: string }) {
  const { image } = project
  const crop = image.position ? { objectPosition: image.position } : undefined
  const href = project.detail ? `/projects/${project.slug}` : `#${project.slug}`
  const images = (
    <CardMotion className={styles.images} style={{ aspectRatio: `${image.src.width} / ${image.src.height}` }}>
      <div className={styles.cover}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} quality={90} style={crop} />
      </div>
      <div className={styles.lift} aria-hidden>
        <Image src={image.src} alt="" fill sizes="330px" quality={90} style={crop} />
      </div>
    </CardMotion>
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
