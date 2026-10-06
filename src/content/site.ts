import logoMark from '@/assets/images/brand/broaihai-mark.png'
import logoFull from '@/assets/images/brand/broaihai-logo.png'
import type { Link, Picture } from './types'

export const site = {
  name: 'BroAiHai',
  url: 'https://broaihai.com',
  description:
    'BroAiHai is a creative studio empowering startups and enterprises with strategy, design, and technology to create unforgettable digital experiences.',
  /** The BroAiHai logo, as supplied (transparent background, colours untouched). `logo` is the monogram alone, for small spaces; `logoFull` is the lockup with the wordmark. */
  logo: { src: logoMark, alt: 'BroAiHai' } satisfies Picture,
  logoFull: { src: logoFull, alt: 'BroAiHai' } satisfies Picture,
  copyright: '© 2025 BroAiHai. All rights reserved.',
}

/*
 * Only Home and Projects exist as pages. The other entries point at the matching
 * section on the home page until their own pages are built.
 */
export const navigation: Link[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/projects' },
]

export const contactCta: Link = { label: 'Contact Us', href: '#contact' }

export const contact = {
  email: { label: 'Email', value: 'broaihai@gmail.com', href: 'mailto:broaihai@gmail.com' },
  phone: { label: 'Phone number', value: 'Coming soon', href: '' },
  location: { label: 'Location', value: 'Mumbai, India', href: 'https://maps.google.com/?q=Mumbai+India' },
}
