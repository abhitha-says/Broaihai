import Image from 'next/image'
import { contact, footer, site } from '@/content/site'
import { BackToTop } from './BackToTop'
import styles from './Footer.module.css'

export function Footer() {
  const details = [contact.email, contact.phone, contact.location]
  return (
    <footer id="contact" className={styles.footer}>
      <Image src={footer.background.src} alt={footer.background.alt} fill sizes="100vw" className={styles.background} />
      <div className={styles.overlay} aria-hidden />

      <div className={styles.container}>
        <div className={styles.top}>
          <dl className={styles.details}>
            {details.map((d) => (
              <div key={d.label} className={styles.detail}>
                <dt className={`t-small ${styles.detailLabel}`}>{d.label}</dt>
                <dd className={`t-h5 ${styles.detailValue}`}>
                  {d.href ? (
                    <a href={d.href} {...(d.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.bottom}>
          <BackToTop className={styles.backToTop} />
          <p className={`t-body-lg-medium ${styles.copyright}`}>{site.copyright}</p>
        </div>

        <div className={styles.brand}>
          <Image
            src={site.logoFull.src}
            alt={site.logoFull.alt}
            sizes="(max-width: 767.98px) 300px, 520px"
            className={styles.brandImage}
          />
        </div>
      </div>
    </footer>
  )
}
