import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

/** The site's arrow: a 14.25px shaft and a 5.5 x 10.5 head, 1.5px round strokes. */
export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M13.75 6.75 L19.25 12 L13.75 17.25" />
      <path d="M19 12 L4.75 12" />
    </svg>
  )
}

export function ArrowUp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 20V4" />
      <path d="M6 10L12 4L18 10" />
    </svg>
  )
}

export function Chevron({ direction, ...props }: IconProps & { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <polyline points={direction === 'left' ? '15,18 9,12 15,6' : '9,18 15,12 9,6'} />
    </svg>
  )
}

export function Pause(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

export function Play(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}
