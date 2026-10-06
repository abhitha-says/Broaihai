'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState, type CSSProperties } from 'react'
import { contact, contactCta, navigation, site } from '@/content/site'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { ToggleIcon } from '@/components/ui/ToggleIcon'
import styles from './Header.module.css'

/**
 * A floating pill. Desktop shows the links inline; below 1200px they fold into a
 * menu sheet that drops in under the pill: the page dims behind it, the links rise
 * out of their masks one after another (the same move as the Stack title) and the
 * contact details settle in last. The toggle's bars cross into the blue X.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    // the page holds still behind the sheet
    document.documentElement.classList.add('menu-open')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  // a navigation closes the sheet, whichever way it was triggered
  const [seenPath, setSeenPath] = useState(pathname)
  if (pathname !== seenPath) {
    setSeenPath(pathname)
    setOpen(false)
  }

  const close = () => setOpen(false)
  const current = (href: string) => (href === '/' ? pathname === '/' : href.startsWith('/') && !href.includes('#') && pathname.startsWith(href))

  return (
    <header className={`${styles.wrap} appear`} style={{ '--appear-delay': '0.2s' } as CSSProperties} data-open={open}>
      <button type="button" className={styles.backdrop} tabIndex={-1} aria-hidden onClick={close} />

      <nav className={styles.nav} data-open={open} aria-label="Main">
        <div className={styles.bar}>
          <Link href="/#hero" className={styles.logo} onClick={close}>
            <Image src={site.logoFull.src} alt={site.logoFull.alt} priority sizes="160px" className={styles.logoImage} />
          </Link>

          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`t-body-medium ${styles.link}`}
                  aria-current={current(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ArrowButton href={contactCta.href} className={styles.cta}>
            {contactCta.label}
          </ArrowButton>

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <ToggleIcon open={open} />
          </button>
        </div>
      </nav>

      <div id={menuId} className={styles.sheet} inert={!open}>
        <div className={styles.sheetInner}>
          <p className={`t-body-medium ${styles.sheetLabel}`}>
            <span className={styles.slashes} aria-hidden>
              {'//'}
            </span>
            Menu
          </p>
          <ul className={styles.sheetLinks}>
            {navigation.map((item, i) => (
              <li key={item.href} style={{ '--i': i } as CSSProperties}>
                <Link
                  href={item.href}
                  className={styles.sheetLink}
                  onClick={close}
                  aria-current={current(item.href) ? 'page' : undefined}
                >
                  <span className={styles.sheetIndex} aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.sheetMask}>
                    <span className={styles.sheetWord}>{item.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.sheetFoot}>
            <ArrowButton href={contactCta.href} className={styles.sheetCta} onClick={close}>
              {contactCta.label}
            </ArrowButton>
            <address className={styles.sheetContact}>
              <a href={contact.email.href} className={styles.sheetMail}>
                {contact.email.value}
              </a>
              <span className={`t-small ${styles.sheetPlace}`}>{contact.location.value}</span>
            </address>
          </div>
        </div>
      </div>
    </header>
  )
}
