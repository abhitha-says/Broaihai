'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

let instance: Lenis | null = null

/** Scroll to a position, smoothly when Lenis is running, natively otherwise. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

/** Scroll to a page offset, smoothly when Lenis is running, natively otherwise. */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y)
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

/**
 * Lenis with the options the original page runs (its default lerp; anchors on).
 * Skipped for people who ask for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    instance = new Lenis({
      smoothWheel: true,
      autoRaf: true,
      autoToggle: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    })
    return () => {
      instance?.destroy()
      instance = null
    }
  }, [])
  return null
}
