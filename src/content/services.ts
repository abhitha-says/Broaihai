import webDesignBg from '@/assets/images/services/web-design-bg.png'
import webDesign from '@/assets/images/services/web-design.png'
import brandIdentityBg from '@/assets/images/services/brand-identity-bg.png'
import brandIdentity from '@/assets/images/services/brand-identity.png'
import uiUxStrategyBg from '@/assets/images/services/ui-ux-strategy-bg.png'
import uiUxStrategy from '@/assets/images/services/ui-ux-strategy.png'
import creativeDevelopmentBg from '@/assets/images/services/creative-development-bg.png'
import creativeDevelopment from '@/assets/images/services/creative-development.png'
import type { Service } from './types'

export const services: Service[] = [
  {
    title: 'Web Design',
    description: 'We design high-performing, striking websites that blend creativity, usability, and strategy to boost engagement.',
    background: { src: webDesignBg, alt: '' },
    image: { src: webDesign, alt: 'Cyclist riding fast with motion blur representing speed and performance' },
  },
  {
    title: 'Brand Identity',
    description: 'We craft distinctive visual identities that express your purpose, elevate recognition, strengthen impact, and connect emotionally with audiences.',
    background: { src: brandIdentityBg, alt: '' },
    image: { src: brandIdentity, alt: 'Luxury perfume bottle on pedestal surrounded by plants representing brand identity' },
  },
  {
    title: 'UI/UX Strategy',
    description: 'We create seamless, user-focused digital experiences built through research, intuition, and purposeful design thinking.',
    background: { src: uiUxStrategyBg, alt: '' },
    image: { src: uiUxStrategy, alt: 'Abstract glowing geometric shape representing digital experience and innovation' },
  },
  {
    title: 'Creative Development',
    description: 'We transform innovative ideas into scalable digital solutions through clean code, smart design, and creative precision.',
    background: { src: creativeDevelopmentBg, alt: '' },
    image: { src: creativeDevelopment, alt: 'Portrait with futuristic visor glitch effect representing modern technology and development' },
  },
]
