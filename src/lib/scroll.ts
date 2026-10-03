'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Calls `frame` with the current scroll position once per animation frame
 * while the page scrolls or resizes, and once on mount. Pass a stable callback
 * (useCallback) so the listeners aren't rebound every render.
 */
export function useScrollFrame(frame: (scrollY: number, viewportHeight: number) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    let pending = 0
    const run = () => {
      pending = 0
      frame(window.scrollY, window.innerHeight)
    }
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(run)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(pending)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [frame, enabled])
}

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * How far along its reveal a frame is, from 1 (not yet reached) to 0 (settled),
 * given its viewport top, its height and the viewport height.
 *
 *   hero     runs while the frame's top travels from 53% to 13% of the viewport
 *   gallery  starts as the frame enters at the bottom, ends once its bottom
 *            edge reaches 80% of the viewport
 *
 * Both ranges are measured from the reference page.
 */
export type ZoomRange = 'hero' | 'gallery'

export function zoomProgress(range: ZoomRange, top: number, height: number, vh: number) {
  if (range === 'hero') return clamp01((top / vh - 0.13) / 0.4)
  const end = vh * 0.8 - height
  return clamp01((top - end) / (vh - end))
}

/**
 * Scroll-linked zoom: sets `--zoom` on the element from `from` down to 1 as it
 * scrolls into place, eased toward the target each frame so it settles the way
 * a spring would rather than snapping with the scroll. Reduced motion pins it at 1.
 */
export function useScrollZoom(ref: RefObject<HTMLElement | null>, range: ZoomRange, from: number, enabled = true) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!enabled) {
      el.style.setProperty('--zoom', '1')
      return
    }
    let current = -1
    let target = from
    let raf = 0
    const settle = () => {
      raf = 0
      const diff = target - current
      if (Math.abs(diff) < 0.0004) {
        current = target
      } else {
        current += diff * 0.16
        raf = requestAnimationFrame(settle)
      }
      el.style.setProperty('--zoom', current.toFixed(4))
    }
    // measure the clipping frame around it: the element itself is the one being scaled
    const frame = el.parentElement ?? el
    const measure = () => {
      const r = frame.getBoundingClientRect()
      target = 1 + (from - 1) * zoomProgress(range, r.top, r.height, window.innerHeight)
      // the first frame lands directly so nothing animates on page load
      if (current < 0) current = target
      if (!raf) raf = requestAnimationFrame(settle)
    }
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [ref, range, from, enabled])
}
