'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { stackIntro } from '@/content/home'
import { stackFilters, tools, type StackFilter } from '@/content/stack'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useHydrated } from '@/lib/hooks'
import { Counter } from './Counter'
import styles from './Stack.module.css'

const words = stackIntro.title.split(' ')
const matches = (filter: StackFilter, i: number) => filter === 'all' || tools[i]!.filters.includes(filter)
const counts = Object.fromEntries(stackFilters.map((f) => [f.id, tools.filter((_, i) => matches(f.id, i)).length])) as Record<StackFilter, number>
/** How close (px) the pointer has to get to a tool before it answers. */
const NEAR = 64

/**
 * The tools sit in one grid whose DOM order never changes. Picking a filter moves
 * the matches to the first slots and dims the rest, by transform only, so the
 * cells slide as one surface instead of being unmounted and remounted.
 */
export function Stack() {
  const hydrated = useHydrated()
  const [filter, setFilter] = useState<StackFilter>('all')
  const [entered, setEntered] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLUListElement>(null)
  const cells = useRef<(HTMLLIElement | null)[]>([])

  // reveal once, when the section is a little way into view
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setEntered(true)
        io.disconnect()
      },
      { rootMargin: '0px 0px -14% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // slot every cell: matches first, in their own order, then the rest
  const arrange = useCallback(() => {
    const gridEl = grid.current
    const first = cells.current[0]
    if (!gridEl || !first) return
    const cs = getComputedStyle(gridEl)
    const cols = cs.gridTemplateColumns.split(' ').length
    const stepX = first.offsetWidth + parseFloat(cs.columnGap)
    const stepY = first.offsetHeight + parseFloat(cs.rowGap)
    const order = [...tools.keys()].sort((a, b) => Number(matches(filter, b)) - Number(matches(filter, a)) || a - b)
    order.forEach((toolIndex, slot) => {
      const el = cells.current[toolIndex]
      if (!el) return
      const x = ((slot % cols) - (toolIndex % cols)) * stepX
      const y = (Math.floor(slot / cols) - Math.floor(toolIndex / cols)) * stepY
      el.style.translate = x || y ? `${x}px ${y}px` : '0px'
    })
  }, [filter])

  useLayoutEffect(arrange, [arrange])
  useEffect(() => {
    const gridEl = grid.current
    if (!gridEl) return
    const ro = new ResizeObserver(arrange)
    ro.observe(gridEl)
    return () => ro.disconnect()
  }, [arrange])

  // the nearest tool answers before the pointer reaches it
  useEffect(() => {
    const gridEl = grid.current
    if (!gridEl) return
    let raf = 0
    let x = 0
    let y = 0
    let near: HTMLElement | null = null
    const set = (next: HTMLElement | null) => {
      if (next === near) return
      near?.removeAttribute('data-near')
      next?.setAttribute('data-near', '')
      near = next
    }
    const run = () => {
      raf = 0
      let best: HTMLElement | null = null
      let bestDistance = NEAR
      cells.current.forEach((cell, i) => {
        const chip = cell?.firstElementChild as HTMLElement | null
        if (!chip || !matches(filter, i)) return
        const r = chip.getBoundingClientRect()
        const d = Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom))
        if (d < bestDistance) {
          best = chip
          bestDistance = d
        }
      })
      set(best)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(run)
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      raf = 0
      set(null)
    }
    gridEl.addEventListener('pointermove', move)
    gridEl.addEventListener('pointerleave', leave)
    return () => {
      leave()
      gridEl.removeEventListener('pointermove', move)
      gridEl.removeEventListener('pointerleave', leave)
    }
  }, [filter])

  return (
    <Section id="stack" bandClassName={styles.band} className={styles.container}>
      <div ref={root} className={styles.root} data-state={!hydrated ? 'static' : entered ? 'in' : 'out'}>
        <div className={styles.top}>
          <div className={styles.headline}>
            <span className={styles.eyebrow}>
              <SectionLabel>{stackIntro.label}</SectionLabel>
            </span>
            <h2 className={`t-h2 ${styles.title}`}>
              <span className="sr-only">{stackIntro.title}</span>
              <span aria-hidden>
                {words.map((word, i) => (
                  <span key={i}>
                    <span className={styles.mask}>
                      <span className={styles.word} style={{ '--w': i } as React.CSSProperties}>
                        {word}
                      </span>
                    </span>{' '}
                  </span>
                ))}
              </span>
            </h2>
          </div>
          <div className={styles.side}>
            <p className={`t-body-lg ${styles.lead}`}>{stackIntro.body}</p>
            <p className={`t-small ${styles.total}`}>
              <Counter value={String(tools.length)} />
              <span>{stackIntro.total}</span>
            </p>
          </div>
        </div>

        <div className={styles.tabs} role="group" aria-label="Filter the stack">
          {stackFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.tab}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              <i aria-hidden />
              {f.label}
              <sup>{String(counts[f.id]).padStart(2, '0')}</sup>
            </button>
          ))}
        </div>

        <ul ref={grid} className={styles.grid}>
          {tools.map((tool, i) => (
            <li
              key={tool.name}
              ref={(el) => {
                cells.current[i] = el
              }}
              className={styles.cell}
              style={{ '--i': Math.min(i, 14) } as React.CSSProperties}
            >
              <div className={styles.chip} data-dim={!matches(filter, i) || undefined}>
                <span className={styles.mark} aria-hidden>
                  {tool.mark}
                </span>
                <span className={styles.text}>
                  <b>{tool.name}</b>
                  <em>{tool.kind}</em>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
