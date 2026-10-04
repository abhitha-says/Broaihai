'use client'

import { useSyncExternalStore } from 'react'

const REDUCED = '(prefers-reduced-motion: reduce)'

function subscribeReduced(onChange: () => void) {
  const mq = matchMedia(REDUCED)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/** Live `prefers-reduced-motion`. The server assumes motion is allowed. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => matchMedia(REDUCED).matches,
    () => false,
  )
}

/**
 * Live result of any media query, for behaviour that differs by viewport or
 * input (the server and the first client render both assume `false`).
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => matchMedia(query).matches,
    () => false,
  )
}

/** Tablet and phone: everything under the desktop layout. */
export const COMPACT = '(max-width: 1199.98px)'
/** Phones only. */
export const PHONE = '(max-width: 767.98px)'

const noop = () => () => {}

/**
 * False while rendering on the server and during hydration, true afterwards.
 * For markup that should read correctly without JS but start from a different
 * state once JS has taken over (the counters render their final value).
 */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
