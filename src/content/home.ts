import { contact, contactCta } from './site'
import quotient from '@/assets/images/clients/quotient.png'
import capsule from '@/assets/images/clients/capsule.png'
import featherdev from '@/assets/images/clients/featherdev.png'
import hourglass from '@/assets/images/clients/hourglass.png'
import epicurious from '@/assets/images/clients/epicurious.png'
import sisyphus from '@/assets/images/clients/sisyphus.png'
import commandR from '@/assets/images/clients/command-r.png'
import galileo from '@/assets/images/clients/galileo.png'
import type { ComparisonRow, HeroCard, Picture, ProcessStep, Stat, WordPair, BuildItem } from './types'

export const hero = {
  /** The headline, typed letter by letter; the words in `accent` are lit electric blue. */
  headline: 'The Bro Behind Your Next Big Idea.',
  accent: ['Big', 'Idea.'],
  support: 'We design and build the websites, products and AI systems your idea deserves, from first sketch to launch.',
  /**
   * The only two calls to action in the hero. `book` goes to the contact section until a
   * booking link (Calendly or similar) exists; swap its `href` for that link when it does.
   */
  book: { label: 'Book a 15-Min Fix', href: contactCta.href },
  tell: { label: 'Tell Us What You Need', href: contact.email.href },
  /** The cards that circle beside the copy, in their order round the orbit. */
  cards: [
    { number: '01', title: 'Digital Products', line: 'Products people actually use.', glyph: 'product' },
    { number: '02', title: 'AI Systems', line: 'Intelligence built into the workflow.', glyph: 'ai' },
    { number: '03', title: 'Web Experiences', line: 'Digital experiences that perform.', glyph: 'web' },
    { number: '04', title: 'Mobile Apps', line: 'Built for the pocket.', glyph: 'mobile' },
    { number: '05', title: 'Automation', line: 'Work that runs itself.', glyph: 'automation' },
  ] satisfies HeroCard[],
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

/** What the studio builds, in the client's words and order; every card leads to the contact section. */
export const build = {
  label: 'What We Build',
  title: 'End-to-end technology solutions tailored to your business goals.',
  items: [
    { title: 'Custom Software', body: 'Business-specific solutions built around your workflows.', icon: 'software' },
    { title: 'Mobile Apps', body: 'iOS and Android apps that your users love.', icon: 'mobile' },
    { title: 'Web Apps', body: 'Modern, secure and high-performance web applications.', icon: 'web' },
    { title: 'Tools & Platforms', body: 'Specialised tools to solve real business problems.', icon: 'platform' },
    { title: 'AI Agents', body: 'Automate work, make smarter decisions and unlock productivity.', icon: 'agent' },
    { title: 'Automation & Integrations', body: 'Connect your existing tools and streamline your workflows.', icon: 'automation' },
  ] satisfies BuildItem[],
  cta: contactCta,
}

/** The four steps from idea to launch, in the client's words. */
export const process = {
  label: 'How We Work',
  title: 'From idea to impact, in a few simple steps.',
  steps: [
    { number: '01', title: 'Understand', body: 'We deep dive into your problem and goals.' },
    { number: '02', title: 'Design', body: 'We propose the right solution, architecture and plan.' },
    { number: '03', title: 'Build', body: 'We develop, test and refine with you.' },
    { number: '04', title: 'Deliver & Support', body: 'We launch and stay with you for continuous improvement.' },
  ] satisfies ProcessStep[],
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
