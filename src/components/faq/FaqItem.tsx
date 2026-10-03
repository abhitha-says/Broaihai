'use client'

import { useId, useState } from 'react'
import type { Faq } from '@/content/types'
import { ToggleIcon } from '@/components/ui/ToggleIcon'
import styles from './Faq.module.css'

/** One question. Items open independently, as in the original. */
export function FaqItem({ faq, number }: { faq: Faq; number: number }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className={styles.item} data-open={open}>
      <h3 className={styles.questionHeading}>
        <button
          type="button"
          className={styles.question}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          id={`${id}-question`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`t-h5 ${styles.questionText}`}>
            {number}. {faq.question}
          </span>
          <ToggleIcon open={open} />
        </button>
      </h3>
      <div id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} className={styles.answer} inert={!open}>
        <div className={styles.answerInner}>
          <p className={`t-body ${styles.answerText}`}>{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}
