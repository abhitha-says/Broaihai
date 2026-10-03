import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    number: '01',
    name: 'Web Experiences',
    plate: ['Web', 'Experiences'],
    description: 'High-end websites and web platforms built around your brand, your product and your business goals.',
    metric: { value: '1 team', label: 'Design to deploy' },
    tags: ['Design', 'Development', 'Motion', 'CMS'],
  },
  {
    number: '02',
    name: 'Mobile Apps',
    plate: ['Mobile', 'Apps'],
    description: 'iOS and Android applications designed and engineered for real-world use, from first screen to store release.',
    metric: { value: '2 platforms', label: 'One product' },
    tags: ['iOS', 'Android', 'UX', 'Release'],
  },
  {
    number: '03',
    name: 'SaaS Products',
    plate: ['SaaS', 'Products'],
    description: 'Complete SaaS products: product strategy and UX, development, infrastructure and launch.',
    metric: { value: '0 → 1', label: 'Idea to launch' },
    tags: ['Strategy', 'Product UX', 'Build', 'Infrastructure'],
  },
  {
    number: '04',
    name: 'AI & Automation',
    plate: ['AI &', 'Automation'],
    description: 'AI-powered products, intelligent workflows, agents and custom integrations that fit how your business already runs.',
    metric: { value: '24/7', label: 'Workflows that keep running' },
    tags: ['Agents', 'Automation', 'Integrations', 'Workflows'],
  },
  {
    number: '05',
    name: 'Custom Software',
    plate: ['Custom', 'Software'],
    description: 'Business software, dashboards, internal tools and portals built around exactly how your team works.',
    metric: { value: '100%', label: 'Built around your process' },
    tags: ['Dashboards', 'Portals', 'Internal tools', 'Systems'],
  },
  {
    number: '06',
    name: 'Digital Products',
    plate: ['Digital', 'Products'],
    description: 'From an idea to a complete digital product: strategy, design, development, deployment and iteration.',
    metric: { value: 'End to end', label: 'Strategy to iteration' },
    tags: ['Strategy', 'Design', 'Deploy', 'Iterate'],
  },
]
