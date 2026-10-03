'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/hooks'
import { whenLoaderDone } from '@/lib/loader'

type Ripple = { x: number; y: number; t: number; power: number }

const GRID = { desktop: 32, phone: 24 }
const IDLE = [206, 206, 206] as const
const HOT = [255, 83, 31] as const
const STEPS = 28
/** the ladder of dot colours from idle grey to brand orange, so no strings are built per frame */
const PALETTE = Array.from({ length: STEPS + 1 }, (_, k) => {
  const e = k / STEPS
  const mix = ([0, 1, 2] as const).map((i) => Math.round(IDLE[i] + (HOT[i] - IDLE[i]) * e))
  return `rgba(${mix.join(',')},${(0.62 + 0.38 * e).toFixed(2)})`
})

const RIPPLE_SPEED = 600 // px per second
const RIPPLE_BAND = 90 // px, half-width of the lit ring
const RIPPLE_LIFE = 2.5 // seconds
const HEARTBEAT = 4.6 // seconds between pulses from the mark
const LENS = 200 // px, reach of the pointer
const PUSH = 15 // px the dots lean away from the pointer

/**
 * The hero's living backdrop: a field of dots on a canvas. A pulse leaves the brand
 * mark when the page opens and again every few seconds, the pointer bends the dots
 * around it and lights them, and a click sends out a ripple. It also feeds the
 * pointer's position to the section as --px / --py (-1..1, eased) for the parallax
 * in the stylesheet. Sleeps while off screen; with reduced motion it draws once.
 */
export function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.closest('section')
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const clock = () => performance.now() / 1000
    const ripples: Ripple[] = []
    const pointer = { x: 0, y: 0, sx: 0, sy: 0, on: false, lens: 0 }
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 }
    let w = 0
    let h = 0
    let gap: number = GRID.desktop
    let cols = 0
    let rows = 0
    let left = 0
    let top = 0
    let beat = Infinity
    let frame = 0
    let sentX = ''
    let sentY = ''
    let visible = true

    const measure = () => {
      const box = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = box.width
      h = box.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gap = w < 810 ? GRID.phone : GRID.desktop
      cols = Math.ceil(w / gap) + 1
      rows = Math.ceil(h / gap) + 1
      left = (w - (cols - 1) * gap) / 2
      top = (h - (rows - 1) * gap) / 2
    }

    /** where a pulse starts: the centre of the brand mark's tile */
    const origin = () => {
      const mark = host.querySelector('[data-hero-origin]')?.getBoundingClientRect()
      const box = canvas.getBoundingClientRect()
      return mark
        ? { x: mark.left + mark.width / 2 - box.left, y: mark.top + mark.height / 2 - box.top }
        : { x: w / 2, y: h * 0.4 }
    }

    const pulse = (power: number) => {
      const { x, y } = origin()
      ripples.push({ x, y, t: clock(), power })
    }

    /** dots are held back behind the words so they read cleanly, and lit dots always show in full */
    const calm = (x: number, y: number) => {
      const d = Math.hypot((x - w * 0.5) / (w * 0.64), (y - h * 0.46) / (h * 0.58))
      return d >= 0.82 ? 1 : 0.3 + (0.7 * d) / 0.82
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r]
        if (ripple && t - ripple.t > RIPPLE_LIFE) ripples.splice(r, 1)
      }
      const lens = pointer.lens

      for (let j = 0; j < rows; j++) {
        const y = top + j * gap
        for (let i = 0; i < cols; i++) {
          const x = left + i * gap
          let energy = 0.09 * Math.max(0, Math.sin(t * 0.8 + i * 0.45 + j * 0.7))

          for (const rip of ripples) {
            const age = t - rip.t
            const k = (Math.hypot(x - rip.x, y - rip.y) - age * RIPPLE_SPEED) / RIPPLE_BAND
            energy += rip.power * Math.exp(-k * k) * (1 - age / RIPPLE_LIFE)
          }

          let px = x
          let py = y
          if (lens > 0.001) {
            const dx = x - pointer.sx
            const dy = y - pointer.sy
            const dist = Math.hypot(dx, dy) || 1
            const near = Math.max(0, 1 - dist / LENS)
            const f = near * near * (3 - 2 * near) * lens
            energy += f * 0.95
            px += (dx / dist) * f * PUSH
            py += (dy / dist) * f * PUSH
          }

          const e = energy > 1 ? 1 : energy
          const rest = calm(x, y)
          ctx.globalAlpha = rest + (1 - rest) * e
          ctx.fillStyle = PALETTE[Math.round(e * STEPS)] ?? PALETTE[0] ?? '#ccc'
          ctx.beginPath()
          ctx.arc(px, py, 1.15 + e * 2.7, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = () => {
      const t = clock()
      if (t >= beat) {
        pulse(0.85)
        beat = t + HEARTBEAT
      }
      // ease the pointer, its lens and the parallax toward their targets
      pointer.sx += (pointer.x - pointer.sx) * 0.16
      pointer.sy += (pointer.y - pointer.sy) * 0.16
      pointer.lens += ((pointer.on ? 1 : 0) - pointer.lens) * 0.09
      parallax.x += (parallax.tx - parallax.x) * 0.07
      parallax.y += (parallax.ty - parallax.y) * 0.07
      const px = parallax.x.toFixed(3)
      const py = parallax.y.toFixed(3)
      if (px !== sentX) host.style.setProperty('--px', (sentX = px))
      if (py !== sentY) host.style.setProperty('--py', (sentY = py))
      draw(t)
      frame = requestAnimationFrame(loop)
    }
    const run = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop)
    }
    const sleep = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const box = canvas.getBoundingClientRect()
      pointer.x = e.clientX - box.left
      pointer.y = e.clientY - box.top
      if (!pointer.on) {
        pointer.sx = pointer.x
        pointer.sy = pointer.y
      }
      pointer.on = true
      parallax.tx = Math.max(-1, Math.min(1, (pointer.x / box.width) * 2 - 1))
      parallax.ty = Math.max(-1, Math.min(1, (pointer.y / box.height) * 2 - 1))
    }
    const onLeave = () => {
      pointer.on = false
      parallax.tx = 0
      parallax.ty = 0
    }
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element).closest('a, button')) return
      const box = canvas.getBoundingClientRect()
      ripples.push({ x: e.clientX - box.left, y: e.clientY - box.top, t: clock(), power: 1 })
      if (ripples.length > 8) ripples.shift()
    }

    measure()
    const resize = new ResizeObserver(() => {
      measure()
      if (!frame) draw(clock())
    })
    resize.observe(canvas)

    if (reduced) {
      draw(0)
      return () => resize.disconnect()
    }

    const watch = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting)
      if (visible) run()
      else sleep()
    })
    watch.observe(host)

    const onVisibility = () => (document.hidden ? sleep() : run())
    document.addEventListener('visibilitychange', onVisibility)
    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('pointerdown', onDown)

    run()
    // the first pulse leaves the mark just as the page opens (after the loader, if one is playing)
    let firstPulse = 0
    const cancelGate = whenLoaderDone(() => {
      firstPulse = window.setTimeout(() => {
        pulse(1.1)
        beat = clock() + HEARTBEAT
      }, 450)
    })

    return () => {
      sleep()
      cancelGate()
      clearTimeout(firstPulse)
      resize.disconnect()
      watch.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('pointerdown', onDown)
      host.style.removeProperty('--px')
      host.style.removeProperty('--py')
    }
  }, [reduced])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
