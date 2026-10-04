'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { stackIntro } from '@/content/home'
import { stackFilters, tools, type StackFilter } from '@/content/stack'
import { Section } from '@/components/ui/Section'
import { StackIcon } from './StackIcons'
import { useHydrated } from '@/lib/hooks'
import { Counter } from './Counter'
import styles from './Stack.module.css'

const words = stackIntro.title.split(' ')
const matches = (filter: StackFilter, i: number) => filter === 'all' || tools[i]!.filters.includes(filter)
const counts = Object.fromEntries(stackFilters.map((f) => [f.id, tools.filter((_, i) => matches(f.id, i)).length])) as Record<StackFilter, number>
/*
 * The pointer pushes every tile directly away from itself: PUSH px at the pointer,
 * falling off linearly to nothing at REACH px (measured from the reference).
 * The nearest tile within REACH is also marked as the one the pointer is on.
 */
const PUSH = 14
const REACH = 140
const RISE = 24
const ACCENT_WORD = 3

/**
 * The tools sit in one grid whose DOM order never changes. Picking a filter moves
 * the matches to the first slots and dims the rest, by transform only, so the
 * cells slide as one surface instead of being unmounted and remounted.
 */
export function Stack() {
  const hydrated = useHydrated()
  const [filter, setFilter] = useState<StackFilter>('all')
  const [entered, setEntered] = useState(false)
  const [live, setLive] = useState(false)
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
    // the ambient drift only runs while the section is on screen
    const watch = new IntersectionObserver(([entry]) => setLive(!!entry?.isIntersecting))
    watch.observe(el)
    return () => {
      io.disconnect()
      watch.disconnect()
    }
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
      const rise = entered ? 0 : RISE
      el.style.translate = x || y || rise ? `${x}px ${y + rise}px` : '0px'
    })
  }, [filter, entered])

  useLayoutEffect(arrange, [arrange])
  useEffect(() => {
    const gridEl = grid.current
    if (!gridEl) return
    const ro = new ResizeObserver(arrange)
    ro.observe(gridEl)
    return () => ro.disconnect()
  }, [arrange])

  // the pointer pushes tiles away from itself; the nearest one is marked
  useEffect(() => {
    const area = root.current
    if (!area) return
    let raf = 0
    let x = 0
    let y = 0
    let near: HTMLElement | null = null
    const mark = (next: HTMLElement | null) => {
      if (next === near) return
      near?.removeAttribute('data-near')
      next?.setAttribute('data-near', '')
      near = next
    }
    const run = () => {
      raf = 0
      let best: HTMLElement | null = null
      let bestDistance = REACH
      cells.current.forEach((cell, i) => {
        const chip = cell?.firstElementChild as HTMLElement | null
        if (!cell || !chip) return
        const r = cell.getBoundingClientRect()
        const dx = r.left + r.width / 2 - x
        const dy = r.top + r.height / 2 - y
        const d = Math.hypot(dx, dy)
        const push = d < REACH && d > 0 ? PUSH * (1 - d / REACH) : 0
        chip.style.translate = push ? `${((dx / d) * push).toFixed(2)}px ${((dy / d) * push).toFixed(2)}px` : '0px'
        if (d < bestDistance && matches(filter, i)) {
          best = chip
          bestDistance = d
        }
      })
      mark(best)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(run)
    }
    const leave = (e?: PointerEvent) => {
      // a lifted finger also "leaves"; the tapped tile stays marked until the next tap
      if (e && e.pointerType !== 'mouse') return
      cancelAnimationFrame(raf)
      raf = 0
      mark(null)
      cells.current.forEach((cell) => {
        const chip = cell?.firstElementChild as HTMLElement | null
        if (chip) chip.style.translate = '0px'
      })
    }
    // on touch there is no pointer to be near: a tap marks the tile instead
    const tap = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      const chip = (e.target as Element).closest<HTMLElement>('[data-chip]')
      mark(chip && !chip.hasAttribute('data-dim') ? chip : null)
    }
    area.addEventListener('pointermove', move)
    area.addEventListener('pointerleave', leave)
    area.addEventListener('pointerdown', tap)
    return () => {
      leave()
      area.removeEventListener('pointermove', move)
      area.removeEventListener('pointerleave', leave)
      area.removeEventListener('pointerdown', tap)
    }
  }, [filter])

  return (
    <Section id="stack" bandClassName={styles.band} className={styles.container}>
      <div ref={root} className={styles.root} data-state={!hydrated ? 'static' : entered ? 'in' : 'out'}
        data-live={live || undefined}
      >
        <div className={styles.top}>
          <div className={styles.headline}>
            <p className={styles.eyebrow}>
              <i aria-hidden />
              <span>{stackIntro.label}</span>
            </p>
            <h2 className={`t-h2 ${styles.title}`}>
              <span className="sr-only">{stackIntro.title}</span>
              <span aria-hidden>
                {words.map((word, i) => (
                  <span key={i}>
                    <span className={styles.mask}>
                      <span
                        className={styles.word}
                        data-accent={i === ACCENT_WORD || undefined}
                        style={{ '--w': i } as React.CSSProperties}
                      >
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
              style={{ '--i': i, '--float': `${(4.6 + ((i * 37) % 10) * 0.26).toFixed(2)}s`, '--phase': `${(-((i * 83) % 47) / 10).toFixed(1)}s` } as React.CSSProperties}
            >
              <div className={styles.chip} data-chip data-dim={!matches(filter, i) || undefined}>
                <span className={styles.mark} aria-hidden>
                  {tool.icon ? <StackIcon id={tool.icon} /> : tool.mark}
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
