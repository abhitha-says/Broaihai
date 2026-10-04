import { contactCta } from './site'
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
  /** The company name, one entry per word: "Bro AI Hai". The middle word gets the orange chip. */
  name: ['Bro', 'AI', 'Hai'],
  /** Typed out letter by letter; the words in `accent` take the brand orange. */
  tagline: { text: 'The Bro Behind Your Next Big Idea', accent: ['Bro'] },
  /** The only two calls to action in the hero. */
  projects: { label: 'View our projects', href: '/projects' },
  contact: { label: 'Contact', href: contactCta.href },
}

/** The desktop hero (1200px and wider): the logo, a headline, one line and two actions beside the orbiting cards. */
export const heroWide = {
  /** The headline, one entry per line; the phrase in `accent` is lit champagne. */
  headline: ['The Bro Behind', 'Your Next Big Idea.'],
  accent: 'Big Idea',
  support: 'We design and build the websites, products and AI systems your idea deserves, from first sketch to launch.',
  projects: { label: 'View Our Projects', href: '/projects' },
  services: { label: 'Explore Services', href: '/#services' },
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
  label: 'Services',
  /** The headline's three lines; the last one takes the accent. */
  lines: ['Everything', 'a product', 'needs.'],
  cta: { label: 'Start a project', href: '#contact' },
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
}

export const stackIntro = {
  label: 'The Stack',
  title: 'The Stack We Build With',
  body: 'Modern, proven tools for websites, apps, SaaS products, AI systems and custom software, picked for the job and easy to grow with.',
  total: 'tools we build with',
}
