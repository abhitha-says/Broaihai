// Copy the images and fonts this site uses out of the Framer capture, under names
// that say what they are. Re-runnable; the capture itself is never modified.
//
//   npm run assets               copy from the capture
//   npm run assets -- --fetch    also download images the capture missed (see MISSING)
//
// Framer stores several resolutions of each image as <id>-<hash>.png. The largest
// one is kept and next/image does the resizing, so each image exists once here.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const CAPTURE = process.env.BROAIHAI_CAPTURE ?? 'D:/exporter/exports/capture'
const OUT_IMAGES = 'src/assets/images'
const OUT_FONTS = 'src/fonts'

/** Framer image id -> path under public/images (extension added from the source). */
const IMAGES = {
  // brand
  '41ikECXjrgKLzQY0bpTvrEVIKE8': 'brand/logo',
  aiF511HeJYSNelubuWtRGROLdf4: 'brand/wordmark',
  // hero
  '878XZrkcsKwUbqBvRhg91lPM0': 'hero/ethan-cole',
  Sg1KDrRz1r6dJaEWTsdsh0FJIM: 'hero/slide-1a',
  EovHoUtUUzm9MOvpZDL9WKynug: 'hero/slide-1b',
  uJT96JhqR4RQpLY8hSPlHBmwIoI: 'hero/slide-2a',
  ih7puSmCDjPgbCiNEFcOPuDnnaM: 'hero/slide-2b',
  '43SjwjPofHfWYquwOVP39soIss': 'hero/slide-3a',
  rzlWmmENfXMPfjeVwO5NkM638: 'hero/slide-3b',
  ywM1WC62V8aI4M7G3P747hlvWxQ: 'hero/slide-4a',
  '8nMxSyWjKobPM9BGf0WUaRs6ZXk': 'hero/slide-4b',
  VLZqPYxMnp0RmaPdNLJ7TQVLrlM: 'hero/slide-5a',
  bpmtYgjwofwQyv0xq5jK2EFrjQ: 'hero/slide-5b',
  // client logos
  '6vhkVtr465KqtoaodFd4T1OBoY': 'clients/quotient',
  pItweTtlE6c5aF7E2amtbLygdI: 'clients/capsule',
  T0k1l4QHKDwMdISOddtXXs87HI: 'clients/featherdev',
  CsHIHJnyuDDJJ4fUvKjm43fdO20: 'clients/hourglass',
  DlkBvcNiDEJUl4x0gxsn2vlJOc: 'clients/epicurious',
  '5McW8lYsNwtnoun2VT04pU5hpDA': 'clients/sisyphus',
  F80PMTuuVUETYIebygVLH1lw5uc: 'clients/command-r',
  DvbxWMM178hbmKRFviVI4nfoQL0: 'clients/galileo',
  // about reels
  '9WDiSvZ5PgCRNLVFGlf8LtBaVuQ': 'about/creative-vision',
  '4yAJ7XQ5FoHtgPhf9rjuAVwMpus': 'about/human-centered',
  CKIxb3K4ykvzUwihqj6oLHX8zKQ: 'about/innovate-differently',
  // services
  tDR8yxWLObApoUTs1DYbstEZ9o: 'services/web-design-bg',
  '4dGYmtVhz1yVWUZBnBOFnZt0k': 'services/web-design',
  '7FIpftLkLNt5JnacjQGwElvDUc': 'services/brand-identity-bg',
  '6Svm7fHUmRaWIRjV4uj5a3jcYdo': 'services/brand-identity',
  bauX7Y2YTuLiO4cOdbSNF5jyMI: 'services/ui-ux-strategy-bg',
  RB1vVHGksNSITCps2Pl2B6QGrm4: 'services/ui-ux-strategy',
  rx6njnrtO7zrLgNCwb461RxM6Y: 'services/creative-development-bg',
  xEnfLV1pgpJewu0paHMR7z8WvM: 'services/creative-development',
  // projects
  J0id6xK2tYJyLtWyJ5omeXJtsQ: 'projects/hero-studio',
  Q1DgmGkkKVeMA8n4yrQyoDHa1U: 'projects/horizon-app-ui',
  MgrlLz9baVJI2cny1j3egI4wD8: 'projects/pulse-creative-studio',
  igKy0APXqgIkCTMCBZkIVMYUlDw: 'projects/vertex-analytics',
  WU31Z8JBFMGfHHy2qzja7Yxphc: 'projects/arclight-interior',
  Kmzg8dpvQfT7kxvS3uVt2UrN3I: 'projects/auralis-system',
  glE6IoioHyLgB2PzkSyVAgsz0g: 'projects/orbit-studio-website',
  o4WNEqFuv0NnIjjVO6jOS3Ngk: 'projects/verde-fashion',
  lXcYg4OUH5hyzNKc7W0MWeYCFxg: 'projects/luminex-portal',
  // testimonials
  wStEAZaEdt9IbgdzkwcshIZ7I: 'testimonials/ethan-miller',
  '17msBL51lkLde18edbweH8VB1KE': 'testimonials/james-porter',
  hJBxDVgFo5Lf82nYiMckA0iom8: 'testimonials/olivia-bennett',
  luTMX2FpaVFOJim3kpIIbDp5A: 'testimonials/sophia-clark',
  pgZFK2eC70bYfGZIQbwLDjlJKRE: 'icons/star',
  // footer
  J8mRZ5iU19JorleZSXOKhQzDKMI: 'footer/background',
  y8fj8QZmVGphum6sl1iCbMJuslU: 'icons/facebook',
  Rjs3GI5cwccbcb1mwdgKTd2KHns: 'icons/instagram',
  '70ipJdCegs2EVL7tl8KX89ogikI': 'icons/dribbble',
  labZWrggSWkDttMu4xKHaRKZW9k: 'icons/linkedin',
}

