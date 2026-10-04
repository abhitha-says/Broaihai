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
 * never cropped. On desktop hover the cover blurs and zooms while a phone with the live
 * site's mobile view rises over it, whole and clear of every edge, and the "See work"
 * cursor follows the pointer (see CursorFollower). Tablets and phones have no hover
 * state: the card only opens as it scrolls into view (see CardMotion).
 * Projects with a case study open their page, and their cover shares a
 * view-transition name with the page's hero screen so it morphs into place;
 * the template placeholders still link to their own anchor.
 */
export function ProjectCard({ project, sizes = GRID_SIZES }: { project: Project; sizes?: string }) {
  const { image, mobile } = project
  const crop = image.position ? { objectPosition: image.position } : undefined
  const href = project.detail ? `/projects/${project.slug}` : `#${project.slug}`
  const images = (
    <CardMotion
      className={`${styles.images} ${mobile ? styles.withPhone : ''}`}
      style={{ aspectRatio: `${image.src.width} / ${image.src.height}` }}
    >
      <div className={styles.cover}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} quality={90} style={crop} />
      </div>
      {mobile && (
        <div className={styles.phone} aria-hidden style={{ aspectRatio: `${mobile.width} / ${mobile.height}` }}>
          <Image src={mobile} alt="" fill sizes="300px" quality={90} />
        </div>
      )}
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
