import logo from '@/assets/images/brand/logo.png'
import wordmark from '@/assets/images/brand/wordmark.png'
import footerBackground from '@/assets/images/footer/background.png'
import type { Link, Picture } from './types'

export const site = {
  name: 'Broaihai',
  url: 'https://broaihai.com',
  description:
    'Broaihai is a creative studio empowering startups and enterprises with strategy, design, and technology to create unforgettable digital experiences.',
  logo: { src: logo, alt: 'Broaihai' } satisfies Picture,
  wordmark: { src: wordmark, alt: '' } satisfies Picture,
  copyright: '© 2025 Broaihai. All rights reserved.',
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

export const footer = {
  background: {
    src: footerBackground,
    alt: '',
  } satisfies Picture,
}
