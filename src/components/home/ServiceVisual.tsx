import type { ServiceVisual } from '@/content/types'

/*
 * One quiet line drawing per service: thin ink strokes with a single accent mark.
 * Strokes use currentColor so the card controls the tone; `.accent` and `.float`
 * are styled in Capabilities.module.css.
 */
const line = { fill: 'none', stroke: 'currentColor', strokeOpacity: 0.28, strokeWidth: 1.25 } as const
const soft = { fill: 'currentColor', fillOpacity: 0.07 } as const
const bar = { fill: 'currentColor', fillOpacity: 0.16 } as const

function Web() {
  return (
    <g>
      <rect x="28" y="38" width="264" height="184" rx="12" {...line} />
      <path d="M28 66h264" {...line} />
      <circle cx="46" cy="52" r="3" {...bar} />
      <circle cx="58" cy="52" r="3" {...bar} />
      <circle cx="70" cy="52" r="3" {...bar} />
      <rect x="212" y="48" width="64" height="8" rx="4" {...bar} />
      <rect x="48" y="90" width="120" height="12" rx="6" {...bar} />
      <rect x="48" y="110" width="84" height="12" rx="6" {...bar} />
      <rect x="48" y="136" width="96" height="6" rx="3" {...soft} />
      <rect x="48" y="148" width="72" height="6" rx="3" {...soft} />
      <rect x="48" y="176" width="64" height="24" rx="12" className="accent" />
      <g className="float">
        <rect x="188" y="88" width="84" height="112" rx="10" {...line} {...soft} />
        <circle cx="230" cy="130" r="20" {...line} />
        <path d="M200 184h60" {...line} />
      </g>
    </g>
  )
}

function Mobile() {
  return (
    <g>
      <rect x="168" y="46" width="92" height="172" rx="16" {...line} {...soft} />
      <g className="float">
        <rect x="88" y="26" width="108" height="208" rx="20" fill="var(--panel)" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.25} />
        <rect x="124" y="36" width="36" height="6" rx="3" {...bar} />
        <rect x="102" y="58" width="80" height="44" rx="10" {...soft} {...line} />
        <circle cx="116" cy="80" r="8" className="accent" />
        <rect x="130" y="73" width="40" height="5" rx="2.5" {...bar} />
        <rect x="130" y="83" width="28" height="5" rx="2.5" {...soft} />
        <rect x="102" y="112" width="80" height="34" rx="10" {...line} />
        <rect x="102" y="154" width="80" height="34" rx="10" {...line} />
        <path d="M102 208h80" {...line} />
        <circle cx="120" cy="216" r="3" {...bar} />
        <circle cx="142" cy="216" r="3" {...bar} />
        <circle cx="164" cy="216" r="3" {...bar} />
      </g>
    </g>
  )
}

function Saas() {
  return (
    <g>
      <rect x="24" y="34" width="272" height="192" rx="12" {...line} />
      <path d="M78 34v192" {...line} />
      <rect x="38" y="52" width="26" height="8" rx="4" className="accent" />
      <rect x="38" y="76" width="26" height="6" rx="3" {...bar} />
      <rect x="38" y="92" width="26" height="6" rx="3" {...soft} />
      <rect x="38" y="108" width="26" height="6" rx="3" {...soft} />
      <rect x="94" y="52" width="58" height="36" rx="8" {...line} />
      <rect x="160" y="52" width="58" height="36" rx="8" {...line} />
      <rect x="226" y="52" width="58" height="36" rx="8" {...line} />
      <rect x="104" y="62" width="22" height="6" rx="3" {...bar} />
      <rect x="170" y="62" width="22" height="6" rx="3" {...bar} />
      <rect x="236" y="62" width="22" height="6" rx="3" {...bar} />
      <g className="float">
        <rect x="94" y="104" width="190" height="108" rx="8" {...soft} />
        <rect x="108" y="170" width="16" height="30" rx="3" {...bar} />
        <rect x="134" y="154" width="16" height="46" rx="3" {...bar} />
        <rect x="160" y="140" width="16" height="60" rx="3" {...bar} />
        <rect x="186" y="124" width="16" height="76" rx="3" className="accent" />
        <rect x="212" y="146" width="16" height="54" rx="3" {...bar} />
        <rect x="238" y="132" width="16" height="68" rx="3" {...bar} />
      </g>
    </g>
  )
}

