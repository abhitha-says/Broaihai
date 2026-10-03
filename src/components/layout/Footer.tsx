import Image from 'next/image'
import { contact, footer, site, socials } from '@/content/site'
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
          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={styles.social} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Image src={s.icon.src} alt="" width={20} height={20} className={styles.socialIcon} />
                </a>
              </li>
            ))}
          </ul>
          <dl className={styles.details}>
            {details.map((d) => (
              <div key={d.label} className={styles.detail}>
                <dt className={`t-small ${styles.detailLabel}`}>{d.label}</dt>
                <dd className={`t-h5 ${styles.detailValue}`}>
                  <a href={d.href} {...(d.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {d.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.bottom}>
          <BackToTop className={styles.backToTop} />
          <p className={`t-body-lg-medium ${styles.copyright}`}>{site.copyright}</p>
        </div>

        <div className={styles.wordmark}>
          <Image src={site.wordmark.src} alt={site.name} sizes="(max-width: 809.98px) 350px, (max-width: 1199.98px) 750px, 1380px" className={styles.wordmarkImage} />
        </div>
      </div>
    </footer>
  )
}
