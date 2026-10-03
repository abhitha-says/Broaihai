'use client'

import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import type { Testimonial } from '@/content/types'
import star from '@/assets/images/icons/star.png'
import styles from './Testimonials.module.css'

/**
 * One testimonial at a time, picked from the row of portraits underneath.
 * The content swaps instantly, as in the original; only the thumbnails animate
 * (square and grey when idle, a full-colour circle when chosen).
 */
export function TestimonialSwitcher({ testimonials, intro }: { testimonials: Testimonial[]; intro: ReactNode }) {
  const [active, setActive] = useState(0)
  const current = testimonials[active]
  if (!current) return null

  return (
    <div className={styles.block}>
      <div className={styles.feedback}>
        {intro}
        <div className={styles.body}>
          <div className={styles.portrait}>
            {testimonials.map((t, i) => (
              <Image
                key={t.name}
                src={t.portrait.src}
                alt={t.portrait.alt}
                fill
                sizes="(max-width: 809.98px) 100vw, (max-width: 1199.98px) 360px, 450px"
                className={styles.portraitImage}
                data-active={i === active}
                aria-hidden={i !== active}
                style={{ objectPosition: t.portrait.position }}
              />
            ))}
          </div>
          <figure className={styles.message} aria-live="polite">
            <div className={styles.messageTop}>
              <span className={styles.company}>
                <Image src={current.company.src} alt={current.company.alt} fill sizes="100px" />
              </span>
              <span className={styles.stars} role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Image key={i} src={star} alt="" width={18} height={18} className={styles.star} />
                ))}
              </span>
            </div>
            <blockquote className={`t-body-lg ${styles.quote}`}>{current.quote}</blockquote>
            <figcaption className={styles.person}>
              <span className={`t-h4 ${styles.name}`}>{current.name}</span>
              <span className="t-body-medium">{current.role}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.others}>
        <ul className={styles.thumbs}>
          {testimonials.map((t, i) => (
            <li key={t.name} className={styles.thumbSlot}>
              <button
                type="button"
                className={styles.thumb}
                data-active={i === active}
                aria-pressed={i === active}
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => setActive(i)}
              >
                <Image src={t.portrait.src} alt="" fill sizes="85px" style={{ objectPosition: t.thumbPosition ?? t.portrait.position }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
