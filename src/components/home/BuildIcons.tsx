import type { BuildItem } from '@/content/types'

/** The small line icons on the What We Build cards: 24px grid, 1.5px round strokes, like the site's arrow. */
const PATHS: Record<BuildItem['icon'], React.ReactNode> = {
  software: (
    <>
      <rect x="3.75" y="4.75" width="16.5" height="11" rx="1.5" />
      <path d="M2.75 19.25h18.5" />
      <path d="M9.75 9 7.75 10.75l2 1.75M14.25 9l2 1.75-2 1.75" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.75" y="2.75" width="10.5" height="18.5" rx="2" />
      <path d="M10.75 18h2.5" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M3.5 12h17M12 3.25c2.4 2.4 3.5 5.3 3.5 8.75s-1.1 6.35-3.5 8.75c-2.4-2.4-3.5-5.3-3.5-8.75S9.6 5.65 12 3.25Z" />
    </>
  ),
  platform: (
    <>
      <path d="m12 3.75 8.25 4.25L12 12.25 3.75 8 12 3.75Z" />
      <path d="m3.75 12 8.25 4.25L20.25 12" />
      <path d="m3.75 16 8.25 4.25L20.25 16" />
    </>
  ),
  agent: (
    <>
      <rect x="4.75" y="7.75" width="14.5" height="11.5" rx="3" />
      <path d="M12 7.75v-3M12 4.25h.01" />
      <path d="M9.25 12.5v1M14.75 12.5v1M10 16.25h4" />
      <path d="M2.75 12.25v2.5M21.25 12.25v2.5" />
    </>
  ),
  automation: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M10.96 5.08 L11.15 3.04 L12.85 3.04 L13.04 5.08 A7.0 7.0 0 0 1 16.16 6.37 L17.74 5.07 L18.93 6.26 L17.63 7.84 A7.0 7.0 0 0 1 18.92 10.96 L20.96 11.15 L20.96 12.85 L18.92 13.04 A7.0 7.0 0 0 1 17.63 16.16 L18.93 17.74 L17.74 18.93 L16.16 17.63 A7.0 7.0 0 0 1 13.04 18.92 L12.85 20.96 L11.15 20.96 L10.96 18.92 A7.0 7.0 0 0 1 7.84 17.63 L6.26 18.93 L5.07 17.74 L6.37 16.16 A7.0 7.0 0 0 1 5.08 13.04 L3.04 12.85 L3.04 11.15 L5.08 10.96 A7.0 7.0 0 0 1 6.37 7.84 L5.07 6.26 L6.26 5.07 L7.84 6.37 A7.0 7.0 0 0 1 10.96 5.08 Z" />
    </>
  ),
}

export function BuildIcon({ name, className }: { name: BuildItem['icon']; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
