import logo from '@/assets/images/brand/logo.png'
import wordmark from '@/assets/images/brand/wordmark.png'
import footerBackground from '@/assets/images/footer/background.png'
import facebook from '@/assets/images/icons/facebook.png'
import instagram from '@/assets/images/icons/instagram.png'
import dribbble from '@/assets/images/icons/dribbble.png'
import linkedin from '@/assets/images/icons/linkedin.png'
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
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/projects' },
]

export const contactCta: Link = { label: 'Contact Us', href: '#contact' }

export const contact = {
  email: { label: 'Email', value: 'broaihai@gmail.com', href: 'mailto:broaihai@gmail.com' },
  phone: { label: 'Phone number', value: '+1 (208) 120-802', href: 'tel:+1208120802' },
  location: { label: 'Location', value: 'Los Angeles, CA', href: 'https://maps.google.com/?q=Los+Angeles+CA' },
}

/** The text links under the hero. */
export const profiles: Link[] = [
  { label: 'BEHANCE', href: 'https://www.behance.net/', external: true },
  { label: 'DRIBBBLE', href: 'https://dribbble.com/', external: true },
  { label: 'LINKEDIN', href: 'https://in.linkedin.com', external: true },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/', external: true },
]

/** The icon links in the footer. */
export const socials: (Link & { icon: Picture })[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/', external: true, icon: { src: facebook, alt: '' } },
  { label: 'Instagram', href: 'https://www.instagram.com/', external: true, icon: { src: instagram, alt: '' } },
  { label: 'Dribbble', href: 'https://dribbble.com/', external: true, icon: { src: dribbble, alt: '' } },
  { label: 'LinkedIn', href: 'https://in.linkedin.com/', external: true, icon: { src: linkedin, alt: '' } },
]

export const footer = {
  background: {
    src: footerBackground,
    alt: '',
  } satisfies Picture,
}
