import ethanCole from '@/assets/images/hero/ethan-cole.png'
import slide1a from '@/assets/images/hero/slide-1a.png'
import slide1b from '@/assets/images/hero/slide-1b.png'
import slide2a from '@/assets/images/hero/slide-2a.png'
import slide2b from '@/assets/images/hero/slide-2b.png'
import slide3a from '@/assets/images/hero/slide-3a.png'
import slide3b from '@/assets/images/hero/slide-3b.png'
import slide4a from '@/assets/images/hero/slide-4a.png'
import slide4b from '@/assets/images/hero/slide-4b.png'
import slide5a from '@/assets/images/hero/slide-5a.png'
import slide5b from '@/assets/images/hero/slide-5b.png'
import quotient from '@/assets/images/clients/quotient.png'
import capsule from '@/assets/images/clients/capsule.png'
import featherdev from '@/assets/images/clients/featherdev.png'
import hourglass from '@/assets/images/clients/hourglass.png'
import epicurious from '@/assets/images/clients/epicurious.png'
import sisyphus from '@/assets/images/clients/sisyphus.png'
import commandR from '@/assets/images/clients/command-r.png'
import galileo from '@/assets/images/clients/galileo.png'
import type { ComparisonRow, Picture, Stat, WordPair } from './types'

export const hero = {
  title: 'Creative Velocity.',
  intro: 'Empowering startups and enterprises with strategy, design, and technology to create unforgettable digital experiences.',
  booking: {
    title: 'Book a Quick Call',
    host: '/with Ethan Cole',
    href: 'https://cal.com/',
    portrait: {
      src: ethanCole,
      alt: 'Portrait of man with glasses under teal and orange studio lighting',
      position: '50.6% 15.2%',
    } satisfies Picture,
  },
  /** Each slide is a pair of photos sharing one arched frame. */
  slides: [
    [
      { src: slide1a, alt: 'Bright modern living room with sunlight, armchair, and minimalist decor.' },
      { src: slide1b, alt: 'Person wearing a futuristic glowing visor with motion blur lighting.' },
    ],
    [
      { src: slide2a, alt: 'Woman walking through colorful city lights with motion blur effect.' },
      { src: slide2b, alt: 'Minimalist workspace with laptop on desk in a sunlit room.' },
    ],
    [
      { src: slide3a, alt: 'Abstract colorful light explosion with soft blurred glow.' },
      { src: slide3b, alt: 'Creative workspace with design sketches, stationery, and mood board.' },
    ],
    [
      { src: slide4a, alt: 'Bright modern office interior with large windows and plants.' },
      { src: slide4b, alt: 'Silhouette portrait with vibrant neon red and blue lighting.' },
    ],
    [
      { src: slide5a, alt: 'Decorative white blossom tree installation in a modern space.' },
      { src: slide5b, alt: 'Runner in motion captured with dynamic blur on warm background.' },
    ],
  ] satisfies [Picture, Picture][],
}

export const clients = {
  label: 'Trusted By',
  title: 'Collaborating with forward-thinking brands to create digital impact',
  logos: [
    { src: quotient, alt: 'Quotient' },
    { src: capsule, alt: 'Capsule' },
    { src: featherdev, alt: 'FeatherDev' },
    { src: hourglass, alt: 'Hourglass' },
    { src: epicurious, alt: 'Epicurious' },
    { src: sisyphus, alt: 'Sisyphus' },
    { src: commandR, alt: 'Command+R' },
    { src: galileo, alt: 'Galileo' },
  ] satisfies Picture[],
}

export const difference = {
  label: 'Why Bro AI',
  title: 'Built Different from Typical AI Agencies.',
  body: 'We focus on thoughtful technology, real execution, and solutions that solve the problem, not AI for the sake of AI.',
  typical: 'Typical Agency',
  broAi: 'Bro AI',
  rows: [
    { typical: 'Multiple Handoffs', broAi: 'One Team. Full Ownership.' },
    { typical: 'Longer Build Cycles', broAi: 'Fast, Focused Execution' },
    { typical: 'Off-the-Shelf Thinking', broAi: 'Built Around Your Need' },
    { typical: 'Wait Until It\u2019s Done', broAi: 'Build. Show. Improve.' },
    { typical: 'Hand Over a Product', broAi: 'Deliver Something You Can Use' },
  ] satisfies ComparisonRow[],
}

export const impact = {
  label: 'Our Impact',
  title: 'Turning Ideas Into Measurable Success',
  stats: [
    { prefix: '+', value: '80', label: 'Trusted Clients' },
    { prefix: '+', value: '76', label: 'Projects Delivered' },
    { prefix: '+', value: '23', label: 'Awards Won' },
    { prefix: '+', value: '20', label: 'Years Experience' },
  ] satisfies Stat[],
}

/** The two slanted lines of words between sections; the second runs the other way. */
export const wordLines = {
  first: [
    ['Create', 'Boldly'],
    ['Think', 'Forward'],
    ['Design', 'Fearlessly'],
  ] satisfies WordPair[],
  second: [
    ['Build', 'Smart'],
    ['Move', 'Differently'],
    ['Evolve', 'Constantly'],
  ] satisfies WordPair[],
}

export const servicesIntro = {
  label: 'Our Services',
  title: 'What We Create, Shapes Brands',
}

export const capabilitiesIntro = {
  label: 'What We Build',
  title: 'Everything You Need to Turn an Idea Into Something Real',
  body: 'Websites, apps, SaaS products, AI systems and custom software, designed and built by one team.',
}

export const workIntro = {
  label: 'Our Work',
  title: 'Projects That Reflect Our Design Excellence',
  closing: 'Shaping digital experiences with precision and purpose.',
  cta: { label: 'View All Projects', href: '/projects' },
}

export const testimonialsIntro = {
  label: 'Testimonial',
  title: 'Clients Words',
  cta: { label: 'Read About Us', href: '/#about' },
}

export const stackIntro = {
  label: 'The Stack',
  title: 'The Stack We Build With',
  body: 'Modern, proven tools for websites, apps, SaaS products, AI systems and custom software, picked for the job and easy to grow with.',
  total: 'tools we build with',
}
