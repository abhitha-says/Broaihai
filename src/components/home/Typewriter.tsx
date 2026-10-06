'use client'

import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/lib/hooks'
import { whenLoaderDone } from '@/lib/loader'
import styles from './Typewriter.module.css'

type Props = {
  text: string
  /** The element it is: the hero's headline is an h1. */
  as?: 'p' | 'h1' | 'h2'
  /** Words that are lit in the accent colour (electric blue). */
  accent?: string[]
  /** ms to wait after the opening loader lifts (or the page mounts) before the first key is struck. */
  startDelay?: number
  className?: string
}

/**
 * Keystroke times (ms from the first key), the same on server and client. Each key
 * lands 55-125ms after the last, spaces take a beat longer, and the typist pauses
 * once after the second word, the way a person does when the line is about to land.
 */
function keystrokes(text: string) {
  const times: number[] = []
  let at = 0
  let spaces = 0
  for (let i = 0; i < text.length; i++) {
    times.push(at)
    const wobble = (Math.imul(i + 1, 2654435761) >>> 0) % 1000
    at += 55 + (wobble / 1000) * 70
    if (text[i] === ' ') {
      at += 90
      if (++spaces === 2) at += 200
    }
  }
  return times
}

/**
 * A line that types itself: every letter arrives on its own keystroke behind an electric-blue
 * caret that blinks while it waits. The untyped letters are laid out but transparent,
 * so the line never reflows. It starts hidden (a stylesheet rule shows it at once for
 * reduced motion, and a <noscript> rule without JS), so it never flashes complete.
 */
export function Typewriter({ text, as: Tag = 'p', accent = [], startDelay = 0, className }: Props) {
  const total = text.length
  const reduced = useReducedMotion()
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (reduced) return
    const times = keystrokes(text)
    let frame = 0
    let elapsed = 0
    let last = 0
    let n = 0
    // Time only passes while frames are drawn, and never more than 100ms per frame, and
    // at most one key lands per frame: a hidden tab or a stalled frame can slow the
    // typing down but can never make several letters arrive in one clump.
    const tick = (now: number) => {
      elapsed += Math.min(Math.max(now - last, 0), 100)
      last = now
      if ((times[n] ?? Infinity) <= elapsed) setTyped(++n)
      if (n < times.length) frame = requestAnimationFrame(tick)
    }
    let timer = 0
    const stop = whenLoaderDone(() => {
      timer = window.setTimeout(() => {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }, startDelay)
    })
    return () => {
      stop()
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [text, startDelay, reduced])

  const shown = reduced ? total : typed
  const caret = <i key="caret" className={styles.caret} aria-hidden />

  const nodes: ReactNode[] = []
  let at = 0
  text.split(/( )/).forEach((token, t) => {
    if (token === ' ') {
      if (shown === at) nodes.push(caret)
      nodes.push(' ')
      at += 1
      return
    }
    const hot = accent.includes(token)
    const first = at
    nodes.push(
      <span key={t} className={styles.word}>
        {token.split('').map((letter, l) => {
          const index = first + l
          const cls = [styles.letter, index < shown && styles.on, hot && styles.accent].filter(Boolean).join(' ')
          return (
            <Fragment key={l}>
              {shown === index && caret}
              <span className={cls}>{letter}</span>
            </Fragment>
          )
        })}
      </span>,
    )
    at += token.length
  })
  if (shown >= total) nodes.push(caret)

  return (
    <Tag className={[styles.line, className].filter(Boolean).join(' ')} data-typewriter>
      <noscript>
        <style>{'[data-typewriter] span{color:inherit!important}[data-typewriter] i{display:none}'}</style>
      </noscript>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{nodes}</span>
    </Tag>
  )
}
