'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useState, type CSSProperties } from 'react'
import { contactCta, navigation, site } from '@/content/site'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { ToggleIcon } from '@/components/ui/ToggleIcon'
import styles from './Header.module.css'

/**
 * A floating pill. Desktop shows the links inline; below 1200px they fold into a
 * menu that opens downward inside the same pill.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`${styles.wrap} appear`} style={{ '--appear-delay': '0.2s' } as CSSProperties}>
      <nav className={styles.nav} data-open={open} aria-label="Main">
        <div className={styles.bar}>
          <Link href="/#hero" className={styles.logo} onClick={close}>
            <Image src={site.logo.src} alt={site.logo.alt} priority sizes="139px" className={styles.logoImage} />
          </Link>

          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`t-body-medium ${styles.link}`}>
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

        <div id={menuId} className={styles.menu} inert={!open}>
          <div className={styles.menuInner}>
            <ul className={styles.menuLinks}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`t-body-medium ${styles.link}`} onClick={close}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ArrowButton href={contactCta.href} onClick={close}>
              {contactCta.label}
            </ArrowButton>
          </div>
        </div>
      </nav>
    </header>
  )
}
