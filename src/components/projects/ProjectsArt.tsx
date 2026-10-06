import { useId } from 'react'
import styles from '@/components/ui/Art.module.css'

/** Three overlapping project cards on a navy ground: the portfolio as a picture, for the Projects page header. */
export function ProjectsArt() {
  const uid = useId().replace(/:/g, '')
  const cards = [
    { x: 30, y: 54, rot: -6, tone: 'soft' },
    { x: 262, y: 54, rot: 6, tone: 'mist' },
  ] as const
  return (
    <svg viewBox="0 0 440 240" preserveAspectRatio="xMidYMid slice" className={styles.art} aria-hidden focusable="false">
      <defs>
        <radialGradient id={`${uid}-a`} cx="0.88" cy="0.05" r="0.7">
          <stop offset="0" stopColor="var(--brand-blue)" stopOpacity="0.6" />
          <stop offset="1" stopColor="var(--brand-blue)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-b`} cx="0.02" cy="1" r="0.75">
          <stop offset="0" stopColor="var(--brand-dark-blue)" stopOpacity="1" />
          <stop offset="1" stopColor="var(--brand-dark-blue)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-i`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-blue)" />
          <stop offset="1" stopColor="var(--brand-dark-blue)" />
        </linearGradient>
        <pattern id={`${uid}-g`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="var(--brand-white)" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="440" height="240" className={styles.navy} />
      <rect width="440" height="240" fill={`url(#${uid}-a)`} />
      <rect width="440" height="240" fill={`url(#${uid}-b)`} />
      <rect width="440" height="240" fill={`url(#${uid}-g)`} />
      {cards.map((c) => (
        <g key={c.x} transform={`rotate(${c.rot} ${c.x + 74} ${c.y + 86})`} opacity="0.92">
          <rect x={c.x} y={c.y} width="148" height="172" rx="14" className={styles.white} />
          <rect x={c.x + 12} y={c.y + 12} width="124" height="78" rx="9" className={c.tone === 'soft' ? styles.soft : styles.mist} />
          <rect x={c.x + 12} y={c.y + 104} width="76" height="10" rx="5" className={styles.navy} />
          <rect x={c.x + 12} y={c.y + 124} width="104" height="7" rx="3.5" className={styles.line} />
          <rect x={c.x + 12} y={c.y + 139} width="62" height="7" rx="3.5" className={styles.line} />
        </g>
      ))}
      {/* the front card */}
      <rect x="140" y="30" width="160" height="190" rx="16" className={styles.white} />
      <rect x="154" y="44" width="132" height="92" rx="10" fill={`url(#${uid}-i)`} />
      <circle cx="252" cy="76" r="22" fill="var(--brand-white)" opacity="0.2" />
      <path d="M166 120C190 104 204 112 226 96S262 92 276 82" className={styles.strokeGlow} />
      <rect x="154" y="152" width="84" height="11" rx="5.5" className={styles.navy} />
      <rect x="154" y="173" width="112" height="7" rx="3.5" className={styles.line} />
      <rect x="154" y="188" width="70" height="7" rx="3.5" className={styles.line} />
      <circle cx="270" cy="196" r="14" className={styles.blue} />
      <path d="M264 196h12m-5-5 5 5-5 5" className={styles.strokeWhite} />
    </svg>
  )
}
