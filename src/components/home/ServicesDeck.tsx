'use client'

import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { COMPACT, useMediaQuery, useReducedMotion } from '@/lib/hooks'
import { clamp01, useScrollFrame } from '@/lib/scroll'

/**
 * The service cards' stacking, on tablet and phone. Each card still sticks under
 * the header in turn (CSS), and the scroll writes two numbers on every slot:
 *
 *   --arrive  0 as the card's top enters at the bottom edge, 1 once it has climbed
 *             to its resting place: its photo settles from a zoom and its copy rises
 *   --cover   how far the next card has climbed over this one, 0 to 1: the card
 *             sinks back and dims under it, so the deck reads with depth
 *
 * Desktop never runs this: its cards keep the full-height stacking they already have.
 */
export function ServicesDeck({ className, children }: { className?: string; children: ReactNode }) {
  const compact = useMediaQuery(COMPACT)
  const reduced = useReducedMotion()
  const list = useRef<HTMLUListElement>(null)
  const live = compact && !reduced

  const frame = useCallback((_: number, vh: number) => {
    const el = list.current
    if (!el) return
    const slots = Array.from(el.children) as HTMLElement[]
    slots.forEach((slot, i) => {
      const r = slot.getBoundingClientRect()
      const stick = parseFloat(getComputedStyle(slot).top) || 0
      const arrive = clamp01((vh - r.top) / Math.max(1, vh - stick))
      const next = slots[i + 1]
      const cover = next ? clamp01(1 - (next.getBoundingClientRect().top - r.top) / Math.max(1, r.height)) : 0
      slot.style.setProperty('--arrive', arrive.toFixed(4))
      slot.style.setProperty('--cover', cover.toFixed(4))
    })
  }, [])

  useScrollFrame(frame, live)

  // leaving the compact layout (or motion) clears every written value
  useEffect(() => {
    if (live) return
    const el = list.current
    if (!el) return
    Array.from(el.children).forEach((slot) => {
      ;(slot as HTMLElement).style.removeProperty('--arrive')
      ;(slot as HTMLElement).style.removeProperty('--cover')
    })
  }, [live])

  return (
    <ul ref={list} className={className} data-deck={live || undefined}>
      {children}
    </ul>
  )
}