function Ai() {
  const nodes: [number, number][] = [
    [64, 66],
    [256, 58],
    [52, 188],
    [262, 196],
  ]
  return (
    <g>
      {nodes.map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M160 130L${x} ${y}`} {...line} />
      ))}
      <circle cx="160" cy="130" r="54" {...line} strokeDasharray="2 6" />
      {nodes.map(([x, y]) => (
        <g key={`n${x}-${y}`}>
          <rect x={x - 22} y={y - 14} width="44" height="28" rx="8" fill="var(--panel)" stroke="currentColor" strokeOpacity={0.3} strokeWidth={1.25} />
          <rect x={x - 12} y={y - 3} width="24" height="6" rx="3" {...bar} />
        </g>
      ))}
      <g className="float">
        <circle cx="160" cy="130" r="30" fill="var(--panel)" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.25} />
        <circle cx="160" cy="130" r="9" className="accent" />
      </g>
    </g>
  )
}

function Software() {
  return (
    <g>
      <rect x="28" y="36" width="264" height="188" rx="12" {...line} />
      <path d="M28 70h264" {...line} />
      <rect x="46" y="48" width="56" height="8" rx="4" {...bar} />
      <rect x="116" y="48" width="40" height="8" rx="4" {...soft} />
      <rect x="236" y="46" width="40" height="14" rx="7" className="accent" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 86 + i * 28
        const hot = i === 2
        return (
          <g key={i} className={hot ? 'float' : undefined}>
            {hot && <rect x="38" y={y - 8} width="244" height="26" rx="8" {...soft} {...line} />}
            <rect x="50" y={y} width="10" height="10" rx="3" {...line} strokeOpacity={hot ? 0.6 : 0.28} />
            <rect x="76" y={y + 2} width={72 - i * 6} height="6" rx="3" {...bar} />
            <rect x="170" y={y + 2} width="44" height="6" rx="3" {...soft} />
            <rect x="238" y={y + 2} width="32" height="6" rx="3" {...bar} />
          </g>
        )
      })}
    </g>
  )
}

function Design() {
  return (
    <g>
      <rect x="40" y="60" width="150" height="130" rx="12" {...line} {...soft} />
      <rect x="64" y="44" width="150" height="130" rx="12" {...line} fill="var(--panel)" />
      <g className="float">
        <rect x="88" y="28" width="150" height="130" rx="12" fill="var(--panel)" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.25} />
        <rect x="106" y="48" width="64" height="10" rx="5" {...bar} />
        <rect x="106" y="68" width="100" height="6" rx="3" {...soft} />
        <rect x="106" y="80" width="84" height="6" rx="3" {...soft} />
        <rect x="106" y="108" width="52" height="30" rx="8" className="accent" />
        <rect x="166" y="108" width="52" height="30" rx="8" {...line} />
      </g>
      <circle cx="238" cy="204" r="9" className="accent" />
      <circle cx="262" cy="204" r="9" {...bar} />
      <circle cx="286" cy="204" r="9" {...line} />
      <path d="M40 204h160" {...line} strokeDasharray="2 5" />
    </g>
  )
}

const drawings = { web: Web, mobile: Mobile, saas: Saas, ai: Ai, software: Software, design: Design }

export function ServiceDrawing({ name, className }: { name: ServiceVisual; className?: string }) {
  const Drawing = drawings[name]
  return (
    <svg className={className} viewBox="0 0 320 260" role="presentation" aria-hidden focusable="false">
      <Drawing />
    </svg>
  )
}