/**
 * Referenced only from inside a JS bundle, so the exporter never downloaded it.
 * Fetched from Framer's CDN on request (--fetch), with Chirag's go-ahead, 2026-10-02.
 */
const MISSING = {
  '4yAJ7XQ5FoHtgPhf9rjuAVwMpus': 'https://framerusercontent.com/images/4yAJ7XQ5FoHtgPhf9rjuAVwMpus.png?width=1500&height=841',
}

/** Font files by family/weight. Inter is only needed in latin, 500/600 (the reel captions). */
const FONTS = [
  { family: 'TASA Orbiter', weights: ['400', '500', '600', '700'], ranges: null },
  { family: 'Inter', weights: ['500', '600'], ranges: { 'U+0000-00FF': 'latin' } },
]

const fetchMissing = process.argv.includes('--fetch')

async function largestVariant(id) {
  const dir = path.join(CAPTURE, 'assets/images')
  const files = fs.readdirSync(dir).filter((f) => f.startsWith(`${id}-`))
  let best = null
  for (const f of files) {
    const { width = 0, height = 0 } = await sharp(path.join(dir, f)).metadata()
    if (!best || width * height > best.area) best = { file: path.join(dir, f), area: width * height, width, height }
  }
  return best
}

async function importImages() {
  let copied = 0
  const missing = []
  for (const [id, dest] of Object.entries(IMAGES)) {
    const src = await largestVariant(id)
    if (!src) {
      missing.push(id)
      continue
    }
    const out = path.join(OUT_IMAGES, dest + path.extname(src.file))
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.copyFileSync(src.file, out)
    copied++
  }
  for (const id of missing) {
    const out = path.join(OUT_IMAGES, IMAGES[id] + '.png')
    if (fs.existsSync(out)) continue
    if (!MISSING[id]) throw new Error(`image ${id} is not in the capture and has no known source`)
    if (!fetchMissing) {
      console.warn(`! ${id} (${IMAGES[id]}) is not in the capture; re-run with --fetch to download it`)
      continue
    }
    const res = await fetch(MISSING[id])
    if (!res.ok) throw new Error(`fetch ${MISSING[id]} failed: ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const meta = await sharp(buf).metadata()
    if (meta.format !== 'png') throw new Error(`expected a png for ${id}, got ${meta.format}`)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, buf)
    console.log(`fetched ${id} -> ${out} (${meta.width}x${meta.height})`)
  }
  console.log(`images: ${copied} copied from the capture`)
}

function importFonts() {
  const html = fs.readFileSync(path.join(CAPTURE, 'index.html'), 'utf8')
  const faces = [...html.matchAll(/@font-face\s*{([^}]*)}/g)].map((m) => m[1])
  fs.mkdirSync(OUT_FONTS, { recursive: true })
  let n = 0
  for (const { family, weights, ranges } of FONTS) {
    for (const face of faces) {
      if (!face.includes(`font-family: "${family}"`) && !face.includes(`font-family:"${family}"`)) continue
      const weight = (face.match(/font-weight:\s*(\d+)/) || [])[1]
      const style = (face.match(/font-style:\s*(\w+)/) || [])[1]
      if (!weights.includes(weight) || style !== 'normal') continue
      let subset = ''
      if (ranges) {
        const range = (face.match(/unicode-range:\s*([^;]+)/) || [])[1] || ''
        const key = Object.keys(ranges).find((r) => range.trim().startsWith(r))
        if (!key) continue
        subset = `-${ranges[key]}`
      }
      const url = face.match(/url\("?\.\/([^")]+)"?\)/)[1]
      const out = path.join(OUT_FONTS, `${family.toLowerCase().replace(/\s+/g, '-')}-${weight}${subset}.woff2`)
      fs.copyFileSync(path.join(CAPTURE, url), out)
      n++
    }
  }
  console.log(`fonts: ${n} files`)
}

await importImages()
importFonts()
