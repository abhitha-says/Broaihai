import Link from 'next/link'
import { ArrowRight } from './icons'
import styles from './ArrowButton.module.css'

type Props = {
  href: string
  children: string
  /** `surface` (the default) is the primary button; `white` is the secondary one. */
  tone?: 'surface' | 'white'
  className?: string
  onClick?: () => void
}

/**
 * The site's one call-to-action. The default is the primary (deep navy, a small electric-blue
 * square behind the arrow that grows to fill the button on hover); `tone="white"` is the
 * secondary (white, a navy hairline, a faint blue wash on hover).
 */
export function ArrowButton({ href, children, tone = 'surface', className, onClick }: Props) {
  const external = /^https?:/.test(href)
  const cls = [styles.button, tone === 'white' && styles.white, className].filter(Boolean).join(' ')
  const body = (
    <>
      <span className={styles.fill} aria-hidden />
      <span className={`t-button ${styles.label}`}>{children}</span>
      <span className={styles.icon} aria-hidden>
        <ArrowRight className={styles.arrow} />
      </span>
    </>
  )
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onClick}>
      {body}
    </Link>
  )
}
