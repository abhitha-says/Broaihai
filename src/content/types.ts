import type { StaticImageData } from 'next/image'

/** An image plus what a screen reader should hear and where the crop should hold. */
export type Picture = {
  src: StaticImageData
  alt: string
  /** CSS object-position, for photos whose subject sits off-centre. Defaults to centre. */
  position?: string
}

export type Link = {
  label: string
  href: string
  external?: boolean
}

/**
 * The case study behind a project; only projects with one get their own page.
 * Everything optional can be left out and the page simply skips it.
 */
export type ProjectDetail = {
  /** The one-line description under the title. */
  tagline: string
  /** The live site; the hero screen opens it in a new tab when set. */
  website?: string
  client: string
  overview: string
  challenge?: string
  approach: string
  results: string
  services?: string[]
  technologies?: string[]
  features?: { title: string; body: string }[]
  /** One wide screen, then two half-width screens, all from the live site. */
  gallery: [Picture, Picture, Picture]
}

export type Project = {
  slug: string
  title: string
  year: number
  category: string
  /** The cover on the cards and the main screen on the project page. */
  image: Picture
  /** A looping clip that replaces the cover inside the hero screen (the cover stays its poster). */
  heroVideo?: string
  /** Colours for the big name in the hero, top to bottom; defaults to the Velory blue. */
  wordColors?: [top: string, bottom: string]
  detail?: ProjectDetail
}

export type DetailedProject = Project & { detail: ProjectDetail }

export type Service = {
  title: string
  description: string
  image: Picture
  background: Picture
}

export type ServiceVisual = 'web' | 'mobile' | 'saas' | 'ai' | 'software' | 'design'

export type Capability = {
  number: string
  title: string
  /** The one-line summary that opens the card. */
  tagline: string
  description: string
  tags: string[]
  visual: ServiceVisual
}

export type Stat = {
  value: string
  prefix: string
  label: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: Picture
  portrait: Picture
  /** The thumbnail crop differs from the portrait's for some people. */
  thumbPosition?: string
}

export type Faq = {
  question: string
  answer: string
}

export type ComparisonRow = {
  typical: string
  broAi: string
}

/** One phrase in a scrolling word line: a solid word, then a ghosted one. */
export type WordPair = readonly [strong: string, ghost: string]
